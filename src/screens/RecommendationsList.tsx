import BackHeader from '../components/BackHeader';
import HighlightList from '../components/HighlightList';
import type { Recommendation } from '../types';

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
                    <div className="rec-attribution">
                        <div className="card-title" style={{ fontSize: 13 }}>{rec.name}</div>
                        <div className="card-body" style={{ marginTop: 2 }}>{rec.title}</div>
                        <div className="card-meta" style={{ marginTop: 4 }}>{rec.relationship} · {rec.date}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
