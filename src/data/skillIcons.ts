import { SKILL_ICONS } from './skillIcons.generated';

export interface SkillIcon {
    svg: string;
    hex: string;
}

const cache = new Map<string, SkillIcon | null>();

export function getSkillIcon(skill: string): SkillIcon | null {
    if (cache.has(skill)) return cache.get(skill)!;

    const icon = SKILL_ICONS[skill];
    const result = icon ? { svg: icon.svg.replace('<svg ', `<svg fill="#${icon.hex}" `), hex: icon.hex } : null;

    cache.set(skill, result);
    return result;
}
