import { getSkillIcon } from '../data/skillIcons';

export default function SkillGrid({ skills }: { skills: string[] }) {
    return (
        <div className="skill-grid">
            {skills.map((skill) => {
                const icon = getSkillIcon(skill);
                return (
                    <div className="skill-grid-item" key={skill}>
                        <span className="skill-chip-icon">
                            {icon && <span dangerouslySetInnerHTML={{ __html: icon.svg }} />}
                        </span>
                        <span>{skill}</span>
                    </div>
                );
            })}
        </div>
    );
}
