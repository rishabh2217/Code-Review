import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import ThemeToggle from "../Theme/ThemeToggle";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-home dark:bg-neutral-900 flex flex-col transition-colors">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/30 dark:bg-black/30" />

      {/* Header */}
      <header className="relative z-10 py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Code Review Assistant
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/rishabh2217/Code-Review"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors rounded-lg hover:bg-white/20 dark:hover:bg-black/20"
          >
            <Github size={20} />
            <span className="font-medium">GitHub</span>
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-1 flex-col justify-center items-center text-center px-4">
        <h2 className="text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
          Improve Your Code Quality
        </h2>
        <p className="text-xl max-w-2xl mb-10 text-neutral-800 dark:text-neutral-200">
          Get instant feedback on your code. Our AI-powered tool helps identify issues,
          suggests improvements, and follows best practices.
        </p>
        <Link
          to="/review"
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-colors"
        >
          Start Reviewing
        </Link>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-neutral-600 dark:text-neutral-400 text-md">
        <p>© {new Date().getFullYear()} Code Review Assistant. All rights reserved.</p>
      </footer>
    </div>
  );
}