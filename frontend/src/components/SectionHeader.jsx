import PropTypes from 'prop-types';

/**
 * Section Header Component
 * Used for consistent section titles throughout the app
 */
const SectionHeader = ({
  title,
  subtitle,
  centered = false,
  className = '',
}) => {
  return (
    <div
      className={`
        mb-8
        ${centered ? 'text-center' : ''}
        ${className}
      `}
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-base md:text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  centered: PropTypes.bool,
  className: PropTypes.string,
};

export default SectionHeader;
