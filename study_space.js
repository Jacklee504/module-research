/* Exam study space: renders a module's study page from the shared data
   layer, then runs the drill. Progress is stored per module in this
   browser so a later session can resume or show what still needs work. */
(() => {
  const shell = document.querySelector('[data-study-space]');
  if (!shell) return;

  const moduleCode = shell.dataset.module;
  const dataUrl = `../study_data/${moduleCode}.json`;
  const storageKey = `module-research-study-v2-${moduleCode}`;

  const QUESTION_LINE = /^Q\d/;
  const QUESTION_SPLIT = /^(Q\d+):\s*(.*)$/;
  const TEXT_FIELD = /input, textarea, select/;

  const store = {
    read() {
      try {
        const value = JSON.parse(localStorage.getItem(storageKey) || '{}');
        return value && typeof value === 'object' ? value : {};
      } catch (_) {
        return {};
      }
    },
    write(value) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(value));
      } catch (_) {
        /* Storage may be blocked; the page still works without it. */
      }
    },
  };

  const state = store.read();
  if (!state.cards) state.cards = {};
  if (!state.practice) state.practice = {};
  if (!state.families) state.families = {};
  if (!state.topic) state.topic = 'all';
  if (new URLSearchParams(window.location.search).get('cards') === 'weak') {
    state.status = 'weak';
  }

  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  const plural = (count, word) => `${count} ${count === 1 ? word : word === 'family' ? 'families' : word + 's'}`;

  function countCards(data) {
    return (data.decks || []).reduce((total, deck) => total + deck.cards.length, 0);
  }

  function buildExamBriefing(data) {
    const details = data.details || {};
    const panel = make('section', 'study-panel study-briefing');
    panel.setAttribute('aria-labelledby', 'briefing-heading');
    const head = make('div', 'study-panel-head');
    const title = make('h2', null, moduleCode === 'CT4111' ? 'Assessment briefing' : 'Exam briefing');
    title.id = 'briefing-heading';
    head.append(title);
    if (details.assessment) {
      head.append(make('span', 'study-badge', details.assessment));
    }
    panel.append(head);

    const grid = make('div', 'study-briefing-grid');
    const facts = [
      ['Predictability', details.predictability || 'Not established'],
      ['Papers in archive', details.papers && details.papers.length
        ? String(details.papers.length)
        : 'None locally'],
      [moduleCode === 'CT4111' ? 'Outcome areas' : 'Question families', String(data.families.length)],
      ['Cards to drill', String(countCards(data))],
    ];
    for (const [label, value] of facts) {
      const cell = make('div', 'study-fact');
      cell.append(make('span', null, label), make('strong', null, value));
      grid.append(cell);
    }
    panel.append(grid);

    if (details.exam_pattern) {
      panel.append(make('p', 'study-briefing-pattern', details.exam_pattern));
    }

    const structure = (details.exam_block || []).filter(line => QUESTION_LINE.test(line));
    if (structure.length) {
      const list = make('ul', 'study-structure');
      for (const line of structure) {
        const match = line.match(QUESTION_SPLIT);
        const item = make('li');
        item.append(make('strong', null, match ? match[1] : 'Question'));
        item.append(document.createTextNode(' ' + (match ? match[2] : line)));
        list.append(item);
      }
      panel.append(list);
    }

    const drill = details.drill || [];
    if (drill.length) {
      const block = make('details', 'study-drill-list');
      block.append(make('summary', null, 'What the papers keep asking'));
      const list = make('ul');
      for (const item of drill) {
        list.append(make('li', null, item));
      }
      block.append(list);
      panel.append(block);
    }
    return panel;
  }

  function buildPracticeList(data) {
    const panel = make('section', 'study-panel');
    panel.setAttribute('aria-labelledby', 'practice-heading');
    const head = make('div', 'study-panel-head');
    const title = make('h2', null, moduleCode === 'CT4111' ? 'Outcome-led practice' : 'Exam practice');
    title.id = 'practice-heading';
    head.append(title);

    const prompts = [];
    for (const sheet of data.sheets || []) {
      for (const practice of sheet.practice || []) {
        prompts.push({ ...practice, sheet: sheet.file, sheetTitle: sheet.title });
      }
      for (const structure of sheet.structure || []) {
        prompts.push({ ...structure, sheet: sheet.file, sheetTitle: sheet.title });
      }
    }
    const total = prompts.reduce((sum, item) => sum + (item.marks || 0), 0);
    head.append(make('span', 'study-badge',
      `${plural(prompts.length, 'prompt')}${total ? ` · ${total} marks` : ''}`));
    panel.append(head);
    panel.append(make('p', 'study-panel-note', moduleCode === 'CT4111'
      ? 'These questions follow official outcomes, not past papers. No exam wording or marks are claimed. Write an answer before opening the checklist.'
      : 'Each prompt keeps the mark allocation from the local material. Write the answer first, then open the plan and self-mark against it.'));

    if (!prompts.length) {
      panel.append(make('p', 'study-empty', 'No practice prompts are recorded for this module yet.'));
      return panel;
    }

    const list = make('ol', 'study-practice-list');
    prompts.forEach((item, index) => {
      list.append(buildPracticeItem(item, index));
    });
    panel.append(list);
    return panel;
  }

  function buildPracticeItem(item, index) {
    const id = `${item.sheet}#${index}`;
    const wrapper = make('li', 'study-practice');
    const head = make('div', 'study-practice-head');
    head.append(make('span', 'study-practice-index', String(index + 1)));
    head.append(make('p', 'study-practice-title', item.title || item.prompt));
    if (item.marks) {
      head.append(make('span', 'study-marks', `${item.marks} marks`));
    }
    wrapper.append(head);

    if (item.prompt) {
      const prompt = make('p', 'study-practice-prompt');
      prompt.append(make('span', 'study-label', 'Question'));
      prompt.append(document.createTextNode(' ' + item.prompt));
      wrapper.append(prompt);
    }

    const answer = make('details', 'study-practice-answer');
    answer.append(make('summary', null, moduleCode === 'CT4111'
      ? 'Open the answer checklist' : 'Open the answer plan and self-mark'));
    const body = make('div', 'study-practice-body');
    if (item.route) {
      const route = make('p');
      route.append(make('span', 'study-label', moduleCode === 'CT4111' ? 'Checklist' : 'Fastest route'));
      route.append(document.createTextNode(' ' + item.route));
      body.append(route);
    }
    if (item.answer) {
      const answerText = make('p');
      answerText.append(make('span', 'study-label', 'Model answer'));
      answerText.append(document.createTextNode(' ' + item.answer));
      body.append(answerText);
    }
    if (!body.childNodes.length) {
      body.append(make('p', 'study-empty', 'Open the linked topic guide for the full worked method.'));
    }
    answer.append(body);
    wrapper.append(answer);

    const links = make('p', 'study-practice-links');
    const link = make('a', null, item.sheetTitle || item.sheet);
    link.href = item.sheet;
    links.append(link);
    wrapper.append(links);

    const actions = make('div', 'study-practice-actions');
    const mark = make('button', 'study-mark-button',
      state.practice[id] === 'done' ? 'Attempted' : 'Mark as attempted');
    mark.type = 'button';
    mark.setAttribute('aria-pressed', String(state.practice[id] === 'done'));
    mark.addEventListener('click', () => {
      if (state.practice[id] === 'done') {
        delete state.practice[id];
      } else {
        state.practice[id] = 'done';
      }
      store.write(state);
      const done = state.practice[id] === 'done';
      mark.textContent = done ? 'Attempted' : 'Mark as attempted';
      mark.setAttribute('aria-pressed', String(done));
      updateProgress();
    });
    actions.append(mark);
    wrapper.append(actions);
    return wrapper;
  }

  function buildFamilyList(data) {
    const panel = make('section', 'study-panel');
    panel.id = 'lecture-heading';
    panel.setAttribute('aria-labelledby', 'families-heading');
    const head = make('div', 'study-panel-head');
    const title = make('h2', null, moduleCode === 'CT4111' ? 'Official outcome areas' : 'Recurring question families');
    title.id = 'families-heading';
    head.append(title);
    head.append(make('span', 'study-badge', plural(data.families.length, 'family')));
    panel.append(head);
    panel.append(make('p', 'study-panel-note', moduleCode === 'CT4111'
      ? 'Ordered by the seven official learning outcomes. Open an area for its answer checklist, then attempt the related scenarios.'
      : 'Ordered by how often the local papers ask the family. Open a family to see the exact question parts and the reusable answer.'));

    const list = make('ol', 'study-family-list');
    for (const family of data.families) {
      list.append(buildFamilyItem(family));
    }
    panel.append(list);
    return panel;
  }

  function buildFamilyItem(family) {
    const wrapper = make('li', 'study-family');
    const head = make('div', 'study-family-head');
    if (family.rank) {
      head.append(make('span', 'study-family-rank', `Priority ${family.rank}`));
    }
    head.append(make('h3', 'study-family-title', family.title));
    if (family.frequency) {
      head.append(make('span', 'study-badge', `${family.frequency} papers`));
    }
    if (family.marks) {
      head.append(make('span', 'study-badge', `${family.marks} marks`));
    }
    wrapper.append(head);

    if (family.appearances && family.appearances.length) {
      const details = make('details', 'study-family-evidence');
      details.append(make('summary', null, `Where it appears (${family.appearances.length} parts)`));
      const list = make('ul');
      for (const item of family.appearances) {
        list.append(make('li', null, item));
      }
      details.append(list);
      wrapper.append(details);
    }

    if (family.question) {
      const question = make('p', 'study-family-question');
      question.append(make('span', 'study-label', moduleCode === 'CT4111' ? 'Official outcome' : 'Consolidated question'));
      question.append(document.createTextNode(' ' + family.question));
      wrapper.append(question);
    }

    if (family.answer) {
      const answer = make('details', 'study-family-answer');
      answer.append(make('summary', null, moduleCode === 'CT4111' ? 'Answer checklist' : 'Reusable answer frame'));
      answer.append(make('p', null, family.answer));
      wrapper.append(answer);
    }

    const actions = make('div', 'study-family-actions');
    const key = family.id;
    const mark = make('button', 'study-mark-button',
      state.families[key] === 'done' ? 'Confident' : 'Mark confident');
    mark.type = 'button';
    mark.setAttribute('aria-pressed', String(state.families[key] === 'done'));
    mark.addEventListener('click', () => {
      if (state.families[key] === 'done') {
        delete state.families[key];
      } else {
        state.families[key] = 'done';
      }
      store.write(state);
      const done = state.families[key] === 'done';
      mark.textContent = done ? 'Confident' : 'Mark confident';
      mark.setAttribute('aria-pressed', String(done));
      updateProgress();
    });
    actions.append(mark);
    wrapper.append(actions);
    return wrapper;
  }

  function buildCardDrill(data) {
    const panel = make('section', 'study-panel study-drill-panel');
    panel.id = 'flashcards';
    panel.setAttribute('aria-labelledby', 'drill-heading');
    const head = make('div', 'study-panel-head');
    const title = make('h2', null, 'Card drill');
    title.id = 'drill-heading';
    head.append(title);
    head.append(make('span', 'study-badge', `${countCards(data)} cards`));
    panel.append(head);
    panel.append(make('p', 'study-panel-note',
      'Answer before revealing. Arrow keys move, Space reveals, 1 marks a card weak and 2 marks it confident. Weak cards stay in the queue.'));

    const toolbar = make('div', 'study-drill-toolbar');
    const groupSelect = make('select');
    groupSelect.setAttribute('aria-label', 'Card topic');
    const allOption = make('option', null, 'All topics');
    allOption.value = 'all';
    groupSelect.append(allOption);
    const groups = new Set();
    for (const deck of data.decks || []) {
      for (const card of deck.cards) groups.add(card.group);
    }
    for (const group of [...groups].sort()) {
      const option = make('option', null, group);
      option.value = group;
      groupSelect.append(option);
    }
    groupSelect.value = state.topic;
    groupSelect.addEventListener('change', () => {
      state.topic = groupSelect.value;
      store.write(state);
      rebuildOrder();
      render();
    });
    toolbar.append(groupSelect);

    const statusSelect = make('select');
    statusSelect.setAttribute('aria-label', 'Review status');
    for (const [value, label] of [['all', 'All cards'], ['weak', 'Weak + new'], ['ready', 'Confident only']]) {
      const option = make('option', null, label);
      option.value = value;
      statusSelect.append(option);
    }
    statusSelect.value = state.status || 'all';
    statusSelect.addEventListener('change', () => {
      state.status = statusSelect.value;
      store.write(state);
      rebuildOrder();
      render();
    });
    toolbar.append(statusSelect);

    const shuffle = make('button', 'study-tool-button', 'Shuffle');
    shuffle.type = 'button';
    shuffle.addEventListener('click', () => {
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      position = 0;
      render();
    });
    toolbar.append(shuffle);
    panel.append(toolbar);

    const progress = make('p', 'study-drill-progress');
    progress.setAttribute('aria-live', 'polite');
    panel.append(progress);

    const face = make('div', 'study-card-face');
    const question = make('div', 'study-card-front');
    face.append(question);
    const answer = make('div', 'study-card-back');
    answer.hidden = true;
    face.append(answer);
    panel.append(face);

    const evidence = make('p', 'study-card-evidence');
    panel.append(evidence);

    const actions = make('div', 'study-card-actions');
    const previous = make('button', 'study-tool-button', 'Previous');
    previous.type = 'button';
    const reveal = make('button', 'study-tool-button study-tool-primary', 'Reveal answer');
    reveal.type = 'button';
    const next = make('button', 'study-tool-button', 'Next');
    next.type = 'button';
    const weak = make('button', 'study-tool-button study-tool-weak', 'Needs practice');
    weak.type = 'button';
    const ready = make('button', 'study-tool-button study-tool-ready', 'Got it');
    ready.type = 'button';
    actions.append(previous, reveal, next, weak, ready);
    panel.append(actions);

    panel.append(make('p', 'study-keyboard-hint',
      'Shortcuts: Space reveals, left and right arrows move, 1 marks weak, 2 marks confident.'));

    const cards = [];
    for (const deck of data.decks || []) {
      for (const card of deck.cards) {
        cards.push({ ...card, id: `${deck.file}#${cards.length}` });
      }
    }
    let order = [];
    let position = 0;
    let revealed = false;

    const rating = id => (state.cards[id] === 'weak' ? 'weak'
      : state.cards[id] === 'ready' ? 'ready' : 'new');

    function rebuildOrder() {
      const group = groupSelect.value;
      const status = statusSelect.value;
      order = cards.map((_, index) => index).filter(index => {
        const card = cards[index];
        if (group !== 'all' && card.group !== group) return false;
        if (status === 'weak') return rating(card.id) !== 'ready';
        if (status === 'ready') return rating(card.id) === 'ready';
        return true;
      });
      position = Math.min(position, Math.max(0, order.length - 1));
    }

    function render() {
      const card = cards[order[position]];
      const scope = cards.filter(item =>
        groupSelect.value === 'all' || item.group === groupSelect.value);
      const ready = scope.filter(item => rating(item.id) === 'ready').length;
      const weak = scope.filter(item => rating(item.id) === 'weak').length;
      progress.textContent = scope.length
        ? `${scope.length} cards in scope · ${ready} confident · ${weak} need practice · ${scope.length - ready - weak} unmarked`
        : 'No cards match this filter.';

      question.replaceChildren();
      answer.replaceChildren();
      answer.hidden = true;
      evidence.textContent = '';
      revealed = false;
      reveal.textContent = 'Reveal answer';

      if (!card) {
        question.append(document.createTextNode('Nothing to drill here yet.'));
        previous.disabled = true;
        next.disabled = true;
        reveal.disabled = true;
        weak.disabled = true;
        ready.disabled = true;
        return;
      }
      previous.disabled = position === 0;
      next.disabled = position === order.length - 1;
      reveal.disabled = false;
      weak.disabled = false;
      ready.disabled = false;

      question.append(make('span', 'study-card-group', card.group));
      question.append(make('p', 'study-card-question', card.front));
      answer.append(make('p', null, card.back));
      if (card.evidence) {
        evidence.append(document.createTextNode(`Appears in: ${card.evidence}`));
      }
      if (card.source_url) {
        if (card.evidence) evidence.append(document.createTextNode(' · '));
        const link = make('a', null, card.source || 'Open lecture in Canvas');
        link.href = card.source_url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        evidence.append(link);
      }
    }

    function move(step) {
      position = Math.max(0, Math.min(order.length - 1, position + step));
      render();
    }

    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    reveal.addEventListener('click', () => {
      revealed = !revealed;
      answer.hidden = !revealed;
      reveal.textContent = revealed ? 'Hide answer' : 'Reveal answer';
    });
    weak.addEventListener('click', () => rate('weak'));
    ready.addEventListener('click', () => rate('ready'));

    function rate(value) {
      const card = cards[order[position]];
      if (!card) return;
      if (state.cards[card.id] === value) {
        delete state.cards[card.id];
      } else {
        state.cards[card.id] = value;
      }
      store.write(state);
      rebuildOrder();
      render();
    }

    document.addEventListener('keydown', event => {
      if (event.target.matches(TEXT_FIELD)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === ' ') {
        event.preventDefault();
        reveal.click();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        move(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        move(-1);
      } else if (event.key === '1') {
        event.preventDefault();
        rate('weak');
      } else if (event.key === '2') {
        event.preventDefault();
        rate('ready');
      }
    });

    rebuildOrder();
    render();
    return panel;
  }

  function buildMistakePanel(data) {
    const mistakes = [];
    for (const sheet of data.sheets || []) {
      for (const mistake of sheet.mistakes || []) {
        mistakes.push({ text: mistake, sheet: sheet.file, title: sheet.title });
      }
    }
    if (!mistakes.length) return null;
    const panel = make('section', 'study-panel');
    panel.setAttribute('aria-labelledby', 'mistakes-heading');
    const head = make('div', 'study-panel-head');
    const title = make('h2', null, 'Known traps');
    title.id = 'mistakes-heading';
    head.append(title);
    head.append(make('span', 'study-badge', plural(mistakes.length, 'trap')));
    panel.append(head);
    panel.append(make('p', 'study-panel-note',
      'Errors the topic guides flag as repeated. Read these before you attempt the matching family.'));
    const list = make('ul', 'study-mistake-list');
    for (const mistake of mistakes) {
      const item = make('li');
      item.append(make('p', null, mistake.text));
      const link = make('a', null, mistake.title);
      link.href = mistake.sheet;
      item.append(link);
      list.append(item);
    }
    panel.append(list);
    return panel;
  }

  function buildGuidePanel(data) {
    const guides = data.sheets || [];
    if (!guides.length) return null;
    const panel = make('section', 'study-panel');
    panel.setAttribute('aria-labelledby', 'guides-heading');
    const head = make('div', 'study-panel-head');
    const title = make('h2', null, 'Topic guides');
    title.id = 'guides-heading';
    head.append(title);
    head.append(make('span', 'study-badge', plural(guides.length, 'guide')));
    panel.append(head);
    panel.append(make('p', 'study-panel-note',
      'Each guide holds the worked method, the graduated practice and the traps for one topic.'));
    const list = make('ul', 'study-guide-list');
    for (const guide of guides) {
      const item = make('li');
      const link = make('a', null, guide.title);
      link.href = guide.file;
      item.append(link);
      if (guide.purpose) {
        item.append(make('p', 'study-guide-purpose', guide.purpose));
      }
      if (guide.practice && guide.practice.length) {
        const marks = guide.practice.reduce((sum, entry) => sum + (entry.marks || 0), 0);
        item.append(make('span', 'study-badge',
          `${plural(guide.practice.length, 'practice prompt')}${marks ? ` · ${marks} marks` : ''}`));
      }
      list.append(item);
    }
    panel.append(list);
    return panel;
  }

  function buildProgressPanel() {
    const panel = make('section', 'study-panel study-progress-panel');
    panel.setAttribute('aria-labelledby', 'progress-heading');
    const head = make('div', 'study-panel-head');
    const title = make('h2', null, 'Your progress');
    title.id = 'progress-heading';
    head.append(title);
    panel.append(head);
    const body = make('div', 'study-progress-body');
    panel.append(body);

    const reset = make('button', 'study-tool-button', 'Reset this module');
    reset.type = 'button';
    reset.addEventListener('click', () => {
      for (const key of Object.keys(state)) delete state[key];
      state.cards = {};
      state.practice = {};
      state.families = {};
      state.topic = 'all';
      store.write(state);
      window.location.reload();
    });
    panel.append(reset);

    panel.update = () => {
      const rated = Object.keys(state.cards);
      const weak = rated.filter(id => state.cards[id] === 'weak').length;
      const ready = rated.filter(id => state.cards[id] === 'ready').length;
      const families = Object.keys(state.families).length;
      const practice = Object.keys(state.practice).length;
      body.replaceChildren();
      const grid = make('div', 'study-briefing-grid');
      for (const [label, value] of [
        ['Cards confident', String(ready)],
        ['Cards needing practice', String(weak)],
        [moduleCode === 'CT4111' ? 'Outcome areas confident' : 'Families confident', String(families)],
        ['Prompts attempted', String(practice)],
      ]) {
        const cell = make('div', 'study-fact');
        cell.append(make('span', null, label), make('strong', null, value));
        grid.append(cell);
      }
      body.append(grid);
      if (!rated.length && !families && !practice) {
        body.append(make('p', 'study-empty',
          'Nothing marked yet. Ratings and attempts are saved in this browser only.'));
      }
    };
    return panel;
  }

  function updateProgress() {
    const panel = document.querySelector('.study-progress-panel');
    if (panel && panel.update) panel.update();
  }

  async function load() {
    let data;
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) throw new Error('missing data');
      data = await response.json();
    } catch (_) {
      shell.innerHTML = '<p class="study-empty">This study space could not load its data. '
        + 'The <a href="details.html">module details</a> and printable guides are still available.</p>';
      return;
    }

    const code = data.code || moduleCode;
    try { localStorage.setItem('module-research-home-last-v1', code); } catch (_) { /* Navigation still works. */ }
    const heading = shell.parentElement.querySelector('h1');
    if (heading) heading.textContent = data.name || code;
    const eyebrow = shell.parentElement.querySelector('.eyebrow');
    if (eyebrow) eyebrow.textContent = `${code} · Exam Study Space`;

    const progress = buildProgressPanel();
    shell.append(buildExamBriefing(data));
    shell.append(buildFamilyList(data));
    shell.append(buildPracticeList(data));
    shell.append(buildCardDrill(data));
    const mistakes = buildMistakePanel(data);
    if (mistakes) shell.append(mistakes);
    const guides = buildGuidePanel(data);
    if (guides) shell.append(guides);
    shell.append(progress);
    progress.update();
    if (window.location.hash) {
      requestAnimationFrame(() => {
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
      });
    }
  }

  load();
})();
