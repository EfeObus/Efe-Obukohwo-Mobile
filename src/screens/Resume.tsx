import { useState } from 'react';
import { FileOpener } from '@capacitor-community/file-opener';
import { getOrDownloadResume } from '../data/resumeCache';

const RESUMES = [
    { label: 'Data Analyst Resume', hint: 'SQL, Excel, Power BI, Tableau', icon: '◈', filename: 'Efe_Obukohwo_Resume_DataAnalyst.pdf' },
    { label: 'Developer Resume', hint: 'React, Node.js, Flask, PostgreSQL', icon: '‹/›', filename: 'Efe_Obukohwo_Resume_Developer.pdf' },
    { label: 'Teacher Resume', hint: 'Computer Science, Data Processing', icon: '✎', filename: 'Efe_Obukohwo_Resume_Teacher.pdf' },
    { label: 'General Resume', hint: 'Full cross-role overview', icon: '▤', filename: 'Efe_Obukohwo_Resume.pdf' }
];

export default function Resume() {
    const [busy, setBusy] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const open = async (filename: string) => {
        setError(null);
        setBusy(filename);
        try {
            const uri = await getOrDownloadResume(filename);
            await FileOpener.open({ filePath: uri, contentType: 'application/pdf' });
        } catch (err) {
            setError(`Couldn't open ${filename}. Check your connection and try again.`);
            console.error(err);
        } finally {
            setBusy(null);
        }
    };

    return (
        <div>
            <h1 className="page-title">Resume</h1>
            <p className="page-subtitle">
                Downloads once, then works offline — each resume is cached on this device after the first open.
            </p>

            {error && (
                <div className="card" style={{ borderColor: '#ff8a65' }}>
                    <p className="card-body" style={{ marginTop: 0, color: '#ff8a65' }}>{error}</p>
                </div>
            )}

            {RESUMES.map((resume) => (
                <div className="card" key={resume.filename}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div className="icon-badge">{resume.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="card-title">{resume.label}</div>
                            <div className="card-meta">{resume.hint}</div>
                        </div>
                    </div>
                    <button className="btn-primary" disabled={busy === resume.filename} onClick={() => open(resume.filename)}>
                        {busy === resume.filename ? 'Opening…' : 'View / Download PDF'}
                    </button>
                </div>
            ))}
        </div>
    );
}
