# AI-Powered Code Review Assistant

A modern, AI-powered code review tool that helps developers improve their code quality through intelligent analysis and suggestions. Built with React, Vite, and Google's Gemini AI.

## 🚀 Features

- **Multi-language Support**: Supports JavaScript, TypeScript, Python, Java, C/C++, HTML, CSS, and more
- **AI-Powered Reviews**: Leverages Google's Gemini AI for intelligent code analysis
- **Real-time Code Editor**: Monaco Editor with syntax highlighting and language detection
- **File Upload**: Upload code files directly for review
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Markdown Results**: AI feedback rendered in beautiful markdown format

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4.1
- **Code Editor**: Monaco Editor
- **AI Service**: Google Generative AI (Gemini 2.0)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Syntax Highlighting**: Highlight.js, Rehype Highlight

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google AI API Key (Gemini)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd code-review-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_KEY=your_google_gemini_api_key_here
   ```
   
   You can get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
code-review-assistant/
├── src/
│   ├── Components/
│   │   ├── Container.jsx
│   │   ├── HomePage.jsx
│   │   └── ReviewPage.jsx
│   ├── controllers/
│   │   └── ai.controller.js
│   ├── service/
│   │   ├── ai.service.js
│   │   └── languages.js
│   ├── Theme/
│   │   ├── ThemeContext.jsx
│   │   └── ThemeToggle.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── .env
├── .env.sample
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 Usage

### Basic Code Review

1. **Navigate to Review Page**: Click "Start Reviewing" from the homepage
2. **Write or Upload Code**: 
   - Type your code directly in the Monaco editor
   - Or upload a file using the upload button
3. **Select Language**: Choose the appropriate programming language
4. **Review**: Click "Review Code" to get AI-powered feedback
5. **Analyze Results**: View suggestions, improvements, and best practices

### Supported File Types

- **JavaScript**: `.js`, `.jsx`
- **TypeScript**: `.ts`, `.tsx`
- **Python**: `.py`
- **Java**: `.java`
- **C/C++**: `.c`, `.cpp`
- **HTML**: `.html`, `.xml`
- **CSS**: `.css`, `.scss`
- **Others**: `.json`, `.yaml`, `.md`, `.sql`, `.php`, `.rb`, `.kt`, `.swift`

## 🔧 Configuration

### AI System Instructions

The AI reviewer is configured with expert-level instructions to provide:

- **Code Quality Analysis**: Clean, maintainable code suggestions
- **Best Practices**: Industry-standard coding practices
- **Performance Optimization**: Efficiency improvements
- **Security Review**: Vulnerability detection
- **Scalability Advice**: Future-proof code recommendations

### Theme Configuration

The app supports automatic theme detection based on:
1. User's explicit preference (stored in localStorage)
2. System preference (prefers-color-scheme)
3. Manual toggle via the theme button

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production

# Linting
npm run lint         # Run ESLint

# Preview
npm run preview      # Preview production build
```

## 🌟 Key Features Explained

### Language Detection
- Automatic language detection using Highlight.js
- File extension-based language mapping
- Manual language selection override

### AI Review Process
1. Code is sent to Google's Gemini AI with context
2. AI analyzes code for quality, performance, and security
3. Structured feedback with examples and improvements
4. Results displayed in formatted markdown

### Responsive Design
- Mobile-first approach
- Adaptive editor options for different screen sizes
- Optimized touch interactions

## 🚧 Development

### Adding New Languages

1. Update `languages.js`:
   ```javascript
   export const languageOptions = {
     // Add new language
     newLang: 'New Language'
   };
   
   export const extMap = {
     // Add file extension mapping
     ext: 'newLang'
   };
   ```

2. Register with Highlight.js in `ReviewPage.jsx`:
   ```javascript
   import newLang from 'highlight.js/lib/languages/newlang';
   hljs.registerLanguage('newlang', newLang);
   ```

### Customizing AI Instructions

Modify the `systemInstruction` in `ai.service.js` to adjust the AI's behavior, focus areas, or output format.

## 🔒 Security Considerations

- API keys are stored in environment variables
- Client-side API calls (consider server-side proxy for production)
- Input validation and sanitization
- CORS configuration for production deployment


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include code examples and error messages


## 🙏 Acknowledgments

- **Google Gemini AI** for powerful code analysis
- **Monaco Editor** for the excellent code editing experience
- **Tailwind CSS** for rapid UI development
- **React Community** for the amazing ecosystem

---

**Made with ❤️ by developers, for developers**
