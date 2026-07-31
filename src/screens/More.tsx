export type MoreView = 'menu' | 'blog' | 'recommendations' | 'contact';

const ITEMS: { view: MoreView; icon: string; label: string; hint: string }[] = [
    { view: 'blog', icon: '✎', label: 'Blog', hint: 'Write-ups on projects and lessons learned' },
    { view: 'recommendations', icon: '❝', label: 'Recommendations', hint: 'What managers and colleagues say' },
    { view: 'contact', icon: '✉', label: 'Contact', hint: 'Send a message or reach out directly' }
];

export default function More({ onNavigate }: { onNavigate: (view: MoreView) => void }) {
    return (
        <div>
            <h1 className="page-title">More</h1>
            <p className="page-subtitle">Blog posts, recommendations, and a direct line to Efe.</p>

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
