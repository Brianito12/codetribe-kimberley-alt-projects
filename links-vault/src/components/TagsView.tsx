import type { LinkItem } from '../types/Link';
import TagPill from './TagPill';

interface TagsViewProps {
  links: LinkItem[];
  onSelectTag: (tag: string) => void;
}

export default function TagsView({ links, onSelectTag }: TagsViewProps) {
  const tagCounts = links.reduce<Record<string, number>>((acc, link) => {
    link.tags.forEach((t) => {
      acc[t] = (acc[t] ?? 0) + 1;
    });
    return acc;
  }, {});

  const sorted = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <section className="content">
      <div className="content__header">
        <div>
          <h1>Tags</h1>
          <p className="muted">
            {sorted.length} tag{sorted.length === 1 ? '' : 's'} across {links.length} link
            {links.length === 1 ? '' : 's'}.
          </p>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🏷</div>
          <h3>No tags yet</h3>
          <p>Add tags to your links and they will show up here.</p>
        </div>
      ) : (
        <div className="tag-list">
          {sorted.map(([tag, count]) => (
            <button
              key={tag}
              className="tag-row"
              onClick={() => onSelectTag(tag)}
              aria-label={`Filter by ${tag}, ${count} link${count === 1 ? '' : 's'}`}
            >
              <TagPill label={tag} />
              <span className="tag-row__count">
                {count} link{count === 1 ? '' : 's'} →
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}