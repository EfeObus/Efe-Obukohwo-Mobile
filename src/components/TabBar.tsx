export type TabKey = 'home' | 'projects' | 'resume' | 'prep' | 'more';

const TABS: { key: TabKey; label: string; icon: string }[] = [
    { key: 'home', label: 'Home', icon: '⌂' },
    { key: 'projects', label: 'Projects', icon: '▤' },
    { key: 'resume', label: 'Resume', icon: '⎘' },
    { key: 'prep', label: 'Prep', icon: '★' },
    { key: 'more', label: 'More', icon: '⋯' }
];

export default function TabBar({ active, onChange }: { active: TabKey; onChange: (tab: TabKey) => void }) {
    return (
        <nav className="tab-bar">
            {TABS.map((tab) => (
                <button
                    key={tab.key}
                    className={`tab-bar-btn${active === tab.key ? ' active' : ''}`}
                    onClick={() => onChange(tab.key)}
                >
                    <span className="icon">{tab.icon}</span>
                    <span>{tab.label}</span>
                </button>
            ))}
        </nav>
    );
}
