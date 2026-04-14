import './styles/components.css';

/**
 * Button — Cyber-themed glowing button component
 *
 * Props:
 *  children  - button label
 *  onClick   - click handler
 *  variant   - 'primary' | 'cyan' | 'ghost' | 'danger'
 *  size      - 'sm' | 'md' | 'lg'
 *  disabled  - boolean
 *  loading   - show loading spinner inside button
 *  type      - html button type attr
 *  className - extra CSS classes
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`cyber-btn cyber-btn--${variant} cyber-btn--${size} ${className}`}
      {...rest}
    >
      {loading && <span className="cyber-btn__spinner" aria-hidden="true" />}
      <span className={loading ? 'cyber-btn__label--loading' : ''}>{children}</span>
    </button>
  );
};

export default Button;
