import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { getNoteById, createNote, updateNote } from '../services/api';
import '../styles/pages.css';

const CreateEditNote = () => {
  const { id } = useParams();       // present only on edit route
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // When editing, pre-fill the form
  useEffect(() => {
    if (!isEditing) return;
    const load = async () => {
      try {
        setLoading(true);
        const data = await getNoteById(id);
        if (data) {
          setForm({ title: data.title || '', content: data.content || '' });
        }
      } catch {
        // Silently fall through — form stays empty
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEditing]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (!form.content.trim()) errs.content = 'Content cannot be empty.';
    return errs;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      setSaving(true);
      setSaveError(null);
      if (isEditing) {
        await updateNote(id, form);
        navigate(`/notes/${id}`);
      } else {
        const created = await createNote(form);
        navigate(created?.id ? `/notes/${created.id}` : '/');
      }
    } catch {
      setSaveError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="page-shell"><Loader text="Loading Note" /></div>;
  }

  return (
    <div className="page-shell create-note">
      {/* Header */}
      <div className="page-header">
        <span className="page-header__eyebrow">
          {isEditing ? 'Edit Note' : 'New Note'}
        </span>
        <h1 className="page-header__title text-glow">
          {isEditing ? 'Update Your Note' : 'Create a Note'}
        </h1>
        <p className="page-header__sub">
          {isEditing
            ? 'Modify your note below and save your changes.'
            : 'Capture your thoughts, ideas, or knowledge below.'}
        </p>
      </div>

      {/* Form */}
      <form
        className="create-note__form"
        onSubmit={handleSubmit}
        noValidate
        aria-label={isEditing ? 'Edit note form' : 'Create note form'}
      >
        <div className="create-note__card glass">
          <p className="form-section-label">Note Details</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Input
              id="note-title"
              label="Title"
              placeholder="Enter a clear, descriptive title…"
              value={form.title}
              onChange={handleChange('title')}
              error={errors.title}
              required
              autoFocus
            />

            <Textarea
              id="note-content"
              label="Content"
              placeholder="Write your note here. Be as detailed as you like…"
              value={form.content}
              onChange={handleChange('content')}
              error={errors.content}
              rows={12}
              required
            />
          </div>
        </div>

        {saveError && (
          <p
            role="alert"
            style={{ color: '#ff6b6b', fontSize: '0.88rem', textAlign: 'right' }}
          >
            {saveError}
          </p>
        )}

        {/* Actions */}
        <div className="create-note__actions">
          <Button
            variant="ghost"
            size="md"
            type="button"
            onClick={() => navigate(-1)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            type="submit"
            loading={saving}
            disabled={saving}
          >
            {isEditing ? 'Save Changes' : 'Create Note'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditNote;
