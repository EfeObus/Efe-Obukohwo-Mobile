import type { PortfolioData } from '../types';
import { openExternal } from '../utils/links';
import HighlightList from '../components/HighlightList';
import logo from '../assets/logo.png';

export default function Home({ data }: { data: PortfolioData }) {
    const { personal, projects, experience, certifications, skills } = data;
    const topSkills = skills['Data Analysis & Visualization'] ?? Object.values(skills)[0] ?? [];

    const actions = [
        { icon: '↗', label: 'Portfolio Site', url: `https://${personal.portfolio}` },
        { icon: 'in', label: 'LinkedIn', url: `https://${personal.linkedin}` },
        { icon: '‹/›', label: 'GitHub', url: `https://${personal.github}` },
        { icon: '✉', label: 'Email', url: `mailto:${personal.email}` }
    ];

    return (
        <div>
            <div className="hero">
                <img className="hero-logo" src={logo} alt="Efe Obukohwo logo" />
                <h1 className="hero-name">{personal.name}</h1>
                <p className="hero-title">{personal.title}</p>
            </div>

            <HighlightList text={personal.summary} />

            <div className="stat-row">
                <div className="stat-box">
                    <div className="num">{projects.length}</div>
                    <div className="label">Projects</div>
                </div>
                <div className="stat-box">
                    <div className="num">{experience.length}</div>
                    <div className="label">Roles Held</div>
                </div>
                <div className="stat-box">
                    <div className="num">{certifications.length}</div>
                    <div className="label">Certifications</div>
                </div>
            </div>

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
