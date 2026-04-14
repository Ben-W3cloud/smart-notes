import './styles/components.css';

/**
 * Loader — Cyber-style dual-ring loading animation
 *
 * Props:
 *  text - optional label below the rings (default: 'Loading')
 *  size - 'sm' | 'md' (default: 'md')
 */
const Loader = ({ text = 'Loading', size = 'md' }) => (
  <div
    className="cyber-loader"
    role="status"
    aria-label={text || 'Loading'}
    style={size === 'sm' ? { padding: '24px 0' } : undefined}
  >
    <div
      className="cyber-loader__ring"
      style={size === 'sm' ? { width: 32, height: 32 } : undefined}
      aria-hidden="true"
    />
    {text && <p className="cyber-loader__text">{text}</p>}
  </div>
);

export default Loader;
