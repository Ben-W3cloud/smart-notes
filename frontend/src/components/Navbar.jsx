import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import './styles/components.css';

/**
 * Navbar — Sleek top navigation bar
 */
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        {/* Brand */}
        <Link to="/" className="navbar__brand" aria-label="Smart Notes home">
          <div className="navbar__logo-mark" aria-hidden="true">N</div>
          <span className="navbar__brand-name">
            Smart<span>Notes</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="navbar__actions">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/notes/new')}
            aria-label="Create a new note"
            className="navbar__create-btn"
          >
            + New Note
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
