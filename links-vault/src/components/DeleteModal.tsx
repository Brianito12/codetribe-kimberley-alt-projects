import { useEffect } from 'react';

interface DeleteModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ title, onConfirm, onCancel }: DeleteModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onCancel]);

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__icon">🗑</div>
        <h3 id="modal-title" className="modal__title">Delete this link?</h3>
        <p className="modal__text">
          Are you sure you want to delete <strong>"{title}"</strong>? This action cannot be undone.
        </p>
        <div className="modal__actions">
          <button className="btn btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn--danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}