import { Preferences } from '@capacitor/preferences';
import type { PortfolioData } from '../types';
import seedData from './portfolio-data.seed.json';

const DATA_URL = 'https://efeobus.github.io/Efe-Obukohwo/portfolio-data.json';
const CACHE_KEY = 'portfolioData';
const CACHE_TIMESTAMP_KEY = 'portfolioDataFetchedAt';
const FETCH_TIMEOUT_MS = 8000;

export interface LoadResult {
    data: PortfolioData;
    source: 'live' | 'cache' | 'seed';
    fetchedAt: string | null;
}

function normalize(data: PortfolioData): PortfolioData {
    return { ...data, blog: data.blog ?? [], recommendations: data.recommendations ?? [] };
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { signal: controller.signal, cache: 'no-store' });
    } finally {
        clearTimeout(timer);
    }
}

async function readCache(): Promise<{ data: PortfolioData; fetchedAt: string } | null> {
    const [{ value: rawData }, { value: fetchedAt }] = await Promise.all([
        Preferences.get({ key: CACHE_KEY }),
        Preferences.get({ key: CACHE_TIMESTAMP_KEY })
    ]);
    if (!rawData) return null;
    try {
        return { data: JSON.parse(rawData) as PortfolioData, fetchedAt: fetchedAt ?? '' };
    } catch {
        return null;
    }
}

async function writeCache(data: PortfolioData): Promise<string> {
    const fetchedAt = new Date().toISOString();
    await Promise.all([
        Preferences.set({ key: CACHE_KEY, value: JSON.stringify(data) }),
        Preferences.set({ key: CACHE_TIMESTAMP_KEY, value: fetchedAt })
    ]);
    return fetchedAt;
}

/**
 * Live-fetches the portfolio data from the deployed website, falling back to
 * the last successfully cached copy, and finally to the bundled seed
 * snapshot if neither is available (e.g. first launch, fully offline).
 */
export async function loadPortfolioData(): Promise<LoadResult> {
    try {
        const response = await fetchWithTimeout(DATA_URL, FETCH_TIMEOUT_MS);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = normalize((await response.json()) as PortfolioData);
        const fetchedAt = await writeCache(data);
        return { data, source: 'live', fetchedAt };
    } catch {
        const cached = await readCache();
        if (cached) {
            return { data: normalize(cached.data), source: 'cache', fetchedAt: cached.fetchedAt };
        }
        return { data: normalize(seedData as PortfolioData), source: 'seed', fetchedAt: null };
    }
}
