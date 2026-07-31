import { splitSentences } from '../utils/text';

export default function HighlightList({ text }: { text: string }) {
    return (
        <div className="highlight-card-group">
            {splitSentences(text).map((sentence, i) => (
                <div className="highlight-card" key={i}>
                    <p>{sentence}</p>
                </div>
            ))}
        </div>
    );
}
