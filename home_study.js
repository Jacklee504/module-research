/* Keep the home page tied to work already marked in each study space. */
(() => {
  const cards = [...document.querySelectorAll('[data-study-module]')];
  if (!cards.length) return;

  const lastKey = 'module-research-home-last-v1';
  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch (_) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (_) { /* Links still work. */ }
    },
  };

  const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;
  const count = (entries, value) => Object.values(entries || {}).filter(item => item === value).length;
  const total = (card, name) => Number(card.dataset[name]) || 0;

  function progress(card) {
    const code = card.dataset.code;
    let state = {};
    try { state = JSON.parse(storage.get(`module-research-study-v2-${code}`) || '{}') || {}; }
    catch (_) { state = {}; }
    const coreAnswers = Object.fromEntries(Object.entries(state.focus || {}).filter(([key]) =>
      code === 'CT4111' || key.startsWith('theme-') || key.startsWith('lecturer-')));
    const coreCards = Object.fromEntries(Object.entries(state.cards || {}).filter(([key]) => !key.startsWith('lecturer:')));
    return {
      strong: Math.min(total(card, 'partTotal'), count(coreAnswers, 'strong')),
      retry: Math.min(total(card, 'partTotal'), count(coreAnswers, 'retry')),
      firstRetry: Object.entries(coreAnswers).find(([, value]) => value === 'retry')?.[0]?.split(':')[0],
      lastQuestion: code === 'CT4111' || state.focusQuestion?.startsWith('theme-')
        || state.focusQuestion?.startsWith('lecturer-') ? state.focusQuestion : null,
      ready: Math.min(total(card, 'cardTotal'), count(coreCards, 'ready')),
      weak: Math.min(total(card, 'cardTotal'), count(coreCards, 'weak')),
    };
  }

  function nextAction(card, done) {
    const code = card.dataset.code;
    const parts = total(card, 'partTotal');
    const cardsTotal = total(card, 'cardTotal');
    const question = done.firstRetry || done.lastQuestion || card.dataset.firstQuestion;
    const questionUrl = `${code}/study.html?question=${encodeURIComponent(question)}#practice-heading`;
    if (done.retry) {
      return {
        label: `Revisit ${plural(done.retry, 'answer')}`,
        copy: 'Try a question you marked as needing work before opening its answer.',
        href: questionUrl,
      };
    }
    if (done.strong === 0) {
      return {
        label: code === 'CT4111' ? 'Start an outcome question' : 'Start a priority question',
        copy: 'Learn the answer, write it from memory, then self-check.',
        href: questionUrl,
      };
    }
    if (done.strong < parts) {
      return {
        label: 'Continue question practice',
        copy: 'Pick up at your last question and self-check the remaining parts.',
        href: questionUrl,
      };
    }
    if (done.weak) {
      return {
        label: `Review ${plural(done.weak, 'difficult card')}`,
        copy: 'Open weak and new recall cards.',
        href: `${code}/study.html?cards=weak#flashcards`,
      };
    }
    return {
      label: done.ready < cardsTotal ? 'Drill recall cards' : 'Review this module',
      copy: done.ready < cardsTotal ? 'Use recall cards to test details from the questions.' : 'Revisit a question and try it again without looking.',
      href: `${code}/study.html#flashcards`,
    };
  }

  let readyAcross = 0;
  let strongAcross = 0;
  let weakAcross = 0;
  let retryAcross = 0;
  const actions = new Map();
  for (const card of cards) {
    const done = progress(card);
    const action = nextAction(card, done);
    actions.set(card.dataset.code, action);
    readyAcross += done.ready;
    strongAcross += done.strong;
    weakAcross += done.weak;
    retryAcross += done.retry;
    card.querySelector('[data-answer-progress]').textContent =
      `${done.strong}/${total(card, 'partTotal')} answers confident`;
    card.querySelector('[data-card-progress]').textContent =
      `${done.ready}/${total(card, 'cardTotal')} cards confident`;
    card.querySelector('[data-next-copy]').textContent = action.copy;
    const primary = card.querySelector('[data-primary]');
    primary.href = action.href;
    primary.firstChild.textContent = `${action.label} `;
    for (const link of card.querySelectorAll('a')) {
      link.addEventListener('click', () => storage.set(lastKey, card.dataset.code));
    }
  }

  const summary = document.querySelector('[data-home-summary]');
  if (summary && (readyAcross || strongAcross || weakAcross || retryAcross)) {
    summary.textContent = `${plural(strongAcross, 'answer')} confident · ${plural(retryAcross, 'answer')} to revisit · ${plural(readyAcross, 'card')} confident · ${plural(weakAcross, 'difficult card')}. Saved in this browser.`;
  }

  const last = storage.get(lastKey);
  const selected = cards.find(card => card.dataset.code === last);
  if (selected) {
    const action = actions.get(last);
    document.querySelector('[data-continue-title]').textContent = `Continue ${last} · ${selected.querySelector('h3').textContent}`;
    document.querySelector('[data-continue-copy]').textContent = action.copy;
    const link = document.querySelector('[data-continue-link]');
    link.firstChild.textContent = `${action.label} `;
    link.href = action.href;
    link.hidden = false;
  }
})();
