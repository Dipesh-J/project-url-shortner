import PropTypes from 'prop-types';
import { FiAlertCircle } from 'react-icons/fi';
import Button from './Button';

/**
 * API Error Component
 * Displays error messages with optional retry functionality
 */
const APIError = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        p-8 rounded-lg bg-bg-surface
        text-center
        ${className}
      `}
    >
      <FiAlertCircle className="text-accent-error text-5xl mb-4" />
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        Oops! An error occurred
      </h3>
      <p className="text-text-secondary mb-6 max-w-md">
        {message}
      </p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

APIError.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
  className: PropTypes.string,
};

export default APIError;
