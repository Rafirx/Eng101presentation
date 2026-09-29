const scriptBase = [
    { 
        docText: "Hello, I am the doctor. Let's see how your brother is doing today.", 
        correct: "Hello, I am the doctor. Let's see how your brother is doing today.",
        wrong1: "Hello, we need to do surgery right away.",
        wrong2: "Goodbye. Your brother can go home now."
    },
    { 
        docText: "Does your brother have any allergies or any issues?", 
        correct: "Does your brother have any allergies or any issues?",
        wrong1: "Is your brother feeling okay today?",
        wrong2: "Does your brother need any medicine?"
    },
    { 
        docText: "How long has he been feeling sick?", 
        correct: "How long has he been feeling sick?",
        wrong1: "When did he go to sleep last night?",
        wrong2: "How old is your brother?"
    },
    { 
        docText: "We will need to run some basic blood tests.", 
        correct: "We will need to run some basic blood tests.",
        wrong1: "We need to check his blood pressure.",
        wrong2: "He needs to stay in the hospital for a few days."
    }
];

const momPromptEng = "What did the doctor just say?";
let translatedMomPrompt = "";
let translatedPraise = "";
let gameData = [];
let currentStep = 0;

async function fetchTranslation(text, targetLangCode) {
    if (targetLangCode === 'en') return text;
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLangCode}`);
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        return text; 
    }
}

async function startLoading() {
    const famLang = document.getElementById("fam-lang").value;
    let lastName = document.getElementById("player-last-name").value.trim();
    
    if (lastName === "") {
        lastName = "Family";
    }
    
    document.getElementById("setup").classList.remove("active");
    document.getElementById("loading").classList.add("active");

    translatedMomPrompt = await fetchTranslation(momPromptEng, famLang);

    // Determine language-specific quotation marks
    let qOpen = '"';
    let qClose = '"';
    if (famLang === 'fr' || famLang === 'es' || famLang === 'it') {
        qOpen = '« ';
        qClose = ' »';
    } else if (famLang === 'bn' || famLang === 'hi') {
        qOpen = '“';
        qClose = '”';
    }

    if (famLang === 'bn') {
        translatedPraise = "Bhalo e to english paro.";
    } else {
        translatedPraise = await fetchTranslation("You know awesome English!!", famLang);
    }
    document.getElementById("translated-praise").innerText = `${qOpen}${translatedPraise}${qClose}`;

    for (let i = 0; i < scriptBase.length; i++) {
        const [corr, w1, w2] = await Promise.all([
            fetchTranslation(scriptBase[i].correct, famLang),
            fetchTranslation(scriptBase[i].wrong1, famLang),
            fetchTranslation(scriptBase[i].wrong2, famLang)
        ]);
        
        gameData.push({ 
            docText: scriptBase[i].docText, 
            correct: corr, 
            options: [corr, w1, w2].sort(() => Math.random() - 0.5) 
        });
    }

    document.getElementById("nurse-call").innerText = `"${lastName}..."`;

    document.getElementById("loading").classList.remove("active");
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