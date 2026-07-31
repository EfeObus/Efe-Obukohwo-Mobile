import { useState } from 'react';
import BackHeader from '../components/BackHeader';
import { openExternal } from '../utils/links';
import type { Personal } from '../types';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myzplezy';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact({ personal, onBack }: { personal: Personal; onBack: () => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<Status>('idle');

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            if (!res.ok) throw new Error('Request failed');
            setStatus('sent');
            setName('');
            setEmail('');
            setMessage('');
        } catch {
            setStatus('error');
        }
    };

    return (
        <div>
            <BackHeader title="Contact" onBack={onBack} />
            <p className="page-subtitle">Reach out directly, or send a message below.</p>

            <div className="card">
                <button className="menu-row menu-row-flush" onClick={() => openExternal(`mailto:${personal.email}`)}>
                    <span className="menu-row-icon">✉</span>
                    <span className="menu-row-text">
                        <span className="menu-row-label">Email</span>
                        <span className="menu-row-hint">{personal.email}</span>
                    </span>
                </button>
                <button className="menu-row menu-row-flush" onClick={() => openExternal(`tel:${personal.phone}`)}>
                    <span className="menu-row-icon">☎</span>
                    <span className="menu-row-text">
                        <span className="menu-row-label">Phone</span>
                        <span className="menu-row-hint">{personal.phone}</span>
                    </span>
                </button>
                <div className="menu-row menu-row-flush menu-row-static">
                    <span className="menu-row-icon">⌖</span>
                    <span className="menu-row-text">
                        <span className="menu-row-label">Location</span>
                        <span className="menu-row-hint">{personal.location}</span>
                    </span>
                </div>
            </div>

            <div className="section-label">Send a Message</div>
            <form className="card" onSubmit={submit}>
                <label className="form-label" htmlFor="contact-name">Name</label>
                <input
                    id="contact-name"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label className="form-label" htmlFor="contact-email">Email</label>
                <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                    id="contact-message"
                    className="form-input form-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    required
                />

                <button className="btn-primary" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>

                {status === 'sent' && <p className="form-status success">Message sent — thanks for reaching out.</p>}
                {status === 'error' && <p className="form-status error">Something went wrong. Try emailing directly instead.</p>}
            </form>
        </div>
    );
}
