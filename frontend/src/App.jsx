import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components';
import { HomePage, AboutPage, NotFoundPage } from './pages';

/**
 * Main App Component
 * Sets up routing and global providers
 */
function App() {
  return (
    <Router>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#282A3A',
            color: '#ffffff',
            border: '1px solid #735F32',
          },
          success: {
            iconTheme: {
              primary: '#735F32',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4444',
              secondary: '#ffffff',
            },
          },
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="min-h-screen bg-bg-default">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-bg-surface py-8 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} URL Shortener. Built with React &amp; Express.
          </p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
