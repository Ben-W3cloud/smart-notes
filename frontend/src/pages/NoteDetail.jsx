import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { getNoteById, deleteNote, explainNote } from '../services/api';
import '../styles/pages.css';

// Demo note for when the backend isn't wired yet
const DEMO_NOTE = {
  id: 1,
  title: 'Getting Started with Smart Notes',
  content:
    'Welcome to Smart Notes — your AI-powered knowledge companion.\n\nCreate notes, request AI explanations, and organize your thoughts effortlessly. Each note is stored securely in the backend and can be enriched with intelligent insights powered by the AI explanation engine.\n\nClick "Explain Note" above to see this feature in action.',
  updated_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
};

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // AI explanation state
  const [explanation, setExplanation] = useState(null);
  const [explaining, setExplaining] = useState(false);
  const [explainError, setExplainError] = useState(null);

  // Delete modal
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch note
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getNoteById(id);
        setNote(data || DEMO_NOTE);
      } catch {
        setNote(DEMO_NOTE);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // Request AI explanation
  const handleExplain = async () => {
    try {
      setExplaining(true);
      setExplainError(null);
      const result = await explainNote(id);
      setExplanation(
        result?.explanation ||
          'AI explanation will appear here once the backend endpoint is connected.'
      );
    } catch {
      setExplainError('Failed to fetch explanation. Please try again.');
    } finally {
      setExplaining(false);
    }
  };

  // Delete note
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteNote(id);
      navigate('/', { replace: true });
    } catch {
      setDeleting(false);
      setShowDelete(false);
    }
  };

  const formattedDate = note?.updated_at
    ? new Date(note.updated_at).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  if (loading) return <div className="page-shell"><Loader text="Loading Note" /></div>;
  if (error) return <div className="page-shell" style={{ color: '#ff6b6b', paddingTop: 32 }}>{error}</div>;

  return (
    <div className="page-shell note-detail">
      {/* Back button */}
      <button className="note-detail__back" onClick={() => navigate(-1)}>
        <span className="note-detail__back-arrow">‹</span> Back to Notes
      </button>

      {/* Actions row */}
      <div className="note-detail__actions">
        <Button
          variant="cyan"
          size="sm"
          onClick={handleExplain}
          loading={explaining}
          disabled={explaining}
          aria-label="Request AI explanation for this note"
        >
          ✦ Explain Note
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/notes/${id}/edit`)}
          aria-label="Edit this note"
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => setShowDelete(true)}
          aria-label="Delete this note"
        >
          Delete
        </Button>
      </div>

      {/* Note card */}
      <article className="note-detail__card glass">
        <div className="note-detail__meta">
          {formattedDate && (
            <span className="note-detail__badge note-detail__badge--date">
              {formattedDate}
            </span>
          )}
        </div>

        <h1 className="note-detail__title">{note?.title || 'Untitled'}</h1>
        <hr className="note-detail__divider" />
        <p className="note-detail__content">{note?.content}</p>
      </article>

      {/* AI Explanation Panel */}
      {explainError && (
        <p style={{ color: '#ff6b6b', marginBottom: 16 }}>{explainError}</p>
      )}
      {explanation && (
        <section className="ai-panel" aria-label="AI Explanation">
          <div className="ai-panel__header">
            <span className="ai-panel__dot" aria-hidden="true" />
            <span className="ai-panel__label">AI Explanation</span>
          </div>
          <div className="ai-panel__body">{explanation}</div>
        </section>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        title="Delete Note"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setShowDelete(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              loading={deleting}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="confirm-delete__text">
          Are you sure you want to delete{' '}
          <span className="confirm-delete__note-name">"{note?.title}"</span>?
          <br />
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default NoteDetail;
