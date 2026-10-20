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
  let selectedTopic = null;
  const examTopicMap = {
    CT417: {
      'flashcards.html:0:0': ['Build and CI/CD'],
      'flashcards.html:0:1': ['Build and CI/CD'],
      'flashcards.html:0:2': ['Build and CI/CD'],
      'flashcards.html:0:3': ['Build and CI/CD', 'Docker deployment'],
      'flashcards.html:0:4': ['Build and CI/CD'],
      'flashcards.html:0:5': ['Docker deployment'],
      'flashcards.html:0:6': ['Git and team workflow'],
      'flashcards.html:1': ['Testing and security tools'],
      'flashcards.html:2': ['Vulnerabilities and reliability'],
      'flashcards.html:3': ['Refactoring and design patterns'],
      'flashcards.html:5': ['Requirements and change'],
    },
    CT4100: {
      'flashcards.html:0': ['Retrieval models'],
      'flashcards.html:1': ['Weighting and BM25'],
      'flashcards.html:2': ['Evaluation'],
      'flashcards.html:3': ['Relevance feedback'],
      'flashcards.html:4': ['Query difficulty'],
      'flashcards.html:5': ['Recommenders'],
      'flashcards.html:6': ['Similarity and clustering'],
      'flashcards.html:7': ['Extended Boolean retrieval'],
      'flashcards.html:8': ['Web search and ranking'],
      'flashcards.html:9': ['Web search and ranking'],
    },
    CT4101: {
      'flashcards.html:0': ['Learning tasks'],
      'flashcards.html:1': ['Model evaluation'],
      'flashcards.html:2': ['kNN and trees', 'Data preparation'],
      'flashcards.html:3': ['Data preparation'],
      'flashcards.html:4': ['Regression error', 'kNN and trees'],
      'flashcards.html:5': ['Neural networks'],
      'calculation_flashcards.html:0': ['Model evaluation'],
      'calculation_flashcards.html:1': ['kNN and trees', 'Data preparation'],
      'calculation_flashcards.html:2': ['Regression error', 'kNN and trees'],
      'calculation_flashcards.html:3': ['Neural networks'],
    },
    CT561: {
      'flashcards.html:0': ['Graphical integration'],
      'flashcards.html:1': ['Euler integration'],
      'flashcards.html:2': ['Feedback and backlog'],
      'flashcards.html:3': ['Feedback and backlog'],
      'flashcards.html:4': ['Fractional rates'],
      'flashcards.html:5': ['Stock management'],
      'flashcards.html:6': ['SIR models and policy'],
      'flashcards.html:7': ['SIR models and policy'],
    },
  };
  const topics = [...document.querySelectorAll('.study-topic-list > li')];
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
          topics: examTopicMap[moduleCode]?.[`${sourcePath}:${tableIndex}:${rowIndex}`] || examTopicMap[moduleCode]?.[`${sourcePath}:${tableIndex}`] || [],
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
      kind: item.dataset.kind === 'exam' ? 'exam' : 'lecture',
      topics: [item.dataset.group || 'Core concepts'],
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

  function setupTopicWorkspace() {
    const shell = document.querySelector('.study-space-shell');
    const lecturePanel = document.querySelector('.study-panel[aria-labelledby="lecture-heading"]');
    const topicList = lecturePanel?.querySelector('.study-topic-list');
    const cardPanel = player.closest('.study-panel');
    const slidesPanel = document.querySelector('.study-panel[aria-labelledby="slides-heading"]');
    const practicePanel = document.querySelector('.study-panel#practice');
    if (!shell || !topicList || !cardPanel || !slidesPanel || !practicePanel || !topics.length) return;

    const viewKey = `module-research-study-view-${moduleCode}-v1`;
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(viewKey) || '{}') || {}; } catch (_) { saved = {}; }
    if (typeof saved !== 'object' || Array.isArray(saved)) saved = {};
    if (!saved.sections || typeof saved.sections !== 'object' || Array.isArray(saved.sections)) saved.sections = {};
    const saveView = () => {
      try { localStorage.setItem(viewKey, JSON.stringify(saved)); } catch (_) { /* Storage may be blocked. */ }
    };

    const switcher = document.createElement('nav');
    switcher.className = 'study-topic-switcher';
    switcher.setAttribute('aria-label', 'Study topics');
    const topicViews = topics.map(topic => {
      const name = topic.querySelector('strong')?.textContent.trim() || 'Topic';
      const intro = [...topic.children].find(child => child.tagName === 'P');
      const answer = topic.querySelector('.study-answer');
      const writing = topic.querySelector('.study-write');
      const links = [...topic.querySelectorAll('.links a')];
      const canvasLinks = links.filter(link => link.href.startsWith('https://universityofgalway.instructure.com/'));
      const practiceLinks = links.filter(link => !canvasLinks.includes(link) && (link.href.includes('.pdf') || link.href.includes('most_asked') || link.href.includes('revision_questions')));
      const noteLinks = links.filter(link => !canvasLinks.includes(link) && !practiceLinks.includes(link));
      const count = cards.filter(card => card.topics.includes(name)).length;

      const header = document.createElement('div');
      header.className = 'study-topic-header';
      const heading = document.createElement('h3');
      heading.textContent = name;
      const countLabel = document.createElement('span');
      countLabel.className = 'study-topic-count';
      countLabel.textContent = `${count} cards`;
      heading.append(countLabel);
      const controls = document.createElement('fieldset');
      controls.className = 'study-topic-choices';
      const legend = document.createElement('legend');
      legend.textContent = 'Show in this topic';
      controls.append(legend);
      const content = document.createElement('div');
      content.className = 'study-topic-content';
      const inputs = {};
      const sections = {};

      function makeSection(key, label) {
        const section = document.createElement('section');
        section.className = `study-topic-section study-topic-${key}`;
        const title = document.createElement('h4');
        title.textContent = label;
        section.append(title);
        content.append(section);
        sections[key] = section;
        const choice = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = saved.sections[name]?.[key] ?? key !== 'slides';
        choice.append(input, document.createTextNode(label));
        controls.append(choice);
        inputs[key] = input;
        input.addEventListener('change', () => {
          if (key === 'cards' && input.checked) {
            category.value = name;
            statusFilter.value = 'all';
            if (sourceFilter) sourceFilter.value = 'all';
            current = 0;
            updateOrder();
          }
          render();
          saveView();
        });
        return section;
      }

      function addLinks(section, items) {
        if (!items.length) return;
        const list = document.createElement('div');
        list.className = 'study-resources';
        list.append(...items);
        section.append(list);
      }

      const notes = makeSection('notes', 'Topic notes');
      if (intro) notes.append(intro);
      addLinks(notes, noteLinks);
      const slides = canvasLinks.length ? makeSection('slides', 'Canvas slides') : null;
      if (slides) addLinks(slides, canvasLinks);
      const cardsSection = makeSection('cards', 'Flashcards');
      const practice = answer || writing || practiceLinks.length ? makeSection('practice', moduleCode === 'CT4111' ? 'Written practice' : 'Exam practice') : null;
      const practicePrompt = practice && intro ? intro.cloneNode(true) : null;
      if (practice) {
        if (practicePrompt) {
          practicePrompt.classList.add('study-practice-prompt');
          practice.append(practicePrompt);
        }
        if (writing) practice.append(writing);
        if (answer) practice.append(answer);
        addLinks(practice, practiceLinks);
      }

      const shortcuts = document.createElement('div');
      shortcuts.className = 'study-topic-shortcuts';
      for (const [label, visible] of [
        ['Show all', Object.keys(inputs)],
        ['Cards only', ['cards']],
        [moduleCode === 'CT4111' ? 'Written practice only' : 'Exam practice only', ['practice']],
      ]) {
        if (visible.some(key => !inputs[key])) continue;
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.addEventListener('click', () => {
          for (const [key, input] of Object.entries(inputs)) input.checked = visible.includes(key);
          if (visible.includes('cards')) {
            category.value = name;
            statusFilter.value = 'all';
            if (sourceFilter) sourceFilter.value = 'all';
            current = 0;
            updateOrder();
          }
          render();
          saveView();
        });
        shortcuts.append(button);
      }
      header.append(heading, controls, shortcuts);
      topic.replaceChildren(header, content);

      const switchButton = document.createElement('button');
      switchButton.type = 'button';
      switchButton.textContent = name;
      switcher.append(switchButton);

      function render() {
        for (const [key, section] of Object.entries(sections)) section.hidden = !inputs[key].checked;
        if (practicePrompt) practicePrompt.hidden = inputs.notes.checked;
        saved.sections[name] = Object.fromEntries(Object.entries(inputs).map(([key, input]) => [key, input.checked]));
      }
      render();
      return { name, topic, switchButton, inputs, sections, cardsSection, render };
    });

    topicList.before(switcher);
    const library = document.createElement('details');
    library.className = 'study-full-library';
    const libraryTitle = document.createElement('summary');
    libraryTitle.textContent = 'All slides, papers and topic guides';
    library.append(libraryTitle, slidesPanel, practicePanel);
    shell.append(library);
    shell.classList.add('study-topic-mode');
    category.closest('label').hidden = true;

    let activeView;
    function activate(view, scroll = false) {
      activeView = view;
      selectedTopic = view.name;
      saved.topic = view.name;
      for (const item of topicViews) {
        const active = item === view;
        item.topic.hidden = !active;
        item.switchButton.setAttribute('aria-current', active ? 'true' : 'false');
      }
      view.cardsSection.append(cardPanel);
      category.value = view.name;
      statusFilter.value = 'all';
      if (sourceFilter) sourceFilter.value = 'all';
      current = 0;
      updateOrder();
      saveView();
      if (scroll) lecturePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    for (const view of topicViews) view.switchButton.addEventListener('click', () => activate(view, true));
    activate(topicViews.find(view => view.name === saved.topic) || topicViews[0]);

    function openSection(key) {
      const input = activeView.inputs[key];
      if (!input) return;
      if (key === 'cards') {
        category.value = activeView.name;
        statusFilter.value = 'all';
        if (sourceFilter) sourceFilter.value = 'all';
        current = 0;
        updateOrder();
      }
      input.checked = true;
      activeView.render();
      saveView();
      requestAnimationFrame(() => activeView.sections[key].scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
    for (const [anchor, key] of [['#flashcards', 'cards'], ['#practice', 'practice']]) {
      for (const link of document.querySelectorAll(`.top-nav a[href="${anchor}"]`)) {
        link.addEventListener('click', event => { event.preventDefault(); openSection(key); });
      }
    }
    if (location.hash === '#flashcards') openSection('cards');
    if (location.hash === '#practice') openSection('practice');
  }

  function rating(card) {
    return ['practice', 'ready'].includes(ratings[card.id]) ? ratings[card.id] : 'new';
  }

  function updateOrder() {
    const selectedTopic = category.value;
    const selectedStatus = statusFilter.value;
    order = cards.map((_, index) => index).filter(index =>
      (selectedTopic === 'all' || (selectedTopic === 'other' ? !cards[index].topics.length : cards[index].topics.includes(selectedTopic))) &&
      (selectedStatus === 'all' || (selectedStatus === 'focus' ? rating(cards[index]) !== 'ready' : rating(cards[index]) === selectedStatus)) &&
      (!sourceFilter || sourceFilter.value === 'all' || cards[index].kind === sourceFilter.value)
    );
    current = Math.min(current, Math.max(0, order.length - 1));
    showCard();
  }

  function showCard() {
    const card = cards[order[current]];
    const scope = cards.filter(item =>
      (category.value === 'all' || (category.value === 'other' ? !item.topics.length : item.topics.includes(category.value))) &&
      (!sourceFilter || sourceFilter.value === 'all' || item.kind === sourceFilter.value)
    );
    const ready = scope.filter(item => rating(item) === 'ready').length;
    const practice = scope.filter(item => rating(item) === 'practice').length;
    progress.textContent = `${scope.length} cards · ${ready} ready · ${practice} needs practice · ${scope.length - ready - practice} not marked`;
    position.textContent = card ? `Card ${current + 1} of ${order.length} · ${card.kind === 'lecture' ? 'Lecture' : 'Exam'} · ${card.group}` : statusFilter.value === 'focus' && scope.length ? 'All cards in this selection are marked ready' : 'No cards match these filters';
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
    cards.push(...inlineCards());
    const sources = (player.dataset.decks || '').split(',').map(source => source.trim()).filter(Boolean);
    let failedDecks = 0;
    for (const result of await Promise.allSettled(sources.map(async source => {
      const response = await fetch(source);
      if (!response.ok) throw new Error(`Could not load ${source}`);
      return sourceCards(new DOMParser().parseFromString(await response.text(), 'text/html'), source);
    }))) {
      if (result.status === 'fulfilled') cards.push(...result.value);
      else failedDecks++;
    }
    if (!cards.length) throw new Error('No flashcards were found.');
    const bankSummary = document.createElement('p');
    bankSummary.className = 'study-bank-summary';
    const lectureCount = cards.filter(card => card.kind === 'lecture').length;
    bankSummary.textContent = `Module bank: ${cards.length} cards · ${lectureCount} lecture · ${cards.length - lectureCount} exam and reference`;
    player.querySelector('[data-controls]').prepend(bankSummary);
    if (failedDecks) {
      const warning = document.createElement('p');
      warning.className = 'study-deck-warning';
      warning.textContent = `${failedDecks} exam deck${failedDecks === 1 ? '' : 's'} could not load. Lecture cards are still available; use the printable links below for the full list.`;
      player.querySelector('[data-controls]').before(warning);
    }
    if (cards.some(card => card.kind === 'lecture') && cards.some(card => card.kind === 'exam')) {
      const label = document.createElement('label');
      label.textContent = 'Card source';
      sourceFilter = document.createElement('select');
      sourceFilter.setAttribute('aria-label', 'Card source');
      for (const [value, name] of [['all', 'All cards'], ['lecture', 'Lecture slides'], ['exam', 'Exam decks']]) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = name;
        sourceFilter.append(option);
      }
      label.append(sourceFilter);
      toolbar.prepend(label);
      sourceFilter.addEventListener('change', () => { current = 0; updateOrder(); });
    }
    const focusOption = document.createElement('option');
    focusOption.value = 'focus';
    focusOption.textContent = 'Weak + new';
    statusFilter.insertBefore(focusOption, statusFilter.querySelector('[value="new"]'));
    const focusButton = document.createElement('button');
    focusButton.type = 'button';
    focusButton.textContent = 'Review weak + new';
    focusButton.addEventListener('click', () => {
      category.value = selectedTopic || 'all';
      statusFilter.value = 'focus';
      if (sourceFilter) sourceFilter.value = 'all';
      current = 0;
      updateOrder();
      reveal.focus();
    });
    const allButton = document.createElement('button');
    allButton.type = 'button';
    allButton.textContent = 'Show full bank';
    allButton.addEventListener('click', () => {
      category.value = 'all';
      statusFilter.value = 'all';
      if (sourceFilter) sourceFilter.value = 'all';
      current = 0;
      updateOrder();
      reveal.focus();
    });
    toolbar.append(focusButton, allButton);
    for (const topic of topics) {
      const group = topic.querySelector('strong')?.textContent.trim();
      if (!group || !cards.some(card => card.topics.includes(group))) continue;
      const option = document.createElement('option');
      option.value = group;
      option.textContent = group;
      category.append(option);
    }
    if (cards.some(card => !card.topics.length)) {
      const option = document.createElement('option');
      option.value = 'other';
      option.textContent = 'Other exam topics';
      category.append(option);
    }
    player.querySelector('[data-loading]').hidden = true;
    player.querySelector('[data-controls]').hidden = false;
    setupTopicWorkspace();
    if (selectedTopic) allButton.textContent = 'Browse all module cards';
    updateOrder();
  }
  load().catch(() => {
    player.querySelector('[data-loading]').textContent = 'Interactive cards could not load here. Open the original deck below.';
  });
})();
