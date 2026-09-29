interface EmptyStateProps {
  title: string;
  message: string;
}

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">🔗</div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}