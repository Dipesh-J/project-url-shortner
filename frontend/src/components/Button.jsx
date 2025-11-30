import PropTypes from 'prop-types';

/**
 * Reusable Button Component
 * Supports primary, secondary, and outline variants
 */
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  loading = false,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-medium
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-default
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-primary text-white
      hover:bg-primary-variant
      focus:ring-primary
    `,
    secondary: `
      bg-bg-surface text-white
      hover:bg-opacity-80
      border border-primary
      focus:ring-primary-variant
    `,
    outline: `
      bg-transparent text-primary border-2 border-primary
      hover:bg-primary hover:text-white
      focus:ring-primary
    `,
    danger: `
      bg-accent-error text-white
      hover:opacity-90
      focus:ring-accent-error
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-sm',
    md: 'px-5 py-2.5 text-base rounded-md',
    lg: 'px-8 py-3 text-lg rounded-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
