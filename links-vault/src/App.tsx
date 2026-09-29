import { useMemo, useState } from 'react';
import Sidebar, { type View } from './components/Sidebar';
import Topbar from './components/Topbar';
import LinkCard from './components/LinkCard';
import LinkForm from './components/LinkForm';
import DeleteModal from './components/DeleteModal';
import EmptyState from './components/EmptyState';
import TagPill from './components/TagPill';
import Toast from './components/Toast';
import TagsView from './components/TagsView';
import SettingsView from './components/SettingsView';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { LinkItem, ToastMsg, ToastType } from './types/Link';

const seed: LinkItem[] = [
  {
    id: '1',
    title: 'React Documentation',
    url: 'https://react.dev',
    description:
      'Official React documentation. Learn about React, its features, and best practices.',
    tags: ['React', 'Documentation', 'Development'],
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    updatedAt: Date.now(),
  },
  {
    id: '2',
    title: 'GitHub',
    url: 'https://github.com',
    description:
      'Where the world builds software. GitHub is a platform for developers to build, ship, and maintain.',
    tags: ['Development', 'Code', 'Tools'],
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
    updatedAt: Date.now(),
  },
  {
    id: '3',
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'Resources for developers, by developers.',
    tags: ['Documentation', 'Web', 'Learning'],
    createdAt: Date.now() - 1000 * 60 * 60 * 72,
    updatedAt: Date.now(),
  },
  {
    id: '4',
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    description: 'Q&A for developers. Find solutions to your programming problems.',
    tags: ['Programming', 'Q&A', 'Community'],
    createdAt: Date.now() - 1000 * 60 * 60 * 96,
    updatedAt: Date.now(),
  },
];

export default function App() {
  const [links, setLinks] = useLocalStorage<LinkItem[]>('links-vault', seed);

  const [view, setView] = useState<View>('home');

  const [query, setQuery] = useState('');
  const [scope, setScope] = useState('all');
  const [activeTag, setActiveTag] = useState('All');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'az'>('recent');

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editing, setEditing] = useState<LinkItem | null>(null);
  const [deleting, setDeleting] = useState<LinkItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const pushToast = (type: ToastType, message: string) => {
    const id = crypto.randomUUID();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3000);
  };

  const allTags = useMemo(() => {
    const set = new Set<string>();
    links.forEach((l) => l.tags.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set).sort()];
  }, [links]);

  const filtered = useMemo(() => {
    return links
      .filter((l) => activeTag === 'All' || l.tags.includes(activeTag))
      .filter((l) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        if (scope === 'all') {
          return (
            l.title.toLowerCase().includes(q) ||
            l.url.toLowerCase().includes(q) ||
            l.description.toLowerCase().includes(q) ||
            l.tags.join(' ').toLowerCase().includes(q)
          );
        }
        if (scope === 'tags') return l.tags.join(' ').toLowerCase().includes(q);
        const val = l[scope as 'title' | 'url' | 'description'];
        return String(val).toLowerCase().includes(q);
      })
      .sort((a, b) => {
        if (sortBy === 'az') return a.title.localeCompare(b.title);
        if (sortBy === 'oldest') return a.createdAt - b.createdAt;
        return b.createdAt - a.createdAt;
      });
  }, [links, query, scope, activeTag, sortBy]);

  const openAdd = () => {
    setEditing(null);
    setIsPanelOpen(true);
  };

  const openEdit = (link: LinkItem) => {
    setEditing(link);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setEditing(null);
  };

  const handleSubmit = (data: {
    title: string;
    url: string;
    description: string;
    tags: string[];
  }) => {
    if (editing) {
      setLinks((prev) =>
        prev.map((l) =>
          l.id === editing.id ? { ...l, ...data, updatedAt: Date.now() } : l
        )
      );
      pushToast('success', 'Link updated successfully!');
    } else {
      const now = Date.now();
      const newLink: LinkItem = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      setLinks((prev) => [newLink, ...prev]);
      pushToast('success', 'Link saved successfully!');
    }
    closePanel();
  };

  const handleConfirmDelete = () => {
    if (!deleting) return;
    setLinks((prev) => prev.filter((l) => l.id !== deleting.id));
    pushToast('error', `"${deleting.title}" deleted`);
    setDeleting(null);
  };

  const handleSelectTagFromTagsView = (tag: string) => {
    setActiveTag(tag);
    setView('home');
  };

  return (
    <div className="app">
      <Sidebar
        linkCount={links.length}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        view={view}
        setView={setView}
      />

      <main className="main">
        <Topbar
          query={query}
          setQuery={setQuery}
          scope={scope}
          setScope={setScope}
          onMenuClick={() => setMobileMenuOpen(true)}
          onAddClick={openAdd}
          showSearch={view === 'home'}
        />

        {view === 'home' && (
          <section className="content">
            <div className="content__header">
              <div>
                <h1>Your Links</h1>
                <p className="muted">Save and organize the links you want to keep.</p>
              </div>
            </div>

            <div className="filters">
              <div className="filters__tags">
                {allTags.map((t) => (
                  <TagPill
                    key={t}
                    label={t}
                    active={activeTag === t}
                    onClick={() => setActiveTag(t)}
                  />
                ))}
              </div>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'recent' | 'oldest' | 'az')
                }
              >
                <option value="recent">Sort by: Recently added</option>
                <option value="oldest">Sort by: Oldest first</option>
                <option value="az">Sort by: A – Z</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                title={query ? 'No matches found' : 'No links yet'}
                message={
                  query
                    ? 'Try a different search term or clear the filters.'
                    : 'Click "+ New Link" to save your first bookmark.'
                }
              />
            ) : (
              <div className="link-grid">
                {filtered.map((l) => (
                  <LinkCard
                    key={l.id}
                    link={l}
                    onEdit={openEdit}
                    onDelete={setDeleting}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {view === 'tags' && (
          <TagsView links={links} onSelectTag={handleSelectTagFromTagsView} />
        )}

        {view === 'settings' && (
          <SettingsView links={links} setLinks={setLinks} pushToast={pushToast} />
        )}
      </main>

      {isPanelOpen && (
        <div className="panel-backdrop" onClick={closePanel}>
          <aside className="panel" onClick={(e) => e.stopPropagation()}>
            <header className="panel__header">
              <h2>{editing ? 'Edit Link' : 'Add New Link'}</h2>
              <button className="icon-btn" onClick={closePanel} aria-label="Close">
                ✕
              </button>
            </header>
            <LinkForm
              mode={editing ? 'edit' : 'add'}
              initialValue={editing ?? undefined}
              onSubmit={handleSubmit}
              onCancel={closePanel}
            />
          </aside>
        </div>
      )}

      {deleting && (
        <DeleteModal
          title={deleting.title}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}

      <div className="toast-stack">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            toast={t}
            onClose={(id) => setToasts((prev) => prev.filter((x) => x.id !== id))}
          />
        ))}
      </div>
    </div>
  );
}