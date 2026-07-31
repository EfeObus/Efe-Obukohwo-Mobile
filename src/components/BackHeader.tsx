export default function BackHeader({ title, onBack }: { title: string; onBack: () => void }) {
    return (
        <div className="back-header">
            <button className="back-btn" onClick={onBack} aria-label="Back">
                ‹ <span>Back</span>
            </button>
            <h1 className="page-title back-header-title">{title}</h1>
        </div>
    );
}
