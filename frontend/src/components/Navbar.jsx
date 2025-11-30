import { Link, useLocation } from 'react-router-dom';
import { FiLink2, FiGithub } from 'react-icons/fi';

/**
 * Navbar Component
 * Main navigation bar with design token styling
 */
const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        bg-bg-surface
        shadow-navbar
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="
              flex items-center gap-2
              text-primary-variant text-xl font-semibold
              transition-colors duration-300
              hover:text-primary
            "
          >
            <FiLink2 className="text-2xl" />
            <span>URL Shortener</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  text-sm font-medium
                  transition-colors duration-300
                  ${
                    isActive(link.path)
                      ? 'text-primary-variant'
                      : 'text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            
            {/* GitHub Link */}
            <a
              href="https://github.com/Dipesh-J/project-url-shortner"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-text-secondary
                hover:text-text-primary
                transition-colors duration-300
              "
              aria-label="GitHub Repository"
            >
              <FiGithub className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
