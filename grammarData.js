const grammarData = {
    "huruf-e-jar": {
        rule: "Particles that connect nouns, causing the following word to enter the Genetive (Majroor) case, usually ending with a Kasra.",
        items: [
            {
                word: { "arabic": "مِنْ", "urdu": "سے", "english": "From", "ayah": 6236 },
                example: { "arabic": "مِنَ النَّاسِ", "urdu": "لوگوں میں سے", "english": "From among the people", "ayah": 6236 }
            },
            {
                word: { "arabic": "إِلَى", "urdu": "طرف", "english": "To", "ayah": 6114 },
                example: { "arabic": "إِلَى صِرَاطٍ مُّسْتَقِيمٍ", "urdu": "سیدھے راستے کی طرف", "english": "To a straight path", "ayah": 6 }
            },
            {
                word: { "arabic": "عَلَى", "urdu": "اوپر", "english": "On", "ayah": 7 },
                example: { "arabic": "عَلَى الْعَرْشِ", "urdu": "عرش پر", "english": "On the Throne", "ayah": 2353 }
            },
            {
                word: { "arabic": "فِي", "urdu": "میں", "english": "In", "ayah": 9 },
                example: { "arabic": "فِي الدِّينِ", "urdu": "دین میں", "english": "In the religion", "ayah": 263 }
            },
            {
                word: { "arabic": "بِ", "urdu": "ساتھ", "english": "With / By", "ayah": 1 },
                example: { "arabic": "بِسْمِ اللَّهِ", "urdu": "اللہ کے نام کے ساتھ", "english": "With the name of Allah", "ayah": 1, "image": "assets/bismillah.png" }
            },
            {
                word: { "arabic": "لِ", "urdu": "لئے", "english": "For", "ayah": 2 },
                example: { "arabic": "الْحَمْدُ لِلَّهِ", "urdu": "تمام تعریف اللہ کے لیے ہے", "english": "All praise is for Allah", "ayah": 2 }
            },
            {
                word: { "arabic": "عَنْ", "urdu": "سے / متعلق", "english": "About / From", "ayah": 6202 },
                example: { "arabic": "عَنِ الصَّلَاةِ", "urdu": "نماز سے", "english": "From/About the prayer", "ayah": 6202 }
            },
            {
                word: { "arabic": "كَ", "urdu": "جیسا", "english": "Like", "ayah": 6161 },
                example: { "arabic": "كَالْعَهْنِ الْمَنفُوشِ", "urdu": "دھنی ہوئی اون کی طرح", "english": "Like carded wool", "ayah": 6162 }
            },
            {
                word: { "arabic": "حَتَّى", "urdu": "یہاں تک کہ", "english": "Until", "ayah": 6130 },
                example: { "arabic": "حَتَّى مَطْلَعِ الْفَجْرِ", "urdu": "فجر کے طلوع ہونے تک", "english": "Until the emergence of dawn", "ayah": 6130 }
            },
            {
                word: { "arabic": "و", "urdu": "قسم ہے", "english": "By (Oath)", "ayah": 6099 },
                example: { "arabic": "وَالتِّينِ وَالزَّيْتُونِ", "urdu": "انجیر اور زیتون کی قسم", "english": "By the fig and the olive", "ayah": 6099 }
            },
            {
                word: { "arabic": "ت", "urdu": "قسم ہے", "english": "By (Oath)", "ayah": 6099 },
                example: { "arabic": "تَاللَّهِ", "urdu": "اللہ کی قسم", "english": "By Allah", "ayah": 1667 }
            }
        ],
        exercises: [
            { type: "fill",  question: "______ اللَّهِ (With the name of Allah)",        options: ["بِ","فِي","عَلَى"],          answer: "بِ"    },
            { type: "mcq",   question: "What is the meaning of 'إِلَى'?",               options: ["From","To","In"],              answer: "To"    },
            { type: "mcq",   question: "Which particle means 'On' or 'Upon'?",          options: ["عَلَى","فِي","بِ"],          answer: "عَلَى" },
            { type: "fill",  question: "______ صِرَاطٍ مُّسْتَقِيمٍ (To a straight path)", options: ["إِلَى","مِنْ","عَنْ"],    answer: "إِلَى" },
            { type: "fill",  question: "______ الْعَرْشِ استوى (Upon the Throne)",      options: ["عَلَى","بِ","فِي"],          answer: "عَلَى" },
            { type: "mcq",   question: "Meaning of 'فِي الدِّينِ'?",                   options: ["On the religion","In the religion","To the religion"], answer: "In the religion" },
            { type: "fill",  question: "الْحَمْدُ ______ (Praise be to Allah)",          options: ["لِلَّهِ","بِاللَّهِ","فِي اللَّهِ"], answer: "لِلَّهِ" },
            { type: "mcq",   question: "Translation of 'مِنَ النَّاسِ'?",              options: ["From the people","Like the people","On the people"], answer: "From the people" },
            { type: "fill",  question: "وَ______ وَالزَّيْتُونِ (By the fig and...)",   options: ["التِّينِ","الْحَقِّ","النُّورِ"], answer: "التِّينِ" },
            { type: "mcq",   question: "Particle for 'Like'?",                          options: ["كَ","لِ","بِ"],              answer: "كَ"    },
            { type: "match", question: "Match the Particles",                           options: ["بِ (With)","كَ (Like)","لِ (For)"], answer: "All" }
        ]
    },
    "attached-pronouns": {
        rule: "Pronoun suffixes attached to nouns (showing ownership), verbs (as objects), or prepositions.",
        items: [
            {
                word: { "arabic": "هُ", "urdu": "اس کا", "english": "his / him", "ayah": 6222 },
                example: { "arabic": "كِتَابُهُ", "urdu": "اس کی کتاب", "english": "His book", "ayah": 9 }
            },
            {
                word: { "arabic": "هُمَا", "urdu": "ان دونوں کا", "english": "their (dual)", "ayah": 2 },
                example: { "arabic": "بَيْنَهُمَا", "urdu": "ان دونوں کے درمیان", "english": "Between them both", "ayah": 2 }
            },
            {
                word: { "arabic": "هُمْ", "urdu": "ان سب کا", "english": "their", "ayah": 12 },
                example: { "arabic": "قُلُوبِهِمْ", "urdu": "ان کے دلوں", "english": "Their hearts", "ayah": 14 }
            },
            {
                word: { "arabic": "هَا", "urdu": "اس ایک عورت کا", "english": "her / hers", "ayah": 6140 },
                example: { "arabic": "لَهَا", "urdu": "اس (عورت) کے لیے", "english": "For her", "ayah": 2 }
            },
            {
                word: { "arabic": "ي", "urdu": "میرا / مجھے", "english": "my / me", "ayah": 5 },
                example: { "arabic": "رَبِّي", "urdu": "میرا رب", "english": "My Lord", "ayah": 5890 }
            },
            {
                word: { "arabic": "نَا", "urdu": "ہمارا / ہمیں", "english": "our / us", "ayah": 5 },
                example: { "arabic": "رَسُولُنَا", "urdu": "ہمارا رسول", "english": "Our Messenger", "ayah": 4 }
            },
            {
                word: { "arabic": "كَ", "urdu": "آپ کا", "english": "your (M)", "ayah": 6209 },
                example: { "arabic": "بَيْتِكَ", "urdu": "تیرا گھر", "english": "Your house", "ayah": 6209 }
            },
            {
                word: { "arabic": "كُمْ", "urdu": "آپ سب کا", "english": "your (Plural)", "ayah": 190 },
                example: { "arabic": "عَلَيْكُمْ", "urdu": "تم پر", "english": "Upon you (all)", "ayah": 7 }
            }
        ],
        exercises: [
            { type: "fill",  question: "رَبُّ______ (Our Lord)",                    options: ["كَ","نَا","ي"],    answer: "نَا"  },
            { type: "mcq",   question: "Which pronoun means 'His'?",               options: ["هُ","هَا","كُمْ"], answer: "هُ"   },
            { type: "fill",  question: "كِتَابُ______ (His book)",                  options: ["هُ","هَا","ي"],    answer: "هُ"   },
            { type: "mcq",   question: "Identify the suffix meaning 'Your' (Plural)?", options: ["كُمْ","نَا","هُمْ"], answer: "كُمْ" },
            { type: "fill",  question: "عَلَي______ (Upon them)",                   options: ["هُمْ","نَا","كُمْ"],answer: "هُمْ" },
            { type: "mcq",   question: "Meaning of 'رَسُولُنَا'?",                options: ["My Messenger","Our Messenger","Your Messenger"], answer: "Our Messenger" },
            { type: "fill",  question: "بَيْنَ______ (Between them)",               options: ["هُمْ","نَا","ي"],  answer: "هُمْ" },
            { type: "mcq",   question: "Which suffix means 'My'?",                options: ["ي","نَا","كَ"],    answer: "ي"    },
            { type: "fill",  question: "آيَاتِ______ (His signs)",                  options: ["هُ","نَا","هَا"],  answer: "هُ"   },
            { type: "mcq",   question: "Suffix for 'Your' (Singular)?",           options: ["كَ","كُمْ","نَا"], answer: "كَ"   },
            { type: "match", question: "Match the Suffixes",                      options: ["ي (My)","نَا (Our)","هَا (Her)"], answer: "All" }
        ]
    },
    "detached-pronouns": {
        rule: "Independent pronouns used primarily as the subject (Mubtada) of a sentence.",
        items: [
            {
                word: { "arabic": "هُوَ", "urdu": "وہ", "english": "He", "ayah": 6222 },
                example: { "arabic": "هُوَ اللَّهُ", "urdu": "وہ اللہ ہے", "english": "He is Allah", "ayah": 6222 }
            },
            {
                word: { "arabic": "هُمْ", "urdu": "وہ سب", "english": "They", "ayah": 12 },
                example: { "arabic": "هُمْ يُنْفِقُونَ", "urdu": "وہ خرچ کرتے ہیں", "english": "They spend", "ayah": 12 }
            },
            {
                word: { "arabic": "أَنْتَ", "urdu": "آپ / تم", "english": "You", "ayah": 5 },
                example: { "arabic": "أَنْتَ الْمَوْلَى", "urdu": "آپ ہی مولیٰ ہیں", "english": "You are the Protector", "ayah": 5 }
            },
            {
                word: { "arabic": "أَنْتُمْ", "urdu": "آپ سب", "english": "You (plural)", "ayah": 190 },
                example: { "arabic": "أَنْتُمْ مُسْلِمُونَ", "urdu": "تم سب مسلمان ہو", "english": "You all are Muslims", "ayah": 190 }
            },
            {
                word: { "arabic": "أَنَا", "urdu": "میں", "english": "I", "ayah": 3282 },
                example: { "arabic": "أَنَا رَبُّكَ", "urdu": "میں تمہارا رب ہوں", "english": "I am your Lord", "ayah": 3282 }
            },
            {
                word: { "arabic": "نَحْنُ", "urdu": "ہم", "english": "We", "ayah": 1811 },
                example: { "arabic": "نَحْنُ نَصَرْنَا", "urdu": "ہم نے مدد کی", "english": "We helped", "ayah": 1811 }
            },
            {
                word: { "arabic": "هِيَ", "urdu": "وہ (عورت)", "english": "She", "ayah": 6225 },
                example: { "arabic": "هِيَ الْحَقُّ", "urdu": "وہ حق ہے", "english": "It is the Truth", "ayah": 6225 }
            },
            {
                word: { "arabic": "أَنْتِ", "urdu": "آپ (عورت)", "english": "You (F)", "ayah": 5 },
                example: { "arabic": "أَنْتِ صَادِقَةٌ", "urdu": "آپ سچی ہیں", "english": "You are truthful", "ayah": 5 }
            }
        ],
        exercises: [
            { type: "fill",  question: "______ اللَّهُ (He is Allah)",           options: ["هُوَ","أَنَا","هِيَ"],   answer: "هُوَ"  },
            { type: "mcq",   question: "What is the meaning of 'نَحْنُ'?",      options: ["I","We","They"],          answer: "We"    },
            { type: "fill",  question: "______ رَبُّكَ (I am your Lord)",        options: ["أَنَا","هُوَ","أَنْتَ"],answer: "أَنَا" },
            { type: "mcq",   question: "How do you say 'You' (Plural)?",        options: ["أَنْتُمْ","هُمْ","نَحْنُ"],answer:"أَنْتُمْ"},
            { type: "fill",  question: "______ الرَّحِيمُ (He is the Merciful)", options: ["هُوَ","أَنْتَ","نَحْنُ"],answer: "هُوَ" },
            { type: "mcq",   question: "Meaning of 'هُمْ يُنْفِقُونَ'?",        options: ["We spend","They spend","I spend"], answer: "They spend" },
            { type: "fill",  question: "______ خَلَقْنَاكُمْ (We created you)",  options: ["نَحْنُ","أَنَا","هُوَ"],answer: "نَحْنُ" },
            { type: "mcq",   question: "Detached pronoun for 'I'?",             options: ["أَنَا","أَنْتَ","نَحْنُ"],answer: "أَنَا" },
            { type: "fill",  question: "أَنْتَ ______ (You are the Protector)", options: ["الْمَوْلَى","الرَّحِيمُ","الْحَقُّ"], answer: "الْمَوْلَى" },
            { type: "mcq",   question: "Which one means 'She'?",                options: ["هِيَ","هُوَ","أَنْتِ"],  answer: "هِيَ"  },
            { type: "match", question: "Match the Subjects",                    options: ["هُوَ (He)","هِيَ (She)","أَنْتَ (You)"], answer: "All" }
        ]
    },
    "past-tense": {
        rule: "Fi'l Maadi: Actions completed in the past. The root form is the 3rd person singular masculine.",
        items: [
            {
                word: { "arabic": "فَعَلَ", "urdu": "اس نے کیا", "english": "He did", "ayah": 6189 },
                example: { "arabic": "خَلَقَ الْإِنسَانَ", "urdu": "اس نے انسان کو پیدا کیا", "english": "He created man", "ayah": 5795 }
            },
            {
                word: { "arabic": "فَعَلُوا", "urdu": "ان سب نے کیا", "english": "They did", "ayah": 5 },
                example: { "arabic": "قَالُوا آمَنَّا", "urdu": "انہوں نے کہا ہم ایمان لائے", "english": "They said, 'We believe'", "ayah": 59 }
            },
            {
                word: { "arabic": "فَعَلْتَ", "urdu": "آپ نے کیا", "english": "You did", "ayah": 2951 },
                example: { "arabic": "أَنْعَمْتَ عَلَيْهِمْ", "urdu": "آپ نے ان پر انعام کیا", "english": "You bestowed favor upon them", "ayah": 7 }
            },
            {
                word: { "arabic": "فَعَلْتُمْ", "urdu": "آپ سب نے کیا", "english": "You all did", "ayah": 5 },
                example: { "arabic": "صَبَرْتُمْ", "urdu": "تم سب نے صبر کیا", "english": "You all were patient", "ayah": 5 }
            },
            {
                word: { "arabic": "فَعَلْتُ", "urdu": "میں نے کیا", "english": "I did", "ayah": 5 },
                example: { "arabic": "أَسْلَمْتُ", "urdu": "میں نے اسلام قبول کیا", "english": "I submitted", "ayah": 5 }
            },
            {
                word: { "arabic": "فَعَلْنَا", "urdu": "ہم نے کیا", "english": "We did", "ayah": 5 },
                example: { "arabic": "جَعَلْنَا", "urdu": "ہم نے بنایا", "english": "We made", "ayah": 5 }
            }
        ],
        exercises: [
            { type: "mcq",   question: "Which word means 'They did' (Past)?",       options: ["فَعَلَ","فَعَلُوا","فَعَلْتَ"],  answer: "فَعَلُوا" },
            { type: "fill",  question: "قَالُوا ______ (They said 'We believe')",   options: ["آمَنَّا","فَعَلْنَا","نَصَرْنَا"],answer: "آمَنَّا" },
            { type: "mcq",   question: "What is the meaning of 'فَعَلْتُ'?",        options: ["He did","I did","We did"],        answer: "I did"    },
            { type: "fill",  question: "أَنْعَمْتَ ______ (You bestowed favor)",    options: ["عَلَيْهِمْ","فِيهِمْ","مِنْهُمْ"],answer: "عَلَيْهِمْ"},
            { type: "mcq",   question: "Action for 'He created'?",                  options: ["خَلَقَ","يَخْلُقُ","خَلَقُوا"], answer: "خَلَقَ"   },
            { type: "fill",  question: "جَاءَ ______ اللَّهِ (The help of Allah came)",options:["نَصْرُ","رَسُولُ","كِتَابُ"],  answer: "نَصْرُ"   },
            { type: "mcq",   question: "Meaning of 'كَتَبَ اللَّهُ'?",              options: ["Allah writes","Allah has written","Allah will write"], answer: "Allah has written" },
            { type: "fill",  question: "فَعَلَ ______ (Your Lord did)",             options: ["رَبُّكَ","رَسُولُكَ","عَبْدُكَ"],answer: "رَبُّكَ"  },
            { type: "mcq",   question: "Identify 'I did' in Arabic?",              options: ["فَعَلْتُ","فَعَلْنَا","فَعَلْتَ"],answer: "فَعَلْتُ" },
            { type: "fill",  question: "خَرَجُوا ______ (They went out from...)",   options: ["مِنْ دِيَارِهِمْ","إِلَى النُّورِ","فِي الْأَرْضِ"], answer: "مِنْ دِيَارِهِمْ" },
            { type: "match", question: "Match the Actions",                         options: ["فَعَلَ (He did)","فَعَلْنَا (We did)","فَعَلْتُمْ (You all did)"], answer: "All" }
        ]
    },
    "universal-tense": {
        rule: "Fi'l Mudari: Ongoing actions (Present or Future). Indicated by prefixes like Ya, Ta, A, Na.",
        items: [
            {
                word: { "arabic": "يَفْعَلُ", "urdu": "وہ کرتا ہے / کرے گا", "english": "He does / will do", "ayah": 5 },
                example: { "arabic": "يَخْلُقُ مَا يَشَاءُ", "urdu": "وہ جو چاہتا ہے پیدا کرتا ہے", "english": "He creates what He wills", "ayah": 54 }
            },
            {
                word: { "arabic": "يَفْعَلُونَ", "urdu": "وہ سب کرتے ہیں", "english": "They do", "ayah": 15 },
                example: { "arabic": "يَعْلَمُونَ", "urdu": "وہ سب جانتے ہیں", "english": "They know", "ayah": 75 }
            },
            {
                word: { "arabic": "تَفْعَلُ", "urdu": "آپ کرتے ہیں", "english": "You do / She does", "ayah": 5 },
                example: { "arabic": "تُؤْمِنُونَ بِاللَّهِ", "urdu": "تم اللہ پر ایمان لاتے ہو", "english": "You believe in Allah", "ayah": 110 }
            },
            {
                word: { "arabic": "أَفْعَلُ", "urdu": "میں کرتا ہوں", "english": "I do", "ayah": 5 },
                example: { "arabic": "أَعْبُدُ مَا تَعْبُدُونَ", "urdu": "میں اس کی عبادت کرتا ہوں جس کی تم", "english": "I worship what you worship", "ayah": 6208 }
            },
            {
                word: { "arabic": "نَفْعَلُ", "urdu": "ہم کرتے ہیں", "english": "We do", "ayah": 5 },
                example: { "arabic": "نَعْبُدُ", "urdu": "ہم عبادت کرتے ہیں", "english": "We worship", "ayah": 5 }
            }
        ],
        exercises: [
            { type: "mcq",   question: "What is the meaning of 'نَعْبُدُ'?",         options: ["I worship","We worship","He worships"], answer: "We worship"    },
            { type: "fill",  question: "______ اللَّهُ (Allah knows/is knowing)",    options: ["يَعْلَمُ","نَعْلَمُ","تَعْلَمُ"],     answer: "يَعْلَمُ"      },
            { type: "mcq",   question: "Identify the word for 'They know'?",        options: ["يَعْلَمُونَ","تَعْلَمُونَ","نَعْلَمُ"],answer: "يَعْلَمُونَ"  },
            { type: "fill",  question: "يَضْرِبُ ______ (Allah sets forth)",         options: ["اللَّهُ","الْإِنسَانَ","الْمَلَائِكَةُ"], answer: "اللَّهُ" },
            { type: "mcq",   question: "Meaning of 'نَسْتَعِينُ'?",                 options: ["We seek help","I seek help","They seek help"], answer: "We seek help" },
            { type: "fill",  question: "يَخْلُقُ مَا ______ (He creates what He wills)", options: ["يَشَاءُ","يَعْلَمُ","يَقُولُ"], answer: "يَشَاءُ"    },
            { type: "mcq",   question: "Which one means 'I worship'?",              options: ["أَعْبُدُ","نَعْبُدُ","يَعْبُدُ"],       answer: "أَعْبُدُ"      },
            { type: "fill",  question: "يَرْزُقُ مَنْ ______ (He provides for whom)",options: ["يَشَاءُ","يَفْعَلُ","يَعْلَمُ"],      answer: "يَشَاءُ"       },
            { type: "mcq",   question: "Action for 'They look'?",                   options: ["يَنْظُرُونَ","آمَنُوا","نَصَرُوا"],    answer: "يَنْظُرُونَ"   },
            { type: "fill",  question: "تَفْعَلُونَ ______ (You all do good)",       options: ["الْخَيْرَ","الشَّرَّ","الْحَقَّ"],    answer: "الْخَيْرَ"     },
            { type: "match", question: "Match the Flows",                           options: ["يَفْعَلُ (He does)","أَفْعَلُ (I do)","تَفْعَلُ (You do)"], answer: "All" }
        ]
    }
};
