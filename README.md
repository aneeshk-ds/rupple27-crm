# Rupple27 CRM

**NLP-powered CRM prototype for Indian SMBs.**  
Query your customer data in plain English, Hindi, or Telugu — no SQL, no complex dashboards.

![Rupple27 Preview](https://via.placeholder.com/900x480/6366f1/ffffff?text=Rupple27+CRM+Preview)

---

## What It Does

Rupple27 lets business owners and sales teams interact with CRM data using natural language.  
Type a question like *"Show me high-value customers who haven't been called this week"* and get  
a filtered, segmented result set with ML cluster labels and recommended actions — instantly.

It is built as an MVP prototype. The NLP intent parser and ML segmentation layer are currently  
mocked to demonstrate the UX pattern. The architecture is designed so that a real backend  
(FastAPI + scikit-learn K-Means, for example) can be dropped in behind the same interface.

---

## Key Features

- **Natural language querying** — plain text input, no filters or SQL required
- **3-language support** — English, Hindi (हिन्दी), Telugu (తెలుగు) with localized suggested queries
- **ML segmentation display** — K-Means cluster summary (High-Value / Low-Engagement)
- **9 industry workspaces** — Retail, Real Estate, Manufacturing, Education, Healthcare, Logistics, Services, Construction, Hospitality
- **3 use-case modes** — Sales follow-up, Marketing segmentation, Support Ops
- **Dark mode** — system-aware toggle with smooth transitions
- **Responsive layout** — sidebar collapses on mobile, search bar always accessible

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18 |
| Styling | Tailwind CSS v3 (class-based dark mode) |
| Icons | lucide-react |
| Build tool | Vite 5 |
| Language | JavaScript (JSX) |

---

## Folder Structure

```
rupple27-crm/
├── public/
│   └── favicon.svg          # Branded SVG favicon
├── src/
│   ├── Rupple27.jsx          # Main application component
│   ├── main.jsx              # React DOM entry point
│   └── index.css             # Tailwind directives + global styles
├── index.html                # Vite HTML template
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Install and run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/rupple27-crm.git
cd rupple27-crm

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
# Output goes to dist/
```

---

## How to Use

1. **Select an industry** from the left sidebar (e.g. Retail, Healthcare).
2. **Select a use case** at the bottom of the sidebar (Sales, Marketing, Support).
3. **Type a query** in the search bar, or click one of the suggested queries.
4. The app parses your intent, identifies the relevant customer segment, and returns a filtered table with recommended actions.
5. Switch languages using the globe icon in the header.

### Example queries

| Intent | Query |
|---|---|
| Find high-value leads | "Who are my top 10 most likely to buy today?" |
| Marketing segmentation | "Find high-income customers with low engagement" |
| Support prioritisation | "List all unresolved tickets from premium users" |
| Hindi (sales) | "पिछले सप्ताह के लीड दिखाएं जिन्हें कॉल नहीं किया गया है" |
| Telugu (support) | "ప్రీమియం వినియోగదారుల నుండి పరిష్కరించని టిక్కెట్లను జాబితా చేయండి" |

---

## Architecture Notes

### Current MVP (mocked)

The NLP layer (`handleSearch`) is a client-side keyword matcher that maps query terms  
to segment and use-case labels. The K-Means cluster counts are static mock values.  
This is intentional for the prototype — it demonstrates the complete UX without requiring  
a live backend.

### Intended production architecture

```
Browser (React)
    │  Natural language query
    ▼
FastAPI backend
    ├── NLP intent parser (spaCy / Gemini API)
    ├── Query builder → PostgreSQL / Supabase
    └── K-Means clustering (scikit-learn, pre-trained on CRM data)
    │  Structured results + cluster labels
    ▼
React UI renders table + insights
```

---

## Roadmap

- [ ] FastAPI backend with real NLP intent parsing
- [ ] PostgreSQL integration (Supabase or self-hosted)
- [ ] K-Means model trained on real CRM data
- [ ] Voice input support (Web Speech API)
- [ ] Export filtered results to CSV / Excel
- [ ] WhatsApp Business API integration for direct outreach actions
- [ ] Role-based access (Owner, Sales Rep, Support Agent)
- [ ] Mobile-first PWA wrapper

---

## Known Issues / Limitations

- NLP parsing is keyword-based in this version. Multi-condition queries (e.g. "high-value AND inactive for 30 days") are not yet supported.
- Cluster counts (1,245 / 892) are static mock values, not computed from real data.
- The language switcher uses CSS `group-hover` — on touch devices this may not behave as expected.

---

## License

MIT — free to use, fork, and build on.

---

*Built by Aneesh Kumar — Amazon Marketplace Analyst and SEO Specialist, pivoting to Data Analytics and BI.*
