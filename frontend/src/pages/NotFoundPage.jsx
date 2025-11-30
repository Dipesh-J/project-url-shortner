import { Link } from 'react-router-dom';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';
import { Button } from '../components';

/**
 * Not Found Page (404)
 * Displayed when users navigate to a non-existent route
 */
const NotFoundPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-md mx-auto">
          <FiAlertTriangle className="text-primary-variant text-6xl mx-auto mb-6" />
          
          <h1 className="text-6xl font-semibold text-text-primary mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-medium text-text-primary mb-4">
            Page Not Found
          </h2>
          
          <p className="text-text-secondary mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          
          <Link to="/">
            <Button variant="primary" size="lg">
              <FiHome className="mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
