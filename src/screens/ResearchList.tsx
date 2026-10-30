import { useState } from 'react';
import { Browser } from '@capacitor/browser';
import BackHeader from '../components/BackHeader';
import type { ResearchItem, ResearchType } from '../types';

const SITE_BASE = 'https://efeobus.github.io/Efe-Obukohwo/';

const TYPES: { key: ResearchType; label: string; empty: string }[] = [
    { key: 'article', label: 'Articles', empty: 'Articles will appear here soon.' },
    { key: 'issue', label: 'Journal Issues', empty: 'Journal issues will appear here soon.' },
    { key: 'thesis', label: 'Thesis', empty: 'Thesis work will appear here soon.' }
];

// Only http(s) links open; relative paths are site pages.
function resolve(link: string): string | null {
    if (/^https?:\/\//i.test(link)) return link;
    if (/^10\./.test(link)) return `https://doi.org/${link}`;
    if (/^[a-z][a-z0-9+.-]*:/i.test(link)) return null;
    return SITE_BASE + link.replace(/^\/+/, '');
}

function citation(item: ResearchItem): string | null {
    const j = item.journal;
    if (!j?.name) return item.venue ?? null;
    return `${j.name}${j.volume ? `, ${j.volume}` : ''}${j.issue ? `(${j.issue})` : ''}${j.pages ? `, ${j.pages}` : ''}`;
}

export default function ResearchList({ items, onBack }: { items: ResearchItem[]; onBack: () => void }) {
    const [type, setType] = useState<ResearchType>('article');
    const current = TYPES.find((t) => t.key === type)!;
    const shown = items.filter((item) => item.type === type);

    return (
        <div>
            <BackHeader title="Research Work" onBack={onBack} />
            <p className="page-subtitle">Articles, journal issues I've contributed to, and thesis work.</p>

            <div className="segmented">
                {TYPES.map((t) => (
                    <button key={t.key} className={`segmented-btn${type === t.key ? ' active' : ''}`} onClick={() => setType(t.key)}>
                        {t.label}
                    </button>
                ))}
            </div>

            {shown.length === 0 && <p className="empty-state">{current.empty}</p>}

            {shown.map((item) => {
                const primary = item.page ?? item.links?.url ?? item.links?.doi ?? item.links?.pdf;
                const url = primary ? resolve(primary) : null;
                const cite = citation(item);
                const meta = [item.date, item.readTime, item.status, item.role].filter(Boolean).join(' · ');
                return (
                    <button
                        key={item.title}
                        className="card blog-card-btn"
                        disabled={!url}
                        onClick={() => url && Browser.open({ url })}
                    >
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <div className="icon-badge">§</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div className="card-meta">{meta}</div>
                                <div className="card-title" style={{ marginTop: 4 }}>{item.title}</div>
                                {cite && <div className="card-meta" style={{ marginTop: 4 }}>{cite}</div>}
                            </div>
                        </div>
                        {item.abstract && <p className="card-body">{item.abstract}</p>}
                        {item.tags && item.tags.length > 0 && (
                            <div className="chip-row">
                                {item.tags.map((tag) => (
                                    <span className="chip" key={tag}>{tag}</span>
                                ))}
                            </div>
                        )}
                        {url && <div className="read-more-link">{item.type === 'thesis' ? 'Read Thesis' : 'Read'} ›</div>}
                    </button>
                );
            })}
        </div>
    );
}
