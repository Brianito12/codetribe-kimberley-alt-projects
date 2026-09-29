interface TopbarProps {
  query: string;
  setQuery: (v: string) => void;
  scope: string;
  setScope: (v: string) => void;
  onMenuClick: () => void;
  onAddClick: () => void;
  showSearch: boolean;
}

export default function Topbar({
  query,
  setQuery,
  scope,
  setScope,
  onMenuClick,
  onAddClick,
  showSearch,
}: TopbarProps) {
  return (
    <header className="topbar">
      <button className="hamburger" onClick={onMenuClick} aria-label="Open menu">
        ☰
      </button>

      {showSearch && (
        <div className="search">
          <span className="search__icon">🔍</span>
          <input
            type="text"
            placeholder="Search your links..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select value={scope} onChange={(e) => setScope(e.target.value)}>
            <option value="all">All fields</option>
            <option value="title">Title</option>
            <option value="url">URL</option>
            <option value="description">Description</option>
            <option value="tags">Tags</option>
          </select>
        </div>
      )}

      <button
        className="btn btn--primary topbar__add"
        onClick={onAddClick}
        aria-label="Add new link"
      >
        + <span className="topbar__add-text">New Link</span>
      </button>
    </header>
  );
}