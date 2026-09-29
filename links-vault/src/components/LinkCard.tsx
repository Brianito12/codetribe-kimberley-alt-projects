import type { LinkItem } from '../types/Link';
import TagPill from './TagPill';

interface LinkCardProps {
  link: LinkItem;
  onEdit: (link: LinkItem) => void;
  onDelete: (link: LinkItem) => void;
}

export default function LinkCard({ link, onEdit, onDelete }: LinkCardProps) {
  let domain = '';
  try {
    domain = new URL(link.url).hostname.replace('www.', '');
  } catch {
    domain = link.url;
  }

  const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  const formatted = new Date(link.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <article className="link-card">
      <header className="link-card__head">
        <img
          src={favicon}
          alt=""
          className="link-card__favicon"
          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        />
        <div className="link-card__head-text">
          <h3 className="link-card__title">{link.title}</h3>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card__url"
          >
            {domain} ↗
          </a>
        </div>
      </header>

      {link.description && (
        <p className="link-card__desc">{link.description}</p>
      )}

      {link.tags.length > 0 && (
        <div className="link-card__tags">
          {link.tags.map((t) => (
            <TagPill key={t} label={t} />
          ))}
        </div>
      )}

      <footer className="link-card__foot">
        <span className="link-card__date">📅 {formatted}</span>
        <div className="link-card__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => onEdit(link)}
            aria-label={`Edit ${link.title}`}
          >
            ✏️
          </button>
          <button
            type="button"
            className="icon-btn icon-btn--danger"
            onClick={() => onDelete(link)}
            aria-label={`Delete ${link.title}`}
          >
            🗑
          </button>
        </div>
      </footer>
    </article>
  );
}