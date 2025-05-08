import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import getIcon from './utils/iconUtils';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const location = useLocation();

  // Set up dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Define header icons
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  const TicketIcon = getIcon('Ticket');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-primary dark:text-primary-light">
              <TicketIcon size={28} />
            </span>
            <span className="text-xl font-bold tracking-tight">EventEase</span>
          </a>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 dark:text-surface-300 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="bg-surface-100 dark:bg-surface-800 py-6 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-surface-600 dark:text-surface-400 text-sm">&copy; {new Date().getFullYear()} EventEase. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Terms
              </a>
              <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Privacy
              </a>
              <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Toast container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="!rounded-xl !font-medium"
      />
    </div>
  );
}

export default App;