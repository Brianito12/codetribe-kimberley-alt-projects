interface TagPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

export default function TagPill({ label, active, onClick, onRemove }: TagPillProps) {
  return (
    <span
      className={`tag-pill ${active ? 'tag-pill--active' : ''}`}
      onClick={onClick}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          className="tag-pill__remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}