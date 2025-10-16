// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple mobile menu
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
toggle?.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

// Projects grid (fetch from GitHub API + fallback)
const projects = [
  {
    repo: "youtube-analytics-growth",
    title: "YouTube Analytics Growth",
    desc: "CTR & retention optimization with KPI dashboards and data storytelling (synthetic demo).",
    tools: "Python · Pandas · Matplotlib · Jupyter"
  },
  {
    repo: "her2-market-insights-baja",
    title: "HER2 Market Insights (Baja)",
    desc: "Territory-level oncology insights for HER2+ adoption and prescriptions in Baja California.",
    tools: "SQL · Python · Tableau · Jupyter"
  },
  {
    repo: "ab-test-recommender-systems",
    title: "A/B Test & Recommender Systems",
    desc: "Experimental design and recommenders to improve conversion and engagement.",
    tools: "Python · SciPy · Statsmodels · Jupyter"
  },
  {
    repo: "sql-book-database-analysis",
    title: "SQL Book Database Analysis",
    desc: "Publishing trends, author performance and reader sentiment analytics.",
    tools: "SQL · SQLite · Python · Jupyter"
  },
  {
    repo: "CallMeMaybe_Operator_Efficiency",
    title: "CallMeMaybe – Operator Efficiency",
    desc: "Queue optimization and operator efficiency KPIs for call centers.",
    tools: "Python · Pandas · NumPy · Matplotlib · Jupyter"
  }
];

async function renderProjects() {
  const grid = document.getElementById('project-grid');
  try {
    for (const p of projects) {
      // Try to get stars/forks via GitHub API (no token)
      const res = await fetch(`https://api.github.com/repos/ednasanchez-analytics/${p.repo}`);
      const meta = res.ok ? await res.json() : null;
      const stats = meta ? `<span>★ ${meta.stargazers_count}</span> <span>⑂ ${meta.forks_count}</span>` : "";
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <p class="tools">${p.tools}</p>
        <div class="cta" style="margin-top:10px">
          <a class="btn small" href="https://github.com/ednasanchez-analytics/${p.repo}" target="_blank" rel="noopener">Open Repo</a>
          ${stats ? `<span class="tools" style="margin-left:auto">${stats}</span>` : ""}
        </div>
      `;
      grid.appendChild(card);
    }
  } catch (e) {
    // Fallback: static render
    projects.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <p class="tools">${p.tools}</p>
        <div class="cta" style="margin-top:10px">
          <a class="btn small" href="https://github.com/ednasanchez-analytics/${p.repo}" target="_blank" rel="noopener">Open Repo</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }
}
renderProjects();
