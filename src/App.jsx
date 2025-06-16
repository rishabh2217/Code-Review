import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Theme/ThemeContext';
import HomePage from './Components/HomePage';
import ReviewPage from './Components/ReviewPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/review" element={<ReviewPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;