import PropTypes from 'prop-types';

/**
 * Reusable Card Component
 * A container with surface background and optional padding
 */
const Card = ({
  children,
  padding = 'md',
  className = '',
  onClick,
  hoverable = false,
  ...props
}) => {
  const paddingSizes = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-bg-surface rounded-lg
        ${paddingSizes[padding]}
        ${hoverable ? 'cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  hoverable: PropTypes.bool,
};

export default Card;
