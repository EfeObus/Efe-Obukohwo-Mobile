import { useMemo, useState } from 'react';
import { Browser } from '@capacitor/browser';
import HighlightList from '../components/HighlightList';
import type { Project } from '../types';

const FILTER_TAGS = ['SQL', 'Python', 'Power BI', 'Tableau', 'Excel'];

const CATEGORY_ICON: Record<string, string> = {
    'data-analyst': '◈',
    developer: '‹/›',
    teacher: '✎'
};

function categoryIcon(project: Project): string {
    return CATEGORY_ICON[project.category[0]] ?? '▤';
}

function matchesFilter(project: Project, filter: string): boolean {
    const haystack = project.technologies.join(' ').toLowerCase();
    if (filter === 'Excel') return haystack.includes('excel');
    return haystack.includes(filter.toLowerCase());
}

export default function Projects({ projects }: { projects: Project[] }) {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [selected, setSelected] = useState<Project | null>(null);

    const filtered = useMemo(() => {
        if (!activeFilter) return projects;
        return projects.filter((p) => matchesFilter(p, activeFilter));
    }, [projects, activeFilter]);

    const openLink = (url: string) => Browser.open({ url });

    if (selected) {
        return (
            <div>
                <button className="back-btn" style={{ marginBottom: 14 }} onClick={() => setSelected(null)}>
                    ‹ <span>Back to Projects</span>
                </button>

                <div className="card">
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div className="icon-badge">{categoryIcon(selected)}</div>
                        <div>
                            <div className="card-title" style={{ fontSize: 17 }}>{selected.title}</div>
                            <div className="card-meta">{selected.date}</div>
                        </div>
                    </div>

                    <div className="chip-row">
                        {selected.technologies.map((t) => (
                            <span className="chip" key={t}>{t}</span>
                        ))}
                    </div>

                    {(selected.live || selected.github) && (
                        <div className="btn-row">
                            {selected.live && (
                                <button className="btn-primary" onClick={() => openLink(selected.live!)}>
                                    Live Demo
                                </button>
                            )}
                            {selected.github && (
                                <button className="btn-outline" onClick={() => openLink(selected.github!)}>
                                    GitHub
                                </button>
                            )}
                        </div>
                    )}
                    {selected.caseStudy && (
                        <button
                            className="btn-outline"
                            style={{ marginTop: selected.live || selected.github ? 10 : 0 }}
                            onClick={() => openLink(`https://efeobus.github.io/Efe-Obukohwo/${selected.caseStudy}`)}
                        >
                            Read Full Case Study
                        </button>
                    )}
                </div>

                <div className="section-label">Project Breakdown</div>
                <HighlightList text={selected.description} />
            </div>
        );
    }

    return (
        <div>
            <h1 className="page-title">Projects</h1>
            <p className="page-subtitle">{projects.length} shipped projects — filter by tool, tap for the full breakdown.</p>

            <div className="filter-scroll">
                <button
                    className={`chip-btn${activeFilter === null ? ' active' : ''}`}
                    onClick={() => setActiveFilter(null)}
                >
                    All
                </button>
                {FILTER_TAGS.map((tag) => (
                    <button
                        key={tag}
                        className={`chip-btn${activeFilter === tag ? ' active' : ''}`}
                        onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {filtered.map((project) => (
                <button
                    key={project.title}
                    className="card"
                    style={{ width: '100%', textAlign: 'left', border: 'none' }}
                    onClick={() => setSelected(project)}
                >
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div className="icon-badge">{categoryIcon(project)}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="card-title">{project.title}</div>
                            <div className="card-meta">{project.date}</div>
                        </div>
                    </div>
                    <p className="card-body">{project.shortDescription}</p>
                    <div className="chip-row">
                        {project.technologies.slice(0, 4).map((t) => (
                            <span className="chip" key={t}>{t}</span>
                        ))}
                    </div>
                </button>
            ))}
        </div>
    );
}
