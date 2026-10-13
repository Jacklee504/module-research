(() => {
  const player = document.querySelector('[data-study-player]');
  if (!player) return;

  const moduleCode = player.dataset.module;
  const storageKey = `module-research-flashcards-${moduleCode}-v1`;
  const category = player.querySelector('[data-category]');
  const statusFilter = player.querySelector('[data-status-filter]');
  const front = player.querySelector('[data-front]');
  const back = player.querySelector('[data-back]');
  const evidence = player.querySelector('[data-evidence]');
  const position = player.querySelector('[data-position]');
  const progress = player.querySelector('[data-progress]');
  const state = player.querySelector('[data-state]');
  const reveal = player.querySelector('[data-reveal]');
  const previous = player.querySelector('[data-previous]');
  const next = player.querySelector('[data-next]');
  const shuffle = player.querySelector('[data-shuffle]');
  const ratingButtons = [...player.querySelectorAll('[data-rating]')];
  let ratings = {};
  try { ratings = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch (_) { ratings = {}; }
  let cards = [];
  let order = [];
  let current = 0;
  let revealed = false;

  function copyContent(target, source) {
    target.replaceChildren(...[...source.childNodes].map(node => document.importNode(node, true)));
  }

  function sourceCards(documentSource, sourcePath) {
    return [...documentSource.querySelectorAll('.flashcard-bank table')].flatMap((table, tableIndex) => {
      let heading = table.previousElementSibling;
      while (heading && heading.tagName !== 'H2') heading = heading.previousElementSibling;
      const group = heading?.textContent.trim() || `Deck ${tableIndex + 1}`;
      return [...table.querySelectorAll('tbody tr')].flatMap((row, rowIndex) => {
        const cells = row.querySelectorAll('td');
        return cells.length < 2 ? [] : [{
          id: `${sourcePath}:${tableIndex}:${rowIndex}`,
          group,
          front: cells[0],
          back: cells[1],
          evidence: cells[2]?.textContent.trim() || '',
        }];
      });
    });
  }

  function inlineCards() {
    const template = document.querySelector('#inline-flashcards');
    if (!template) return [];
    return [...template.content.querySelectorAll('[data-flashcard]')].map((item, index) => ({
      id: `inline:${index}`,
      group: item.dataset.group || 'Core concepts',
      front: item.querySelector('[data-card-front]'),
      back: item.querySelector('[data-card-back]'),
      evidence: item.dataset.evidence || '',
    }));
  }

  function rating(card) {
    return ['practice', 'ready'].includes(ratings[card.id]) ? ratings[card.id] : 'new';
  }

  function updateOrder() {
    const selectedGroup = category.value;
    const selectedStatus = statusFilter.value;
    order = cards.map((_, index) => index).filter(index =>
      (selectedGroup === 'all' || cards[index].group === selectedGroup) &&
      (selectedStatus === 'all' || rating(cards[index]) === selectedStatus)
    );
    current = Math.min(current, Math.max(0, order.length - 1));
    showCard();
  }

  function showCard() {
    const card = cards[order[current]];
    const ready = cards.filter(item => rating(item) === 'ready').length;
    const practice = cards.filter(item => rating(item) === 'practice').length;
    progress.textContent = `${ready} ready · ${practice} needs practice · ${cards.length - ready - practice} not marked`;
    position.textContent = card ? `Card ${current + 1} of ${order.length} · ${card.group}` : 'No cards match these filters';
    front.replaceChildren();
    back.replaceChildren();
    evidence.textContent = '';
    revealed = false;
    back.hidden = true;
    reveal.hidden = !card;
    reveal.textContent = 'Reveal answer';
    previous.disabled = !card || current === 0;
    next.disabled = !card || current === order.length - 1;
    for (const button of ratingButtons) button.disabled = !card;
    if (!card) {
      state.textContent = '';
      return;
    }
    copyContent(front, card.front);
    state.textContent = rating(card) === 'practice' ? 'Needs practice' : rating(card) === 'ready' ? 'Ready' : 'Not marked';
  }

  reveal.addEventListener('click', () => {
    const card = cards[order[current]];
    if (!card) return;
    if (!revealed) {
      copyContent(back, card.back);
      evidence.textContent = card.evidence ? `Evidence: ${card.evidence}` : '';
      back.hidden = false;
      revealed = true;
      reveal.textContent = 'Hide answer';
    } else {
      back.hidden = true;
      revealed = false;
      reveal.textContent = 'Reveal answer';
    }
  });
  previous.addEventListener('click', () => { current--; showCard(); });
  next.addEventListener('click', () => { current++; showCard(); });
  shuffle.addEventListener('click', () => {
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    current = 0;
    showCard();
  });
  for (const button of ratingButtons) button.addEventListener('click', () => {
    const card = cards[order[current]];
    if (!card) return;
    ratings[card.id] = button.dataset.rating;
    try { localStorage.setItem(storageKey, JSON.stringify(ratings)); } catch (_) { /* Storage may be blocked. */ }
    const nextCard = order[current + 1];
    updateOrder();
    if (nextCard !== undefined) {
      const nextPosition = order.indexOf(nextCard);
      if (nextPosition >= 0) current = nextPosition;
      showCard();
    }
  });
  category.addEventListener('change', () => { current = 0; updateOrder(); });
  statusFilter.addEventListener('change', () => { current = 0; updateOrder(); });

  async function load() {
    const sources = (player.dataset.decks || '').split(',').map(source => source.trim()).filter(Boolean);
    const responses = await Promise.all(sources.map(source => fetch(source)));
    for (let i = 0; i < responses.length; i++) {
      if (!responses[i].ok) throw new Error(`Could not load ${sources[i]}`);
      const html = await responses[i].text();
      cards.push(...sourceCards(new DOMParser().parseFromString(html, 'text/html'), sources[i]));
    }
    cards.push(...inlineCards());
    if (!cards.length) throw new Error('No flashcards were found.');
    for (const group of [...new Set(cards.map(card => card.group))]) {
      const option = document.createElement('option');
      option.value = group;
      option.textContent = group;
      category.append(option);
    }
    player.querySelector('[data-loading]').hidden = true;
    player.querySelector('[data-controls]').hidden = false;
    updateOrder();
  }
  load().catch(() => {
    player.querySelector('[data-loading]').textContent = 'Interactive cards could not load here. Open the original deck below.';
  });
})();
