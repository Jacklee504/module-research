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
    return {
      family: Math.min(total(card, 'familyTotal'), count(state.families, 'done')),
      ready: Math.min(total(card, 'cardTotal'), count(state.cards, 'ready')),
      weak: Math.min(total(card, 'cardTotal'), count(state.cards, 'weak')),
      practice: Math.min(total(card, 'practiceTotal'), count(state.practice, 'done')),
    };
  }

  function nextAction(card, done) {
    const code = card.dataset.code;
    const families = total(card, 'familyTotal');
    const cardsTotal = total(card, 'cardTotal');
    const practiceTotal = total(card, 'practiceTotal');
    if (done.weak) {
      return {
        label: `Review ${plural(done.weak, 'difficult card')}`,
        copy: 'Open the card drill with weak and new cards selected.',
        href: `${code}/study.html?cards=weak#flashcards`,
      };
    }
    if (families && done.family === 0) {
      return {
        label: code === 'CT4111' ? 'Start the first outcome' : 'Start the top question family',
        copy: 'Read the answer frame, then try a related prompt without looking.',
        href: `${code}/study.html#lecture-heading`,
      };
    }
    if (practiceTotal && done.practice < Math.min(done.family, practiceTotal)) {
      return {
        label: 'Attempt a practice prompt',
        copy: 'Write your answer before opening the plan. Mark the prompt when attempted.',
        href: `${code}/study.html#practice-heading`,
      };
    }
    if (done.family < families) {
      return {
        label: code === 'CT4111' ? 'Work the next outcome' : 'Work the next question family',
        copy: 'Build confidence in another area before doing more prompts.',
        href: `${code}/study.html#lecture-heading`,
      };
    }
    if (practiceTotal && done.practice < practiceTotal) {
      return {
        label: 'Attempt a practice prompt',
        copy: 'Use a fresh prompt to test your answer structure.',
        href: `${code}/study.html#practice-heading`,
      };
    }
    return {
      label: done.ready < cardsTotal ? 'Drill recall cards' : 'Review this module',
      copy: done.ready < cardsTotal ? 'Use the card drill to check what you can recall.' : 'Revisit any weak area or try another question.',
      href: `${code}/study.html#flashcards`,
    };
  }

  let readyAcross = 0;
  let attemptedAcross = 0;
  let weakAcross = 0;
  let familiesAcross = 0;
  const actions = new Map();
  for (const card of cards) {
    const done = progress(card);
    const action = nextAction(card, done);
    actions.set(card.dataset.code, action);
    readyAcross += done.ready;
    attemptedAcross += done.practice;
    weakAcross += done.weak;
    familiesAcross += done.family;
    card.querySelector('[data-family-progress]').textContent =
      `${done.family}/${total(card, 'familyTotal')} ${card.dataset.code === 'CT4111' ? 'outcome areas' : 'families'}`;
    card.querySelector('[data-card-progress]').textContent =
      `${done.ready}/${total(card, 'cardTotal')} cards confident`;
    const practice = card.querySelector('[data-practice-progress]');
    if (practice) practice.textContent = `${done.practice}/${total(card, 'practiceTotal')} prompts attempted`;
    card.querySelector('[data-next-copy]').textContent = action.copy;
    const primary = card.querySelector('[data-primary]');
    primary.href = action.href;
    primary.firstChild.textContent = `${action.label} `;
    for (const link of card.querySelectorAll('a')) {
      link.addEventListener('click', () => storage.set(lastKey, card.dataset.code));
    }
  }

  const summary = document.querySelector('[data-home-summary]');
  if (summary && (readyAcross || attemptedAcross || weakAcross || familiesAcross)) {
    summary.textContent = `${familiesAcross} question areas confident · ${readyAcross} cards confident · ${attemptedAcross} prompts attempted · ${weakAcross} difficult cards. Saved in this browser.`;
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
