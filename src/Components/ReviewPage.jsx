import { useRef, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, Loader2Icon, UploadCloud, Github } from 'lucide-react';
import Editor from '@monaco-editor/react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import getReview from '../controllers/ai.controller';
import ThemeToggle from '../Theme/ThemeToggle';
import { useTheme } from '../Theme/ThemeContext';
import Containor from './Container';
import { languageOptions, langMap, extMap } from '../service/languages';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);

export default function ReviewPage() {
  const { isDark } = useTheme();
  const editorRef = useRef(null);
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [isEditorDisabled, setIsEditorDisabled] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [isLangLocked, setIsLangLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const handleFormatDocument = () => {
  //   const formatted = code
  //     .split('\n')
  //     .map((line) => line.replace(/\s+$/, '').replace(/\t/g, ' ')) // trim & tab to 2 spaces
  //     .join('\n')
  //     .replace(/\r\n/g, '\n') // normalize line endings
  //     .replace(/^\s*\n/gm, '') // remove empty lines at top
  //     .trim(); // trim overall

  //   setCode(formatted + '\n'); // ensure it ends with newline
  // };

  const reviewCode = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setIsEditorDisabled(true);
    setReview('');

    try {
      const res = await getReview(
        code,
        language
      );
      console.log("result", res);

      setReview(res);
    } catch (err) {
      setReview('Error: Unable to get review. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsEditorDisabled(false);
    }
  };

  const handleCodeChange = (e, value) => {
    e.preventDefault()
    if (!value) {
      setCode('');
      return;
    }

    setCode(value);

    if (!isLangLocked) {
      try {
        const detected = hljs.highlightAuto(value);
        const detectedLang = langMap[detected.language];
        if (detectedLang && detectedLang !== language) {
          setLanguage(detectedLang);
          setIsLangLocked(true);
        }
      } catch (err) {
        console.warn('Language detection failed:', err);
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      if (typeof content === 'string') {
        setCode(content);
        setIsLangLocked(false);

        const ext = file.name.split('.').pop().toLowerCase();
        const detectedLang = extMap[ext];
        if (detectedLang && detectedLang !== language) {
          setLanguage(detectedLang);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <Containor isDark={isDark}>
      {/* Header*/}
      <header className={`py-3 px-4 sm:py-4 sm:px-6 shadow-md flex justify-between items-center text-white ${isDark ? 'bg-indigo-700' : 'bg-indigo-600'
        }`}>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <ArrowLeftIcon className="size-5 sm:size-6" />
          </Link>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">
            Code Review Assistant
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="https://github.com/rishabh2217/Code-Review"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-white/90 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            <Github size={16} className="sm:w-5 sm:h-5" />
            <span className="font-medium text-xs sm:text-sm hidden sm:inline">GitHub</span>
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-2 sm:p-4 flex flex-col xl:flex-row gap-3 sm:gap-4 md:gap-6 min-h-[calc(100vh-4rem)]">
        {/* Code Editor Section */}
        <section className="flex-1 flex flex-col gap-3 sm:gap-4">
          <div className={`rounded-lg shadow-lg flex flex-col overflow-hidden border h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[calc(100vh-10rem)] ${isDark
            ? 'bg-neutral-800 border-neutral-700'
            : 'bg-white border-neutral-200'
            }`}>
            {/* Editor Header */}
            <div className={`flex items-center justify-between px-3 py-2 sm:px-4 border-b ${isDark
              ? 'bg-neutral-700 border-neutral-600'
              : 'bg-neutral-100 border-neutral-200'
              }`}>
              {/* Traffic Lights */}
              <div className="flex gap-1 sm:gap-2">
                <span className="size-2 sm:size-3 bg-red-500 rounded-full" />
                <span className="size-2 sm:size-3 bg-yellow-500 rounded-full" />
                <span className="size-2 sm:size-3 bg-green-500 rounded-full" />
              </div>

              {/* Controls */}
              <div className="flex flex-row items-center justify-center gap-2">
                <select
                  className={`p-1.5 sm:p-2 rounded border text-xs sm:text-sm ${isDark
                    ? 'bg-neutral-600 text-white border-neutral-500'
                    : 'bg-white text-neutral-800 border-neutral-300'
                    }`}
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setIsLangLocked(true);
                  }}
                >
                  {Object.entries(languageOptions).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>

                <div className="flex items-center justify-center">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <UploadCloud className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark
                      ? 'text-blue-400 hover:text-blue-300'
                      : 'text-blue-500 hover:text-blue-700'
                      }`} />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".js,.jsx,.ts,.tsx,.py,.java,.html,.css,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Editor */}
            <div className="flex-grow overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage={language}
                language={language}
                value={code}
                onChange={handleCodeChange}
                onMount={(editor) => {
                  editorRef.current = editor;
                  editor.updateOptions({
                    theme: isDark ? 'vs-dark' : 'vs-light'
                  });
                }}
                options={{
                  readOnly: isEditorDisabled,
                  wordWrap: 'on',
                  minimap: { enabled: window.innerWidth > 768 }, // Disable minimap on mobile
                  scrollBeyondLastLine: false,
                  fontSize: window.innerWidth < 640 ? 12 : 14, // Smaller font on mobile
                  theme: isDark ? 'vs-dark' : 'vs-light',
                  automaticLayout: true,
                  scrollbar: {
                    vertical: 'auto',
                    horizontal: 'auto',
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                  },
                }}
              />
            </div>
          </div>

          {/* Review Button */}
          <div className="flex justify-center sm:justify-end">
          {/* <div className="flex justify-center sm:justify-between"> */}
            {/* <button
              onClick={handleFormatDocument}
              disabled={!code.trim()}
              className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-medium py-2 px-6 rounded-lg shadow"
            >
              Format Document
            </button> */}
            <button
              onClick={reviewCode}
              disabled={isLoading || !code.trim()}
              className={`font-medium py-2.5 px-6 sm:py-2 sm:px-6 rounded-lg shadow transition-colors text-white w-full sm:w-auto text-sm sm:text-base ${isLoading || !code.trim()
                ? 'bg-indigo-400 cursor-not-allowed'
                : isDark
                  ? 'bg-indigo-500 hover:bg-indigo-600'
                  : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2Icon className="size-4 sm:size-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                'Review Code'
              )}
            </button>
          </div>
        </section>

        {/* Review Results Section */}
        <section className={`flex-1 rounded-lg shadow-lg p-3 sm:p-4 md:p-6 overflow-auto scrollbar-thin border h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh] xl:h-[calc(100vh-6rem)] ${isDark
          ? 'bg-neutral-800 border-neutral-700'
          : 'bg-white border-neutral-200'
          }`}>
          <h2 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-neutral-900'
            }`}>Review Results</h2>

          {isLoading ? (
            <div className={`flex flex-col items-center justify-center h-32 sm:h-48 md:h-64 ${isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
              <Loader2Icon className="size-8 sm:size-10 md:size-12 animate-spin mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base md:text-lg text-center px-4">Analyzing your code...</p>
            </div>
          ) : review ? (
            <div className={`prose prose-sm sm:prose md:prose-lg max-w-none ${isDark ? 'prose-invert' : 'prose-neutral'
              }`}>
              <Suspense fallback={
                <div className="flex items-center justify-center p-4">
                  <Loader2Icon className="size-6 animate-spin mr-2" />
                  Loading review...
                </div>
              }>
                <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
              </Suspense>
            </div>
          ) : (
            <div className={`text-center py-8 sm:py-12 px-4 ${isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-8 sm:size-10 md:size-12 mx-auto mb-3 sm:mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-sm sm:text-base md:text-lg">Enter your code and click "Review Code" to get feedback</p>
            </div>
          )}
        </section>
      </main>
       {/* Footer */}
      <footer className={`py-3 px-4 sm:py-4 sm:px-6 shadow-md flex justify-center items-center text-white ${isDark ? 'bg-indigo-700' : 'bg-indigo-600'
        }`}>
        <p>© {new Date().getFullYear()} Code Review Assistant. All rights reserved.</p>
      </footer>
    </Containor>
  );
}