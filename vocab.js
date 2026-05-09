// ==========================================
// 單字資料庫
// ==========================================

const vocabDataA1 = [
    { word: "Bonjour", type: "interj.", translation: "你好 / 早安", example: "Bonjour, comment ça va ?" },
    { word: "Bonsoir", type: "interj.", translation: "晚安（見面）", example: "Bonsoir, madame !" },
    { word: "Merci", type: "interj.", translation: "謝謝", example: "Merci beaucoup !" },
    { word: "S'il vous plaît", type: "expr.", translation: "請（正式）", example: "Un café, s'il vous plaît." },
    { word: "Chat", type: "n.m.", translation: "貓", example: "Le chat dort sur le canapé." },
    { word: "Chien", type: "n.m.", translation: "狗", example: "Le chien joue dans le parc." },
    { word: "Maison", type: "n.f.", translation: "房子／家", example: "J'habite dans une grande maison." },
    { word: "Famille", type: "n.f.", translation: "家庭", example: "Ma famille est très importante." },
    { word: "Mère", type: "n.f.", translation: "媽媽", example: "Ma mère s'appelle Marie." },
    { word: "Père", type: "n.m.", translation: "爸爸", example: "Mon père travaille beaucoup." },
    { word: "Ordinateur", type: "n.m.", translation: "電腦", example: "J'écris du code sur mon ordinateur." },
    { word: "Étudiant", type: "n.m.", translation: "學生", example: "Il est étudiant à l'université." },
    { word: "Manger", type: "v.", translation: "吃", example: "J'aime manger des croissants." },
    { word: "Parler", type: "v.", translation: "說話", example: "Tu parles français ?" },
    { word: "Habiter", type: "v.", translation: "居住", example: "J'habite à Paris." },
    { word: "Grand", type: "adj.", translation: "大的／高的", example: "Il est très grand." },
    { word: "Petit", type: "adj.", translation: "小的／矮的", example: "Le chat est petit." },
    { word: "Rouge", type: "adj.", translation: "紅色的", example: "Elle porte une robe rouge." },
    { word: "Bleu", type: "adj.", translation: "藍色的", example: "Le ciel est bleu aujourd'hui." },
    { word: "Un / Une", type: "art.", translation: "一個（不定冠詞）", example: "C'est un livre intéressant." },
];

const vocabDataA2 = [
    { word: "Supermarché", type: "n.m.", translation: "超市", example: "Je fais mes courses au supermarché." },
    { word: "Boulangerie", type: "n.f.", translation: "麵包店", example: "La boulangerie ouvre à 7h." },
    { word: "Métro", type: "n.m.", translation: "地鐵", example: "Je prends le métro chaque matin." },
    { word: "Billet", type: "n.m.", translation: "票；鈔票", example: "J'achète un billet de train." },
    { word: "Rendez-vous", type: "n.m.", translation: "約會；預約", example: "J'ai un rendez-vous chez le médecin." },
    { word: "Appartement", type: "n.m.", translation: "公寓", example: "Son appartement est au troisième étage." },
    { word: "Loyer", type: "n.m.", translation: "房租", example: "Le loyer est trop cher à Paris." },
    { word: "Recette", type: "n.f.", translation: "食譜", example: "Ma grand-mère m'a donné sa recette de tarte." },
    { word: "Choisir", type: "v.", translation: "選擇", example: "Je ne sais pas quoi choisir." },
    { word: "Attendre", type: "v.", translation: "等待", example: "Nous attendons le bus depuis 20 minutes." },
    { word: "Vendre", type: "v.", translation: "賣", example: "Ils vendent des légumes frais." },
    { word: "Souvent", type: "adv.", translation: "經常", example: "Il va souvent au cinéma." },
    { word: "Parfois", type: "adv.", translation: "有時候", example: "Parfois, je préfère marcher." },
    { word: "Prochain", type: "adj.", translation: "下一個；即將到來的", example: "Le prochain train part à 14h." },
    { word: "Dernier", type: "adj.", translation: "最後的；上一個", example: "La semaine dernière, il a plu tous les jours." },
    { word: "Fatigué", type: "adj.", translation: "疲倦的", example: "Je suis très fatigué ce soir." },
    { word: "Inquiet", type: "adj.", translation: "擔心的", example: "Elle est inquiète pour son examen." },
    { word: "Pressé", type: "adj.", translation: "趕時間的", example: "Désolé, je suis pressé !" },
    { word: "Pourtant", type: "conj.", translation: "然而；儘管如此", example: "Il fait froid, pourtant elle n'a pas de manteau." },
    { word: "D'abord", type: "adv.", translation: "首先", example: "D'abord, lave-toi les mains." },
];

const vocabDataB1 = [
    { word: "Entreprise", type: "n.f.", translation: "公司；企業", example: "Elle travaille dans une grande entreprise." },
    { word: "Collègue", type: "n.m/f.", translation: "同事", example: "Mes collègues sont très sympathiques." },
    { word: "Candidature", type: "n.f.", translation: "求職申請", example: "J'ai envoyé ma candidature hier." },
    { word: "Bénévolat", type: "n.m.", translation: "義工服務", example: "Il fait du bénévolat chaque weekend." },
    { word: "Embouteillage", type: "n.m.", translation: "交通堵塞", example: "Il y a un embouteillage sur l'autoroute." },
    { word: "Se plaindre", type: "v. pron.", translation: "抱怨", example: "Elle se plaint tout le temps du bruit." },
    { word: "Proposer", type: "v.", translation: "提議；建議", example: "Je vous propose une solution." },
    { word: "Améliorer", type: "v.", translation: "改善；改進", example: "Il faut améliorer notre service client." },
    { word: "Réussir", type: "v.", translation: "成功；通過（考試）", example: "Elle a réussi son permis de conduire." },
    { word: "Échouer", type: "v.", translation: "失敗", example: "Il a échoué à l'examen, mais il recommence." },
    { word: "Davantage", type: "adv.", translation: "更多", example: "Il faut travailler davantage." },
    { word: "Néanmoins", type: "conj.", translation: "儘管如此；然而", example: "C'est difficile, néanmoins possible." },
    { word: "Malgré", type: "prép.", translation: "儘管", example: "Malgré la pluie, nous sommes sortis." },
    { word: "Susceptible", type: "adj.", translation: "易怒的；可能…的", example: "Ce médicament est susceptible de causer des effets secondaires." },
    { word: "Bénéfique", type: "adj.", translation: "有益的", example: "Le sport est bénéfique pour la santé." },
    { word: "Convaincant", type: "adj.", translation: "令人信服的", example: "Son argument est très convaincant." },
    { word: "Résoudre", type: "v.", translation: "解決", example: "Nous devons résoudre ce problème." },
    { word: "Envisager", type: "v.", translation: "考慮；設想", example: "J'envisage de changer de métier." },
    { word: "Prévenir", type: "v.", translation: "預防；通知", example: "Il vaut mieux prévenir que guérir." },
    { word: "Accorder", type: "v.", translation: "給予；賦予；使一致", example: "On lui a accordé une prime." },
];

const vocabDataB2 = [
    { word: "Paradoxe", type: "n.m.", translation: "悖論；矛盾現象", example: "C'est un paradoxe : plus on travaille, moins on est productif." },
    { word: "Biais", type: "n.m.", translation: "偏見；途徑", example: "Cette étude comporte des biais méthodologiques." },
    { word: "Enjeu", type: "n.m.", translation: "利害關係；挑戰", example: "Les enjeux environnementaux sont considérables." },
    { word: "Nuance", type: "n.f.", translation: "細微差別", example: "Il faut apporter une nuance à cette affirmation." },
    { word: "Désormais", type: "adv.", translation: "從今以後；今後", example: "Désormais, le télétravail est généralisé." },
    { word: "Aborder", type: "v.", translation: "談及；接近", example: "Nous allons aborder un sujet délicat." },
    { word: "Souligner", type: "v.", translation: "強調；劃底線", example: "Le rapport souligne l'urgence de la situation." },
    { word: "Remettre en cause", type: "expr.", translation: "質疑；重新審視", example: "Ce résultat remet en cause nos hypothèses." },
    { word: "Lacune", type: "n.f.", translation: "缺陷；空白", example: "Ce rapport présente des lacunes importantes." },
    { word: "Pertinent", type: "adj.", translation: "貼切的；有見地的", example: "C'est une question très pertinente." },
    { word: "Ambivalent", type: "adj.", translation: "矛盾的；曖昧的", example: "Son attitude est ambivalente sur cette question." },
    { word: "Étayer", type: "v.", translation: "支撐；用論據支持", example: "Il faut étayer votre argumentation." },
    { word: "Récuser", type: "v.", translation: "否定；拒絕接受", example: "L'avocat a récusé les preuves présentées." },
    { word: "Prégnant", type: "adj.", translation: "佔主導地位的；有影響力的", example: "Cette image est très prégnante dans la culture française." },
    { word: "Transcender", type: "v.", translation: "超越", example: "L'art transcende les barrières culturelles." },
    { word: "Vraisemblable", type: "adj.", translation: "似乎真實的；可信的", example: "Son explication est vraisemblable." },
    { word: "Désuet", type: "adj.", translation: "過時的；陳舊的", example: "Cette loi est désuète et doit être révisée." },
    { word: "Acuité", type: "n.f.", translation: "敏銳度；嚴重性", example: "La crise révèle l'acuité du problème social." },
    { word: "Recourir à", type: "v.", translation: "求助於；訴諸", example: "Il faut recourir à des experts pour ce projet." },
    { word: "Engendrer", type: "v.", translation: "產生；引起", example: "La pollution engendre de graves problèmes de santé." },
];

// ==========================================
// 渲染單字卡片
// ==========================================
function renderVocab(data, containerId = 'vocab-grid') {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    grid.innerHTML = '';

    if (data.length === 0) {
        grid.innerHTML = '<p style="color:#888;text-align:center;width:100%;padding:2rem 0;">找不到符合的單字 😢</p>';
        return;
    }

    data.forEach(item => {
        const card = `
            <div class="vocab-card">
                <div class="card-header">
                    <div class="word-info">
                        <span class="french-word">${item.word}</span>
                        <span class="word-type">${item.type}</span>
                    </div>
                    <button class="audio-btn" onclick="speak('${item.word.replace(/'/g, "\\'")}')" title="播放發音">🔊</button>
                </div>
                <div class="card-body">
                    <p class="translation">${item.translation}</p>
                    <div class="example">${item.example}</div>
                </div>
            </div>`;
        grid.innerHTML += card;
    });
}

// ==========================================
// 搜尋過濾 (動態適應當前顯示的等級)
// ==========================================
function filterVocab(level) {
    const searchInput = document.getElementById('searchInput-' + level);
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase();
    const dataMap = { a1: vocabDataA1, a2: vocabDataA2, b1: vocabDataB1, b2: vocabDataB2 };
    const data = dataMap[level] || [];

    const filtered = data.filter(item =>
        item.word.toLowerCase().includes(query) || item.translation.includes(query)
    );

    renderVocab(filtered, 'vocab-grid-' + level);
}

// ==========================================
// 語音發音 (Web Speech API)
// ==========================================
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    }
}
