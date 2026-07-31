import { getSkillIcon } from '../data/skillIcons';

export default function SkillChip({ skill }: { skill: string }) {
    const icon = getSkillIcon(skill);

    return (
        <span className="chip skill-chip">
            {icon && <span className="skill-chip-icon" dangerouslySetInnerHTML={{ __html: icon.svg }} />}
            {skill}
        </span>
    );
}
