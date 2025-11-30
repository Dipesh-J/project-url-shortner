import PropTypes from 'prop-types';

/**
 * Empty State Component
 * Displays when there's no data to show
 */
const EmptyState = ({
  title = 'No data found',
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        p-8 rounded-lg bg-bg-surface
        text-center min-h-[200px]
        ${className}
      `}
    >
      {icon && (
        <div className="text-primary text-5xl mb-4 opacity-75">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-text-secondary mb-6 max-w-md">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  action: PropTypes.node,
  className: PropTypes.string,
};

export default EmptyState;
