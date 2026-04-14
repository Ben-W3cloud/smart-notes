import './styles/components.css';

/**
 * Textarea — Cyber-themed labeled textarea field
 *
 * Props:
 *  id, label, placeholder, value, onChange,
 *  rows, error, required, disabled, className
 */
const Textarea = ({
  id,
  label,
  placeholder = '',
  value,
  onChange,
  rows = 8,
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
    <textarea
      id={id}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className="cyber-field__textarea"
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

export default Textarea;
