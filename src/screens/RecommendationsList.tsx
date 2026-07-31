import BackHeader from '../components/BackHeader';
import HighlightList from '../components/HighlightList';
import type { Recommendation } from '../types';

function initials(name: string): string {
    const parts = name.trim().split(/\s+/);
    return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
}

export default function RecommendationsList({ recommendations, onBack }: { recommendations: Recommendation[]; onBack: () => void }) {
    return (
        <div>
            <BackHeader title="Recommendations" onBack={onBack} />
            <p className="page-subtitle">In their own words — people Efe has worked with and for.</p>

            {recommendations.length === 0 && <p className="empty-state">No recommendations available right now — check back soon.</p>}

            {recommendations.map((rec) => (
                <div className="card" key={rec.name}>
                    <div className="quote-mark">❝</div>
                    <HighlightList text={rec.quote} />
                    <div className="rec-attribution" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div className="icon-badge">{initials(rec.name)}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="card-title" style={{ fontSize: 13 }}>{rec.name}</div>
                            <div className="card-body" style={{ marginTop: 2, textAlign: 'left' }}>{rec.title}</div>
                            <div className="card-meta" style={{ marginTop: 4 }}>{rec.relationship} · {rec.date}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
