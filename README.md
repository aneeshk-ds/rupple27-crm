# Rupple27 CRM

NLP-powered CRM prototype for Indian SMBs — query your customer data in plain English, Hindi, or Telugu. No SQL, no complex dashboards.

---

## What it does

Type a question like *"Show me high-value customers who haven't been called this week"* and get a filtered, segmented result set with ML cluster labels and recommended next actions — instantly.

- Natural-language query interface (English, Hindi, Telugu)
- Customer filtering by city, churn risk, unresolved tickets, high-value segments
- ML clustering labels (mocked in prototype — architecture is production-ready)
- Risk banding and next-best-action suggestions
- India-focused mock dataset

The NLP intent parser and ML segmentation layer are currently mocked to demonstrate the UX pattern. The architecture is designed for a real backend (FastAPI + scikit-learn K-Means).

---

## Stack

| Layer | Library |
|---|---|
| UI | React 18 + Vite |
| Styling | Tailwind CSS |
| NLP layer | Mocked intent router (production: FastAPI) |
| ML layer | Mocked K-Means clusters (production: scikit-learn) |
| Deploy | Static — GitHub Pages ready |

---

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

---

## Build

```bash
npm run build
npm run preview
```
