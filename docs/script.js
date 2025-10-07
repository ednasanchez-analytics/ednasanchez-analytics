
async function loadProjects(){
  const res = await fetch('projects.json');
  const data = await res.json();
  const grid = document.getElementById('grid');
  const create = (p) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.tags = p.tags.join(',');
    card.innerHTML = `
      <h3>${p.emoji} ${p.title}</h3>
      <p>${p.pitch}</p>
      <div class="badges">
        ${p.stack.map(s => `<span class="badge">${s}</span>`).join('')}
      </div>
      <p class="meta">${p.impact}</p>
      <div class="actions">
        <a class="btn btn--ghost" href="${p.repo}" target="_blank" rel="noopener">Ver repo</a>
        ${p.demo ? `<a class="btn" href="${p.demo}" target="_blank" rel="noopener">Demo</a>` : ''}
      </div>
    `;
    return card;
  };
  data.projects.forEach(p => grid.appendChild(create(p)));

  // Filters
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const f = chip.dataset.filter;
      [...grid.children].forEach(card => {
        if(f === 'all'){ card.style.display = ''; return; }
        const tags = card.dataset.tags.split(',');
        card.style.display = tags.includes(f) ? '' : 'none';
      });
    });
  });
  document.querySelector('.chip[data-filter="all"]').classList.add('active');
}
loadProjects();
