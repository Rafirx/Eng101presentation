// Built-in translations: no internet or API needed.
// Each language has: mom's question, her praise, and 4 lines of
// { correct, wrong1, wrong2 } in the same order as the doctor's lines.
const TRANSLATIONS = {
    en: {
        prompt: "What did the doctor just say?",
        praise: "You know awesome English!!",
        lines: [
            { correct: "Hello, I am the doctor. Let's see how your brother is doing today.", wrong1: "Hello, we need to do surgery right away.", wrong2: "Goodbye. Your brother can go home now." },
            { correct: "Does your brother have any allergies or any issues?", wrong1: "Is your brother feeling okay today?", wrong2: "Does your brother need any medicine?" },
            { correct: "How long has he been feeling sick?", wrong1: "When did he go to sleep last night?", wrong2: "How old is your brother?" },
            { correct: "We will need to run some basic blood tests.", wrong1: "We need to check his blood pressure.", wrong2: "He needs to stay in the hospital for a few days." }
        ]
    },
    es: {
        prompt: "¿Qué acaba de decir el doctor?",
        praise: "¡Hablas un inglés increíble!",
        lines: [
            { correct: "Hola, soy el doctor. Veamos cómo está hoy tu hermano.", wrong1: "Hola, tenemos que operar de inmediato.", wrong2: "Adiós. Tu hermano ya puede irse a casa." },
            { correct: "¿Tu hermano tiene alguna alergia o algún problema?", wrong1: "¿Se siente bien tu hermano hoy?", wrong2: "¿Necesita tu hermano alguna medicina?" },
            { correct: "¿Cuánto tiempo lleva sintiéndose enfermo?", wrong1: "¿Cuándo se durmió anoche?", wrong2: "¿Cuántos años tiene tu hermano?" },
            { correct: "Necesitaremos hacerle unos análisis de sangre básicos.", wrong1: "Necesitamos revisar su presión arterial.", wrong2: "Tiene que quedarse en el hospital unos días." }
        ]
    },
    it: {
        prompt: "Cosa ha appena detto il dottore?",
        praise: "Parli un inglese fantastico!!",
        lines: [
            { correct: "Salve, sono il dottore. Vediamo come sta oggi tuo fratello.", wrong1: "Salve, dobbiamo operare subito.", wrong2: "Arrivederci. Tuo fratello può tornare a casa." },
            { correct: "Tuo fratello ha allergie o altri problemi?", wrong1: "Come si sente oggi tuo fratello?", wrong2: "Tuo fratello ha bisogno di medicine?" },
            { correct: "Da quanto tempo si sente male?", wrong1: "Quando è andato a dormire ieri sera?", wrong2: "Quanti anni ha tuo fratello?" },
            { correct: "Dovremo fare alcuni esami del sangue di base.", wrong1: "Dobbiamo controllargli la pressione sanguigna.", wrong2: "Deve restare in ospedale per qualche giorno." }
        ]
    },
    fr: {
        prompt: "Qu'est-ce que le docteur vient de dire ?",
        praise: "Tu parles un anglais génial !!",
        lines: [
            { correct: "Bonjour, je suis le docteur. Voyons comment va votre frère aujourd'hui.", wrong1: "Bonjour, nous devons opérer tout de suite.", wrong2: "Au revoir. Votre frère peut rentrer à la maison." },
            { correct: "Votre frère a-t-il des allergies ou d'autres problèmes ?", wrong1: "Votre frère se sent-il bien aujourd'hui ?", wrong2: "Votre frère a-t-il besoin de médicaments ?" },
            { correct: "Depuis combien de temps se sent-il malade ?", wrong1: "Quand s'est-il endormi hier soir ?", wrong2: "Quel âge a votre frère ?" },
            { correct: "Nous devrons faire quelques analyses de sang de base.", wrong1: "Nous devons vérifier sa tension artérielle.", wrong2: "Il doit rester à l'hôpital quelques jours." }
        ]
    },
    hi: {
        prompt: "डॉक्टर ने अभी क्या कहा?",
        praise: "तुम्हारी अंग्रेज़ी बहुत बढ़िया है!!",
        lines: [
            { correct: "नमस्ते, मैं डॉक्टर हूँ। देखते हैं आज आपका भाई कैसा है।", wrong1: "नमस्ते, हमें तुरंत ऑपरेशन करना होगा।", wrong2: "अलविदा। आपका भाई अब घर जा सकता है।" },
            { correct: "क्या आपके भाई को कोई एलर्जी या कोई और समस्या है?", wrong1: "क्या आपका भाई आज ठीक महसूस कर रहा है?", wrong2: "क्या आपके भाई को कोई दवा चाहिए?" },
            { correct: "उसे कब से तबीयत ख़राब लग रही है?", wrong1: "वह कल रात कब सोया था?", wrong2: "आपके भाई की उम्र कितनी है?" },
            { correct: "हमें कुछ बुनियादी खून की जाँच करनी होगी।", wrong1: "हमें उसका ब्लड प्रेशर जाँचना होगा।", wrong2: "उसे कुछ दिन अस्पताल में रहना होगा।" }
        ]
    },
    bn: {
        prompt: "ডাক্তার এইমাত্র কী বললেন?",
        praise: "Bhalo e to english paro.", // exact line from your essay
        lines: [
            { correct: "হ্যালো, আমি ডাক্তার। দেখা যাক আজ আপনার ভাই কেমন আছে।", wrong1: "হ্যালো, আমাদের এখনই অপারেশন করতে হবে।", wrong2: "বিদায়। আপনার ভাই এখন বাড়ি যেতে পারে।" },
            { correct: "আপনার ভাইয়ের কি কোনো অ্যালার্জি বা অন্য কোনো সমস্যা আছে?", wrong1: "আপনার ভাই কি আজ ভালো বোধ করছে?", wrong2: "আপনার ভাইয়ের কি কোনো ওষুধ লাগবে?" },
            { correct: "সে কতদিন ধরে অসুস্থ বোধ করছে?", wrong1: "সে গতরাতে কখন ঘুমিয়েছিল?", wrong2: "আপনার ভাইয়ের বয়স কত?" },
            { correct: "আমাদের কিছু সাধারণ রক্ত পরীক্ষা করতে হবে।", wrong1: "আমাদের তার রক্তচাপ পরীক্ষা করতে হবে।", wrong2: "তাকে কয়েকদিন হাসপাতালে থাকতে হবে।" }
        ]
    }
};

let translatedMomPrompt = "";
let translatedPraise = "";
let gameData = [];
let currentStep = 0;

// Fisher-Yates shuffle (unbiased)
function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

async function startLoading() {
    const famLang = document.getElementById("fam-lang").value;
    let lastName = document.getElementById("player-last-name").value.trim();
    if (lastName === "") lastName = "Family";

    document.getElementById("setup").classList.remove("active");
    document.getElementById("loading").classList.add("active");

    const t = TRANSLATIONS[famLang] || TRANSLATIONS.en;
    const english = TRANSLATIONS.en.lines;

    translatedMomPrompt = t.prompt;
    translatedPraise = t.praise;

    // Language-specific quotation marks
    let qOpen = '"', qClose = '"';
    if (famLang === 'fr' || famLang === 'es' || famLang === 'it') { qOpen = '« '; qClose = ' »'; }
    else if (famLang === 'bn' || famLang === 'hi') { qOpen = '“'; qClose = '”'; }
    document.getElementById("translated-praise").innerText = `${qOpen}${translatedPraise}${qClose}`;

    gameData = [];
    currentStep = 0;
    t.lines.forEach((line, i) => {
        gameData.push({
            docText: english[i].correct,   // the doctor always speaks English
            correct: line.correct,
            options: shuffle([line.correct, line.wrong1, line.wrong2])
        });
    });

    document.getElementById("nurse-call").innerText = `"${lastName}..."`;

    // Short pause so the loading screen doesn't just flash
    await new Promise(r => setTimeout(r, 700));

    document.getElementById("loading").classList.remove("active");
    document.getElementById("setup-bg").style.display = "none";
    document.getElementById("waiting-room-bg").style.display = "block";
    document.getElementById("waiting-room").classList.add("active");
}

function enterHospitalRoom() {
    document.getElementById("waiting-room").classList.remove("active");
    document.getElementById("waiting-room-bg").style.display = "none";
    
    document.getElementById("scene-bg").style.display = "block";
    document.getElementById("characters").style.display = "flex";
    
    document.getElementById("doc-container").classList.add("walk-in");
    
    setTimeout(() => {
        document.getElementById("dialogue-box").style.display = "block";
        playDoctorStep();
    }, 1500);
}

function playDoctorStep() {
    if (currentStep >= gameData.length) {
        playDoctorDismissal();
        return;
    }
    
    document.getElementById("speaker-name").innerText = "Doctor";
    document.getElementById("speaker-name").style.color = "#007bff";
    document.getElementById("dialogue-text").innerText = `"${gameData[currentStep].docText}"`;
    
    document.getElementById("doc-sprite").classList.add("speaking");
    document.getElementById("mom-sprite").classList.remove("speaking");

    document.getElementById("mcq-container").style.display = "none";
    document.getElementById("error-msg").style.display = "none";
    
    const nextBtn = document.getElementById("next-btn");
    nextBtn.style.display = "inline-block";
    nextBtn.innerText = "Turn to Mom";
    nextBtn.onclick = triggerMomAsk; 
}

function triggerMomAsk() {
    document.getElementById("next-btn").style.display = "none";
    
    document.getElementById("speaker-name").innerText = "Mom";
    document.getElementById("speaker-name").style.color = "#ff69b4";
    document.getElementById("dialogue-text").innerText = `"${translatedMomPrompt}"`;
    
    document.getElementById("doc-sprite").classList.remove("speaking");
    document.getElementById("mom-sprite").classList.add("speaking");
    
    const mcqContainer = document.getElementById("mcq-container");
    mcqContainer.innerHTML = "";
    mcqContainer.style.display = "block";
    
    gameData[currentStep].options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "mcq-btn";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, gameData[currentStep].correct);
        mcqContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        document.getElementById("error-msg").style.display = "none";
        document.getElementById("mcq-container").style.display = "none";
        
        document.getElementById("speaker-name").innerText = "Mom";
        document.getElementById("dialogue-text").innerText = "(Nods understandingly)";
        
        const nextBtn = document.getElementById("next-btn");
        nextBtn.style.display = "inline-block";
        nextBtn.innerText = "Next";
        nextBtn.onclick = () => {
            currentStep++;
            playDoctorStep();
        };
    } else {
        document.getElementById("error-msg").style.display = "block";
    }
}

function playDoctorDismissal() {
    document.getElementById("speaker-name").innerText = "Doctor";
    document.getElementById("speaker-name").style.color = "#007bff";
    document.getElementById("dialogue-text").innerText = '"Thank you for translating. I have all the information I need for now. We will run the tests and be right back."';

    document.getElementById("doc-sprite").classList.add("speaking");
    document.getElementById("mom-sprite").classList.remove("speaking");

    const nextBtn = document.getElementById("next-btn");
    nextBtn.style.display = "inline-block";
    nextBtn.innerText = "Leave Room";
    nextBtn.onclick = endGame;
}

function endGame() {
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("characters").style.display = "none";
    document.getElementById("scene-bg").style.display = "none";
    document.getElementById("end").classList.add("active");
}
// Keep characters positioned right above the dialogue box, whatever its height
(function () {
    const box = document.getElementById("dialogue-box");
    if (!box) return;
    const update = () => document.documentElement.style.setProperty("--dlg-h", box.offsetHeight + "px");
    if ("ResizeObserver" in window) new ResizeObserver(update).observe(box);
    window.addEventListener("resize", update);
    update();
})();