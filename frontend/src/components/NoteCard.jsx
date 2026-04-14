import { useNavigate } from 'react-router-dom';
import './styles/components.css';

/**
 * NoteCard — Glassmorphic note preview card
 *
 * Props:
 *  note - { id, title, content, created_at, updated_at }
 */
const NoteCard = ({ note }) => {
  const navigate = useNavigate();

  const preview =
    note.content && note.content.length > 120
      ? note.content.slice(0, 120).trim() + '…'
      : note.content || 'No content yet.';

  const formattedDate = note.updated_at
    ? new Date(note.updated_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <article
      className="note-card glass glass-hover"
      onClick={() => navigate(`/notes/${note.id}`)}
      role="button"
      tabIndex={0}
      aria-label={`Open note: ${note.title}`}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/notes/${note.id}`)}
    >
      {/* Accent line */}
      <div className="note-card__accent" aria-hidden="true" />

      <div className="note-card__body">
        <h3 className="note-card__title">{note.title || 'Untitled Note'}</h3>
        <p className="note-card__preview">{preview}</p>
      </div>

      {formattedDate && (
        <footer className="note-card__footer">
          <span className="note-card__date">{formattedDate}</span>
          <span className="note-card__arrow" aria-hidden="true">›</span>
        </footer>
      )}
    </article>
  );
};

export default NoteCard;
