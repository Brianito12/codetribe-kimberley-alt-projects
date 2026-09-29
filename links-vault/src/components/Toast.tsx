import type { ToastMsg } from '../types/Link';

interface ToastProps {
  toast: ToastMsg;
  onClose: (id: string) => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  const icons: Record<string, string> = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div className={`toast toast--${toast.type}`} role="status">
      <span className="toast__icon">{icons[toast.type]}</span>
      <span className="toast__message">{toast.message}</span>
      <button
        type="button"
        className="toast__close"
        onClick={() => onClose(toast.id)}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}