import { type ChangeEvent, useRef } from 'react';
import type { LinkItem, ToastType } from '../types/Link';

interface SettingsViewProps {
  links: LinkItem[];
  setLinks: React.Dispatch<React.SetStateAction<LinkItem[]>>;
  pushToast: (type: ToastType, message: string) => void;
}

export default function SettingsView({ links, setLinks, pushToast }: SettingsViewProps) {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (links.length === 0) {
      pushToast('info', 'There is nothing to export yet.');
      return;
    }
    const blob = new Blob([JSON.stringify(links, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `links-vault-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    pushToast('success', 'Links exported successfully.');
  };

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(String(ev.target?.result));
        if (!Array.isArray(parsed)) throw new Error('Not an array');
        const merged = [...parsed, ...links].reduce<LinkItem[]>((acc, item) => {
          if (item && item.id && !acc.some((l) => l.id === item.id)) acc.push(item);
          return acc;
        }, []);
        setLinks(merged);
        pushToast('success', `${parsed.length} link(s) imported.`);
      } catch {
        pushToast('error', 'Invalid file. Expected a Links Vault export.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClear = () => {
    if (links.length === 0) return;
    if (window.confirm(`Delete all ${links.length} link(s)? This cannot be undone.`)) {
      setLinks([]);
      pushToast('error', 'All links deleted.');
    }
  };

  const bytes = new Blob([JSON.stringify(links)]).size;
  const kb = (bytes / 1024).toFixed(1);

  return (
    <section className="content">
      <div className="content__header">
        <div>
          <h1>Settings</h1>
          <p className="muted">Manage your local data.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>Storage</h3>
          <p className="muted">{links.length} link(s) stored in your browser.</p>
          <div className="settings-bar">
            <div
              className="settings-bar__fill"
              style={{ width: `${Math.min((bytes / (5 * 1024 * 1024)) * 100, 100)}%` }}
            />
          </div>
          <p className="settings-meta">{kb} KB used (localStorage limit ~5 MB)</p>
        </div>

        <div className="settings-card">
          <h3>Export</h3>
          <p className="muted">Download all your links as a JSON file.</p>
          <button className="btn btn--primary" onClick={handleExport}>
            ⬇ Export links
          </button>
        </div>

        <div className="settings-card">
          <h3>Import</h3>
          <p className="muted">Merge links from a previous export.</p>
          <button className="btn btn--ghost" onClick={() => fileInput.current?.click()}>
            ⬆ Choose file
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </div>

        <div className="settings-card settings-card--danger">
          <h3>Danger zone</h3>
          <p className="muted">Permanently remove every link from this device.</p>
          <button className="btn btn--danger" onClick={handleClear}>
            🗑 Clear all links
          </button>
        </div>
      </div>
    </section>
  );
}