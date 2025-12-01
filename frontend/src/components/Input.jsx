import PropTypes from 'prop-types';
import { forwardRef } from 'react';

/**
 * Reusable Input Component
 * Supports different input types and states
 */
const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = true,
  className = '',
  id,
  name,
  ...props
}, ref) => {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary mb-2"
        >
          {label}
          {required && <span className="text-accent-error ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-3
          bg-bg-surface text-text-primary
          border-2 rounded-md
          placeholder:text-text-secondary
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-accent-error' : 'border-bg-surface hover:border-primary'}
        `}
        {...props}
      />
      {(error || helperText) && (
        <p
          className={`mt-1 text-xs ${
            error ? 'text-accent-error' : 'text-text-secondary'
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
