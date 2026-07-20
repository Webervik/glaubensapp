const perspectiveTexts = {
  context: 'Der Vater eines kranken Kindes spricht diesen Satz zu Jesus. Er formuliert kein Glaubensbekenntnis, sondern eine Spannung – und wird damit ernst genommen.',
  viewpoints: 'Manche lesen die Szene als Ruf zu größerem Vertrauen. Andere erkennen darin einen Glauben, der gerade im Zweifel ehrlich wird. Beides bleibt im Text nebeneinander stehen.',
  practice: 'Vervollständige für dich zwei Sätze: „Ich vertraue darauf, dass …“ und „Ich kann gerade nicht glauben, dass …“. Du musst den Widerspruch nicht auflösen.'
};

document.querySelectorAll('.perspective').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.perspective').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelector('.perspective-copy').textContent = perspectiveTexts[button.dataset.perspective];
  });
});

const dialog = document.querySelector('#question-dialog');
document.querySelectorAll('[data-open-dialog]').forEach(button => button.addEventListener('click', () => dialog.showModal()));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());

const toast = document.querySelector('.toast');
function showToast() {
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3600);
}

document.querySelector('#ask-form').addEventListener('submit', event => {
  event.preventDefault();
  if (document.querySelector('#question').value.trim()) showToast();
});
dialog.querySelector('form').addEventListener('submit', showToast);
document.querySelector('[data-continue]').addEventListener('click', showToast);

const navLinks = document.querySelectorAll('.topbar nav a');
const observed = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-30% 0px -65%' });
observed.forEach(section => observer.observe(section));

const lessons = [
  {
    kicker: 'Etappe 1 · 8 Minuten', title: 'Eine Bibliothek, kein Diktat',
    lead: 'Die Bibel ist kein Buch aus einem Guss. Sie ist eine vielstimmige Bibliothek, entstanden über viele Jahrhunderte.',
    body: `<p>Schon ihre Entstehung macht eine rein wörtliche Lektüre schwierig: In der Bibel begegnen uns Gedichte und Gebete, Erzählungen und Briefe, Rechtstexte, Weisheit und Visionen. Diese Texte wollen unterschiedlich gelesen werden.</p><blockquote>Die entscheidende Frage lautet nicht nur: „Was steht da?“ Sondern auch: „Was für ein Text ist das – und was will er tun?“</blockquote><p>Auch innerhalb der Bibel antworten Stimmen einander. Die Bücher der Chronik erzählen manches anders als die Samuel- und Königebücher. Die Evangelien ordnen Worte und Ereignisse aus dem Leben Jesu unterschiedlich an. Das ist kein peinlicher Fehler, sondern ein Hinweis darauf, wie Erinnerung und Deutung funktionieren.</p><div class="context-box"><strong>Gut zu wissen</strong>Die Bibel wurde nicht vom Himmel diktiert. Menschen haben ihre Erfahrungen mit Gott erzählt, gesammelt, bearbeitet und weitergegeben.</div>`,
    question: 'Welches Bild von der Bibel hast du bisher mitgebracht?'
  },
  {
    kicker: 'Etappe 2 · 9 Minuten', title: 'Textsorten sind Wegweiser',
    lead: 'Ein Liebesgedicht liest man anders als einen Wetterbericht. Das gilt auch für biblische Texte.',
    body: `<p>Wenn Psalm 98 die Flüsse zum Händeklatschen auffordert, erwartet niemand ein geologisches Wunder. Wir erkennen poetische Sprache. Bei Schöpfungserzählungen oder Wundergeschichten wird diese Selbstverständlichkeit schnell schwieriger.</p><h3>Die Form gehört zur Botschaft</h3><p>Eine Textsorte gibt Hinweise darauf, welche Art von Wahrheit ein Text vermitteln will. Ein Gleichnis kann wahr sein, ohne dass das Erzählte historisch stattgefunden haben muss. Poesie kann Wirklichkeit erschließen, ohne sie naturwissenschaftlich zu beschreiben.</p><div class="context-box"><strong>Eine hilfreiche Frage</strong>Welche Wirkung erzeugt die Form des Textes – Trost, Protest, Orientierung, Hoffnung oder Irritation?</div>`,
    question: 'Bei welchem biblischen Text würdest du gern wissen, wie er gemeint ist?'
  },
  {
    kicker: 'Etappe 3 · 10 Minuten', title: 'Kontext verändert alles',
    lead: 'Texte sprechen nicht im luftleeren Raum. Sie tragen Spuren ihrer Zeit, ihrer Konflikte und ihrer Hoffnungen.',
    body: `<p>Ein Brief des Paulus war zunächst wirkliche Post an eine konkrete Gemeinde. Wer einzelne Sätze daraus herauslöst, verliert leicht die Frage, auf die Paulus überhaupt reagiert.</p><p>Historisch-kritische Forschung fragt deshalb nach Sprache, Lebenswelt, Autorenschaft, Entstehung und Bearbeitung eines Textes. Sie will den Glauben nicht zerstören. Sie schützt uns davor, unsere heutigen Vorstellungen unbemerkt in alte Texte hineinzulesen.</p><blockquote>Kontext relativiert einen Text nicht. Er macht seine Beziehung zu uns erst verantwortbar.</blockquote>`,
    question: 'Wann hat Hintergrundwissen deine Sicht auf einen Text oder Menschen verändert?'
  },
  {
    kicker: 'Etappe 4 · 8 Minuten', title: 'Widersprüche aushalten',
    lead: 'Vier Evangelien bedeuten vier Perspektiven – nicht vier identische Protokolle.',
    body: `<p>Die Evangelien stimmen in vielem überein und unterscheiden sich zugleich. Bei Matthäus, Markus und Lukas vertreibt Jesus die Händler gegen Ende seines Wirkens aus dem Tempel. Johannes erzählt die Szene bereits am Anfang.</p><p>Wer harmonisieren muss, fragt vor allem: „Wie kann beides exakt so passiert sein?“ Wer literarisch liest, kann zusätzlich fragen: „Warum setzt Johannes dieses Zeichen an den Anfang? Was sagt es über sein Bild von Jesus?“</p><div class="context-box"><strong>Vielstimmigkeit</strong>Unterschiede müssen nicht beseitigt werden. Sie können zeigen, was einer Gemeinschaft an ihrer Jesus-Erinnerung besonders wichtig war.</div>`,
    question: 'Löst der Gedanke an Widersprüche in der Bibel eher Neugier oder Unbehagen aus?'
  },
  {
    kicker: 'Etappe 5 · 11 Minuten', title: 'Schwierige Texte nicht schönreden',
    lead: 'Manche Bibeltexte trösten. Andere legitimieren Gewalt, Abwertung oder Herrschaft – jedenfalls in bestimmten Lesarten.',
    body: `<p>Eine verantwortliche Lektüre muss problematische Texte weder verschweigen noch vorschnell retten. Sie darf fragen: Wessen Stimme hören wir? Wer bleibt stumm? Welche Wirkung hatte diese Auslegung auf reale Menschen?</p><h3>Kritik kann ein Akt der Treue sein</h3><p>Schon die Bibel selbst kennt den Streit mit religiöser Autorität. Propheten widersprechen Königen und Priestern. Hiob widerspricht den frommen Erklärungen seiner Freunde. Jesus stellt Regeln infrage, wenn sie Menschen belasten.</p><blockquote>Ein heiliger Text ist nicht dasselbe wie jede Auslegung, die mit ihm begründet wird.</blockquote>`,
    question: 'Gibt es einen Bibeltext, der dich verletzt oder wütend gemacht hat?'
  },
  {
    kicker: 'Etappe 6 · 9 Minuten', title: 'Deine Perspektive liest mit',
    lead: 'Niemand liest voraussetzungslos. Biografie, Körper, Kultur und Machtposition sitzen mit am Tisch.',
    body: `<p>Das ist kein Grund, jede Deutung für gleich gut zu halten. Es ist ein Grund für Bescheidenheit und Gespräch. Feministische, befreiungstheologische, queere und postkoloniale Auslegungen fragen besonders nach Erfahrungen, die lange übersehen wurden.</p><p>Auch jüdische Auslegung ist nicht bloß ein historischer Hintergrund des Christentums. Das Alte Testament ist zugleich die lebendige Hebräische Bibel des Judentums. Christliche Lektüre muss diese Eigenständigkeit achten.</p><div class="context-box"><strong>Prüffrage</strong>Welche Folgen hat eine Auslegung? Schafft sie Freiheit, Verantwortung und Beziehung – oder Angst, Abwertung und Kontrolle?</div>`,
    question: 'Welche Erfahrungen bringst du selbst beim Lesen mit?'
  },
  {
    kicker: 'Etappe 7 · 7 Minuten', title: 'Lesen als Beziehung',
    lead: 'Nach aller Methode bleibt die Bibel ein Gegenüber: fremd, vertraut, widerspenstig und manchmal überraschend nah.',
    body: `<p>Historisches Wissen entscheidet nicht für dich, was ein Text heute bedeutet. Es schafft einen ehrlicheren Ausgangspunkt. Danach beginnt das Gespräch zwischen Text, Tradition, Vernunft, Erfahrung und gegenwärtiger Welt.</p><p>Du darfst einem Text zustimmen, mit ihm ringen oder ihm widersprechen. Du darfst eine Stelle zur Seite legen. Und du darfst erleben, dass alte Worte eine neue Sprache für Hoffnung finden.</p><blockquote>Nicht: „Ich muss alles für wahr halten.“ Sondern: „Ich lasse mich auf ein ernsthaftes Gespräch ein.“</blockquote><div class="context-box"><strong>Ein möglicher Rhythmus</strong>Wahrnehmen: Was steht da? · Verstehen: Woher kommt es? · Prüfen: Was bewirkt es? · Antworten: Was bedeutet es für mich und andere?</div>`,
    question: 'Mit welcher Haltung möchtest du künftig einen biblischen Text öffnen?'
  }
];

const journey = document.querySelector('#journey');
const lessonNav = journey.querySelector('.lesson-nav');
let currentLesson = Number(localStorage.getItem('weite-current-lesson') || 0);
let completedLessons = new Set(JSON.parse(localStorage.getItem('weite-completed-lessons') || '[]'));

lessons.forEach((lesson, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = `${index + 1}. ${lesson.title}`;
  button.addEventListener('click', () => renderLesson(index));
  lessonNav.append(button);
});

function saveReflection() {
  const note = journey.querySelector('#reflection-note').value;
  localStorage.setItem(`weite-reflection-${currentLesson}`, note);
}

function renderLesson(index) {
  saveReflection();
  currentLesson = Math.max(0, Math.min(index, lessons.length - 1));
  localStorage.setItem('weite-current-lesson', currentLesson);
  const lesson = lessons[currentLesson];
  journey.querySelector('.journey-count').textContent = `${currentLesson + 1} / ${lessons.length}`;
  journey.querySelector('.journey-progress span').style.width = `${((currentLesson + 1) / lessons.length) * 100}%`;
  journey.querySelector('.lesson-number').textContent = String(currentLesson + 1).padStart(2, '0');
  journey.querySelector('.lesson-kicker').textContent = lesson.kicker;
  journey.querySelector('.lesson-title').textContent = lesson.title;
  journey.querySelector('.lesson-lead').textContent = lesson.lead;
  journey.querySelector('.lesson-body').innerHTML = lesson.body;
  journey.querySelector('.reflection-question').textContent = lesson.question;
  journey.querySelector('#reflection-note').value = localStorage.getItem(`weite-reflection-${currentLesson}`) || '';
  journey.querySelector('.lesson-back').disabled = currentLesson === 0;
  journey.querySelector('.lesson-next').innerHTML = currentLesson === lessons.length - 1 ? 'Weg abschließen <span>✓</span>' : 'Nächste Etappe <span>→</span>';
  [...lessonNav.children].forEach((button, buttonIndex) => {
    button.classList.toggle('active', buttonIndex === currentLesson);
    button.classList.toggle('done', completedLessons.has(buttonIndex));
  });
  journey.scrollTo({ top: 0, behavior: 'smooth' });
}

function openJourney() {
  journey.classList.add('open');
  journey.setAttribute('aria-hidden', 'false');
  document.body.classList.add('journey-open');
  renderLesson(currentLesson);
}

function closeJourney() {
  saveReflection();
  journey.classList.remove('open');
  journey.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('journey-open');
}

document.querySelector('[data-start-path]').addEventListener('click', openJourney);
journey.querySelector('.journey-close').addEventListener('click', closeJourney);
journey.querySelector('.lesson-back').addEventListener('click', () => renderLesson(currentLesson - 1));
journey.querySelector('.lesson-next').addEventListener('click', () => {
  completedLessons.add(currentLesson);
  localStorage.setItem('weite-completed-lessons', JSON.stringify([...completedLessons]));
  if (currentLesson < lessons.length - 1) renderLesson(currentLesson + 1);
  else {
    showToastMessage('Weg abgeschlossen. Du kannst jederzeit zurückkehren.');
    closeJourney();
  }
});
journey.querySelector('#reflection-note').addEventListener('input', saveReflection);

function showToastMessage(message) {
  toast.textContent = message;
  showToast();
}

const progressDialog = document.querySelector('#progress-dialog');
const progressClose = progressDialog.querySelector('.dialog-close');

function updateProgressSummary() {
  progressDialog.querySelector('[data-completed-count]').textContent = completedLessons.size;
}

document.querySelector('[data-open-progress]').addEventListener('click', () => {
  updateProgressSummary();
  progressDialog.showModal();
});
progressClose.addEventListener('click', () => progressDialog.close());

function collectProgress(includeNotes) {
  const data = {
    format: 'weiter-glauben-progress',
    version: 1,
    exportedAt: new Date().toISOString(),
    currentLesson,
    completedLessons: [...completedLessons]
  };
  if (includeNotes) {
    data.reflections = lessons.map((_, index) => localStorage.getItem(`weite-reflection-${index}`) || '');
  }
  return data;
}

progressDialog.querySelector('[data-export]').addEventListener('click', () => {
  const includeNotes = progressDialog.querySelector('#include-notes').checked;
  const blob = new Blob([JSON.stringify(collectProgress(includeNotes), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `weiter-glauben-stand-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToastMessage(includeNotes ? 'Stand und Notizen wurden gesichert.' : 'Dein Stand wurde gesichert.');
});

function applyProgressData(data) {
  const validLessons = Array.isArray(data.completedLessons) && data.completedLessons.every(index => Number.isInteger(index) && index >= 0 && index < lessons.length);
  if (data.format !== 'weiter-glauben-progress' || data.version !== 1 || !validLessons) throw new Error('invalid');
  currentLesson = Number.isInteger(data.currentLesson) ? Math.max(0, Math.min(data.currentLesson, lessons.length - 1)) : 0;
  completedLessons = new Set(data.completedLessons);
  localStorage.setItem('weite-current-lesson', currentLesson);
  localStorage.setItem('weite-completed-lessons', JSON.stringify([...completedLessons]));
  if (Array.isArray(data.reflections)) {
    data.reflections.slice(0, lessons.length).forEach((note, index) => {
      if (typeof note === 'string') localStorage.setItem(`weite-reflection-${index}`, note);
    });
  }
  updateProgressSummary();
}

document.querySelector('#import-progress').addEventListener('change', async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    applyProgressData(data);
    showToastMessage('Dein gespeicherter Stand wurde wiederhergestellt.');
  } catch {
    showToastMessage('Diese Datei ist keine gültige WEITER-GLAUBEN-Sicherung.');
  } finally {
    event.target.value = '';
  }
});

const recoveryInput = progressDialog.querySelector('#recovery-code');
const syncBox = progressDialog.querySelector('.sync-box');
const codeAlphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function generateRecoveryCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let bits = 0;
  let value = 0;
  let result = '';
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      result += codeAlphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) result += codeAlphabet[(value << (5 - bits)) & 31];
  return result.match(/.{1,4}/g).join('-');
}

function normalizeRecoveryCode(value) {
  return value.toUpperCase().replace(/[^0-9A-Z]/g, '').replace(/[IL]/g, '1').replace(/O/g, '0');
}

function formatRecoveryCode(value) {
  const normalized = normalizeRecoveryCode(value).slice(0, 26);
  return normalized.match(/.{1,4}/g)?.join('-') || '';
}

function bytesToBase64Url(bytes) {
  let binary = '';
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(value) {
  const padding = '='.repeat((4 - value.length % 4) % 4);
  const binary = atob(value.replace(/-/g, '+').replace(/_/g, '/') + padding);
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

async function recoveryCredentials(displayCode) {
  const code = normalizeRecoveryCode(displayCode);
  if (code.length !== 26 || [...code].some(character => !codeAlphabet.includes(character))) throw new Error('invalid_code');
  const encoder = new TextEncoder();
  const keyBytes = await crypto.subtle.digest('SHA-256', encoder.encode(`weiter-glauben:key:${code}`));
  const idBytes = await crypto.subtle.digest('SHA-256', encoder.encode(`weiter-glauben:lookup:${code}`));
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
  const id = [...new Uint8Array(idBytes)].map(byte => byte.toString(16).padStart(2, '0')).join('');
  return { key, id };
}

async function encryptProgress(code, includeNotes) {
  const { key, id } = await recoveryCredentials(code);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(collectProgress(includeNotes)));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  return { id, payload: { version: 1, iv: bytesToBase64Url(iv), ciphertext: bytesToBase64Url(new Uint8Array(encrypted)) } };
}

async function decryptProgress(code, record) {
  const { key } = await recoveryCredentials(code);
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: base64UrlToBytes(record.iv) },
    key,
    base64UrlToBytes(record.ciphertext)
  );
  return JSON.parse(new TextDecoder().decode(decrypted));
}

async function withSyncBusy(action) {
  syncBox.classList.add('busy');
  try { await action(); }
  finally { syncBox.classList.remove('busy'); }
}

recoveryInput.addEventListener('input', () => { recoveryInput.value = formatRecoveryCode(recoveryInput.value); });

progressDialog.querySelector('[data-sync-save]').addEventListener('click', () => withSyncBusy(async () => {
  try {
    if (!normalizeRecoveryCode(recoveryInput.value)) recoveryInput.value = generateRecoveryCode();
    const includeNotes = progressDialog.querySelector('#sync-notes').checked;
    const { id, payload } = await encryptProgress(recoveryInput.value, includeNotes);
    const response = await fetch(`/api/progress/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('save_failed');
    showToastMessage('Online-Sicherung gespeichert. Bewahre deinen Code sicher auf.');
    recoveryInput.select();
  } catch (error) {
    showToastMessage(error.message === 'invalid_code' ? 'Der Wiederherstellungscode ist unvollständig.' : 'Die Online-Sicherung konnte nicht gespeichert werden.');
  }
}));

progressDialog.querySelector('[data-sync-restore]').addEventListener('click', () => withSyncBusy(async () => {
  try {
    const { id } = await recoveryCredentials(recoveryInput.value);
    const response = await fetch(`/api/progress/${id}`, { headers: { 'Accept': 'application/json' } });
    if (response.status === 404) throw new Error('not_found');
    if (!response.ok) throw new Error('restore_failed');
    const data = await decryptProgress(recoveryInput.value, await response.json());
    applyProgressData(data);
    showToastMessage('Dein Stand wurde sicher wiederhergestellt.');
  } catch (error) {
    if (error.message === 'invalid_code') showToastMessage('Der Wiederherstellungscode ist unvollständig.');
    else if (error.message === 'not_found') showToastMessage('Zu diesem Code wurde keine Sicherung gefunden.');
    else showToastMessage('Der Code passt nicht zu dieser Sicherung. Bitte prüfe ihn.');
  }
}));

progressDialog.querySelector('[data-sync-delete]').addEventListener('click', () => withSyncBusy(async () => {
  try {
    if (!window.confirm('Die Online-Sicherung zu diesem Code endgültig löschen? Die Daten auf diesem Gerät bleiben erhalten.')) return;
    const { id } = await recoveryCredentials(recoveryInput.value);
    const response = await fetch(`/api/progress/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('delete_failed');
    showToastMessage('Die Online-Sicherung wurde gelöscht.');
  } catch (error) {
    showToastMessage(error.message === 'invalid_code' ? 'Der Wiederherstellungscode ist unvollständig.' : 'Die Online-Sicherung konnte nicht gelöscht werden.');
  }
}));

progressDialog.querySelector('[data-copy-code]').addEventListener('click', async () => {
  if (!recoveryInput.value) return showToastMessage('Erzeuge zuerst eine Online-Sicherung.');
  await navigator.clipboard.writeText(recoveryInput.value);
  showToastMessage('Wiederherstellungscode kopiert.');
});

progressDialog.querySelector('[data-delete-progress]').addEventListener('click', () => {
  if (!window.confirm('Wirklich Fortschritt und alle persönlichen Notizen auf diesem Gerät löschen?')) return;
  localStorage.removeItem('weite-current-lesson');
  localStorage.removeItem('weite-completed-lessons');
  lessons.forEach((_, index) => localStorage.removeItem(`weite-reflection-${index}`));
  currentLesson = 0;
  completedLessons = new Set();
  updateProgressSummary();
  showToastMessage('Deine lokal gespeicherten Daten wurden gelöscht.');
});

const dateLabel = document.querySelector('.hero .eyebrow');
dateLabel.textContent = new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
