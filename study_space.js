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
  const toolbar = player.querySelector('.flashcard-toolbar');
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
  let sourceFilter;
  const draftKey = `module-research-written-${moduleCode}-v1`;
  let drafts = {};
  try { drafts = JSON.parse(localStorage.getItem(draftKey) || '{}') || {}; } catch (_) { drafts = {}; }

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
          kind: 'exam',
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
    const topics = [...document.querySelectorAll('.study-topic-list > li')];
    return [...template.content.querySelectorAll('[data-flashcard]')].map((item, index) => ({
      id: `inline:${index}`,
      group: item.dataset.group || 'Core concepts',
      kind: 'lecture',
      front: item.querySelector('[data-card-front]'),
      back: item.querySelector('[data-card-back]'),
      evidence: item.dataset.evidence || '',
      source: item.dataset.sourceUrl || topics.find(topic => topic.querySelector('strong')?.textContent.trim() === item.dataset.group)?.querySelector('a[href^="https://universityofgalway.instructure.com/"]')?.href || '',
    }));
  }

  function addWrittenPractice() {
    for (const topic of document.querySelectorAll('.study-topic-list > li')) {
      const group = topic.querySelector('strong')?.textContent.trim();
      const answerPlan = topic.querySelector('.study-answer');
      if (!group || !answerPlan) continue;
      const practice = document.createElement('details');
      practice.className = 'study-write';
      const summary = document.createElement('summary');
      summary.textContent = 'Write an answer';
      const label = document.createElement('label');
      label.textContent = 'Your draft';
      const input = document.createElement('textarea');
      input.rows = 5;
      input.value = typeof drafts[group] === 'string' ? drafts[group] : '';
      input.setAttribute('aria-label', `Your answer for ${group}`);
      const clear = document.createElement('button');
      clear.type = 'button';
      clear.textContent = 'Clear draft';
      const note = document.createElement('span');
      note.textContent = 'Saved in this browser';
      function save() {
        if (input.value) drafts[group] = input.value;
        else delete drafts[group];
        try { localStorage.setItem(draftKey, JSON.stringify(drafts)); }
        catch (_) { note.textContent = 'Local saving unavailable'; }
      }
      input.addEventListener('input', save);
      clear.addEventListener('click', () => { input.value = ''; save(); input.focus(); });
      label.append(input);
      practice.append(summary, label, clear, note);
      answerPlan.before(practice);
    }
  }

  function rating(card) {
    return ['practice', 'ready'].includes(ratings[card.id]) ? ratings[card.id] : 'new';
  }

  function updateOrder() {
    const selectedGroup = category.value;
    const selectedStatus = statusFilter.value;
    order = cards.map((_, index) => index).filter(index =>
      (selectedGroup === 'all' || cards[index].group === selectedGroup) &&
      (selectedStatus === 'all' || rating(cards[index]) === selectedStatus) &&
      (!sourceFilter || sourceFilter.value === 'all' || cards[index].kind === sourceFilter.value)
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
    evidence.replaceChildren();
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
      if (card.kind === 'lecture' && card.source) {
        const link = document.createElement('a');
        link.href = card.source;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Open source lecture in Canvas';
        evidence.append(link);
      } else if (card.evidence) {
        evidence.textContent = `Evidence: ${card.evidence}`;
      }
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
    addWrittenPractice();
    const sources = (player.dataset.decks || '').split(',').map(source => source.trim()).filter(Boolean);
    for (const result of await Promise.allSettled(sources.map(async source => {
      const response = await fetch(source);
      if (!response.ok) throw new Error(`Could not load ${source}`);
      return sourceCards(new DOMParser().parseFromString(await response.text(), 'text/html'), source);
    }))) {
      if (result.status === 'fulfilled') cards.push(...result.value);
    }
    cards.push(...inlineCards());
    if (!cards.length) throw new Error('No flashcards were found.');
    if (cards.some(card => card.kind === 'lecture') && cards.some(card => card.kind === 'exam')) {
      const label = document.createElement('label');
      label.textContent = 'Card source';
      sourceFilter = document.createElement('select');
      sourceFilter.setAttribute('aria-label', 'Card source');
      for (const [value, name] of [['all', 'All cards'], ['lecture', 'Lecture slides'], ['exam', 'Exam deck']]) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = name;
        sourceFilter.append(option);
      }
      label.append(sourceFilter);
      toolbar.prepend(label);
      sourceFilter.value = 'lecture';
      sourceFilter.addEventListener('change', () => { current = 0; updateOrder(); });
    }
    for (const group of [...new Set(cards.map(card => card.group))]) {
      const option = document.createElement('option');
      option.value = group;
      option.textContent = group;
      category.append(option);
    }
    for (const topic of document.querySelectorAll('.study-topic-list > li')) {
      const group = topic.querySelector('strong')?.textContent.trim();
      if (!cards.some(card => card.kind === 'lecture' && card.group === group)) continue;
      const links = topic.querySelector('.links');
      if (!links) continue;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'study-topic-drill';
      button.textContent = 'Study slide cards';
      button.addEventListener('click', () => {
        category.value = group;
        statusFilter.value = 'all';
        if (sourceFilter) sourceFilter.value = 'lecture';
        current = 0;
        updateOrder();
        document.querySelector('#flashcards')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        reveal.focus({ preventScroll: true });
      });
      links.append(button);
    }
    player.querySelector('[data-loading]').hidden = true;
    player.querySelector('[data-controls]').hidden = false;
    updateOrder();
  }
  load().catch(() => {
    player.querySelector('[data-loading]').textContent = 'Interactive cards could not load here. Open the original deck below.';
  });
})();
