import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import Loader from '../components/Loader';
import Input from '../components/Input';
import { getNotes, deleteNote } from '../services/api';
import '../styles/pages.css';

// ── Placeholder notes shown when the API returns empty ──
const DEMO_NOTES = [
  {
    id: 1,
    title: 'Getting Started with Smart Notes',
    content:
      'Welcome to Smart Notes — your AI-powered knowledge companion. Create notes, get AI explanations, and organize your thoughts effortlessly.',
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'React Architecture Overview',
    content:
      'Component-based architecture enables composable UIs. Use hooks for side effects and state, keep components focused and reusable.',
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    title: 'FastAPI Backend Notes',
    content:
      'FastAPI uses Python type hints for automatic OpenAPI documentation. Pair with SQLAlchemy for ORM and Pydantic for data validation.',
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notes on mount
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setTimeout(async () => {
          const data = await getNotes();
          // Fall back to demo notes until backend is wired
          const result = data && data.length > 0 ? data : DEMO_NOTES;
          if (data.length === 0) {
            navigate('/notes/new');
          }
          setNotes(result);
          setFiltered(result);
        }, 20000);
      } catch (err) {
        console.error(err);
        setError('Failed to load notes.');
        setNotes(DEMO_NOTES);
        setFiltered(DEMO_NOTES);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Live search filter
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      notes.filter(
        (n) =>
          n.title?.toLowerCase().includes(q) ||
          n.content?.toLowerCase().includes(q)
      )
    );
  }, [search, notes]);

  return (
    <div className="page-shell dashboard">
      {/* Header */}
      <div className="dashboard__top">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <span className="page-header__eyebrow">Workspace</span>
          <h1 className="page-header__title text-glow">My Notes</h1>
          <p className="page-header__sub">
            {notes.length} note{notes.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>
      </div>

      {/* Stats chips */}
      <div className="dashboard__stats">
        <div className="stat-chip">
          <span className="stat-chip__count">{notes.length}</span>
          <span className="stat-chip__label">Total</span>
        </div>
        <div className="stat-chip">
          <span className="stat-chip__count" style={{ color: 'var(--neon-cyan)' }}>
            {filtered.length}
          </span>
          <span className="stat-chip__label">Shown</span>
        </div>
      </div>

      {/* Search */}
      <div className="dashboard__search-wrap">
        <Input
          id="notes-search"
          placeholder="Search notes by title or content…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Content */}
      {loading ? (
        <Loader text="Fetching Notes" />
      ) : error ? (
        <p style={{ color: '#ff6b6b', textAlign: 'center', padding: '32px 0' }}>
          {error}
        </p>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">📋</span>
          <h2 className="empty-state__title">No notes found</h2>
          <p className="empty-state__sub">
            {search
              ? 'Try a different search term.'
              : 'Create your first note and start building your knowledge base.'}
          </p>
          {!search && (
            <button
              className="fab"
              style={{ position: 'static', marginTop: 8 }}
              onClick={() => navigate('/notes/new')}
            >
              + Create Note
            </button>
          )}
        </div>
      ) : (
        <div className="notes-grid">
          {filtered.map((note, i) => (
            <div
              key={note.id}
              className="fade-in-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <NoteCard note={note} />
            </div>
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      {!loading && (
        <button
          className="fab"
          onClick={() => navigate('/notes/new')}
          aria-label="Create new note"
        >
          + New Note
        </button>
      )}
    </div>
  );
};

export default Dashboard;
