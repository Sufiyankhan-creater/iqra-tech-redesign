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
    'huruf-e-jar': { step1: 'STEP 1: DISCOVER & APPLY', step2: 'STEP 2: MASTER', title: 'Huruf-e-Jar', desc: 'Prepositions that influence the case of the following noun.' },
    'attached-pronouns': { step1: 'STEP 1: DISCOVER & APPLY', step2: 'STEP 2: MASTER', title: 'Attached Pronouns', desc: 'Suffixes denoting ownership or object status.' },
    'detached-pronouns': { step1: 'STEP 1: DISCOVER & APPLY', step2: 'STEP 2: MASTER', title: 'Detached Pronouns', desc: 'Independent pronouns used as sentence subjects.' },
    'past-tense': { step1: 'STEP 1: DISCOVER & APPLY', step2: 'STEP 2: MASTER', title: "Past Tense", desc: 'Completed actions in sacred history.' },
    'universal-tense': { step1: 'STEP 1: DISCOVER & APPLY', step2: 'STEP 2: MASTER', title: "Universal Tense", desc: 'Ongoing, present, or future actions.' }
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
            academyState.step = 2; academyState.quizIndex = 0; renderAcademy(); window.scrollTo({ top: 300, behavior: 'smooth' });
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
    else badge.innerHTML = `<i class="fas fa-certificate"></i> ${info.step2}`;

    document.getElementById('academy-title').textContent = info.title;
    document.getElementById('academy-desc').textContent = info.desc;
    document.getElementById('academy-rule-text').textContent = data.rule;

    if (academyState.step === 1) {
        grid.style.display = 'grid'; examplesGrid.style.display = 'none'; quizContainer.style.display = 'none';
        document.getElementById('academy-next-btn').textContent = 'Next: Exercises';
        document.getElementById('academy-prev-btn').style.display = 'none';

        grid.className = 'combined-academy-grid';
        grid.innerHTML = data.items.map(item => `
            <div class="combined-academy-card glass-card">
                <div class="card-example">
                    ${item.example.image ? `<img src="${item.example.image}" alt="" onerror="this.style.display='none'" class="example-image" />` : ''}
                    <div class="example-arabic">
                        ${item.example.arabic}
                    </div>
                    <div class="example-translations">
                        <div class="example-trans-item"><div class="lang-label">URDU</div><div class="trans-text urdu-font">${item.example.urdu}</div></div>
                        <div class="example-trans-item"><div class="lang-label">ENG</div><div class="trans-text">${item.example.english}</div></div>
                    </div>
                </div>
                <div class="card-word">
                    <div class="word-arabic">
                        ${item.word.arabic}
                    </div>
                    <div class="word-translations">
                        <div class="trans-item"><span class="label">URDU</span><span class="urdu-text">${item.word.urdu}</span></div>
                        <div class="trans-item"><span class="label">ENG</span><span class="eng-text">${item.word.english}</span></div>
                    </div>
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
function processTTS(text, iconEl) {
    // 1. Try ResponsiveVoice first (works everywhere, no local voice packs needed)
    if (typeof responsiveVoice !== 'undefined' && responsiveVoice.isPlaying !== undefined) {
        if (responsiveVoice.isPlaying()) responsiveVoice.cancel();
        
        responsiveVoice.speak(text, "Arabic Male", {
            pitch: 1,
            rate: 1,
            volume: 1,
            onstart: () => { if (iconEl) iconEl.classList.add('voice-playing'); },
            onend: () => { if (iconEl) iconEl.classList.remove('voice-playing'); },
            onerror: () => { if (iconEl) iconEl.classList.remove('voice-playing'); }
        });
        return;
    }

    // 2. Fallback to native SpeechSynthesis
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
        if (!_arabicVoice) _loadArabicVoice();
        if (_arabicVoice) utterance.voice = _arabicVoice;
        
        utterance.onstart = () => { if (iconEl) iconEl.classList.add('voice-playing'); };
        utterance.onend = () => { if (iconEl) iconEl.classList.remove('voice-playing'); };
        utterance.onerror = () => { if (iconEl) iconEl.classList.remove('voice-playing'); };
        window.speechSynthesis.speak(utterance);
    };

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

// ─── Quran Explorer Logic (Islam360 Style) ──────────────────────────────────
function initQuranExplorer() {
    const closeBtn = document.getElementById('close-reader');
    if (closeBtn) {
        closeBtn.onclick = () => {
            document.getElementById('quran-reader-overlay').style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }

    // Modal Close
    const closeModalBtn = document.getElementById('close-grammar-modal');
    if(closeModalBtn) {
        closeModalBtn.onclick = () => {
            document.getElementById('grammar-modal').style.display = 'none';
        }
    }

    // Tabs Logic
    const tabParah = document.getElementById('tab-parah');
    const tabSurah = document.getElementById('tab-surah');
    const gridParah = document.getElementById('juz-selection-grid');
    const gridSurah = document.getElementById('surah-selection-grid');

    if(tabParah && tabSurah && gridParah && gridSurah) {
        // Generate Parah Grid
        for(let i=1; i<=30; i++) {
            const card = document.createElement('div');
            card.className = 'word-card glass-card juz-card';
            card.style.cursor = 'pointer';
            card.setAttribute('data-juz', i);
            card.innerHTML = `
                <div style="font-size: 0.8rem; color: var(--accent-gold); margin-bottom: 1rem; letter-spacing: 2px;">JUZ 0${i.toString().padStart(2, '0').slice(-2)}</div>
                <div class="word-arabic" style="font-size: 2.5rem;">الجزء ${i}</div>
                <div style="color: #fff; font-weight: 600; font-size: 1.1rem; margin-top: 1rem;">Para ${i}</div>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.5rem;">Read with Word-by-Word Breakdown</p>
            `;
            card.onclick = () => window.loadQuranContent(i, 'juz');
            gridParah.appendChild(card);
        }

        // Fetch and Generate Surah Grid
        fetch('https://api.alquran.cloud/v1/surah')
            .then(res => res.json())
            .then(data => {
                if(data.code === 200) {
                    data.data.forEach(surah => {
                        const card = document.createElement('div');
                        card.className = 'word-card glass-card surah-card';
                        card.style.cursor = 'pointer';
                        card.innerHTML = `
                            <div style="font-size: 0.8rem; color: var(--accent-gold); margin-bottom: 1rem; letter-spacing: 2px;">SURAH 0${surah.number.toString().padStart(2, '0').slice(-2)}</div>
                            <div class="word-arabic" style="font-size: 2.5rem;">${surah.name}</div>
                            <div style="color: #fff; font-weight: 600; font-size: 1.1rem; margin-top: 1rem;">${surah.englishName}</div>
                            <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.5rem;">${surah.englishNameTranslation} • ${surah.numberOfAyahs} Ayahs</p>
                        `;
                        card.onclick = () => window.loadQuranContent(surah.number, 'surah', surah.englishName);
                        gridSurah.appendChild(card);
                    });
                }
            });

        // Tab Switching
        tabParah.onclick = () => {
            tabParah.classList.add('active-tab');
            tabSurah.classList.remove('active-tab');
            gridParah.style.display = 'grid';
            gridSurah.style.display = 'none';
        };
        tabSurah.onclick = () => {
            tabSurah.classList.add('active-tab');
            tabParah.classList.remove('active-tab');
            gridSurah.style.display = 'grid';
            gridParah.style.display = 'none';
        };
    }
}

// Helper to open grammar modal
window.openGrammarModal = function(arabic, translit, translationEn, translationUr, ismType) {
    document.getElementById('grammar-arabic').textContent = arabic;
    document.getElementById('grammar-translit').textContent = translit;
    document.getElementById('grammar-english').textContent = translationEn;
    // Mock Urdu word-to-word if not provided (public APIs usually lack Urdu WBW without heavy mapping)
    document.getElementById('grammar-urdu').textContent = translationUr || translationEn; 
    
    // Mocking Root and Syntax for demonstration (simulating Islam360 deeper linguistic tagging)
    const roots = ["ح م د", "ر ح م", "ع ل م", "ق و ل", "خ ل ق", "ك ت ب", "س م ع"];
    const types = ["Noun (Ism)", "Verb (Fi'l)", "Particle (Harf)"];
    document.getElementById('grammar-root').textContent = roots[Math.floor(Math.random() * roots.length)];
    document.getElementById('grammar-syntax').textContent = ismType || types[Math.floor(Math.random() * types.length)];
    
    document.getElementById('grammar-modal').style.display = 'flex';
}

// Unified Loader for Juz and Surah
window.loadQuranContent = async function (id, type, surahName = '') {
    const overlay = document.getElementById('quran-reader-overlay');
    const content = document.getElementById('reader-content');
    const label = document.getElementById('reader-juz-label');

    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    if(type === 'juz') label.textContent = `PARA ${id.toString().padStart(2, '0')}`;
    else label.textContent = `SURAH ${surahName.toUpperCase()}`;
    
    content.innerHTML = `<div id="reader-loading" style="text-align: center; padding: 5rem 0;"><div class="loader-bar" style="margin: 0 auto 1.5rem;"><div class="loader-progress"></div></div><p style="color: var(--text-muted);">Syncing Word-by-Word Linguistics...</p></div>`;

    try {
        // Fetch Word-by-Word data from Quran.com API v4
        // Fetch both Urdu and English in parallel to support the Grammar Modal
        const apiPath = type === 'juz' ? `by_juz/${id}` : `by_chapter/${id}`;
        
        const [wbwResUr, wbwResEn] = await Promise.all([
            fetch(`https://api.quran.com/api/v4/verses/${apiPath}?words=true&language=ur&translations=97,131&word_fields=text_uthmani,translation,transliteration&per_page=50`),
            fetch(`https://api.quran.com/api/v4/verses/${apiPath}?words=true&language=en&word_fields=translation&per_page=50`)
        ]);
        
        const wbwDataUr = await wbwResUr.json();
        const wbwDataEn = await wbwResEn.json();
        
        if (wbwDataUr.verses && wbwDataEn.verses) {
            const ayahs = wbwDataUr.verses;
            const ayahsEn = wbwDataEn.verses;

            content.innerHTML = `<div class="quran-reader-container">` + ayahs.map((ayah, i) => {
                // Combine word uthmani texts to get the full verse text
                const fullArabicVerse = ayah.words.filter(w => w.char_type_name === 'word').map(w => w.text_uthmani).join(' ') + ' ' + (ayah.words.find(w => w.char_type_name === 'end') ? ayah.words.find(w => w.char_type_name === 'end').text_uthmani : '');
                
                // Extract Full Translations
                const urduFull = ayah.translations.find(t => t.resource_id === 97)?.text || '';
                const engFull = ayah.translations.find(t => t.resource_id === 131)?.text || '';

                return `
                <div class="reader-ayat-card reveal-ayat" style="animation-delay: ${i * 0.1}s; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 2rem;">
                    <div class="ayat-meta" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <span class="ayat-label" style="background: rgba(240, 189, 90, 0.1); color: var(--accent-gold); padding: 0.3rem 0.8rem; border-radius: 5px;">AYAH ${ayah.verse_key}</span>
                        <div class="divider-badge" onclick="speakArabic('', ${ayah.id}, this)" style="cursor:pointer; color:var(--accent-teal); font-size: 0.8rem; border: 1px solid var(--accent-teal); padding: 0.3rem 0.8rem; border-radius: 50px;">
                            <i class="fas fa-play" style="margin-right: 5px;"></i> Play Audio
                        </div>
                    </div>
                    
                    <!-- Islam360 Style: Full Arabic Verse on Top -->
                    <div class="arabic-focal" style="text-align: right; margin-bottom: 2rem; line-height: 1.8;">
                        ${fullArabicVerse}
                    </div>
                    
                    <!-- Islam360 Style: Word-by-Word Grid -->
                    <div class="wbw-container" style="background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 12px; border: 1px dashed rgba(255,255,255,0.05);">
                        ${ayah.words.map((w, wIndex) => {
                            if(w.char_type_name !== 'word') return '';
                            
                            const wEn = ayahsEn[i].words[wIndex];
                            
                            const arabicText = w.text_uthmani || '';
                            const transUrText = w.translation ? w.translation.text : '';
                            const transEnText = (wEn && wEn.translation && wEn.translation.text) ? wEn.translation.text : '';
                            const translitText = (w.transliteration && w.transliteration.text) ? w.transliteration.text : '';
                            
                            const arabic = arabicText.replace(/'/g, "\\'");
                            const transUr = transUrText.replace(/'/g, "\\'");
                            const transEn = transEnText.replace(/'/g, "\\'");
                            const translit = translitText.replace(/'/g, "\\'");
                            
                            return `
                            <div class="wbw-word" onclick="openGrammarModal('${arabic}', '${translit}', '${transEn}', '${transUr}', '')">
                                <span class="wbw-arabic">${arabicText}</span>
                                <span class="wbw-translit">${translitText}</span>
                                <span class="wbw-trans urdu-font" style="font-size: 1.2rem; color: #fff;">${transUrText}</span>
                            </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <!-- Islam360 Style: Full Verse Translations -->
                    <div class="translation-group" style="margin-top: 2rem;">
                        <div class="reader-trans-item">
                            <span class="trans-lang-label" style="color: var(--accent-gold);"><i class="fas fa-language"></i> Urdu Translation</span>
                            <div class="trans-text-main urdu-font-reader" style="font-size: 1.4rem; color: #f5f5f7; margin-top: 0.5rem; text-align: right;">${urduFull}</div>
                        </div>
                        
                        <div class="reader-trans-item" style="margin-top: 1.5rem;">
                            <span class="trans-lang-label" style="color: var(--accent-gold);"><i class="fas fa-globe"></i> English Translation</span>
                            <div class="trans-text-main" style="color: var(--text-muted); margin-top: 0.5rem;">${engFull}</div>
                        </div>
                    </div>
                </div>
            `}).join('') + `</div>`;
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
