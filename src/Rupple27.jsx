import React, { useState, useEffect } from 'react';
import {
  Moon, Sun, Search, MessageSquare, PieChart, Users,
  PhoneCall, Globe, ChevronDown, Send,
  TrendingUp, ShoppingBag, Home, Factory, GraduationCap,
  HeartPulse, Truck, Briefcase, Wrench, Utensils, Loader2, AlertCircle
} from 'lucide-react';

const MOCK_CRM_DATA = [
  { id: 1, name: "Aarav Sharma",  segment: "High-Value",     value: 4500, useCase: "sales",     action: "Call Now" },
  { id: 2, name: "Priya Patel",   segment: "Low-Engagement", value: 1200, useCase: "marketing", action: "Add to Campaign" },
  { id: 3, name: "Rajesh Kumar",  segment: "High-Value",     value: 8900, useCase: "support",   action: "View Ticket (High Pri)" },
  { id: 4, name: "Neha Gupta",    segment: "Low-Engagement", value: 850,  useCase: "sales",     action: "Send Discount" },
  { id: 5, name: "Vikram Singh",  segment: "High-Value",     value: 5200, useCase: "marketing", action: "VIP Invite" },
  { id: 6, name: "Anjali Desai",  segment: "Low-Engagement", value: 400,  useCase: "support",   action: "Close Ticket" },
];

const INDUSTRIES = [
  { id: 'retail',        name: 'Retail & E-commerce',         icon: ShoppingBag },
  { id: 'real_estate',   name: 'Real Estate',                  icon: Home },
  { id: 'manufacturing', name: 'Manufacturing & Trading',      icon: Factory },
  { id: 'education',     name: 'Education & Coaching',         icon: GraduationCap },
  { id: 'healthcare',    name: 'Healthcare & Wellness',        icon: HeartPulse },
  { id: 'logistics',     name: 'Logistics & Transport',        icon: Truck },
  { id: 'services',      name: 'Service Businesses',           icon: Briefcase },
  { id: 'construction',  name: 'Home Services & Construction', icon: Wrench },
  { id: 'hospitality',   name: 'Hospitality & Events',         icon: Utensils },
];

const USE_CASES = [
  { id: 'support',   name: 'Support Ops',           icon: AlertCircle },
  { id: 'sales',     name: 'Sales follow-up',        icon: PhoneCall },
  { id: 'marketing', name: 'Marketing segmentation', icon: PieChart },
];

const TRANSLATIONS = {
  en: {
    searchPlaceholder: "Ask your CRM in plain English...",
    suggested: "Suggested Queries:",
    queries: {
      marketing: ["Find high-income customers with low engagement", "Group customers by family size for next campaign"],
      sales:     ["Show leads from last week who haven't been called", "Who are my top 10 most likely to buy today?"],
      support:   ["List all unresolved tickets from premium users", "Summarize complaints from yesterday"],
    },
    segmentation: "ML Segmentation Insights",
    insights:     "Actionable Insights",
    welcome:      "Welcome to Rupple27",
  },
  hi: {
    searchPlaceholder: "अपने CRM से हिंदी में पूछें...",
    suggested: "सुझाए गए प्रश्न:",
    queries: {
      marketing: ["कम जुड़ाव वाले उच्च आय वाले ग्राहक खोजें", "अगले अभियान के लिए परिवार के आकार के अनुसार ग्राहकों को समूहित करें"],
      sales:     ["पिछले सप्ताह के लीड दिखाएं जिन्हें कॉल नहीं किया गया है", "आज खरीदारी करने की सबसे अधिक संभावना वाले टॉप 10 कौन हैं?"],
      support:   ["प्रीमियम उपयोगकर्ताओं के सभी अनसुलझे टिकटों की सूची बनाएं", "कल की शिकायतों का सारांश दें"],
    },
    segmentation: "एमएल सेगमेंटेशन इनसाइट्स",
    insights:     "कार्रवाई योग्य अंतर्दृष्टि",
    welcome:      "Rupple27 में आपका स्वागत है",
  },
  te: {
    searchPlaceholder: "మీ CRM ని తెలుగులో అడగండి...",
    suggested: "సూచించబడిన ప్రశ్నలు:",
    queries: {
      marketing: ["తక్కువ ఎంగేజ్‌మెంట్ ఉన్న అధిక ఆదాయ కస్టమర్లను కనుగొనండి", "తదుపరి ప్రచారానికి కుటుంబ పరిమాణం ద్వారా కస్టమర్లను గ్రూప్ చేయండి"],
      sales:     ["గత వారం నుండి కాల్ చేయని లీడ్‌లను చూపించు", "ఈ రోజు కొనుగోలు చేయడానికి అవకాశం ఉన్న టాప్ 10 ఎవరు?"],
      support:   ["ప్రీమియం వినియోగదారుల నుండి పరిష్కరించని టిక్కెట్లన్నింటినీ జాబితా చేయండి", "నిన్నటి ఫిర్యాదులను సంగ్రహించండి"],
    },
    segmentation: "ML సెగ్మెంటేషన్ అంతర్దృష్టులు",
    insights:     "చర్య తీసుకోగల అంతర్దృష్టులు",
    welcome:      "Rupple27 కు స్వాగతం",
  },
};

export default function Rupple27App() {
  const [darkMode,       setDarkMode]       = useState(false);
  const [lang,           setLang]           = useState('en');
  const [activeIndustry, setActiveIndustry] = useState(INDUSTRIES[0].id);
  const [activeUseCase,  setActiveUseCase]  = useState(USE_CASES[2].id);
  const [query,          setQuery]          = useState('');
  const [resultsDisplay, setResultsDisplay] = useState(false);
  const [isLoading,      setIsLoading]      = useState(false);
  const [filteredData,   setFilteredData]   = useState([]);
  const [aiExplanation,  setAiExplanation]  = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const t = TRANSLATIONS[lang];

  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (query.trim() === '') return;

    setIsLoading(true);
    setResultsDisplay(true);

    setTimeout(() => {
      let mockSegment = 'All';
      let mockUseCase = 'All';
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes('high') || lowerQuery.includes('premium') || lowerQuery.includes('उच्च') || lowerQuery.includes('అధిక')) {
        mockSegment = 'High-Value';
      } else if (lowerQuery.includes('low') || lowerQuery.includes('कम') || lowerQuery.includes('తక్కువ')) {
        mockSegment = 'Low-Engagement';
      }

      if (lowerQuery.includes('sales') || lowerQuery.includes('buy') || lowerQuery.includes('lead') || lowerQuery.includes('खरीदारी')) {
        mockUseCase = 'sales';
      } else if (lowerQuery.includes('support') || lowerQuery.includes('ticket') || lowerQuery.includes('शिकायत') || lowerQuery.includes('ఫిర్యాదు')) {
        mockUseCase = 'support';
      } else if (lowerQuery.includes('campaign') || lowerQuery.includes('marketing') || lowerQuery.includes('अभियान')) {
        mockUseCase = 'marketing';
      }

      let exp = `Parsed Intent: Segment='${mockSegment}', UseCase='${mockUseCase}'`;
      if (lang === 'hi') exp = `आशय समझा गया: वर्ग='${mockSegment}', उपयोग='${mockUseCase}'`;
      if (lang === 'te') exp = `ఉద్దేశ్యం అర్థమైంది: విభాగం='${mockSegment}', ఉపయోగం='${mockUseCase}'`;

      setAiExplanation(exp);
      setFilteredData(MOCK_CRM_DATA.filter(item => {
        const segmentMatch = mockSegment === 'All' || item.segment === mockSegment;
        const useCaseMatch = mockUseCase === 'All' || item.useCase === mockUseCase;
        return segmentMatch && useCaseMatch;
      }));
      setIsLoading(false);
    }, 1200);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setTimeout(() => document.getElementById('search-form-btn').click(), 50);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>

      {/* ── Header ── */}
      <header className={`sticky top-0 z-10 border-b px-6 py-3 flex justify-between items-center ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">R</div>
          <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Rupple27</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Language switcher */}
          <div className="relative group">
            <button className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}>
              <Globe size={16} /> {lang.toUpperCase()} <ChevronDown size={14} />
            </button>
            <div className={`absolute right-0 mt-2 w-36 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिन्दी (Hindi)' },
                { code: 'te', label: 'తెలుగు (Telugu)' },
              ].map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`block w-full text-left px-4 py-2 text-sm ${lang === code ? 'text-indigo-500 font-medium' : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className={`hidden md:flex w-72 border-r flex-col overflow-y-auto ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'}`}>
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Industry Workspace</h2>
            <div className="space-y-1">
              {INDUSTRIES.map((ind) => {
                const Icon = ind.icon;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setActiveIndustry(ind.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeIndustry === ind.id
                        ? (darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-700')
                        : (darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50')
                    }`}
                  >
                    <Icon size={18} className={activeIndustry === ind.id ? 'text-indigo-500' : ''} />
                    {ind.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`p-4 border-t mt-auto ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Use Cases</h2>
            <div className="space-y-2">
              {USE_CASES.map((uc) => {
                const Icon = uc.icon;
                return (
                  <button
                    key={uc.id}
                    onClick={() => { setActiveUseCase(uc.id); setResultsDisplay(false); setQuery(''); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded border transition-all ${
                      activeUseCase === uc.id
                        ? (darkMode ? 'border-indigo-500 bg-indigo-500/20 text-white' : 'border-indigo-500 bg-indigo-50 text-indigo-800')
                        : (darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600')
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{uc.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 flex flex-col relative">
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">

            {!resultsDisplay ? (
              /* Welcome / suggestion screen */
              <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto flex items-center justify-center shadow-xl shadow-indigo-500/20">
                    <MessageSquare size={32} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-semibold">{t.welcome}</h2>
                  <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Query your CRM naturally. No SQL, no complex dashboards. Powered by AI and ML clustering.
                  </p>
                </div>

                <div className="w-full max-w-2xl text-left space-y-3">
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.suggested}</p>
                  <div className="grid gap-2">
                    {t.queries[activeUseCase].map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`text-left px-4 py-3 rounded-lg text-sm border transition-all hover:-translate-y-0.5 ${darkMode ? 'bg-gray-800/50 border-gray-700 hover:border-indigo-500' : 'bg-white border-gray-200 hover:border-indigo-500'}`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Results screen */
              <div className="max-w-5xl mx-auto space-y-6">

                {/* Query echo */}
                <div className={`p-4 rounded-xl border flex items-start gap-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 shrink-0">
                    <Search size={20} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Natural Language Query</p>
                    <p className="text-lg font-medium">"{query}"</p>
                    {aiExplanation && !isLoading && (
                      <p className="mt-2 text-sm text-indigo-600 font-medium bg-indigo-50 inline-block px-3 py-1 rounded-md">
                        {aiExplanation}
                      </p>
                    )}
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Parsing intent and querying CRM...</p>
                  </div>
                ) : (
                  <>
                    {/* Segmentation + Insights row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className={`col-span-1 md:col-span-2 p-6 rounded-xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Users size={20} className="text-indigo-500" /> {t.segmentation} (K-Means)
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                            <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Cluster 1: High-Value</p>
                            <p className="text-2xl font-bold text-green-500">1,245</p>
                          </div>
                          <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                            <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Cluster 2: Low-Engagement</p>
                            <p className="text-2xl font-bold text-orange-500">892</p>
                          </div>
                        </div>
                      </div>

                      <div className={`col-span-1 p-6 rounded-xl border ${darkMode ? 'bg-indigo-900/20 border-indigo-500/30' : 'bg-indigo-50 border-indigo-100'}`}>
                        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>
                          <TrendingUp size={20} /> {t.insights}
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              Strong correlation detected between income and spending.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Results table */}
                    <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className={`text-xs uppercase ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                            <tr>
                              <th className="px-6 py-4">Customer Name</th>
                              <th className="px-6 py-4">Segment</th>
                              <th className="px-6 py-4">Est. Value</th>
                              <th className="px-6 py-4">Action</th>
                            </tr>
                          </thead>
                          <tbody className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
                            {filteredData.length > 0 ? filteredData.map((item) => (
                              <tr key={item.id} className={darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}>
                                <td className="px-6 py-4 font-medium">{item.name}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    item.segment === 'High-Value'
                                      ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700')
                                      : (darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700')
                                  }`}>
                                    {item.segment}
                                  </span>
                                </td>
                                <td className="px-6 py-4">${item.value.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                  <button className={`px-3 py-1.5 rounded text-xs font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>
                                    {item.action}
                                  </button>
                                </td>
                              </tr>
                            )) : (
                              <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                                  No records matched this query intent.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* ── Search bar ── */}
          <div className={`p-4 border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto relative flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full pl-5 pr-14 py-4 rounded-xl outline-none border-2 transition-all text-sm md:text-base ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
                }`}
              />
              <button
                id="search-form-btn"
                type="submit"
                disabled={isLoading}
                className={`absolute right-3 p-2 rounded-lg transition-colors ${
                  query.trim().length > 0 && !isLoading
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : (darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400')
                }`}
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
