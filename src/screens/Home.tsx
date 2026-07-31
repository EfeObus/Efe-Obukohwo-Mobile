import type { PortfolioData } from '../types';
import { openExternal } from '../utils/links';
import { splitSentences } from '../utils/text';
import logo from '../assets/logo.png';

const HIGHLIGHT_META = [
    { icon: '▲', title: 'Data & Business Impact' },
    { icon: '◈', title: 'Analytics & BI Expertise' },
    { icon: '◎', title: 'End-to-End Ownership' }
];

export default function Home({
    data,
    onGoResume,
    onGoContact
}: {
    data: PortfolioData;
    onGoResume: () => void;
    onGoContact: () => void;
}) {
    const { personal, projects, experience, certifications, skills } = data;
    const topSkills = skills['Data Analysis & Visualization'] ?? Object.values(skills)[0] ?? [];
    const [tagline, ...rest] = splitSentences(personal.dataAnalystSummary);
    const highlights = rest.slice(0, HIGHLIGHT_META.length);

    const stats = [
        { icon: '▤', num: projects.length, label: 'Projects' },
        { icon: '◫', num: experience.length, label: 'Roles Held' },
        { icon: '❖', num: certifications.length, label: 'Certifications' },
        { icon: '◷', num: '5+', label: 'Years Exp.' }
    ];

    const actions = [
        { icon: 'in', label: 'LinkedIn', url: `https://${personal.linkedin}` },
        { icon: '‹/›', label: 'GitHub', url: `https://${personal.github}` }
    ];

    return (
        <div>
            <div className="hero-card">
                <img className="hero-logo" src={logo} alt="Efe Obukohwo logo" />
                <h1 className="hero-name">{personal.name}</h1>
                <p className="hero-title">{personal.dataAnalystTitle}</p>
                <p className="hero-tagline">{tagline}</p>

                <div className="btn-row">
                    <button className="btn-primary" onClick={onGoResume}>
                        Download Resume
                    </button>
                    <button className="btn-outline" onClick={onGoContact}>
                        Contact Me
                    </button>
                </div>

                <div className="status-badge">
                    <span className="dot" />
                    Open to Opportunities — Toronto, ON | Remote
                </div>
            </div>

            <div className="stat-row">
                {stats.map((s) => (
                    <div className="stat-box" key={s.label}>
                        <div className="icon-badge">{s.icon}</div>
                        <div className="num">{s.num}</div>
                        <div className="label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="section-label">Highlights</div>
            {highlights.map((text, i) => (
                <div className="highlight-row" key={HIGHLIGHT_META[i].title}>
                    <div className="icon-badge">{HIGHLIGHT_META[i].icon}</div>
                    <div className="highlight-row-text">
                        <div className="highlight-row-title">{HIGHLIGHT_META[i].title}</div>
                        <p className="highlight-row-desc">{text}</p>
                    </div>
                </div>
            ))}

            {topSkills.length > 0 && (
                <>
                    <div className="section-label">Core Skills</div>
                    <div className="filter-scroll">
                        {topSkills.map((skill) => (
                            <span className="chip" key={skill}>{skill}</span>
                        ))}
                    </div>
                </>
            )}

            <div className="section-label">Connect</div>
            <div className="action-grid">
                {actions.map((action) => (
                    <button className="action-tile" key={action.label} onClick={() => openExternal(action.url)}>
                        <span className="action-tile-icon">{action.icon}</span>
                        <span className="action-tile-label">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
