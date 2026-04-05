import fs from 'fs';
import path from 'path';

const htmlTemplateStart = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><title>FinDash Project Explanation</title>
<style>
  body { font-family: 'Calibri', sans-serif; line-height: 1.6; }
  h1 { color: #2563eb; font-size: 24pt; }
  h2 { color: #1e40af; font-size: 18pt; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
  h3 { color: #3b82f6; font-size: 14pt; }
  pre { background-color: #f1f5f9; padding: 10px; border-radius: 4px; font-family: 'Consolas', monospace; font-size: 10pt; white-space: pre-wrap; }
  .code-line { margin: 0; }
  .comment { color: #16a34a; font-style: italic; }
</style>
</head>
<body>
<h1>FinDash Project Documentation & Workflow</h1>

<h2>1. How Project Meets Requirements</h2>
<ul>
<li><b>Dashboard Overview:</b> Implemented using 'Charts.jsx' (Trend Line Chart & Categorical Donut Pie Chart) and 'SummaryCards.jsx' (Total Balance, Income, Expenses).</li>
<li><b>Transactions Section:</b> Found in 'TransactionsPage.jsx'. Displays list with dates, amount, category, and type. Fully sortable and filterable.</li>
<li><b>Basic Role-Based UI (RBAC):</b> Simulated with 'admin' and 'viewer' roles stored in Zustand global state. 'TransactionsTable' elegantly hides or shows edit/delete functionality based on this.</li>
<li><b>Insights Section:</b> 'InsightsSection.jsx' dynamically computes highest spending and largest expenses in real-time.</li>
<li><b>State Management:</b> Managed using 'Zustand' allowing scalable cross-component state without prop-drilling, using LocalStorage for persistence.</li>
<li><b>Creativity:</b> Animated numbering, Contextual time greetings, and Cmd+K keyboard shortcut added.</li>
</ul>

<h2>2. Project Architecture & Workflow</h2>
<p><b>Workflow:</b> The React application bootloader starts at <code>main.jsx</code> which mounts <code>App.jsx</code>. The App component orchestrates the layout (Header, Sidebar) and checks the global state (Theme, Auth Role, Mock API Loading state) from <code>useStore.js</code>. The routing is handled conditionally through React state (Dashboard view vs Transactions View).</p>
<p>When the app launches, it waits 1.5 seconds simulating an API fetch, rendering a beautiful spinner. Once loaded, Data is seamlessly passed to Recharts for visual rendering and to Framer Motion for entrance animations.</p>

<h2>3. Comprehensive Code Explanations</h2>
`;

const htmlTemplateEnd = `
</body>
</html>
`;

function generateFileExplanations(filePath, title) {
    let content = '';
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        content += `<h3>${title}</h3><div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">`;
        
        const lines = fileContent.split('\\n');
        lines.forEach((line, index) => {
            const escapedLine = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            content += `<p class="code-line"><code><span style="color: #94a3b8; margin-right: 15px;">${index + 1}</span> <b>${escapedLine}</b></code></p>`;
        });
        
        // Add a generic summary based on filename
        let explanation = "Explanation for this file module:\\n";
        if (title.includes('App.jsx')) explanation = "This operates as the central layout engine. It mounts the Sidebar, Header, tracks the faux-network API loading state, and safely switches views.";
        if (title.includes('useStore.js')) explanation = "This file configures Zustand. We define our initial state, persistence methods (localStorage via partialize to hide loading states natively), and actions.";
        if (title.includes('Charts.jsx')) explanation = "Utilizes Recharts. We use useMemo hooks to structurally group raw transaction arrays into sum-aggregated objects mapping directly into D3.js compliant SVGs.";
        if (title.includes('TransactionsPage.jsx')) explanation = "Handles heavy list rendering. Implements the Cmd+K keydown shortcut hook, CSV exporting Blob logic, and complex transaction array sorts.";
        
        content += `</div><p class="comment" style="margin-top: -10px; margin-bottom: 30px;"><b>Technical Breakdown:</b> ${explanation}</p>`;
    } catch (e) {
        content += `<p>Could not read file ${filePath}</p>`;
    }
    return content;
}

const filesToRead = [
    { path: './src/App.jsx', name: 'src/App.jsx' },
    { path: './src/store/useStore.js', name: 'src/store/useStore.js' },
    { path: './src/components/Dashboard/Charts.jsx', name: 'src/components/Dashboard/Charts.jsx' },
    { path: './src/pages/TransactionsPage.jsx', name: 'src/pages/TransactionsPage.jsx' }
];

let finalHtml = htmlTemplateStart;

filesToRead.forEach(file => {
    finalHtml += generateFileExplanations(path.resolve(file.path), file.name);
});

finalHtml += htmlTemplateEnd;

fs.writeFileSync(path.resolve('./FinDash_Explanation.doc'), finalHtml);
console.log('Successfully generated FinDash_Explanation.doc');
