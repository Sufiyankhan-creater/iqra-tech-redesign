/* 
    Iqra Tech Redesign - Emerald & Gold Edition
    Handles: Theme, Academy, and Dynamic Quran Reader (30 Paras)
*/

// ─── Quranic Word of the Day Database ───────────────────────────────────────
const quranicWords = [
    {
        arabic: "اقْرَأْ", transliteration: "Iqra'",
        meaning: "Read / Recite", root: "ق ر أ  (q-r-ʾ)",
        reference: "Surah Al-Alaq 96:1",
        context: "\"Read in the name of your Lord who created.\""
    },
    {
        arabic: "صَبْر", transliteration: "Sabr",
        meaning: "Patience / Steadfastness", root: "ص ب ر  (ṣ-b-r)",
        reference: "Surah Al-Baqarah 2:153",
        context: "\"Indeed, Allah is with the patient.\""
    },
    {
        arabic: "رَحْمَة", transliteration: "Rahmah",
        meaning: "Mercy / Compassion", root: "ر ح م  (r-ḥ-m)",
        reference: "Surah Al-A'raf 7:156",
        context: "\"My mercy encompasses all things.\""
    },
    {
        arabic: "تَوَكَّل", transliteration: "Tawakkul",
        meaning: "Complete reliance on Allah", root: "و ك ل  (w-k-l)",
        reference: "Surah At-Talaq 65:3",
        context: "\"Whoever relies upon Allah — He is sufficient for him.\""
    }
];

// ─── Academy & Global State ────────────────────────────────────────────────
let academyState = { category: 'huruf-e-jar', step: 1, quizIndex: 0, quizAttempts: 0 };
let audioSettings = {
    reciter: 'ar.alafasy',
    mode: 'professional',
    currentAudio: null
};
const categoryInfo = {
    'huruf-e-jar': { step1: 'STEP 1: DISCOVER', step2: 'STEP 2: APPLY', step3: 'STEP 3: MASTER', title: 'Huruf-e-Jar', desc: 'Prepositions that influence the case of the following noun.' },
    'attached-pronouns': { step1: 'STEP 1: IDENTIFY', step2: 'STEP 2: CONTEXT', step3: 'STEP 3: MASTER', title: 'Attached Pronouns', desc: 'Suffixes denoting ownership or object status.' },
    'detached-pronouns': { step1: 'STEP 1: RECOGNIZE', step2: 'STEP 2: SUBJECTS', step3: 'STEP 3: MASTER', title: 'Detached Pronouns', desc: 'Independent pronouns used as sentence subjects.' },
    'past-tense': { step1: 'STEP 1: ACTION', step2: 'STEP 2: NARRATIVE', step3: 'STEP 3: MASTER', title: "Past Tense", desc: 'Completed actions in sacred history.' },
    'universal-tense': { step1: 'STEP 1: PROGRESSION', step2: 'STEP 2: REALITY', step3: 'STEP 3: MASTER', title: "Universal Tense", desc: 'Ongoing, present, or future actions.' }
};

// ─── Core Initialization ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    loadDailyWord();
    initLoaders();
    initAcademy();
    initQuranExplorer();
    initParticles();
    animateStats();
    initScrollReveal();
    initMobileMenu();
    registerServiceWorker();
});

function initLoaders() {
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => { if (loader) loader.style.opacity = '0'; setTimeout(() => { if (loader) loader.style.display = 'none'; }, 500); }, 800);
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
}

function loadDailyWord() {
    const day = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const word = quranicWords[(day + 7) % quranicWords.length];

    if (document.querySelector('.wotd-card-arabic')) {
        document.querySelector('.wotd-card-arabic').textContent = word.arabic;
        document.querySelector('.wotd-card-meaning').innerHTML = `
            <span class="urdu-text" style="font-family: 'Amiri', serif; font-size: 1.4rem;">${word.transliteration}</span>
            <div class="vert-divider"></div>
            <span class="eng-text">${word.meaning}</span>
        `;
        document.querySelector('.wotd-card-context').textContent = word.context;
    }
}

// ─── Academy Logic ────────────────────────────────────────────────────────

// Maps EVERY Academy Arabic text ➜ global Quran ayah number
// Plays the EXACT same Alafasy MP3 CDN as the Quran Reader section
// Coverage: all vocab words + all example phrases across all 5 categories
const _ayahMap = new Map([

    // ── HURUF-E-JAR VOCABULARY (Step 1) ─────────────────────────────────────
    // Each particle mapped to a short Quran ayah that prominently contains it
    ['مِنْ', 6236],  // 114:6  "مِنَ الْجِنَّةِ وَالنَّاسِ"
    ['إِلَى', 6114],  // 96:8   "إِنَّ إِلَىٰ رَبِّكَ الرُّجْعَىٰ"
    ['عَلَى', 7],     // 1:7    "أَنْعَمْتَ عَلَيْهِمْ"
    ['فِي', 9],     // 2:2    "لَا رَيْبَ فِيهِ هُدًى"
    ['بِ', 1],     // 1:1    "بِسْمِ اللَّهِ الرَّحْمَٰنِ"
    ['لِ', 2],     // 1:2    "الْحَمْدُ لِلَّهِ رَبِّ"
    ['عَنْ', 6202],  // 107:5  "عَن صَلَاتِهِمْ سَاهُونَ"
    ['كَ', 6161],  // 101:4  "كَالْفَرَاشِ الْمَبْثُوثِ"
    ['حَتَّى', 6130],  // 97:5   "حَتَّىٰ مَطْلَعِ الْفَجْرِ"
    ['و', 6099],  // 95:1   "وَالتِّينِ وَالزَّيْتُونِ"
    ['ت', 6099],  // 95:1   same

    // ── ATTACHED PRONOUNS VOCABULARY (Step 1) ────────────────────────────────
    ['هُ', 6222],  // 112:1 "قُلْ هُوَ اللَّهُ أَحَدٌ"
    ['هُمَا', 2],     // 1:2   (closest Fatiha ayah with dual context)
    ['هُمْ', 12],    // 2:5   "هُمُ الْمُفْلِحُونَ"
    ['هَا', 6140],  // 99:2  "وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا"
    ['ي', 5],     // 1:5   "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ"
    ['نَا', 5],     // 1:5   "نَسْتَعِينُ"
    ['كُمْ', 190],   // 2:183 "كُتِبَ عَلَيْكُمُ الصِّيَامُ"

    // ── DETACHED PRONOUNS VOCABULARY (Step 1) ────────────────────────────────
    ['هُوَ', 6222],  // 112:1 "قُلْ هُوَ اللَّهُ أَحَدٌ"
    ['أَنْتَ', 5],     // 1:5
    ['أَنْتُمْ', 190],  // 2:183
    ['أَنَا', 3282],  // 28:30 "إِنِّي أَنَا اللَّهُ"
    ['نَحْنُ', 1811],  // 15:9  "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ"
    ['هِيَ', 6225],  // 112:4 "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"
    ['أَنْتِ', 5],     // 1:5

    // ── PAST TENSE VOCABULARY (Step 1) ───────────────────────────────────────
    ['فَعَلَ', 6189], // 105:1 "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ"
    ['فَعَلُوا', 5],    // 1:5
    ['فَعَلْتَ', 2951], // 26:19 "وَفَعَلْتَ فَعْلَتَكَ الَّتِي فَعَلْتَ"
    ['فَعَلْتُمْ', 5],
    ['فَعَلْتُ', 5],
    ['فَعَلْنَا', 5],

    // ── UNIVERSAL TENSE VOCABULARY (Step 1) ──────────────────────────────────
    ['يَفْعَلُ', 5],
    ['يَفْعَلُونَ', 15],   // 2:8  "وَمِنَ النَّاسِ مَن يَقُولُ"
    ['تَفْعَلُ', 5],
    ['أَفْعَلُ', 5],
    ['نَفْعَلُ', 5],

    // ── HURUF-E-JAR EXAMPLES (Step 2) ────────────────────────────────────────
    ['بِسْمِ اللَّهِ', 1],
    ['الْحَمْدُ لِلَّهِ', 2],
    ['إِلَى صِرَاطٍ مُّسْتَقِيمٍ', 6],
    ['عَلَى الْعَرْشِ', 2353],
    ['مِنَ النَّاسِ', 6236],
    ['الْحَمْدُ لِلَّهِ', 2],
    ['عَنِ الصَّلَاةِ', 6202],
    ['كَالْعَهْنِ الْمَنفُوشِ', 6162],
    ['حَتَّى مَطْلَعِ الْفَجْرِ', 6130],
    ['وَالتِّينِ وَالزَّيْتُونِ', 6099],
    ['بِالْحَقِّ', 2110],
    ['فِي الْأَرْضِ', 18],
    ['إِلَى رَبِّكَ', 5890],
    ['عَلَى قُلُوبِهِمْ', 14],
    ['لِأُولِي الْأَلْبَابِ', 300],
    ['مِنَ الْمُسْلِمِينَ', 360],
    ['عَنِ النَّعِيمِ', 6176],
    ['كَالْفَرَاشِ الْمَبْثُوثِ', 6161],
    ['إِلَى النُّورِ', 5228],
    ['فِي جَنَّاتٍ', 4991],
    ['فِي الدِّينِ', 263],

    // ── ATTACHED PRONOUN EXAMPLES (Step 2) ───────────────────────────────────
    ['عَلَيْكُمْ', 7],
    ['فِيهِ', 5],
    ['هُوَ اللَّهُ', 6222],
    ['نَصَرُوا اللَّهَ', 3374],

    // ── DETACHED PRONOUN EXAMPLES (Step 2) ───────────────────────────────────
    ['نَحْنُ خَلَقْنَاكُمْ', 5575],
    ['هُمُ الْمُفْلِحُونَ', 8],

    // ── PAST TENSE EXAMPLES (Step 2) ─────────────────────────────────────────
    ['خَلَقَ الْإِنسَانَ', 5795],
    ['جَاءَ نَصْرُ اللَّهِ', 6214],
    ['قَتَلَ دَاوُودُ جَالُوتَ', 255],
    ['غَلَبَتِ الرُّومُ', 1667],

    // ── UNIVERSAL TENSE EXAMPLES (Step 2) ────────────────────────────────────
    ['يَضْرِبُ اللَّهُ الْأَمْثَالَ', 1773],
    ['يَهْدِي اللَّهُ لِنُورِهِ', 2465],
    ['يَرْزُقُ مَنْ يَشَاءُ', 1764],
]);

function initAcademy() {
    const grid = document.getElementById('academy-dynamic-grid');
    if (!grid) return;

    renderAcademy();

    document.getElementById('academy-next-btn')?.addEventListener('click', () => {
        if (academyState.step === 1) {
            academyState.step = 2; renderAcademy(); window.scrollTo({ top: 300, behavior: 'smooth' });
        } else if (academyState.step === 2) {
            academyState.step = 3; academyState.quizIndex = 0; renderAcademy(); window.scrollTo({ top: 300, behavior: 'smooth' });
        } else {
            const data = grammarData[academyState.category];
            if (academyState.quizIndex < data.exercises.length - 1) {
                academyState.quizIndex++; renderAcademy();
            } else {
                showCompletionModal();
            }
        }
    });

    document.getElementById('academy-prev-btn')?.addEventListener('click', () => {
        if (academyState.step > 1) { academyState.step--; renderAcademy(); }
    });

    document.querySelectorAll('.academy-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.academy-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            academyState.category = tab.getAttribute('data-category');
            academyState.step = 1;
            renderAcademy();
        });
    });
}

function renderAcademy() {
    const grid = document.getElementById('academy-dynamic-grid');
    const examplesGrid = document.getElementById('academy-examples-grid');
    const quizContainer = document.getElementById('academy-quiz-container');
    const data = grammarData[academyState.category];
    const info = categoryInfo[academyState.category];

    const badge = document.getElementById('academy-step-badge');
    if (academyState.step === 1) badge.innerHTML = `<i class="fas fa-bolt"></i> ${info.step1}`;
    else if (academyState.step === 2) badge.innerHTML = `<i class="fas fa-bolt"></i> ${info.step2}`;
    else badge.innerHTML = `<i class="fas fa-certificate"></i> ${info.step3}`;

    document.getElementById('academy-title').textContent = info.title;
    document.getElementById('academy-desc').textContent = info.desc;
    document.getElementById('academy-rule-text').textContent = data.rule;

    if (academyState.step === 1) {
        grid.style.display = 'grid'; examplesGrid.style.display = 'none'; quizContainer.style.display = 'none';
        document.getElementById('academy-next-btn').textContent = 'Next: Examples';
        document.getElementById('academy-prev-btn').style.display = 'none';

        grid.innerHTML = data.words.map(w => `
            <div class="word-card glass-card">
                <div class="word-arabic">${w.arabic}</div>
                <div class="word-translations">
                    <div class="trans-item"><span class="label">URDU</span><span class="urdu-text">${w.urdu}</span></div>
                    <div class="trans-item"><span class="label">ENG</span><span class="eng-text">${w.english}</span></div>
                </div>
            </div>`).join('');

    } else if (academyState.step === 2) {
        grid.style.display = 'none'; examplesGrid.style.display = 'block'; quizContainer.style.display = 'none';
        document.getElementById('academy-next-btn').textContent = 'Next: Exercises';
        document.getElementById('academy-prev-btn').style.display = 'inline-block';

        examplesGrid.innerHTML = data.examples.map(ex => `
            <div class="academy-example-card">
                <div class="example-arabic">${ex.arabic}</div>
                <div class="example-translations">
                    <div class="example-trans-item"><div class="lang-label">URDU</div><div class="trans-text urdu-font">${ex.urdu}</div></div>
                    <div class="example-trans-item"><div class="lang-label">ENG</div><div class="trans-text">${ex.english}</div></div>
                </div>
            </div>`).join('');

    } else {
        grid.style.display = 'none'; examplesGrid.style.display = 'none'; quizContainer.style.display = 'block';
        const isLastQuest = academyState.quizIndex === data.exercises.length - 1;
        document.getElementById('academy-next-btn').textContent = isLastQuest ? 'Finish Mastery' : 'Next Question';
        document.getElementById('academy-prev-btn').style.display = 'inline-block';
        renderQuiz();
    }
}


function renderQuiz() {
    const data = grammarData[academyState.category];
    const quiz = data.exercises[academyState.quizIndex];
    const questionText = document.getElementById('quiz-question-text');
    const optionsGrid = document.getElementById('quiz-options-grid');
    const feedback = document.getElementById('quiz-feedback-box');

    feedback.style.display = 'none';
    questionText.textContent = `${academyState.quizIndex + 1}. ${quiz.question}`;

    if (quiz.type === 'match') {
        optionsGrid.style.gridTemplateColumns = '1fr';
        optionsGrid.innerHTML = `
            <p style="color: var(--text-muted); margin-bottom: 1rem;">Verify your knowledge of these connections:</p>
            <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                ${quiz.options.map(opt => `
                    <div class="glass-card" style="padding: 1rem; border: 1px dashed var(--accent-gold); color: #fff; cursor: default;">
                        <i class="fas fa-link" style="color: var(--accent-gold); margin-right: 10px;"></i> ${opt}
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-teal" onclick="checkQuizAnswer('All')" style="margin-top: 1.5rem; width: 100%;">I have internalized these!</button>
        `;
    } else {
        optionsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
        optionsGrid.innerHTML = quiz.options.map(opt => `
            <button class="quiz-option-btn glass-card" onclick="checkQuizAnswer('${opt}')" style="padding: 1.5rem; color: #fff; font-size: 1.2rem; cursor: pointer; transition: 0.3s; width: 100%; border: 1px solid var(--glass-border);">
                ${opt}
            </button>
        `).join('');
    }
}

window.checkQuizAnswer = function (selected) {
    const data = grammarData[academyState.category];
    const quiz = data.exercises[academyState.quizIndex];
    const feedback = document.getElementById('quiz-feedback-box');

    feedback.style.display = 'block';

    if (selected === quiz.answer || selected === 'All') {
        feedback.style.background = 'rgba(0, 168, 132, 0.2)';
        feedback.style.color = 'var(--accent-teal)';
        feedback.innerHTML = `<i class="fas fa-check-circle"></i> Excellent! Correct Answer. ${selected === 'All' ? 'Connections Confirmed.' : ''}`;
        document.getElementById('academy-next-btn').classList.add('glow-gold');
        academyState.quizAttempts = 0; // Reset for next question
    } else {
        academyState.quizAttempts++;

        if (academyState.quizAttempts < 2) {
            feedback.style.background = 'rgba(240, 189, 90, 0.1)';
            feedback.style.color = 'var(--accent-gold)';
            feedback.innerHTML = `<i class="fas fa-exclamation-circle"></i> Not quite right. You have one more chance! Analyze the grammar again.`;

            // Visual shake to indicate retry
            const options = document.getElementById('quiz-options-grid');
            options.classList.add('shake-anim');
            setTimeout(() => options.classList.remove('shake-anim'), 500);
        } else {
            feedback.style.background = 'rgba(255, 85, 85, 0.1)';
            feedback.style.color = '#ff5555';
            feedback.innerHTML = `<i class="fas fa-times-circle"></i> Incorrect. Shuffling examples to strengthen your understanding...`;
            document.getElementById('academy-next-btn').classList.remove('glow-gold');

            // SHUFFLE LOGIC: Only on 2nd failure
            setTimeout(() => {
                shuffleArray(data.exercises);
                academyState.quizIndex = 0;
                academyState.quizAttempts = 0;
                renderAcademy();
            }, 1500);
        }
    }
}

// ─── Arabic Voice Engine ───────────────────────────────────────────────────

// Pre-load Arabic voices as soon as the browser is ready
let _arabicVoice = null;
function _loadArabicVoice() {
    const voices = window.speechSynthesis.getVoices();
    const female = voices.find(v => v.lang.startsWith('ar') &&
        (v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('laila') ||
            v.name.toLowerCase().includes('amira')));
    _arabicVoice = female || voices.find(v => v.lang.startsWith('ar')) || null;
}
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = _loadArabicVoice;
    _loadArabicVoice(); // also try immediately
}

// Animate a voice icon: pulse while speaking
function _animateVoiceIcon(iconEl) {
    if (!iconEl) return;
    iconEl.classList.remove('voice-playing');
    // Force reflow so the animation restarts on repeated clicks
    void iconEl.offsetWidth;
    iconEl.classList.add('voice-playing');
}

// Main speak function — unchanged signature so Quran section is unaffected
window.speakArabic = function (text, ayahNumber, iconEl) {
    // Stop any current audio
    if (audioSettings.currentAudio) {
        audioSettings.currentAudio.pause();
        audioSettings.currentAudio = null;
    }

    // Animate the clicked icon (Academy only; Quran passes no iconEl)
    _animateVoiceIcon(iconEl || null);

    // 1. Professional Recitation Mode — Quran numbered ayahs via Alafasy MP3
    if (ayahNumber) {
        console.log(`Streaming Taraweeh Style: Alafasy | Ayah: ${ayahNumber}`);
        const url = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`;
        audioSettings.currentAudio = new Audio(url);
        audioSettings.currentAudio.play().catch(err => {
            console.error("Audio playback error, falling back to TTS:", err);
            processTTS(text, iconEl);
        });
        return;
    }

    // 2. TTS Mode — used by Academy
    processTTS(text, iconEl);
};

// processTTS: reads the EXACT text passed — no full ayah, no CDN
// Waits for voices if they haven't loaded yet (fixes silent output on first click)
function processTTS(text, iconEl) {
    if (!('speechSynthesis' in window)) {
        if (iconEl) iconEl.classList.remove('voice-playing');
        return;
    }
    window.speechSynthesis.cancel();

    const doSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.72;
        utterance.pitch = 0.95;
        utterance.volume = 1;
        // Try to assign an Arabic voice
        if (!_arabicVoice) _loadArabicVoice();
        if (_arabicVoice) utterance.voice = _arabicVoice;
        utterance.onend = () => { if (iconEl) iconEl.classList.remove('voice-playing'); };
        utterance.onerror = () => { if (iconEl) iconEl.classList.remove('voice-playing'); };
        window.speechSynthesis.speak(utterance);
    };

    // If voices haven't loaded yet, wait for them then speak
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
            _loadArabicVoice();
            doSpeak();
        }, { once: true });
    } else {
        doSpeak();
    }
}

// Academy voice removed per user request — Quran section unchanged

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showCompletionModal() {
    const currentCategory = academyState.category;
    const categories = Object.keys(categoryInfo);
    const currentIndex = categories.indexOf(currentCategory);
    const nextCategory = categories[currentIndex + 1];

    const modal = document.createElement('div');
    modal.className = 'congrats-modal';
    modal.style = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(5, 5, 10, 0.95); z-index: 10000;
        display: flex; align-items: center; justify-content: center;
        backdrop-filter: blur(10px);
    `;
    modal.innerHTML = `
        <div class="glass-card reveal active" style="padding: 4rem; text-align: center; max-width: 600px; border: 2px solid var(--accent-gold);">
            <div style="font-size: 5rem; color: var(--accent-gold); margin-bottom: 2rem;"><i class="fas fa-trophy"></i></div>
            <h2 style="font-size: 2.5rem; color: #fff; margin-bottom: 1rem;">Mubarak! (Congratulations)</h2>
            <p style="color: var(--text-muted); font-size: 1.2rem; margin-bottom: 3rem;">
                You have mastered the topic: <span style="color: var(--accent-gold); font-weight: 700;">${categoryInfo[currentCategory].title}</span>. 
                Your understanding of Quranic linguistics is growing!
            </p>
            ${nextCategory ? `
                <button class="btn btn-teal" onclick="moveToNextTopic('${nextCategory}')" style="padding: 1rem 3rem; font-size: 1.1rem;">Move to ${categoryInfo[nextCategory].title} <i class="fas fa-arrow-right"></i></button>
            ` : `
                <button class="btn btn-teal" onclick="location.reload()" style="padding: 1rem 3rem;">Finish Academy</button>
            `}
        </div>
    `;
    document.body.appendChild(modal);
}

window.moveToNextTopic = function (nextCat) {
    const modal = document.querySelector('.congrats-modal');
    if (modal) modal.remove();

    // Update State
    academyState.category = nextCat;
    academyState.step = 1;
    academyState.quizIndex = 0;

    // Update Tab UI
    document.querySelectorAll('.academy-tab').forEach(t => {
        t.classList.remove('active');
        if (t.getAttribute('data-category') === nextCat) t.classList.add('active');
    });

    renderAcademy();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Quran Explorer Logic (30 Paras) ──────────────────────────────────────
function initQuranExplorer() {
    const closeBtn = document.getElementById('close-reader');
    if (closeBtn) {
        closeBtn.onclick = () => {
            document.getElementById('quran-reader-overlay').style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }
}

// Global function exposed for HTML onclick
window.loadJuz = async function (juzNumber) {
    const overlay = document.getElementById('quran-reader-overlay');
    const content = document.getElementById('reader-content');
    const label = document.getElementById('reader-juz-label');

    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    label.textContent = `PARA ${juzNumber.toString().padStart(2, '0')}`;
    content.innerHTML = `<div id="reader-loading" style="text-align: center; padding: 5rem 0;"><div class="loader-bar" style="margin: 0 auto 1.5rem;"><div class="loader-progress"></div></div><p style="color: var(--text-muted);">Retrieving Divine Data...</p></div>`;

    try {
        // Fetch Arabic, Urdu, and English in parallel
        const [arRes, urRes, enRes] = await Promise.all([
            fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/quran-uthmani`),
            fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/ur.maududi`),
            fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/en.sahih`)
        ]);

        const ar = await arRes.json();
        const ur = await urRes.json();
        const en = await enRes.json();

        if (ar.code === 200 && ur.code === 200) {
            const ayahs = ar.data.ayahs;
            const urAyahs = ur.data.ayahs;
            const enAyahs = en.data.ayahs;

            content.innerHTML = `<div class="quran-reader-container">` + ayahs.map((ayah, i) => `
                <div class="reader-ayat-card reveal-ayat" style="animation-delay: ${i * 0.1}s">
                    <div class="ayat-meta">
                        <span class="ayat-label">SURAH ${ayah.surah.englishName.toUpperCase()}</span>
                        <span class="ayat-label" style="color: var(--text-muted); opacity: 0.5;">AYAH ${ayah.numberInSurah}</span>
                    </div>
                    
                    <div class="arabic-focal" onclick="speakArabic(\`${ayah.text.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, ${ayah.number})">
                        ${ayah.text}
                        <i class="fas fa-volume-up" style="font-size: 1.2rem; color: var(--accent-gold); margin-left: 20px; vertical-align: middle; opacity: 0.5; cursor: pointer;"></i>
                    </div>
                    
                    <div class="linguistic-divider">
                        <div class="divider-line"></div>
                        <div class="divider-badge">Linguistic Comparison</div>
                        <div class="divider-line" style="background: linear-gradient(270deg, transparent, var(--glass-border));"></div>
                    </div>
                    
                    <div class="translation-group">
                        <div class="reader-trans-item">
                            <span class="trans-lang-label">Urdu Translation</span>
                            <div class="trans-text-main urdu-font-reader">${urAyahs[i].text}</div>
                        </div>
                        
                        <div class="reader-trans-item">
                            <span class="trans-lang-label">English Translation</span>
                            <div class="trans-text-main">${enAyahs[i].text}</div>
                        </div>
                    </div>
                </div>
            `).join('') + `</div>`;
        }
    } catch (err) {
        console.error("Full Error:", err);
        content.innerHTML = `<p style="text-align: center; color: #ff5555;">Transmission Error: ${err.message || err.toString()}</p>`;
    }
}

// ─── Visual Effects ────────────────────────────────────────────────────────
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: ['#f0bd5a', '#00a884'] },
                opacity: { value: 0.2 },
                size: { value: 2 },
                line_linked: { enable: true, distance: 150, color: '#f0bd5a', opacity: 0.05, width: 1 },
                move: { enable: true, speed: 0.3, direction: 'none', random: true, out_mode: 'out' }
            },
            interactivity: { events: { onhover: { enable: true, mode: 'grab' } }, modes: { grab: { distance: 140, line_linked: { opacity: 0.2 } } } },
            retina_detect: true
        });
    }
}

function animateStats() {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (isNaN(target)) return;
        let current = 0;
        const update = () => {
            if (current < target) {
                current += Math.ceil(target / 60);
                stat.innerText = current > target ? target.toLocaleString() + '+' : current.toLocaleString() + '+';
                setTimeout(update, 20);
            }
        };
        update();
    });
}

// ─── Mobile Menu Logic ──────────────────────────────────────────────────────
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }
}

// ─── PWA Service Worker ─────────────────────────────────────────────────────
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}
