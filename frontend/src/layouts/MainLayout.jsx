import Navbar from '../components/Navbar';
import '../index.css';

/**
 * MainLayout — wraps all pages with Navbar + ambient background.
 * Uses CSS grid so the page content fills the viewport below the navbar.
 */
const MainLayout = ({ children }) => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="page-content" id="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
