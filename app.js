const perspectiveTexts = {
  context: `<p>Der Satz fällt nicht in einer ruhigen Lehrstunde. Ein Vater bittet Jesus um Hilfe für sein krankes Kind. Er hat Hoffnung – und zugleich Angst, wieder enttäuscht zu werden.</p><p>Jesus verlangt von ihm kein widerspruchsfreies Bekenntnis. Der Vater bringt Vertrauen und Unglauben gemeinsam zur Sprache. Genau mit diesem unfertigen Satz bleibt er im Gespräch.</p><p class="perspective-prompt"><strong>Lesefrage</strong> Was verändert sich, wenn Zweifel hier nicht als Gegenteil, sondern als Teil des Glaubens erscheint?</p>`,
  viewpoints: `<div class="perspective-grid"><article><strong>Vertrauen lernen</strong><p>Traditionell wird der Satz als Bitte verstanden, im Vertrauen zu wachsen. Zweifel ist dabei keine Schuld, sondern etwas, das Hilfe braucht.</p></article><article><strong>Ehrlich glauben</strong><p>Eine liberale Lesart betont die Wahrhaftigkeit: Glaube beginnt nicht bei Gewissheit, sondern dort, wo ein Mensch seine Spannung nicht verbirgt.</p></article><article><strong>Kritisch weiterfragen</strong><p>Die Erzählung heilt am Ende ein Kind. Das darf nicht zur Behauptung werden, genügend Glaube heile jede Krankheit. Unerfüllte Bitten sind kein persönliches Versagen.</p></article></div><p class="perspective-prompt"><strong>Prüffrage</strong> Welche Deutung macht dich freier und verantwortlicher – und welche setzt dich unter Druck?</p>`,
  practice: `<div class="mini-practice"><strong>Zwei ehrliche Sätze · etwa 3 Minuten</strong><p>Atme einmal bewusst aus. Vervollständige dann beide Anfänge. Der Widerspruch darf stehen bleiben.</p><label for="daily-reflection">Ich vertraue darauf, dass …<br>Ich kann gerade nicht glauben, dass …</label><textarea id="daily-reflection" rows="4" placeholder="Deine Gedanken – nur auf diesem Gerät"></textarea><span class="save-hint" aria-live="polite">Wird beim Schreiben auf diesem Gerät gespeichert.</span></div>`
};

function connectDailyReflection() {
  const note = document.querySelector('#daily-reflection');
  if (!note) return;
  note.value = localStorage.getItem('weiter-glauben-daily-reflection') || '';
  note.addEventListener('input', () => localStorage.setItem('weiter-glauben-daily-reflection', note.value));
}

document.querySelectorAll('.perspective').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.perspective').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    const panel = document.querySelector('.perspective-copy');
    panel.innerHTML = perspectiveTexts[button.dataset.perspective];
    panel.setAttribute('aria-labelledby', button.id);
    connectDailyReflection();
  });
});

const dialog = document.querySelector('#question-dialog');
const savedOpenQuestion = localStorage.getItem('weiter-glauben-open-question') || '';
document.querySelector('#question').value = savedOpenQuestion;
document.querySelectorAll('[data-open-dialog]').forEach(button => button.addEventListener('click', () => {
  dialog.querySelector('#dialog-question').value = localStorage.getItem('weiter-glauben-open-question') || '';
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());

const toast = document.querySelector('.toast');
function showToast() {
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3600);
}

document.querySelector('#ask-form').addEventListener('submit', event => {
  event.preventDefault();
  const question = document.querySelector('#question').value.trim();
  if (question) {
    localStorage.setItem('weiter-glauben-open-question', question);
    showToastMessage('Deine Frage ist auf diesem Gerät gespeichert. Die persönliche Antwortfunktion ist noch im Aufbau.');
  }
});
dialog.querySelector('form').addEventListener('submit', () => {
  const question = dialog.querySelector('#dialog-question').value.trim();
  if (question) localStorage.setItem('weiter-glauben-open-question', question);
  showToastMessage(question ? 'Deine Frage ist auf diesem Gerät gespeichert.' : 'Es wurde keine Frage gespeichert.');
});
document.querySelector('[data-continue]').addEventListener('click', () => {
  openJourney('intro');
  renderLesson(1);
});

const navLinks = document.querySelectorAll('.topbar nav a');
const observed = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-30% 0px -65%' });
observed.forEach(section => observer.observe(section));

const introLessons = [
  {
    kicker: 'Etappe 1 · kurz 5 Min. · mit Vertiefung 15–20 Min.', title: 'Was meinen wir, wenn wir Gott sagen?',
    lead: 'Vielleicht ist nicht Gott unglaubwürdig geworden, sondern nur ein bestimmtes Bild von Gott.',
    body: `<div class="arrival"><strong>Ankommen · etwa 1 Minute</strong><p>Wenn du möchtest, stell beide Füße auf den Boden. Atme einmal bewusst aus. Nimm wahr, was das Wort „Gott“ in dir auslöst: Nähe, Widerstand, Sehnsucht, Leere – oder etwas ganz anderes. Nichts davon ist falsch.</p></div><p>„Gott“ ist kein Gegenstand, den man irgendwo im Universum finden könnte. Das Wort bündelt Erfahrungen und Deutungen: ein Gegenüber, der Grund allen Seins, die Macht der Liebe, tragende Wirklichkeit oder ein Geheimnis jenseits unserer Begriffe.</p><div class="scripture"><strong>Biblischer Resonanzraum</strong><blockquote>Nach Feuer und Erdbeben kam ein stilles, sanftes Sausen.</blockquote><p>In 1. Könige 19 begegnet Elia Gott gerade nicht im Spektakulären. Der alte Text lässt offen, wie leise Gegenwart sein kann.</p></div><details class="deepening"><summary>Tiefer gehen · weitere 10–15 Minuten</summary><div><h3>Gottesbilder prüfen</h3><p>Auch die Bibel spricht vielstimmig: Gott erscheint als Schöpfer, Mutter, Vater, Feuer, Atem, Schutz und fremde Gegenwart. Jedes Bild kann etwas eröffnen; keines kann Gott festlegen. Ein Gottesbild darf sich verändern, besonders wenn es Angst erzeugt oder Menschen klein macht.</p><h3>Eine stille Erprobung</h3><p>Wähle einen Satz: „Gott ist für mich vielleicht …“ oder „Gott ist mehr als …“. Wiederhole ihn einige Atemzüge lang. Ergänze innerlich: „Vielleicht – und zugleich mehr als das.“ Du musst dabei nichts Besonderes erleben.</p><div class="context-box"><strong>Offen bleiben</strong>Du musst heute kein Gottesbild auswählen. Es genügt wahrzunehmen, was dich anzieht, abstößt oder ratlos macht.</div></div></details>`,
    question: 'Welches Gottesbild hast du übernommen – und welches würdest du gern loslassen?'
  },
  {
    kicker: 'Etappe 2 · kurz 5 Min. · mit Vertiefung 15–20 Min.', title: 'Glauben ist mehr als Für-wahr-Halten',
    lead: 'Im Alltag bedeutet „glauben“ oft: etwas nicht genau wissen. Religiöser Glaube kann mehr bedeuten als eine unsichere Behauptung.',
    body: `<div class="arrival"><strong>Ankommen · etwa 1 Minute</strong><p>Erinnere dich an einen Menschen oder einen Ort, bei dem du nicht alles erklären musst. Wie fühlt sich Vertrauen im Körper an – weit, ruhig, vorsichtig?</p></div><p>Christlicher Glaube enthält Überzeugungen, erschöpft sich aber nicht darin. Das biblische Wortfeld verbindet Glauben mit Vertrauen, Treue und Sich-Verlassen. Vertrauen ist kein Gegenbegriff zum Denken. Es bleibt verletzlich.</p><div class="scripture"><strong>Biblischer Resonanzraum</strong><blockquote>Ich glaube; hilf meinem Unglauben!</blockquote><p>In Markus 9,24 wird der Widerspruch nicht aufgelöst. Der zweifelnde Satz wird selbst zur Anrede – vielleicht sogar zum Gebet.</p></div><details class="deepening"><summary>Tiefer gehen · weitere 10–15 Minuten</summary><div><h3>Welcher Hoffnung Raum geben?</h3><p>Wer glaubt, besitzt Gott nicht. Glaube kann Gewissheit und Unsicherheit, Nähe und Schweigen enthalten. Die Frage könnte weniger lauten: „Kann ich alles unterschreiben?“ – und mehr: „Welcher Hoffnung gebe ich heute Raum?“</p><h3>Eine kleine Vertrauensübung</h3><p>Vervollständige langsam: „Darauf möchte ich vertrauen …“ und „Davor möchte ich mich nicht verschließen …“. Wähle anschließend eine winzige Handlung, die zu dieser Hoffnung passt.</p></div></details>`,
    question: 'Wo vertraust du bereits, ohne vollständige Sicherheit zu haben?'
  },
  {
    kicker: 'Etappe 3 · kurz 6 Min. · mit Vertiefung 18–22 Min.', title: 'Jesus: Geschichte und Deutung',
    lead: 'Jesus von Nazaret war ein jüdischer Mensch seiner Zeit – und wurde für Christ:innen zum entscheidenden Bild Gottes.',
    body: `<div class="arrival"><strong>Ankommen · etwa 1 Minute</strong><p>Lege fertige Antworten kurz beiseite. Welche Szene, welches Bild oder welches Urteil über Jesus trägst du mit?</p></div><p>Jesus von Nazaret war ein jüdischer Mensch des ersten Jahrhunderts. Er verkündete Gottes Reich, erzählte Gleichnisse, heilte, sammelte Menschen und wurde unter römischer Herrschaft gekreuzigt. Unsere Quellen sind Glaubenszeugnisse, keine neutralen Reportagen.</p><div class="scripture"><strong>Biblischer Resonanzraum</strong><blockquote>Was wollt ihr, dass ich für euch tun soll?</blockquote><p>So fragt Jesus in Markus 10,36. Bevor eine Deutung kommt, steht eine offene Frage nach der Sehnsucht.</p></div><details class="deepening"><summary>Tiefer gehen · weitere 12–16 Minuten</summary><div><h3>Geschichte und Hoffnung</h3><p>Nach Jesu Tod deuteten seine Anhänger:innen ihre Erfahrungen als Begegnung mit dem Auferstandenen. Sie nannten ihn Prophet, Messias, Sohn Gottes, Befreier und menschgewordenes Wort. Historische Forschung und Glaube stellen verschiedene Fragen – und müssen einander nicht fürchten.</p><div class="context-box"><strong>Jüdischer Jesus</strong>Jesus war kein Christ. Eine verantwortliche christliche Deutung achtet seine jüdische Identität und macht das Judentum nicht zur überholten Vorstufe.</div><h3>Eine Begegnung in der Vorstellung</h3><p>Wenn es für dich stimmig ist, stelle dir Jesu Frage an dich vor: „Was willst du, dass ich für dich tun soll?“ Antworte ehrlich – auch mit „Ich weiß es nicht“. Lies deine Antwort anschließend als Hinweis auf das, was dir wirklich wichtig ist.</p></div></details>`,
    question: 'Was an Jesus interessiert, irritiert oder berührt dich?'
  },
  {
    kicker: 'Etappe 4 · kurz 5 Min. · mit Vertiefung 15–20 Min.', title: 'Warum die Bibel bedeutsam sein kann',
    lead: 'Die Bibel muss kein fehlerloses Diktat sein, um zu einer Quelle des Glaubens zu werden.',
    body: `<div class="arrival"><strong>Ankommen · etwa 1 Minute</strong><p>Denke an einen Satz – religiös oder nicht –, der dich einmal gefunden hat. Was hat ihn in diesem Moment lebendig gemacht?</p></div><p>In der Bibel haben Menschen Erfahrungen mit Gott, Gewalt, Befreiung, Liebe, Scheitern und Hoffnung bewahrt. Die Texte entstanden über Jahrhunderte und tragen die Grenzen ihrer Zeit.</p><div class="scripture"><strong>Biblischer Resonanzraum</strong><blockquote>Dein Wort ist meines Fußes Leuchte und ein Licht auf meinem Wege.</blockquote><p>Psalm 119 verspricht keinen Scheinwerfer für das ganze Leben. Das Bild genügt für den nächsten Schritt.</p></div><details class="deepening"><summary>Tiefer gehen · weitere 10–15 Minuten</summary><div><h3>Lesen als verantwortliches Gespräch</h3><p>Christ:innen hoffen, dass in menschlichen Worten etwas von Gottes Anrede hörbar wird. Diese Hoffnung ersetzt keine Kritik. Gerade weil Texte Wirkung entfalten, müssen Entstehung und Folgen geprüft werden.</p><div class="context-box"><strong>Vier Fragen</strong>Was steht da? · Woher kommt der Text? · Was hat er bewirkt? · Welche verantwortliche Bedeutung kann er heute gewinnen?</div><h3>Langsam lesen</h3><p>Lies den Satz aus Psalm 119 dreimal. Achte jeweils auf ein Wort, das hängen bleibt. Frage nicht sofort: „Was muss ich glauben?“, sondern: „Was beleuchtet dieser Satz – und was lässt er im Dunkeln?“</p></div></details>`,
    question: 'Was müsste geschehen, damit du einem biblischen Text neugierig begegnen könntest?'
  },
  {
    kicker: 'Etappe 5 · kurz 5 Min. · mit Vertiefung 15–20 Min.', title: 'Beten ohne falsche Gewissheit',
    lead: 'Beten kann auch dann beginnen, wenn du nicht weißt, ob jemand zuhört.',
    body: `<div class="arrival"><strong>Ankommen · etwa 1 Minute</strong><p>Atme dreimal ruhig. Du musst dich nicht sammeln, um „richtig“ zu beten. Auch Unruhe darf da sein.</p></div><p>Menschen beten bittend, dankend, klagend und schweigend. Manche erleben ein Gegenüber. Andere finden Worte für das, was sie selbst kaum verstehen. Beides muss nicht gegeneinander ausgespielt werden.</p><div class="scripture"><strong>Biblischer Resonanzraum</strong><blockquote>Wie lange noch, Gott, willst du mich vergessen?</blockquote><p>Psalm 13 beginnt nicht höflich. Klage und Protest gehören zur biblischen Sprache des Gebets.</p></div><details class="deepening"><summary>Tiefer gehen · weitere 10–15 Minuten</summary><div><h3>Gebet ohne Kontrolle</h3><p>Gebet ist keine Technik, mit der sich Gott oder die Welt steuern lässt. Unerfüllte Bitten sind kein Beweis für zu wenig Glauben.</p><h3>Vier ehrliche Sätze</h3><p>Wenn du möchtest, beginne jeden Satz mit „Gott …“ – oder lass die Anrede offen: „Dafür danke ich …“ · „Das beklage ich …“ · „Darum bitte ich …“ · „Dafür will ich selbst einstehen …“. Bleibe danach eine Minute still.</p><div class="context-box"><strong>Eine mögliche Anrede</strong>„Gott, wenn es dich gibt – hier bin ich.“ Auch dieser vorsichtige Satz kann ein Gebet sein.</div></div></details>`,
    question: 'Welche Form des Betens könnte sich für dich ehrlich anfühlen?'
  },
  {
    kicker: 'Etappe 6 · kurz 6 Min. · mit Vertiefung 18–25 Min.', title: 'Leid lässt sich nicht wegerklären',
    lead: 'Keine religiöse Antwort macht erlittenes Leid im Nachhinein sinnvoll oder notwendig.',
    body: `<div class="arrival"><strong>Ankommen · achtsam</strong><p>Diese Etappe kann Schweres berühren. Du darfst sie überspringen, unterbrechen oder später mit einem vertrauten Menschen lesen.</p></div><p>Wie ein guter Gott Leid zulassen kann, gehört zu den härtesten Glaubensfragen. Keine Theorie erklärt jedes Leid. Sätze über Strafe, Prüfung oder einen geheimen Plan können zusätzlich verletzen.</p><div class="scripture"><strong>Biblischer Resonanzraum</strong><blockquote>Mein Gott, warum hast du mich verlassen?</blockquote><p>Psalm 22 – später Jesus am Kreuz zugeschrieben – hält die Erfahrung der Gottverlassenheit in der Glaubenssprache selbst fest.</p></div><details class="deepening"><summary>Tiefer gehen · weitere 12–19 Minuten</summary><div><h3>Nicht erklären, sondern dabeibleiben</h3><p>Christliche Traditionen sprechen von Freiheit, begrenzter Schöpfung, verborgenem Handeln oder endgültiger Gerechtigkeit. Keine Antwort darf das Leid eines Menschen zum notwendigen Mittel erklären. Die Kreuzeserzählung behauptet nicht, Schmerz sei gut. Sie nährt die Hoffnung, dass Gott Leid nicht aus sicherer Entfernung betrachtet.</p><h3>Eine Praxis des Mitgefühls</h3><p>Nenne – nur wenn es dir guttut – einen Schmerz. Sage: „Das hätte nicht sein sollen.“ Frage dann: „Welche Form von Nähe, Schutz oder Widerstand ist jetzt möglich?“ Vielleicht ist der nächste Schritt ein Anruf und kein religiöser Satz.</p><div class="context-box"><strong>Eine Grenze</strong>Akutes psychisches oder körperliches Leid braucht konkrete Hilfe. Spirituelle Begleitung ersetzt keine medizinische oder therapeutische Unterstützung.</div></div></details>`,
    question: 'Welche Antwort auf Leid möchtest du nicht mehr hören müssen?'
  },
  {
    kicker: 'Etappe 7 · kurz 5 Min. · mit Vertiefung 15–20 Min.', title: 'Braucht Glaube Gemeinschaft?',
    lead: 'Glaube ist persönlich, aber selten nur privat. Gemeinschaft kann tragen – und sie kann verletzen.',
    body: `<div class="arrival"><strong>Ankommen · etwa 1 Minute</strong><p>Denke an eine Gemeinschaft, in der du freier wurdest – oder an eine, die dich eng gemacht hat. Was war der Unterschied?</p></div><p>Kirchen bewahren Texte, Musik, Rituale und soziale Praxis. Menschen können dort gemeinsam feiern, zweifeln, handeln und füreinander einstehen. Institutionen besitzen zugleich Macht und haben sie vielfach missbraucht.</p><div class="scripture"><strong>Biblischer Resonanzraum</strong><blockquote>Einer trage des andern Last.</blockquote><p>Galater 6,2 beschreibt Gemeinschaft nicht zuerst als Übereinstimmung, sondern als solidarische Praxis.</p></div><details class="deepening"><summary>Tiefer gehen · weitere 10–15 Minuten</summary><div><h3>Verbunden, nicht vereinnahmt</h3><p>Zugehörigkeit ist kein Selbstzweck. Eine gute Gemeinschaft respektiert Grenzen, hält Kritik aus und macht deinen Wert nicht von Anpassung abhängig. Eine Gemeinde ist nicht die Türhüterin Gottes. Sie kann aber ein Ort werden, an dem Glaube Gestalt gewinnt.</p><h3>Ein behutsamer nächster Schritt</h3><p>Formuliere drei Kriterien für einen sicheren Ort. Vielleicht: Ich darf fragen. Vielfalt wird nicht nur behauptet. Verantwortung und Schutz sind sichtbar. Wenn du neugierig bist, könnte dein Versuch ein Gottesdienstbesuch oder ein unverbindliches Gespräch sein.</p><div class="context-box"><strong>Du entscheidest</strong>Du darfst nach Haltung, theologischer Ausrichtung und Schutzkonzepten fragen – und wieder gehen.</div></div></details>`,
    question: 'Was müsste eine christliche Gemeinschaft bieten, damit du dich sicher und frei fühlst?'
  },
  {
    kicker: 'Etappe 8 · kurz 6 Min. · mit Vertiefung 18–25 Min.', title: 'Ein vorläufiger Glaube',
    lead: 'Du brauchst kein fertiges Bekenntnis. Ein ehrlicher Zwischenstand kann genug sein, um weiterzugehen.',
    body: `<div class="arrival"><strong>Ankommen · etwa 1 Minute</strong><p>Schau kurz zurück. Welcher Gedanke, welches Unbehagen oder welcher Satz ist bei dir geblieben? Du musst den Weg nicht positiv abschließen.</p></div><p>Vielleicht hast du Zustimmung gefunden, vielleicht neue Fragen. Beides ist ein Ergebnis. Glaube verändert sich mit Erfahrungen, Beziehungen und Wissen. Vorläufigkeit ist nicht Beliebigkeit: Du kannst dich orientieren und lernfähig bleiben.</p><div class="scripture"><strong>Biblischer Resonanzraum</strong><blockquote>Prüft alles und behaltet das Gute.</blockquote><p>1. Thessalonicher 5,21 verbindet Offenheit mit Urteilskraft. Glauben heißt hier nicht, jede Behauptung hinzunehmen.</p></div><details class="deepening"><summary>Tiefer gehen · weitere 12–19 Minuten</summary><div><h3>Ein persönlicher Zwischenstand</h3><div class="context-box"><strong>Vier unvollendete Sätze</strong>Ich hoffe …<br>Ich zweifle …<br>Ich lasse zurück …<br>Ich möchte ausprobieren …</div><p>Lies deine Sätze langsam. Wähle nicht den frommsten, sondern den ehrlichsten als nächsten Schritt.</p><h3>Ein möglicher Segen</h3><p>Wenn du möchtest, nimm diese Worte mit: „Mögest du Fragen finden, die dich öffnen; Menschen, bei denen du frei wirst; und Hoffnung, die Hände und Füße bekommt.“</p><blockquote>Weiter glauben kann heißen: weiterzumachen. Es kann auch heißen: weiter, offener und mit mehr Raum zu glauben.</blockquote><p>Du kannst den Bibelweg vertiefen oder ein unverbindliches Gespräch suchen. Keine Möglichkeit beweist mehr Glauben als die andere.</p></div></details>`,
    question: 'Wie lautet dein persönlicher, vorläufiger nächster Satz?'
  }
];

const bibleLessons = [
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

const pathDefinitions = {
  intro: { id: 'intro', number: 'Weg 01', title: 'Kann ich glauben – und wenn ja, wie?', lessons: introLessons },
  bible: { id: 'bible', number: 'Weg 02', title: 'Die Bibel lesen, ohne sie wörtlich zu nehmen', lessons: bibleLessons }
};
const journey = document.querySelector('#journey');
const lessonNav = journey.querySelector('.lesson-nav');
const lessonSelect = journey.querySelector('#lesson-select');
let activePath = pathDefinitions.intro;
let currentLesson = 0;
let completedLessons = new Set();

function storageKey(pathId, kind) { return `weiter-glauben-${pathId}-${kind}`; }
function reflectionKey(pathId, index) { return `weiter-glauben-${pathId}-reflection-${index}`; }

function migrateLegacyBibleProgress() {
  if (localStorage.getItem(storageKey('bible', 'completed')) !== null) return;
  const legacyCompleted = localStorage.getItem('weite-completed-lessons');
  const legacyCurrent = localStorage.getItem('weite-current-lesson');
  if (legacyCompleted !== null) localStorage.setItem(storageKey('bible', 'completed'), legacyCompleted);
  if (legacyCurrent !== null) localStorage.setItem(storageKey('bible', 'current'), legacyCurrent);
  bibleLessons.forEach((_, index) => {
    const note = localStorage.getItem(`weite-reflection-${index}`);
    if (note !== null) localStorage.setItem(reflectionKey('bible', index), note);
  });
}
migrateLegacyBibleProgress();

function loadPathState(path) {
  currentLesson = Number(localStorage.getItem(storageKey(path.id, 'current')) || 0);
  try { completedLessons = new Set(JSON.parse(localStorage.getItem(storageKey(path.id, 'completed')) || '[]')); }
  catch { completedLessons = new Set(); }
}

function savePathState() {
  localStorage.setItem(storageKey(activePath.id, 'current'), currentLesson);
  localStorage.setItem(storageKey(activePath.id, 'completed'), JSON.stringify([...completedLessons]));
}

function buildLessonNav() {
  lessonNav.replaceChildren();
  lessonSelect.replaceChildren();
  activePath.lessons.forEach((lesson, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `${index + 1}. ${lesson.title}`;
    button.addEventListener('click', () => renderLesson(index));
    lessonNav.append(button);
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${index + 1} von ${activePath.lessons.length} · ${lesson.title}`;
    lessonSelect.append(option);
  });
}

function saveReflection() {
  if (!journey.classList.contains('open')) return;
  const note = journey.querySelector('#reflection-note').value;
  localStorage.setItem(reflectionKey(activePath.id, currentLesson), note);
}

function renderLesson(index, saveCurrent = true) {
  if (saveCurrent) saveReflection();
  currentLesson = Math.max(0, Math.min(index, activePath.lessons.length - 1));
  savePathState();
  const lesson = activePath.lessons[currentLesson];
  journey.querySelector('.journey-count').textContent = `${currentLesson + 1} / ${activePath.lessons.length}`;
  journey.querySelector('.journey-progress span').style.width = `${((currentLesson + 1) / activePath.lessons.length) * 100}%`;
  journey.querySelector('.lesson-number').textContent = String(currentLesson + 1).padStart(2, '0');
  journey.querySelector('.lesson-kicker').textContent = lesson.kicker;
  journey.querySelector('.lesson-title').textContent = lesson.title;
  journey.querySelector('.lesson-lead').textContent = lesson.lead;
  journey.querySelector('.lesson-body').innerHTML = lesson.body;
  journey.querySelector('.reflection-question').textContent = lesson.question;
  journey.querySelector('#reflection-note').value = localStorage.getItem(reflectionKey(activePath.id, currentLesson)) || '';
  journey.querySelector('.lesson-back').disabled = currentLesson === 0;
  journey.querySelector('.lesson-next').innerHTML = currentLesson === activePath.lessons.length - 1 ? 'Weg abschließen <span>✓</span>' : 'Nächste Etappe <span>→</span>';
  lessonSelect.value = String(currentLesson);
  [...lessonNav.children].forEach((button, buttonIndex) => {
    button.classList.toggle('active', buttonIndex === currentLesson);
    button.classList.toggle('done', completedLessons.has(buttonIndex));
  });
  journey.scrollTo({ top: 0, behavior: 'smooth' });
}

function openJourney(pathId) {
  activePath = pathDefinitions[pathId];
  if (!activePath) return;
  loadPathState(activePath);
  journey.querySelector('.journey-aside .eyebrow').textContent = activePath.number;
  journey.querySelector('.journey-aside h2').textContent = activePath.title;
  buildLessonNav();
  journey.classList.add('open');
  journey.setAttribute('aria-hidden', 'false');
  document.body.classList.add('journey-open');
  renderLesson(currentLesson, false);
}

function closeJourney() {
  saveReflection();
  journey.classList.remove('open');
  journey.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('journey-open');
}

document.querySelectorAll('[data-start-path]').forEach(button => button.addEventListener('click', () => openJourney(button.dataset.startPath)));
journey.querySelector('.journey-close').addEventListener('click', closeJourney);
journey.querySelector('.lesson-back').addEventListener('click', () => renderLesson(currentLesson - 1));
journey.querySelector('.lesson-next').addEventListener('click', () => {
  completedLessons.add(currentLesson);
  savePathState();
  if (currentLesson < activePath.lessons.length - 1) renderLesson(currentLesson + 1);
  else {
    showToastMessage('Weg abgeschlossen. Du kannst jederzeit zurückkehren.');
    closeJourney();
  }
});
journey.querySelector('#reflection-note').addEventListener('input', saveReflection);
lessonSelect.addEventListener('change', () => renderLesson(Number(lessonSelect.value)));

function showToastMessage(message) {
  toast.textContent = message;
  showToast();
}

const progressDialog = document.querySelector('#progress-dialog');
const progressClose = progressDialog.querySelector('.dialog-close');

function pathProgress(path) {
  let completed = [];
  try { completed = JSON.parse(localStorage.getItem(storageKey(path.id, 'completed')) || '[]'); } catch {}
  return {
    currentLesson: Number(localStorage.getItem(storageKey(path.id, 'current')) || 0),
    completedLessons: completed.filter(index => Number.isInteger(index) && index >= 0 && index < path.lessons.length)
  };
}

function updateProgressSummary() {
  const completed = Object.values(pathDefinitions).reduce((sum, path) => sum + new Set(pathProgress(path).completedLessons).size, 0);
  const total = Object.values(pathDefinitions).reduce((sum, path) => sum + path.lessons.length, 0);
  progressDialog.querySelector('[data-completed-count]').textContent = completed;
  progressDialog.querySelector('[data-total-count]').textContent = total;
}

document.querySelector('[data-open-progress]').addEventListener('click', () => {
  updateProgressSummary();
  progressDialog.showModal();
});
progressClose.addEventListener('click', () => progressDialog.close());

function collectProgress(includeNotes) {
  const paths = {};
  Object.values(pathDefinitions).forEach(path => {
    paths[path.id] = pathProgress(path);
    if (includeNotes) paths[path.id].reflections = path.lessons.map((_, index) => localStorage.getItem(reflectionKey(path.id, index)) || '');
  });
  return { format: 'weiter-glauben-progress', version: 2, exportedAt: new Date().toISOString(), paths };
}

progressDialog.querySelector('[data-export]').addEventListener('click', () => {
  const includeNotes = progressDialog.querySelector('#include-notes').checked;
  const blob = new Blob([JSON.stringify(collectProgress(includeNotes), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `weiter-glauben-stand-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToastMessage(includeNotes ? 'Stand und Notizen wurden gesichert.' : 'Dein Stand wurde gesichert.');
});

function applyPathData(path, data) {
  if (!data || !Array.isArray(data.completedLessons) || !data.completedLessons.every(index => Number.isInteger(index) && index >= 0 && index < path.lessons.length)) throw new Error('invalid');
  const current = Number.isInteger(data.currentLesson) ? Math.max(0, Math.min(data.currentLesson, path.lessons.length - 1)) : 0;
  localStorage.setItem(storageKey(path.id, 'current'), current);
  localStorage.setItem(storageKey(path.id, 'completed'), JSON.stringify([...new Set(data.completedLessons)]));
  if (Array.isArray(data.reflections)) data.reflections.slice(0, path.lessons.length).forEach((note, index) => {
    if (typeof note === 'string') localStorage.setItem(reflectionKey(path.id, index), note);
  });
}

function applyProgressData(data) {
  if (data.format !== 'weiter-glauben-progress') throw new Error('invalid');
  if (data.version === 1) {
    applyPathData(pathDefinitions.bible, data);
  } else if (data.version === 2 && data.paths) {
    Object.values(pathDefinitions).forEach(path => { if (data.paths[path.id]) applyPathData(path, data.paths[path.id]); });
  } else throw new Error('invalid');
  loadPathState(activePath);
  updateProgressSummary();
}

document.querySelector('#import-progress').addEventListener('change', async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    if (file.size > 1024 * 1024) throw new Error('too_large');
    applyProgressData(JSON.parse(await file.text()));
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
  Object.values(pathDefinitions).forEach(path => {
    localStorage.removeItem(storageKey(path.id, 'current'));
    localStorage.removeItem(storageKey(path.id, 'completed'));
    path.lessons.forEach((_, index) => localStorage.removeItem(reflectionKey(path.id, index)));
  });
  localStorage.removeItem('weite-current-lesson');
  localStorage.removeItem('weite-completed-lessons');
  bibleLessons.forEach((_, index) => localStorage.removeItem(`weite-reflection-${index}`));
  loadPathState(activePath);
  updateProgressSummary();
  showToastMessage('Deine lokal gespeicherten Daten wurden gelöscht.');
});

document.querySelectorAll('[data-coming-soon]').forEach(button => button.addEventListener('click', () => showToastMessage('Dieser Weg ist in Vorbereitung.')));

const dateLabel = document.querySelector('.hero .eyebrow');
dateLabel.textContent = new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
