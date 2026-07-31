import { Browser } from '@capacitor/browser';
import BackHeader from '../components/BackHeader';
import type { BlogPost } from '../types';

const SITE_BASE = 'https://efeobus.github.io/Efe-Obukohwo/';

export default function BlogList({ posts, onBack }: { posts: BlogPost[]; onBack: () => void }) {
    return (
        <div>
            <BackHeader title="Blog" onBack={onBack} />
            <p className="page-subtitle">Write-ups on the projects behind the resume — what broke, what I learned, how I fixed it.</p>

            {posts.length === 0 && <p className="empty-state">No posts available right now — check back soon.</p>}

            {posts.map((post) => (
                <button key={post.url} className="card blog-card-btn" onClick={() => Browser.open({ url: SITE_BASE + post.url })}>
                    <div className="card-meta">{post.date} · {post.readTime}</div>
                    <div className="card-title" style={{ marginTop: 4 }}>{post.title}</div>
                    <p className="card-body">{post.excerpt}</p>
                    <div className="chip-row">
                        {post.tags.map((tag) => (
                            <span className="chip" key={tag}>{tag}</span>
                        ))}
                    </div>
                    <div className="read-more-link">Read Article ›</div>
                </button>
            ))}
        </div>
    );
}
