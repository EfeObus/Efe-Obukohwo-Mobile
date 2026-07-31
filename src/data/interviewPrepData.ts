// Bundled Interview Prep content — ships inside the app (not fetched live),
// since it's app-only material with no reason to live on the public site.
//
// IMPORTANT: every fact/number here is pulled directly from the real
// portfolio-data.js content already published on the site. This is a
// first-pass draft and should be reviewed for accuracy/tone before shipping,
// same as every other content change made this session.

export interface ProjectFlashcard {
    project: string;
    headline: string;
    detail: string;
}

export interface StarStory {
    prompt: string;
    situation: string;
    task: string;
    action: string;
    result: string;
}

export interface RolePrepContent {
    label: string;
    flashcards: ProjectFlashcard[];
    starStories: StarStory[];
    conceptRefreshers: { topic: string; notes: string }[];
}

export const interviewPrepData: Record<'dataAnalyst' | 'developer' | 'teacher', RolePrepContent> = {
    dataAnalyst: {
        label: 'Data Analyst',
        flashcards: [
            {
                project: 'GDHO Dataset Analysis',
                headline: '0.796 held-out R² · 6,780x NGO-to-UN budget gap',
                detail: 'LightGBM budget estimator on 125,125 org-year rows, evaluated with an organization-grouped (not row-level) train/test split. Explicitly audited how much of the model\'s accuracy is really just re-deriving GDHO\'s own imputation formula.'
            },
            {
                project: 'Northwind Traders Tableau Analysis',
                headline: '$1.35M revenue · 25.6% customer concentration',
                detail: 'Executive Tableau dashboard across 21 countries, joining 7 relational tables directly with Top N / Start Date / End Date parameters driving every worksheet.'
            },
            {
                project: 'Nashville Housing Market Analysis',
                headline: '$18.50B verified market value · 56,636 raw records',
                detail: 'Advanced Excel formula engine (VLOOKUP/XLOOKUP/SUMPRODUCT) plus 9 pivot tables. De-duplicated 168 exact-duplicate sales records and defensively routed 30,619 unvalued records as "N/A" instead of zero.'
            },
            {
                project: 'Online Retail SQL Analysis',
                headline: '30 production SQL queries · 500K+ transactions',
                detail: 'Normalized PostgreSQL schema, window functions/CTEs for RFM segmentation and cohort analysis — then self-audited the query outputs and found a CURRENT_DATE bug silently mislabeling 100% of customers as "Inactive."'
            },
            {
                project: 'Superstore Sales Analysis',
                headline: '18.7% loss-making orders · Prophet 20.7% MAPE',
                detail: 'Found discount rate correlates with margin at -0.86. Compared Prophet vs. SARIMA on a genuine 6-month holdout before trusting either with a 12-month forecast.'
            }
        ],
        starStories: [
            {
                prompt: 'Tell me about a time you found a data quality issue others missed.',
                situation: 'Auditing the Online Retail SQL Analysis query outputs rather than just trusting the results.',
                task: 'Verify the analysis was actually correct, not just plausible-looking.',
                action: 'Found a CURRENT_DATE-based query that silently mislabeled 100% of customers as "Inactive," and a cohort query that only ever returned month zero.',
                result: 'Documented both as findings in their own right — the kind of self-auditing that separates production analysis from a one-off script.'
            },
            {
                prompt: 'Tell me about presenting technical findings to a non-technical audience.',
                situation: 'The GDHO analysis had a real risk of being read as more authoritative than the underlying data supported.',
                task: 'Make the sector-level findings usable for donors and coordination bodies without misrepresenting confidence.',
                action: 'Wrote a separate plain-language business report translating the technical insights (imputation limitations, budget concentration) into what they mean and what to do about them.',
                result: 'Stakeholders get an honest, actionable read instead of a spreadsheet dump.'
            },
            {
                prompt: 'Tell me about a time you improved an operational process.',
                situation: 'Data-integrity issues in the GDHO Airtable and database at Humanitarian Outcomes.',
                task: 'Fix the underlying issues, not just patch symptoms.',
                action: 'Resolved the integrity issues and redesigned optimized schemas with the team lead.',
                result: '25% increase in operational efficiency.'
            },
            {
                prompt: 'Tell me about working with messy or incomplete data.',
                situation: 'The Nashville Housing dataset had 30,619 records with no reported value.',
                task: 'Avoid corrupting downstream market-tier analysis by mishandling the gaps.',
                action: 'Built defensive null-value routing that explicitly flagged these as "N/A" instead of coercing them to zero.',
                result: 'Prevented a structural skew that would have misrepresented low-value market tiers.'
            }
        ],
        conceptRefreshers: [
            { topic: 'SQL window functions & CTEs', notes: 'RANK, LAG, SUM OVER, NTILE, PERCENTILE_CONT — used for RFM segmentation and cohort retention on the Online Retail project.' },
            { topic: 'Excel formula engine', notes: 'VLOOKUP/XLOOKUP for retrieval, SUMIFS/COUNTIFS/AVERAGEIFS for localized stats, SUBTOTAL/SUMPRODUCT so pivots stay correct under live slicer filters.' },
            { topic: 'Train/test leakage', notes: 'GDHO model deliberately excluded every field derived from or co-dependent with the target (Tier, HumExp, %Hum) and used an org-grouped split since the same organization repeats across up to 19 years.' },
            { topic: 'Tableau parameters', notes: 'Top N / Start Date / End Date parameters wired into every worksheet so the whole dashboard re-filters together — not just one chart.' }
        ]
    },
    developer: {
        label: 'Developer',
        flashcards: [
            {
                project: 'Zodiac Real Estate AI (internship)',
                headline: '88.3% ML accuracy · 20+ endpoint REST API',
                detail: 'Production Flask/MySQL platform processing 49,551+ properties. 5-tier API security system (ML-powered XSS/CSRF detection) and a Dockerized CI/CD pipeline, leading a team of 5 developers.'
            },
            {
                project: 'TEKVWA Money',
                headline: 'React + Capacitor · Web/Android/iOS, one codebase',
                detail: 'Live Plaid bank-linking in production, Gemini-narrated insights, full RBAC (Customer/Staff/Admin/Super Admin), biometric app lock, automated statement import across 24+ Canadian banks.'
            },
            {
                project: 'VwaTek Apply',
                headline: 'Kotlin Multiplatform · iOS/Android/Web, one codebase',
                detail: 'AI career suite with offline-first sync and conflict resolution, Koin dependency injection, Prometheus/Sentry observability.'
            },
            {
                project: 'TekVwarho ProAudit',
                headline: '500+ API routes · 400+ automated tests',
                detail: 'Enterprise Nigerian tax-compliance platform with Benford\'s Law fraud detection and a hash-chain immutable ledger.'
            }
        ],
        starStories: [
            {
                prompt: 'Tell me about a challenging technical problem you solved.',
                situation: 'The Zodiac real estate platform needed to withstand real attack patterns, not just pass a checklist.',
                task: 'Build defense-in-depth rather than a single point of failure.',
                action: 'Implemented a 5-tier API security system combining ML-powered XSS/CSRF detection with behavioral analysis.',
                result: '100% attack-prevention rate in internal penetration testing.'
            },
            {
                prompt: 'Tell me about a time you led a team.',
                situation: 'Full Stack Developer Intern role on the Zodiac real estate analytics platform.',
                task: 'Ship a production-grade platform on an internship timeline.',
                action: 'Led full-stack development end to end and directed a team of 5 developers while deploying a Dockerized CI/CD pipeline.',
                result: '99.9% staging uptime, <400ms API response times, 85% test coverage.'
            },
            {
                prompt: 'Tell me about learning a new technology quickly.',
                situation: 'Tekvwa Analysis Platform needed to move off a single point of AI-provider failure.',
                task: 'Migrate the AI integration without disrupting the live product.',
                action: 'Migrated from OpenAI to Vertex AI (Gemini via Application Default Credentials), and from Railway to Google Cloud Run in the same pass.',
                result: 'Shipped an auto-analysis recommendation engine and app-wide security hardening alongside the migration.'
            },
            {
                prompt: 'Tell me about a time you had to think about system reliability.',
                situation: 'VwaTek Apply needed to work for users with unreliable connectivity.',
                task: 'Make the app usable offline without corrupting data on reconnect.',
                action: 'Built offline-first sync with explicit conflict resolution and added Prometheus/Sentry observability to catch issues in production.',
                result: 'A career-suite app that degrades gracefully instead of breaking when connectivity drops.'
            }
        ],
        conceptRefreshers: [
            { topic: 'REST API design', notes: '20+ endpoint APIs on Zodiac and TEKVWA Money — resource-oriented routes, auth middleware (JWT), rate-limiting instincts.' },
            { topic: 'CI/CD & containers', notes: 'Dockerized pipelines, GitHub Actions — the Zodiac pipeline hit 99.9% staging uptime and 85% test coverage.' },
            { topic: 'Cross-platform mobile tradeoffs', notes: 'Capacitor (web-first, reuse React/JS skills, WebView-based) vs. Kotlin Multiplatform (native-first, Compose UI, better for deep platform integration) — used both, on purpose, across different products.' },
            { topic: 'Auth patterns', notes: 'JWT session auth plus biometric app-lock (Face ID/fingerprint) on TEKVWA Money; RBAC with 4 role tiers (Customer/Staff/Admin/Super Admin).' }
        ]
    },
    teacher: {
        label: 'Teacher',
        flashcards: [
            {
                project: 'WonderWorld Learning Adventure',
                headline: 'Adaptive early-childhood platform, ages 2-8',
                detail: 'Blends cognitive science and early-years pedagogy with Item Response Theory for real-time difficulty personalization. COPPA and GDPR-K compliant.'
            },
            {
                project: 'IT Department Lead',
                headline: '50% efficiency gain digitizing lesson planning',
                detail: 'Led a departmental initiative to digitize lesson-plan creation and approval through the school website, replacing a fully manual, paper-based process.'
            },
            {
                project: 'Data Processing Teacher',
                headline: '75% faster grading · 20% grade lift',
                detail: 'Pioneered the school\'s transition from manual to digital result computation, then applied data-driven teaching strategies informed by student performance trends.'
            },
            {
                project: 'Computer Science Teacher',
                headline: '30% STEM enrollment increase · regional coding win',
                detail: 'Designed and delivered a project-based CS curriculum aligned with industry trends, and coached the school\'s coding team to a first-place regional win.'
            }
        ],
        starStories: [
            {
                prompt: 'Tell me about a time you improved student outcomes.',
                situation: 'As a Data Processing Teacher, grading was manual and slow, and teaching wasn\'t informed by performance data.',
                task: 'Speed up result computation and use that data to actually improve teaching.',
                action: 'Pioneered the transition to digital result computation, then applied data-driven teaching strategies based on the resulting performance trends.',
                result: 'Cut processing time by 75% and lifted average student grades by 20%.'
            },
            {
                prompt: 'Tell me about leading an initiative without formal authority.',
                situation: 'Lesson-plan creation and approval was a fully manual, paper-based process across the department.',
                task: 'Get the whole department to adopt a new digital workflow.',
                action: 'Led the digitization effort through the school website and drove adoption of the new review/approval process.',
                result: 'Increased teacher collaboration and operational efficiency by 50%.'
            },
            {
                prompt: 'Tell me about mentoring or coaching someone to a result.',
                situation: 'The school had a coding team but no structured, industry-aligned curriculum behind it.',
                task: 'Build real technical capability, not just enthusiasm.',
                action: 'Designed a project-based computer science curriculum aligned with industry trends and coached the team directly.',
                result: 'A 30% increase in STEM extracurricular enrollment and a first-place win at a regional competition.'
            }
        ],
        conceptRefreshers: [
            { topic: 'Curriculum design', notes: 'Project-based, industry-aligned CS curriculum — start from what students will actually build, not a topic checklist.' },
            { topic: 'Data-driven instruction', notes: 'Use result/performance data to target teaching adjustments, not just to grade — this is what actually moved the 20% grade lift.' },
            { topic: 'Change management in a school setting', notes: 'Digitizing lesson plans and result computation both required getting a whole department to adopt a new process, not just building the tool.' }
        ]
    }
};
