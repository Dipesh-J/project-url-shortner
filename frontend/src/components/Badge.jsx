import PropTypes from 'prop-types';

/**
 * Badge Component
 * Small label for status, categories, or tags
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variants = {
    default: 'bg-bg-surface text-text-primary border border-primary',
    primary: 'bg-primary text-white',
    success: 'bg-accent-success text-white',
    warning: 'bg-accent-warning text-white',
    error: 'bg-accent-error text-white',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-medium rounded-md
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Badge;
