export type MoreView = 'menu' | 'research' | 'blog' | 'recommendations' | 'skills' | 'contact';

const ITEMS: { view: MoreView; icon: string; label: string; hint: string }[] = [
    { view: 'research', icon: '§', label: 'Research Work', hint: 'Articles, journal issues and thesis' },
    { view: 'blog', icon: '✎', label: 'Blog', hint: 'Write-ups on projects and lessons learned' },
    { view: 'recommendations', icon: '❝', label: 'Recommendations', hint: 'What managers and colleagues say' },
    { view: 'skills', icon: '◈', label: 'Skills', hint: 'Full toolkit, grouped by role' },
    { view: 'contact', icon: '✉', label: 'Contact', hint: 'Send a message or reach out directly' }
];

export default function More({ onNavigate }: { onNavigate: (view: MoreView) => void }) {
    return (
        <div>
            <h1 className="page-title">More</h1>
            <p className="page-subtitle">Research, blog posts, recommendations, skills, and a direct line to Efe.</p>

            {ITEMS.map((item) => (
                <button key={item.view} className="menu-row" onClick={() => onNavigate(item.view)}>
                    <span className="menu-row-icon">{item.icon}</span>
                    <span className="menu-row-text">
                        <span className="menu-row-label">{item.label}</span>
                        <span className="menu-row-hint">{item.hint}</span>
                    </span>
                    <span className="menu-row-chevron">›</span>
                </button>
            ))}
        </div>
    );
}
