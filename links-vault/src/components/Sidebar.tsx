export type View = 'home' | 'tags' | 'settings';

interface SidebarProps {
  linkCount: number;
  isOpen: boolean;
  onClose: () => void;
  view: View;
  setView: (v: View) => void;
}

export default function Sidebar({
  linkCount,
  isOpen,
  onClose,
  view,
  setView,
}: SidebarProps) {
  const items: { id: View; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'tags', label: 'Tags', icon: '🏷' },
    { id: 'settings', label: 'Settings', icon: '⚙' },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <span className="sidebar__logo">🔗</span>
          <span>Links Vault</span>
        </div>

        <nav className="sidebar__nav">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sidebar__item ${
                view === item.id ? 'sidebar__item--active' : ''
              }`}
              onClick={() => {
                setView(item.id);
                onClose();
              }}
            >
              <span className="sidebar__item-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar__storage">
          <p className="sidebar__storage-title">💾 Local Storage</p>
          <div className="sidebar__progress">
            <div
              className="sidebar__progress-bar"
              style={{ width: `${Math.min((linkCount / 50) * 100, 100)}%` }}
            />
          </div>
          <p className="sidebar__storage-text">
            {linkCount} link{linkCount === 1 ? '' : 's'} saved
          </p>
        </div>
      </aside>
    </>
  );
}