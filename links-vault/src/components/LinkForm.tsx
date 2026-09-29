import { useState } from 'react';
import type { FormEvent } from 'react';
import type { LinkItem } from '../types/Link';
import TagPill from './TagPill';

interface LinkFormProps {
  mode: 'add' | 'edit';
  initialValue?: LinkItem;
  onSubmit: (data: {
    title: string;
    url: string;
    description: string;
    tags: string[];
  }) => void;
  onCancel: () => void;
}

export default function LinkForm({ mode, initialValue, onSubmit, onCancel }: LinkFormProps) {
  const [title, setTitle] = useState(initialValue?.title ?? '');
  const [url, setUrl] = useState(initialValue?.url ?? '');
  const [description, setDescription] = useState(initialValue?.description ?? '');
  const [tags, setTags] = useState<string[]>(initialValue?.tags ?? []);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput('');
    }
  };

  const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !tagInput && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!url.trim()) errs.url = 'URL is required';
    else {
      try {
        new URL(url.trim());
      } catch {
        errs.url = 'Enter a valid URL (include https://)';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: title.trim(),
      url: url.trim(),
      description: description.trim(),
      tags,
    });
  };

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title <span className="required">*</span></label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. React Documentation"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="url">URL <span className="required">*</span></label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        {errors.url && <span className="error">{errors.url}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={3}
          maxLength={500}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us about this link..."
        />
        <span className="char-count">{description.length}/500</span>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (optional)</label>
        <div className="tag-input">
          {tags.map((t) => (
            <TagPill
              key={t}
              label={t}
              onRemove={() => setTags(tags.filter((x) => x !== t))}
            />
          ))}
          <input
            id="tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKey}
            onBlur={addTag}
            placeholder={tags.length ? '' : 'Add tags (comma separated)'}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          {mode === 'add' ? 'Save Link' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}