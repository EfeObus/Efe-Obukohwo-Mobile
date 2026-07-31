import { useState } from 'react';
import { interviewPrepData } from '../data/interviewPrepData';
import HighlightList from '../components/HighlightList';
import type { RoleTrack } from '../types';

const ROLES: RoleTrack[] = ['dataAnalyst', 'developer', 'teacher'];

export default function InterviewPrep() {
    const [role, setRole] = useState<RoleTrack>('dataAnalyst');
    const content = interviewPrepData[role];

    return (
        <div>
            <h1 className="page-title">Interview Prep</h1>
            <p className="page-subtitle">Project flashcards, STAR stories, and concept refreshers — pick the track for the role you're prepping for.</p>

            <div className="segmented">
                {ROLES.map((r) => (
                    <button
                        key={r}
                        className={`segmented-btn${role === r ? ' active' : ''}`}
                        onClick={() => setRole(r)}
                    >
                        {interviewPrepData[r].label}
                    </button>
                ))}
            </div>

            <div className="section-label">Project Flashcards</div>
            {content.flashcards.map((card) => (
                <div className="card" key={card.project}>
                    <div className="card-title">{card.project}</div>
                    <div className="card-meta">{card.headline}</div>
                    <HighlightList text={card.detail} />
                </div>
            ))}

            <div className="section-label">STAR Story Bank</div>
            {content.starStories.map((story) => (
                <div className="card" key={story.prompt}>
                    <div className="card-title">{story.prompt}</div>
                    <div className="star-block">
                        <div className="star-label">Situation</div>
                        <p className="star-text">{story.situation}</p>
                        <div className="star-label">Task</div>
                        <p className="star-text">{story.task}</p>
                        <div className="star-label">Action</div>
                        <p className="star-text">{story.action}</p>
                        <div className="star-label">Result</div>
                        <p className="star-text" style={{ marginBottom: 0 }}>{story.result}</p>
                    </div>
                </div>
            ))}

            <div className="section-label">Concept Refreshers</div>
            {content.conceptRefreshers.map((item) => (
                <div className="card" key={item.topic}>
                    <div className="card-title">{item.topic}</div>
                    <HighlightList text={item.notes} />
                </div>
            ))}
        </div>
    );
}
