export function splitSentences(text: string): string[] {
    return text
        .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
        .map((s) => s.trim())
        .filter(Boolean);
}
