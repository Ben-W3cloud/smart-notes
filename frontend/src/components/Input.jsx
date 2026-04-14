import './styles/components.css';

/**
 * Input — Cyber-themed labeled input field
 *
 * Props:
 *  id, label, type, placeholder, value, onChange,
 *  error, required, disabled, className
 */
const Input = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  ...rest
}) => (
  <div className={`cyber-field ${className}`}>
    {label && (
      <label htmlFor={id} className="cyber-field__label">
        {label}
        {required && <span aria-hidden="true" style={{ color: 'var(--neon-cyan)', marginLeft: 3 }}>*</span>}
      </label>
    )}
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className="cyber-field__input"
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      {...rest}
    />
    {error && (
      <span id={`${id}-error`} className="cyber-field__error" role="alert">
        {error}
      </span>
    )}
  </div>
);

export default Input;
