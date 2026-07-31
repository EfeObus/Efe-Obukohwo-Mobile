import { Filesystem, Directory } from '@capacitor/filesystem';

const BASE_URL = 'https://efeobus.github.io/Efe-Obukohwo/documents/';

function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1] ?? '');
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * Returns a local, offline-readable URI for a resume PDF hosted on the
 * website, downloading and caching it on first access.
 */
export async function getOrDownloadResume(filename: string): Promise<string> {
    try {
        // stat() throws when the file is missing; getUri() does not — it only
        // resolves the path a file *would* have, cached or not.
        await Filesystem.stat({ directory: Directory.Data, path: filename });
        const existing = await Filesystem.getUri({ directory: Directory.Data, path: filename });
        return existing.uri;
    } catch {
        // Not cached yet — fall through to download.
    }

    const response = await fetch(`${BASE_URL}${encodeURIComponent(filename)}`);
    if (!response.ok) throw new Error(`Failed to download ${filename}: HTTP ${response.status}`);
    const base64Data = await blobToBase64(await response.blob());

    await Filesystem.writeFile({
        directory: Directory.Data,
        path: filename,
        data: base64Data
    });

    const written = await Filesystem.getUri({ directory: Directory.Data, path: filename });
    return written.uri;
}
