import { Fragment, useState } from 'react';
import BackHeader from '../components/BackHeader';
import SkillChip from '../components/SkillChip';
import type { RoleTrack } from '../types';

const ROLES: { key: RoleTrack; label: string }[] = [
    { key: 'dataAnalyst', label: 'Data Analyst' },
    { key: 'developer', label: 'Developer' },
    { key: 'teacher', label: 'Teacher' }
];

const TRACK_CATEGORIES: Record<RoleTrack, string[]> = {
    dataAnalyst: ['Data Analysis & Visualization', 'Machine Learning & AI', 'Databases & ORMs'],
    developer: ['Programming Languages', 'Frontend Technologies', 'Backend & APIs', 'Mobile Development', 'Cloud & DevOps', 'Databases & ORMs'],
    teacher: ['Teaching & Education', 'Programming Languages']
};

export default function Skills({ skills, onBack }: { skills: Record<string, string[]>; onBack: () => void }) {
    const [role, setRole] = useState<RoleTrack>('dataAnalyst');
    const categories = TRACK_CATEGORIES[role].filter((cat) => skills[cat]?.length);

    return (
        <div>
            <BackHeader title="Skills" onBack={onBack} />
            <p className="page-subtitle">The full toolkit, grouped by the role it's most relevant to.</p>

            <div className="segmented">
                {ROLES.map((r) => (
                    <button
                        key={r.key}
                        className={`segmented-btn${role === r.key ? ' active' : ''}`}
                        onClick={() => setRole(r.key)}
                    >
                        {r.label}
                    </button>
                ))}
            </div>

            {categories.map((cat) => (
                <Fragment key={cat}>
                    <div className="section-label">{cat}</div>
                    <div className="chip-row">
                        {skills[cat].map((skill) => (
                            <SkillChip skill={skill} key={skill} />
                        ))}
                    </div>
                </Fragment>
            ))}
        </div>
    );
}
