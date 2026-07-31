import { useEffect, useState } from 'react';
import './App.css';
import avatar from './assets/avatar.jpg';
import TabBar, { type TabKey } from './components/TabBar';
import Home from './screens/Home';
import Projects from './screens/Projects';
import Resume from './screens/Resume';
import InterviewPrep from './screens/InterviewPrep';
import More, { type MoreView } from './screens/More';
import BlogList from './screens/BlogList';
import RecommendationsList from './screens/RecommendationsList';
import Contact from './screens/Contact';
import { loadPortfolioData, type LoadResult } from './data/fetchPortfolioData';

function App() {
    const [tab, setTab] = useState<TabKey>('home');
    const [moreView, setMoreView] = useState<MoreView>('menu');
    const [result, setResult] = useState<LoadResult | null>(null);

    useEffect(() => {
        loadPortfolioData().then(setResult);
    }, []);

    const changeTab = (next: TabKey) => {
        if (next === 'more') setMoreView('menu');
        setTab(next);
    };

    if (!result) {
        return (
            <div className="app-shell">
                <div className="loading-screen">Loading portfolio…</div>
            </div>
        );
    }

    const { data } = result;

    return (
        <div className="app-shell">
            <header className="app-header">
                <img className="app-header-avatar" src={avatar} alt="Efe Obukohwo" />
                <div className="app-header-text">
                    <div className="brand">Efe Obukohwo</div>
                    <div className="brand-sub">Portfolio</div>
                </div>
            </header>

            <main className="app-content">
                {tab === 'home' && <Home data={data} />}
                {tab === 'projects' && <Projects projects={data.projects} />}
                {tab === 'resume' && <Resume />}
                {tab === 'prep' && <InterviewPrep />}
                {tab === 'more' && moreView === 'menu' && <More onNavigate={setMoreView} />}
                {tab === 'more' && moreView === 'blog' && <BlogList posts={data.blog} onBack={() => setMoreView('menu')} />}
                {tab === 'more' && moreView === 'recommendations' && (
                    <RecommendationsList recommendations={data.recommendations} onBack={() => setMoreView('menu')} />
                )}
                {tab === 'more' && moreView === 'contact' && <Contact personal={data.personal} onBack={() => setMoreView('menu')} />}
            </main>

            <TabBar active={tab} onChange={changeTab} />
        </div>
    );
}

export default App;
