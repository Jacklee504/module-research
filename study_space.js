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
      if (panel.closest('details') && (!panel.closest('details').open || !panel.contains(document.activeElement))) return;
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

  const PAPER_MODULES = new Set(['CT417', 'CT4100', 'CT4101', 'CT561']);
  const FOCUSED_MODULES = new Set([...PAPER_MODULES, 'CT4111']);

  function archivedFamilies(data, year, number) {
    const question = new RegExp(`\\bQ${number}(?!\\d)`, 'i');
    const dated = (data.families || []).filter(family =>
      (family.appearances || []).some(appearance =>
        appearance.includes(year) && question.test(appearance)));
    if (dated.length || moduleCode !== 'CT417' || year !== '2023/24') return dated;
    return (data.families || []).filter(family =>
      (family.appearances || []).some(appearance =>
        !/\d{4}\/\d{2}/.test(appearance) && question.test(appearance)));
  }

  function archivedCards(data, families) {
    const terms = text => new Set((text.toLowerCase().match(/[a-z0-9]+/g) || [])
      .filter(word => word.length > 3 && !['with', 'from', 'using', 'their', 'this', 'that', 'what'].includes(word)));
    const topicTerms = terms(families.map(family => family.title).join(' '));
    if (!topicTerms.size) return [];
    const cards = (data.decks || []).flatMap(deck => deck.cards);
    return cards.map((card, index) => {
      const group = terms(card.group || '');
      const front = terms(card.front || '');
      const score = [...topicTerms].reduce((sum, word) => sum + (group.has(word) ? 3 : 0) + (front.has(word) ? 1 : 0), 0);
      return { index, score };
    }).filter(card => card.score >= 3)
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, 3).map(card => card.index);
  }

  const FAMILY_SOURCE_OVERRIDES = {
    CT417: {
      'agile-manifesto-scrum-changing-requirements-and-stakeholder-collaboration': [['2023/24', 1]],
      'formal-specification-and-z-style-cursor-schemas': [['2023/24', 2]],
    },
    CT4100: {
      hits: [['2025/26', 3]],
      'learning-to-rank-and-neural-ltr': [['2025/26', 4]],
      pagerank: [['2025/26', 3]],
    },
    CT4101: {
      'reinforcement-learning-and-q-learning': [['2019/20', 1]],
      'bayesian-networks-and-naive-bayes': [['2019/20', 5]],
    },
  };

  const FAMILY_TITLES = {
    'ci-cd-github-actions-docker-deployment-and-git-workflows': 'CI/CD and failed deployments',
    'sast-dast-sonarqube-owasp-zap-and-coverage': 'Security scans and coverage',
    'vulnerability-countermeasures-zero-day-lifecycle-metrics-and-buffer-overflow': 'Vulnerabilities and buffer overflows',
    'refactoring-design-patterns-polymorphism-factory-pattern-and-open-closed-principle': 'Refactoring with design patterns',
    'agile-manifesto-scrum-changing-requirements-and-stakeholder-collaboration': 'Agile delivery and stakeholders',
    'formal-specification-and-z-style-cursor-schemas': 'Formal specification',
    'vector-space-model-normalisation-and-term-independence': 'Vector space ranking',
    'term-weighting-axioms-and-learned-weights': 'Term weighting and BM25',
    'retrieval-evaluation-user-experience-map-and-diversity': 'Retrieval evaluation',
    'relevance-feedback-pseudo-feedback-and-query-expansion': 'Relevance feedback and expansion',
    'query-difficulty-prediction': 'Predicting query difficulty',
    'collaborative-filtering-and-recommender-system-evaluation': 'Collaborative filtering',
    'scientific-article-similarity': 'Scientific article similarity',
    'clustering-for-information-retrieval': 'Clustering for search',
    'extended-boolean-relevance-and-precision-recall-graphs': 'Extended Boolean calculation',
    hits: 'HITS and PageRank',
    'learning-to-rank-and-neural-ltr': 'Learning to rank',
    'ml-task-types-labels-and-suitable-algorithms': 'Choosing the ML task',
    'evaluation-confusion-matrices-roc-cross-validation-and-hyperparameters': 'Evaluating and tuning a classifier',
    'generalisation-bias-variance-overfitting-underfitting-dimensionality-and-learning-curves': 'Generalisation and overfitting',
    'regression-models-and-error-metrics': 'Regression and error measures',
    'neural-network-basics-activation-functions-and-encoding': 'Neurons, activations and encoding',
    'lazy-versus-eager-learning': 'Lazy and eager learning',
    'graphical-integration-euler-method-and-error': 'Graphical integration and Euler',
    'workload-backlog-model-feedback-polarity-and-policy-analysis': 'Backlogs and feedback loops',
    'sir-public-health-calculations-proofs-and-extensions': 'SIR models and interventions',
    'stock-management-staff-recruitment-and-ageing-chains': 'Stock management and workforce',
    'fractional-rates-adjustment-to-a-goal-and-smoothing': 'Fractional rates and smoothing',
  };

  const THEME_SCENARIOS = {
    'vulnerability-countermeasures-zero-day-lifecycle-metrics-and-buffer-overflow': {
      prompt: 'Define vulnerability, countermeasure and zero-day. Three incidents have MTTD/MTTR of 4/2, 0.5/1 and 6/4 hours. Assuming MTBF = MTTD + MTTR for each incident, calculate the average MTBF, identify the best incident and suggest two improvements. Explain a buffer overflow and two countermeasures.',
      answer: 'Incident MTBF values under the paper’s stated assumption are 6, 1.5 and 10 hours. Average = (6 + 1.5 + 10) / 3 = 5.83 hours, or 5 hours 50 minutes. Incident 2 has the shortest detection and repair times. Improve alert correlation/automated monitoring to reduce MTTD and prepare tested response or patch procedures to reduce MTTR.',
    },
    'refactoring-design-patterns-polymorphism-factory-pattern-and-open-closed-principle': {
      prompt: 'A controller repeats login and account-creation code for Customer and Manager, using role-string conditionals. Explain the design problems, refactor the responsibilities using a User abstraction, subclasses and a factory, then show how adding Admin can avoid editing the factory method.',
    },
    'agile-manifesto-scrum-changing-requirements-and-stakeholder-collaboration': {
      prompt: 'A team’s requirements and data sources change during delivery, while stakeholders question model reliability. State two Agile values or principles, then explain how short iterations and stakeholder collaboration would change planning, validation and delivery.',
    },
    'formal-specification-and-z-style-cursor-schemas': {
      prompt: 'A terminal has 24 lines and 80 columns. Its cursor starts at (line 1, column 1); pressing Down moves one line unless it is already on line 24, where it does nothing. Give three benefits of formal specification, the state invariant and initial state, and normal and bottom-line Down operations.',
      answer: 'Formal specification reduces ambiguity, exposes inconsistent requirements and supports precise validation. State invariant: 1 ≤ line ≤ 24 and 1 ≤ column ≤ 80. Init: line = 1, column = 1. DownNormal precondition line < 24: line′ = line + 1 and column′ = column. DownAtBottom precondition line = 24: line′ = 24 and column′ = column. The full Down operation chooses the applicable case.',
      replaceAnswer: true,
    },
    'retrieval-evaluation-user-experience-map-and-diversity': {
      prompt: 'A ranked list has relevance labels [1, 0, 1, 0, 1], and these are all three relevant documents in the collection. Calculate average precision and the precision–recall points at relevant ranks. Then explain how MAP combines queries and what it misses about diversity or user experience.',
      answer: 'At relevant ranks 1, 3 and 5, precision is 1, 2/3 and 3/5; recall is 1/3, 2/3 and 1. AP = (1 + 2/3 + 3/5) / 3 ≈ 0.756. MAP averages AP over multiple queries. It does not measure whether top results cover different subtopics or whether users are satisfied.',
      replaceAnswer: true,
    },
    'extended-boolean-relevance-and-precision-recall-graphs': {
      prompt: 'For equal term weights, p = 2 and term scores x₁ = 0.8, x₂ = 0.6, calculate OR = √[(x₁² + x₂²)/2] and AND = 1 − √[((1 − x₁)² + (1 − x₂)²)/2]. Explain why these are graded scores rather than classical Boolean matches.',
      answer: 'OR = √[(0.8² + 0.6²)/2] = √0.5 ≈ 0.707. AND = 1 − √[(0.2² + 0.4²)/2] = 1 − √0.1 ≈ 0.684. The p-norm extended Boolean model allows partial term matches to receive intermediate scores. Use the exact variant of the formula supplied in an original paper when practising its numerical question.',
      replaceAnswer: true,
    },
    'evaluation-confusion-matrices-roc-cross-validation-and-hyperparameters': {
      prompt: 'A binary classifier has TP = 40, FP = 10, FN = 5 and TN = 45. Draw its confusion matrix and calculate precision, recall, TNR and FNR. Explain the axes and ideal point of ROC, then describe stratified 5-fold cross-validation and how to choose a hyperparameter without tuning on test data.',
      answer: 'Precision = 40/(40 + 10) = 0.80; recall = 40/(40 + 5) ≈ 0.889; TNR = 45/(45 + 10) ≈ 0.818; FNR = 5/(5 + 40) ≈ 0.111. Put actual and predicted classes on clearly labelled confusion-matrix axes. ROC plots TPR against FPR, with the ideal point at (0, 1). Stratified folds preserve class proportions; use validation folds for grid search and keep a separate final test set untouched.',
      replaceAnswer: true,
    },
    'generalisation-bias-variance-overfitting-underfitting-dimensionality-and-learning-curves': {
      prompt: 'A classifier scores 98% on training data but 60% on held-out data. Diagnose the likely generalisation problem, sketch and label a learning curve that could confirm it, and propose remedies. Explain how high dimensionality and class imbalance could complicate the diagnosis.',
    },
    'regression-models-and-error-metrics': {
      prompt: 'A numeric target has actual values [2, 4] and predictions [3, 2]. Calculate MAE, MSE and RMSE. Then choose between linear, polynomial and logistic regression for a continuous tree-growth prediction and justify the choice and main overfitting risk.',
      answer: 'Absolute errors are 1 and 2, so MAE = (1 + 2)/2 = 1.5. Squared errors are 1 and 4, so MSE = (1 + 4)/2 = 2.5 and RMSE = √2.5 ≈ 1.58. Linear regression is a simple starting point for a continuous target; use polynomial terms only if validated curvature justifies them, since they can overfit. Logistic regression is for class probabilities.',
      replaceAnswer: true,
    },
    'graphical-integration-euler-method-and-error': {
      prompt: 'A stock starts at 100 units. Its inflow declines linearly from 100 to 0 units/day over 10 days; outflow stays at 50 units/day. Write the stock-flow and net-flow equations, find the exact stock at days 5 and 10 by area, describe its behaviour, then calculate the day-5 stock with forward Euler using DT = 5 days and explain the error.',
      answer: 'Draw one stock with an inflow and outflow; Net Flow = Inflow − Outflow and S = INTEG(Net Flow, 100). Here Net Flow = 50 − 10t units/day. From day 0 to 5, positive triangular area = ½ × 5 × 50 = 125, so S(5) = 225. From day 5 to 10, negative triangular area = −125, so S(10) = 100. The stock rises to a maximum at day 5, then falls; its slope decreases throughout. Forward Euler uses the day-0 net flow for the whole first step: S(5) ≈ 100 + 5 × 50 = 350. It overestimates because net flow is falling.',
      replaceAnswer: true,
    },
    'workload-backlog-model-feedback-polarity-and-policy-analysis': {
      prompt: 'A claims backlog starts at 100. In one week it receives 30 new claims and 5 reworked claims, while 20 are completed. Write the stock equation and initial net flow. Then trace one balancing policy loop and one reinforcing side-effect loop when management shortens time per claim, including the sign of each causal link.',
      answer: 'Backlog = INTEG(New Claims + Rework − Completed, 100). Initial net flow is 30 + 5 − 20 = 15 claims/week, so backlog initially rises. Balancing loop: Backlog → Work Pressure (+), Work Pressure → Completion (+), Completion → Backlog (−); one negative link. Reinforcing side-effect: Backlog → Work Pressure (+), Work Pressure → Time per Claim (−), Time per Claim → Error Rate (−), Error Rate → Rework (+), Rework → Backlog (+); two negative links. Shorter time per claim may raise throughput initially while harming quality later.',
      replaceAnswer: true,
    },
    'sir-public-health-calculations-proofs-and-extensions': {
      prompt: 'An SIR population has N = 10,000, S = 9,800, I = 200, reproduction number R₀ = 2 and infectious duration D = 5 days. Calculate β, force of infection λ, daily infections and recoveries. If 20% of new infections enter quarantine rather than I, calculate both infection flows and explain how to model this intervention.',
      answer: 'β = R₀/D = 0.4 per day. Force of infection λ = βI/N = 0.008 per day. Total infections = λS = 78.4 people/day; recoveries = I/D = 40 people/day. With a 20% quarantine split, To Q = 0.2 × 78.4 = 15.68 and To I = 0.8 × 78.4 = 62.72 people/day. Write dS/dt = −78.4, dI/dt = 62.72 − 40 and dQ/dt = 15.68, subject to any quarantine exits specified in a full model. Quarantined people do not contribute to the infectious force under this simplified assumption. The original papers also ask for equilibrium proofs and richer extensions; use their exact assumptions for those variants.',
      replaceAnswer: true,
    },
    'stock-management-staff-recruitment-and-ageing-chains': {
      prompt: 'A university has 10,000 students and 500 staff. Its target student:staff ratio changes from 20:1 to 10:1. The annual quit fraction is 0.02 and staff adjustment time is two years. Write a stock-management hiring rule with expected quits, calculate desired staff and initial hires after the change, then explain how trainee/experienced stages and delays could extend the model.',
      answer: 'Desired Staff = Students / Desired Ratio. Hires = Expected Quits + (Desired Staff − Staff) / Adjustment Time; Staff = INTEG(Hires − Quits, 500). Desired staff changes from 10,000/20 = 500 to 10,000/10 = 1,000. Initial expected quits are 0.02 × 500 = 10 staff/year if the estimate tracks current quits. Adjustment = (1,000 − 500)/2 = 250 staff/year, so initial required hires = 10 + 250 = 260 staff/year. Hires replace expected normal loss (anchor) and close the target gap (adjustment). An ageing chain adds separate staff stocks, progression flows and stage-specific attrition; label each delay and keep flows in staff/year.',
      replaceAnswer: true,
    },
    'fractional-rates-adjustment-to-a-goal-and-smoothing': {
      prompt: 'A stock S starts at 1,000 units and decreases at fractional rate G = 0.10/year. G itself adjusts toward 0.20/year over an adjustment time of two years. Write the stock and rate equations, calculate the initial outflow and initial rate of change of G, and explain the effects of a longer adjustment time.',
      answer: 'Outflow = S × G = 1,000 × 0.10 = 100 units/year initially. dG/dt = (0.20 − 0.10)/2 = 0.05 per year² initially. Stock equation is dS/dt = −S × G, with S(0) = 1,000; rate equation is dG/dt = (0.20 − G)/2, with G(0) = 0.10/year. A longer adjustment time makes G approach its goal more slowly, so the stock decline accelerates more gradually.',
      replaceAnswer: true,
    },
  };

  function familySources(family, catalog) {
    const references = (family.appearances || []).flatMap(appearance => {
      const year = appearance.match(/\b20\d{2}\/\d{2}\b/)?.[0];
      const number = Number(appearance.match(/\bQ(\d+)\b/i)?.[1]);
      return year && number ? [[year, number]] : [];
    }).concat(FAMILY_SOURCE_OVERRIDES[moduleCode]?.[family.id] || []);
    const seen = new Set();
    return references.flatMap(([year, number]) => {
      const paper = catalog.find(item => item.year === year);
      const page = paper?.questions.find(([question]) => question === number)?.[1];
      const key = `${year}:Q${number}`;
      if (!paper || !page || seen.has(key)) return [];
      seen.add(key);
      return [{ year, number, page, paper: paper.paper }];
    }).sort((a, b) => b.year.localeCompare(a.year) || a.number - b.number);
  }

  function consolidatedQuestions(data, catalog) {
    const families = data.families || [];
    const lecturerCovered = moduleCode === 'CT4101'
      ? new Set([
        'nearest-neighbours-clustering-distance-measures-scaling-and-choosing-k',
        'decision-trees-entropy-information-gain-and-tree-overfitting',
      ]) : new Set();
    if (moduleCode === 'CT4100') lecturerCovered.add('pagerank');
    const recurring = families.filter(family => family.answer?.trim() && !lecturerCovered.has(family.id))
      .map(family => {
        const scenario = THEME_SCENARIOS[family.id];
        const related = moduleCode === 'CT4100' && family.id === 'hits'
          ? families.find(item => item.id === 'pagerank') : null;
        const sources = familySources(family, catalog).concat(related ? familySources(related, catalog) : [])
          .filter((source, index, all) => all.findIndex(item => item.year === source.year && item.number === source.number) === index);
        return {
          id: `theme-${family.id}`,
          title: FAMILY_TITLES[family.id] || family.title,
          family: 'Recurring exam theme',
          kind: 'theme',
          sources,
          year: sources[0]?.year,
          weight: (sources.length ? Math.min(sources.length, 4) : 1)
            + (sources[0] ? Number(sources[0].year.slice(0, 4)) - 2019 : 0),
          parts: [{
            label: 'Question',
            prompt: scenario?.prompt || (related ? `${family.question} Also explain PageRank's damped link-credit update and one limitation.` : family.question),
            answer: scenario?.replaceAnswer ? scenario.answer
              : `${family.answer.replace(/^Reusable answer:\s*/i, '')}${related ? `\n\nPageRank: ${related.answer.replace(/^Reusable answer:\s*/i, '')}` : ''}${scenario?.answer ? `\n\nWorked check: ${scenario.answer}` : ''}`,
            cards: archivedCards(data, related ? [family, related] : [family]),
          }],
        };
      }).sort((a, b) => b.weight - a.weight);
    if (moduleCode !== 'CT4101') return recurring;
    const olderTopics = [
      {
        id: 'reinforcement-learning-and-q-learning', title: 'Q-learning in a long game',
        prompt: 'A chess agent uses Q-learning with learning rate 0.1, discount factor 0 and exploration rate 0.7. Evaluate each choice for a long game, suggest justified changes, and explain the Markov property.',
        answer: 'The learning rate 0.1 makes each new result update Q-values moderately; its suitability depends on how noisy and plentiful the experience is. A discount factor of 0 ignores future rewards, which is unsuitable when a chess move may matter much later; use a value closer to 1 and validate it. A fixed exploration rate of 0.7 means most moves explore, even after useful strategies are learned; start with exploration, then reduce it while preserving some exploration during training. The Markov property means the current state contains all information needed to predict the next state and reward. In chess, the board alone may be insufficient unless the state also records the player to move, castling rights and en passant status.',
        cards: [
          { front: 'What does a discount factor of zero do?', back: 'It ignores all future reward, so the agent optimises immediate reward only.' },
          { front: 'What must a chess state include for the Markov property?', back: 'The full information needed for legal moves and next-state prediction, including turn and relevant move rights.' },
        ],
      },
      {
        id: 'bayesian-networks-and-naive-bayes', title: 'Bayesian networks and Naive Bayes',
        prompt: 'Explain independence and conditional independence. For a binary-word Naive Bayes model, class A has 4 messages and class B has 5; “cats” appears in 3 A and 1 B, while “tree” appears in 1 A and 2 B. Without smoothing, compare the unnormalised class scores for a message containing both words, stating the assumption.',
        answer: 'Independence means learning A does not change the probability of B. Conditional independence means learning A adds no information about B after C is known; a Bayesian network represents this through its graph and conditional probability tables. Naive Bayes assumes words are conditionally independent given the class. Using the stated binary-word frequencies, score(A) = (4/9) × (3/4) × (1/4) = 1/12 ≈ 0.0833. Score(B) = (5/9) × (1/5) × (2/5) = 2/45 ≈ 0.0444. A has the larger unnormalised score. This example uses word presence and the two supplied features only; a full Bernoulli model would also account for absent vocabulary terms.',
        cards: [
          { front: 'What is the Naive Bayes assumption?', back: 'Features are conditionally independent once the class is known.' },
          { front: 'How do you compare Naive Bayes classes?', back: 'Multiply each class prior by the conditional likelihoods of the observed features, then compare the scores.' },
        ],
      },
    ];
    return recurring.concat(olderTopics.map(topic => {
      const family = families.find(item => item.id === topic.id);
      return {
        id: `theme-${topic.id}`, title: topic.title, family: 'Older paper theme', kind: 'theme',
        weight: 1, year: '2019/20', sources: familySources(family, catalog),
        parts: [{ label: 'Question', prompt: topic.prompt, answer: topic.answer, cards: topic.cards }],
      };
    }));
  }

  function allPaperQuestions(data, catalog, worked) {
    const byPaper = new Map(worked.map(question => {
      const number = Number(question.id.match(/q(\d+)$/)?.[1]);
      return [`${question.paper}:Q${number}`, question];
    }));
    return catalog.flatMap(paper => paper.questions.map(([number, page]) => {
      const key = `${paper.paper}:Q${number}`;
      const existing = byPaper.get(key);
      if (existing) {
        const parts = [...existing.parts];
        if (moduleCode === 'CT561' && paper.year === '2025/26' && number === 3) {
          parts.unshift({
            label: '(a)', marks: 6,
            checklist: true,
            prompt: 'Use the model shown in the original paper to define link polarity, loop polarity and feedback, then discuss the behaviour it generates.',
            answer: 'Trace each causal link in the diagram: + means variables move in the same direction, − means they move in opposite directions. Count negative links around each closed path to identify balancing versus reinforcing feedback. Describe how the resulting stock changes over time, including any limit or delay shown by the model.',
          });
        }
        if (moduleCode === 'CT561' && paper.year === '2025/26' && number === 4) {
          parts.unshift({
            label: '(a)', marks: 5,
            checklist: true,
            prompt: 'Using the original paper’s stock and flow diagram, add a structure with equations that models expected university enrolments.',
            answer: 'Show where actual enrolments enter the supplied model and how expected enrolments are formed. If expectations are smoothed, use Expected Enrolments = SMOOTH(Actual Enrolments, adjustment time) or an equivalent stock and adjustment flow, then connect that expectation to the relevant decision flow. Label equations, units and feedbacks consistent with the diagram.',
          });
        }
        return { ...existing, parts, year: paper.year, kind: 'paper', originalPage: page };
      }
      const families = archivedFamilies(data, paper.year, number);
      const guideFamilies = families.filter(family => family.answer?.trim());
      const checklist = guideFamilies.length
        ? guideFamilies.slice(0, 4).map(family => `${family.title}: ${family.answer.replace(/^Reusable answer:\s*/i, '')}`).join('\n\n')
        : 'This older question has no question-specific answer guide on the site. Check every part against its marks in the original paper and the relevant lecture material.';
      return {
        id: `archive-${paper.year.replace(/\D/g, '')}-q${number}`,
        title: `${paper.year} · Q${number}`,
        family: families.length ? families.map(family => family.title).slice(0, 2).join(' · ') : 'Original paper',
        year: paper.year,
        kind: 'archive',
        hasGuide: guideFamilies.length > 0,
        paper: paper.paper,
        page,
        originalPage: page,
        parts: [{
          label: 'Whole question',
          prompt: `Answer every part of Question ${number} shown in the original paper. Follow its wording and mark allocations.`,
          answer: checklist,
          cards: archivedCards(data, families),
        }],
      };
    }));
  }

  function outcomeQuestions(data) {
    const prompts = data.sheets?.flatMap(sheet => sheet.practice || []) || [];
    const answers = {
      'capabilities-limitations-and-failure-modes': 'Requirements: draft questions, then confirm stakeholder intent. Design: compare architecture options, then verify constraints and quality attributes. Implementation: suggest code, then inspect APIs and run tests. Testing: propose edge cases, then check assertions and coverage of requirements. Maintenance: summarise a legacy module, then verify claims against the real code and logs. At every stage the engineer remains accountable.',
      'genai-across-the-software-development-lifecycle': 'Start with the stakeholder request and ask AI to list ambiguities, users and booking rules. Confirm answers with stakeholders; do not invent policies. Draft functional requirements such as conflict prevention, cancellation and permissions, each with an observable acceptance test. Draft non-functional constraints such as accessibility, availability and privacy with measurable thresholds. Review for missing cases, trace each item to a stakeholder need, and approve the final set before design.',
      'quality-readability-testability-and-maintainability': 'Ask whether the method has one responsibility, clear names and understandable control flow. Check it against requirements and boundary/invalid cases, not just the existing tests. Identify hidden dependencies, tight coupling and duplicated logic. Check failures, logging and security. Break it into testable units where appropriate, add focused tests and review the diff with a maintainer before acceptance.',
      'version-control-experimentation-and-review': 'Create a short-lived branch and capture the migration’s intended schema/data change. Test with representative non-production data, including failure and rollback paths. Review the generated SQL or code for data loss, locks and compatibility; seek human approval. Deploy with a backup and staged rollout, verify the result, and document the exact rollback or forward-fix procedure. Never assume reverting code reverses a schema migration.',
      'evaluating-ai-assisted-workflows': 'Quantitative: time to add tests, defect escape rate, meaningful branch coverage and review/rework time. Qualitative: developer confidence, maintainability, clarity of generated tests and reviewer trust (choose three). Compare similar tasks with a baseline, control for task difficulty and examine false positives or flaky tests. Lines of code measure volume, not correctness, useful coverage or saved effort.',
      'ethical-legal-security-and-professional-risks': 'The public prompt may disclose personal data, confidential business information or credentials and could breach policy, contract or privacy law. It may also persist in a provider’s logs. Stop sharing, follow incident/reporting procedure and assess exposure. Redact/minimise data, use approved private tools or a synthetic reproduction, and have a human review any suggested fix against the real system.',
      'teamwork-communication-and-trade-offs': 'Record the context: acceptance tests are needed but LLM output may omit requirements. Alternatives: manual only, AI draft with review, or unrestricted generation. Criteria: correctness, traceability, time, maintainability and data safety. Choose AI-assisted drafting only with approved inputs, requirement-to-test mapping, human review and execution against the real product. Assign an owner and set a date to review defects and effort.',
    };
    return data.families.map(family => {
      const related = prompts.find(item => item.title?.startsWith(`${family.title} ·`));
      return {
        id: family.id,
        title: family.title,
        family: 'Official learning outcome',
        parts: [{
          label: 'Question',
          prompt: related?.prompt || family.question,
          answer: answers[family.id] || family.answer,
        }],
      };
    });
  }

  function focusKey(question, part) {
    return `${question.id}:${part.label}`;
  }

  // Curated by paper part. Indices refer to the existing module deck in display order.
  const RELATED_CARDS = {
    CT417: {
      '2025-q1': [[5, 39, 40], [2, 3, 1], [4, 1], [6, {
        front: 'Which Git commands finish a conflict resolution?',
        back: 'Use git status to find unmerged paths, edit and test the files, then git add <file>. Finish with git commit for a merge or git rebase --continue for a rebase. Check git status again.',
      }]],
      '2025-q2': [[7, 8], [12], [11], [9, 10]],
      '2025-q3': [[13], [13, 14], [13, 14], [15, 16, 17], [18, 19]],
      '2025-q4': [[20], [21, 25], [22, 23, 24]],
    },
    CT4100: {
      '2025-q1': [[0, 1, 2], [3], [17, 18, 19], [2, 4, 5], [7, 8], [20, 21, 28], [22, 25, 30], [14, 15, 16]],
      '2025-q2': [[31, 32, 35], [36, 38, 40]],
      '2025-q3': [[23, 24, 25], [54, 55, 56]],
      '2025-q4': [[57, 59, 61], [58, 60]],
    },
    CT4101: {
      '2023-q1': [[0, 1, 2, 3], [4, 5, 6], [15, 22, 23, 24]],
      '2023-q2': [[8, 9], [10, 11, 70], [13, 14], [63, 65, 67, 68]],
      '2023-q3': [[27, 28, 29], [35, 36, 33], [42, 78, 79, 80], [17, 20, 21], [26]],
      '2023-q4': [[37, 38, 75, 76], [75, 76], [44, 81], [47, 48, 49], [50, 51]],
    },
    CT561: {
      '2025-q1': [[0, 1, 2], [4, 5, 6], [4, 6]],
      '2025-q2': [[14, 15, 16], [22, 23, 26, 27], [26, 27]],
      '2025-q3': [[7, 10, 11, 12], [8, 11, 12, 13]],
      '2025-q4': [[15, 17], [18, 19, 20], [21, 17]],
      '2024-q1': [[7, 8, 9], [10, 11, 12], [8, 11, 12, 13]],
    },
    CT4111: {
      'capabilities-limitations-and-failure-modes': [[0, 1, 2]],
      'genai-across-the-software-development-lifecycle': [[3, 4, 5, 21]],
      'quality-readability-testability-and-maintainability': [[6, 7, 8, 24]],
      'version-control-experimentation-and-review': [[9, 10, 11, 23]],
      'evaluating-ai-assisted-workflows': [[12, 13, 14]],
      'ethical-legal-security-and-professional-risks': [[15, 16, 17]],
      'teamwork-communication-and-trade-offs': [[18, 19, 20, 22]],
    },
  };

  function focusedCards(data, question, part, partIndex) {
    const all = (data.decks || []).flatMap(deck => deck.cards.map(card => ({ ...card, file: deck.file })));
    const requested = part.cards || RELATED_CARDS[moduleCode]?.[question.id]?.[partIndex] || [];
    return requested.map((entry, index) => {
      if (typeof entry === 'object') return { ...entry, id: `lecturer:${question.id}:${part.label}:${index}` };
      const flatIndex = typeof entry === 'string'
        ? (data.decks || []).slice(0, Number(entry.split(':')[0])).reduce((sum, deck) => sum + deck.cards.length, 0) + Number(entry.split(':')[1])
        : entry;
      const card = all[flatIndex];
      return card ? { ...card, id: `${card.file}#${flatIndex}` } : null;
    }).filter(Boolean);
  }

  function buildFocusedCards(cards) {
    if (!cards.length) return null;
    const panel = make('aside', 'study-related-cards');
    panel.append(make('h4', null, `${cards.length} relevant ${cards.length === 1 ? 'card' : 'cards'}`));
    const counter = make('p', 'study-related-count');
    const front = make('p', 'study-related-front');
    const back = make('p', 'study-related-back');
    back.hidden = true;
    const status = make('p', 'study-related-status');
    const controls = make('div', 'study-related-controls');
    const reveal = make('button', 'study-tool-button study-tool-primary', 'Reveal card');
    const next = make('button', 'study-tool-button', 'Next card');
    next.hidden = cards.length === 1;
    const weak = make('button', 'study-tool-button study-tool-weak', 'Needs work');
    const ready = make('button', 'study-tool-button study-tool-ready', 'Got it');
    for (const button of [reveal, next, weak, ready]) button.type = 'button';
    controls.append(reveal, next, weak, ready);
    panel.append(counter, front, back, controls, status);
    let position = 0;
    function render() {
      const card = cards[position];
      counter.textContent = `Card ${position + 1} of ${cards.length}`;
      front.textContent = card.front;
      back.textContent = card.back;
      back.hidden = true;
      reveal.textContent = 'Reveal card';
      const rating = state.cards[card.id];
      status.textContent = rating === 'weak' ? 'Needs work' : rating === 'ready' ? 'Confident' : '';
      weak.setAttribute('aria-pressed', String(rating === 'weak'));
      ready.setAttribute('aria-pressed', String(rating === 'ready'));
    }
    reveal.addEventListener('click', () => {
      back.hidden = !back.hidden;
      reveal.textContent = back.hidden ? 'Reveal card' : 'Hide card answer';
    });
    next.addEventListener('click', () => {
      position = (position + 1) % cards.length;
      render();
    });
    for (const [button, value] of [[weak, 'weak'], [ready, 'ready']]) {
      button.addEventListener('click', () => {
        const id = cards[position].id;
        if (state.cards[id] === value) delete state.cards[id];
        else state.cards[id] = value;
        store.write(state);
        render();
      });
    }
    render();
    return panel;
  }

  function buildFocusedSpace(data, questions, originals = [], catalog = []) {
    state.focus ||= {};
    state.drafts ||= {};
    const paperMode = PAPER_MODULES.has(moduleCode);
    const section = make('section', 'study-focused');
    section.id = 'lecture-heading';
    section.setAttribute('aria-labelledby', 'focus-heading');
    const intro = make('div', 'study-focused-intro');
    intro.append(make('p', 'study-label', paperMode ? 'Past-paper practice' : 'Outcome-based practice · no past papers'));
    const heading = make('h2', null, paperMode ? 'Learn one exam question at a time' : 'Learn one outcome at a time');
    heading.id = 'focus-heading';
    intro.append(heading);
    intro.append(make('p', null, paperMode
      ? 'Questions combine repeated topics. Lecturer guidance and recent papers come first; exact originals are in the archive.'
      : 'Choose an outcome. Write an answer, use the matching cards if helpful, then reveal and self-check.'));
    section.append(intro);

    const layout = make('div', 'study-focused-layout');
    const chooser = make('nav', 'study-question-picker');
    chooser.setAttribute('aria-label', paperMode ? 'Combined exam questions' : 'Learning outcomes');
    const buttons = questions.map(question => {
      const button = make('button', 'study-question-choice');
      button.type = 'button';
      button.append(make('strong', null, question.title));
      button.append(make('span', null, question.family));
      chooser.append(button);
      return button;
    });
    const originalButtons = new Map();
    let archivePanel = null;
    if (paperMode && catalog.length) {
      const archive = make('details', 'study-picker-archive');
      archivePanel = archive;
      archive.append(make('summary', null, `Original papers · ${catalog.length}`));
      archive.append(make('p', 'study-archive-note', 'Exact wording, figures and marks. Expand a year to choose an original question.'));
      for (const paper of catalog) {
        const group = make('details', 'study-picker-paper');
        group.append(make('summary', null, paper.year));
        for (const [number] of paper.questions) {
          const original = originals.find(item => item.paper === paper.paper && item.id.endsWith(`q${number}`));
          if (!original) continue;
          const button = make('button', 'study-question-choice study-original-choice');
          button.type = 'button';
          button.append(make('strong', null, `Q${number}`));
          if (original.kind !== 'archive') button.append(make('span', null, 'Answer guide available'));
          button.addEventListener('click', () => {
            renderQuestion(original);
            work.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
          group.append(button);
          originalButtons.set(original.id, button);
        }
        archive.append(group);
      }
      chooser.append(archive);
    }
    layout.append(chooser);
    const work = make('article', 'study-question-work');
    work.id = 'practice-heading';
    work.setAttribute('aria-live', 'off');
    layout.append(work);
    section.append(layout);

    function ratingCounts(question) {
      return question.parts.reduce((counts, part) => {
        const rating = state.focus[focusKey(question, part)];
        if (rating === 'strong') counts.strong += 1;
        if (rating === 'retry') counts.retry += 1;
        return counts;
      }, { strong: 0, retry: 0 });
    }

    function updatePicker() {
      buttons.forEach((button, index) => {
        const counts = ratingCounts(questions[index]);
        const label = button.querySelector('span');
        const context = questions[index].kind === 'lecturer' ? 'Lecturer focus'
          : questions[index].family === 'Older paper theme' ? 'Older paper' : '';
        const rating = counts.retry ? `${counts.retry} to revisit`
          : counts.strong ? `${counts.strong}/${questions[index].parts.length} confident` : '';
        label.textContent = [context, rating].filter(Boolean).join(' · ');
        button.setAttribute('aria-current', questions[index].id === state.focusQuestion ? 'true' : 'false');
      });
      originalButtons.forEach((button, id) => {
        button.setAttribute('aria-current', id === state.focusQuestion ? 'true' : 'false');
      });
    }

    function renderQuestion(question) {
      if (!question) return;
      if (archivePanel) {
        archivePanel.open = originalButtons.has(question.id);
        const sourceGroup = originalButtons.get(question.id)?.closest('.study-picker-paper');
        if (sourceGroup) sourceGroup.open = true;
      }
      state.focusQuestion = question.id;
      store.write(state);
      const url = new URL(window.location.href);
      url.searchParams.set('question', question.id);
      window.history.replaceState(null, '', url);
      work.replaceChildren();
      const top = make('div', 'study-question-top');
      top.append(make('p', 'study-label', question.family));
      top.append(make('h3', null, question.title));
      if (paperMode && question.kind !== 'lecturer' && question.kind !== 'theme') {
        const marks = question.parts.reduce((sum, part) => sum + (part.marks || 0), 0);
        top.append(make('span', 'study-badge', question.kind === 'archive'
          ? 'Original paper · marks shown in PDF'
          : `${marks} marks · ${question.parts.length} parts`));
        const source = make('a', 'study-paper-link', `Open original paper, page ${question.page} ↗`);
        source.href = `${question.paper}#page=${question.page}`;
        source.target = '_blank';
        source.rel = 'noopener noreferrer';
        top.append(source);
      }
      if (question.kind === 'lecturer') {
        top.append(make('span', 'study-badge', 'Lecturer focus · practice question'));
        if (question.source_note) top.append(make('p', 'study-source-note', question.source_note));
      }
      if (question.kind === 'theme') {
        top.append(make('span', 'study-badge', 'Combined practice · marks vary by paper'));
        if (question.sources?.length) {
          const references = make('details', 'study-theme-sources');
          references.append(make('summary', null, `Seen in ${question.sources.length} past-paper ${question.sources.length === 1 ? 'question' : 'questions'}`));
          const list = make('ul');
          for (const source of question.sources) {
            const item = make('li');
            const link = make('a', null, `${source.year} · Q${source.number}`);
            link.href = `${source.paper}#page=${source.page}`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            item.append(link);
            list.append(item);
          }
          references.append(list);
          top.append(references);
        }
      }
      if (question.kind === 'archive') {
        top.append(make('p', 'study-source-note', question.hasGuide
          ? 'Historical question. Use current lecturer guidance when deciding what to prioritise.'
          : 'Historical question with no site answer guide. Use the original paper and lecture material to check your work.'));
      }
      work.append(top);
      if (question.context) work.append(make('p', 'study-question-context', question.context));
      if (paperMode && question.kind !== 'lecturer' && question.kind !== 'theme') {
        const original = make('details', 'study-original-paper');
        original.open = question.kind === 'archive';
        original.append(make('summary', null, 'Original question, figures and marks'));
        const frame = make('iframe');
        frame.title = `${moduleCode} ${question.title} original paper`;
        frame.loading = 'lazy';
        frame.src = `${question.paper}#page=${question.originalPage || question.page}&view=FitH`;
        original.append(frame);
        work.append(original);
      }
      const list = make('ol', 'study-focused-parts');
      question.parts.forEach((part, partIndex) => {
        const key = focusKey(question, part);
        const item = make('li', 'study-focused-part');
        const partHead = make('div', 'study-focused-part-head');
        partHead.append(make('strong', null, part.label));
        if (part.marks) partHead.append(make('span', 'study-marks', `${part.marks} marks`));
        item.append(partHead);
        item.append(make('p', 'study-focused-prompt', part.prompt));

        const workspace = make('div', 'study-part-workspace');
        const editor = make('div', 'study-focused-editor');
        const label = make('label', null, 'Write your answer');
        const textarea = make('textarea');
        textarea.rows = 5;
        textarea.value = state.drafts[key] || '';
        label.append(textarea);
        editor.append(label);
        workspace.append(editor);
        textarea.addEventListener('input', () => {
          state.drafts[key] = textarea.value;
          store.write(state);
        });

        const related = buildFocusedCards(focusedCards(data, question, part, partIndex));
        if (related) workspace.append(related);
        const answer = make('details', 'study-focused-answer');
        answer.append(make('summary', null, question.kind === 'archive' || part.checklist ? 'Reveal related topic checklist'
          : paperMode && question.kind !== 'lecturer' ? 'Reveal answer / self-check' : 'Reveal answer checklist'));
        answer.append(make('p', null, part.answer));
        workspace.append(answer);

        const actions = make('div', 'study-focused-rating');
        actions.hidden = true;
        const retry = make('button', 'study-tool-button study-tool-weak', 'Needs work');
        const strong = make('button', 'study-tool-button study-tool-ready', 'I could answer this');
        retry.type = strong.type = 'button';
        const status = make('span', 'study-focused-status');
        status.setAttribute('aria-live', 'polite');
        function refreshRating() {
          const value = state.focus[key];
          retry.setAttribute('aria-pressed', String(value === 'retry'));
          strong.setAttribute('aria-pressed', String(value === 'strong'));
          status.textContent = value === 'retry' ? 'To revisit' : value === 'strong' ? 'Confident' : 'Not rated';
        }
        for (const [button, value] of [[retry, 'retry'], [strong, 'strong']]) {
          button.addEventListener('click', () => {
            state.focus[key] = value;
            store.write(state);
            refreshRating();
            updatePicker();
          });
        }
        actions.append(retry, strong, status);
        workspace.append(actions);
        answer.addEventListener('toggle', () => { actions.hidden = !answer.open; });
        refreshRating();
        item.append(workspace);
        list.append(item);
      });
      work.append(list);
      const next = make('button', 'study-tool-button study-tool-primary study-next-question', paperMode
        ? 'Suggest another question →' : 'Next outcome →');
      next.type = 'button';
      next.addEventListener('click', () => {
        const remaining = questions.filter(item => item.id !== question.id && ratingCounts(item).strong < item.parts.length);
        const pool = remaining.length ? remaining : questions.filter(item => item.id !== question.id);
        if (!pool.length) return;
        if (!paperMode) {
          renderQuestion(pool[0]);
        } else {
          const weight = item => {
            if (item.kind === 'lecturer') return 10 * (ratingCounts(item).retry ? 2 : 1);
            return Math.max(1, item.weight || 1) * (ratingCounts(item).retry ? 2 : 1);
          };
          const total = pool.reduce((sum, item) => sum + weight(item), 0);
          let draw = Math.random() * total;
          const selected = pool.find(item => (draw -= weight(item)) < 0) || pool[pool.length - 1];
          renderQuestion(selected);
        }
        work.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      work.append(next);
      updatePicker();
    }

    buttons.forEach((button, index) => button.addEventListener('click', () => {
      renderQuestion(questions[index]);
      work.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
    const requested = new URLSearchParams(window.location.search).get('question');
    const first = questions.find(item => item.id === requested)
      || originals.find(item => item.id === requested)
      || questions.find(item => item.id === state.focusQuestion)
      || questions.find(item => ratingCounts(item).strong < item.parts.length)
      || questions[0];
    renderQuestion(first);

    shell.append(section);
    const deckRequested = window.location.hash === '#flashcards' || new URLSearchParams(window.location.search).has('cards');
    if (deckRequested) {
      const cards = make('details', 'study-focus-extra');
      cards.id = 'flashcards';
      cards.append(make('summary', null, `Full module deck · ${countCards(data)} cards`));
      const drill = buildCardDrill(data);
      drill.id = 'flashcards-drill';
      cards.append(drill);
      cards.open = true;
      shell.append(cards);
    } else {
      const deckUrl = new URL(window.location.href);
      deckUrl.searchParams.set('cards', 'all');
      deckUrl.hash = 'flashcards';
      const link = make('a', 'study-full-deck-link', `All module cards (${countCards(data)})`);
      link.href = deckUrl;
      chooser.append(link);
    }
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
    if (eyebrow) eyebrow.textContent = `${code} · ${code === 'CT4111' ? 'Outcome Study' : 'Exam Study Space'}`;

    if (FOCUSED_MODULES.has(code)) {
      let questions = outcomeQuestions(data);
      let originals = [];
      let catalog = [];
      if (PAPER_MODULES.has(code)) {
        try {
          const response = await fetch('../study_data/paper_questions.json');
          if (!response.ok) throw new Error('missing paper questions');
          originals = (await response.json())[code] || [];
        } catch (_) {
          shell.append(make('p', 'study-empty', 'Past-paper questions could not load. Open the original papers from module details.'));
          return;
        }
        try {
          const response = await fetch('../study_data/paper_archive.json');
          if (!response.ok) throw new Error('missing paper archive');
          catalog = (await response.json())[code] || [];
          originals = allPaperQuestions(data, catalog, originals);
          questions = consolidatedQuestions(data, catalog);
        } catch (_) {
          shell.append(make('p', 'study-empty', 'The full paper archive could not load. The worked questions below are still available.'));
          questions = originals;
        }
      }
      try {
        const response = await fetch('../study_data/lecturer_focus.json');
        if (response.ok) {
          const lecturerQuestions = (await response.json())[code] || [];
          questions = lecturerQuestions.map(question => ({ ...question, kind: 'lecturer' })).concat(questions);
        }
      } catch (_) { /* Past-paper and outcome practice still work. */ }
      buildFocusedSpace(data, questions, originals, catalog);
      if (window.location.hash) requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView());
      return;
    }

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
