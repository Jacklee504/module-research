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

  function buildFocusedSpace(data, questions) {
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
    intro.append(make('p', null, 'Choose a question. Write an answer, use the matching cards if helpful, then reveal and self-check.'));
    section.append(intro);

    const layout = make('div', 'study-focused-layout');
    const chooser = make('nav', 'study-question-picker');
    chooser.setAttribute('aria-label', paperMode ? 'Past-paper questions' : 'Learning outcomes');
    let previousKind = null;
    const buttons = questions.map(question => {
      const kind = question.kind === 'lecturer' ? 'Lecturer focus' : paperMode ? 'Past papers' : 'Learning outcomes';
      if (kind !== previousKind) chooser.append(make('p', 'study-picker-group', kind));
      previousKind = kind;
      const button = make('button', 'study-question-choice');
      button.type = 'button';
      button.append(make('strong', null, question.title));
      button.append(make('span', null, question.family));
      chooser.append(button);
      return button;
    });
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
        label.textContent = `${questions[index].family} · ${counts.strong}/${questions[index].parts.length} confident${counts.retry ? ` · ${counts.retry} to revisit` : ''}`;
        button.setAttribute('aria-current', questions[index].id === state.focusQuestion ? 'true' : 'false');
      });
    }

    function renderQuestion(question) {
      if (!question) return;
      state.focusQuestion = question.id;
      store.write(state);
      const url = new URL(window.location.href);
      url.searchParams.set('question', question.id);
      window.history.replaceState(null, '', url);
      work.replaceChildren();
      const top = make('div', 'study-question-top');
      top.append(make('p', 'study-label', question.family));
      top.append(make('h3', null, question.title));
      if (paperMode && question.kind !== 'lecturer') {
        const marks = question.parts.reduce((sum, part) => sum + part.marks, 0);
        top.append(make('span', 'study-badge', `${marks} marks · ${question.parts.length} parts`));
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
      work.append(top);
      if (question.context) work.append(make('p', 'study-question-context', question.context));
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
        answer.append(make('summary', null, paperMode && question.kind !== 'lecturer' ? 'Reveal answer / self-check' : 'Reveal answer checklist'));
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
      const index = questions.findIndex(item => item.id === question.id);
      if (index < questions.length - 1) {
        const next = make('button', 'study-tool-button study-tool-primary study-next-question', 'Next question →');
        next.type = 'button';
        next.addEventListener('click', () => {
          renderQuestion(questions[index + 1]);
          work.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        work.append(next);
      }
      updatePicker();
    }

    buttons.forEach((button, index) => button.addEventListener('click', () => {
      renderQuestion(questions[index]);
      work.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
    const requested = new URLSearchParams(window.location.search).get('question');
    const first = questions.find(item => item.id === requested)
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
      if (PAPER_MODULES.has(code)) {
        try {
          const response = await fetch('../study_data/paper_questions.json');
          if (!response.ok) throw new Error('missing paper questions');
          questions = (await response.json())[code] || [];
        } catch (_) {
          shell.append(make('p', 'study-empty', 'Past-paper questions could not load. Open the original papers from module details.'));
          return;
        }
      }
      try {
        const response = await fetch('../study_data/lecturer_focus.json');
        if (response.ok) {
          const lecturerQuestions = (await response.json())[code] || [];
          questions = questions.concat(lecturerQuestions.map(question => ({ ...question, kind: 'lecturer' })));
        }
      } catch (_) { /* Past-paper and outcome practice still work. */ }
      buildFocusedSpace(data, questions);
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
