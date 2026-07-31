import { Browser } from '@capacitor/browser';

export function openExternal(url: string) {
    if (url.startsWith('mailto:') || url.startsWith('tel:')) {
        window.location.href = url;
        return;
    }
    Browser.open({ url });
}
