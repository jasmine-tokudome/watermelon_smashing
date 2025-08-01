// ゲームを初期化する
function setup() {
    keySetup();
    voiceSetup();
}

// 音声認識をセットアップする
function voiceSetup() {
    SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ja-JP";
    recognition.continuous = true;
    //声を受け取った時の処理
    recognition.onresult = (event) => {
        const message = event.results[event.results.length - 1][0].transcript;
        const keyword = getKeyWord(message);
        commentQuete.push(message);
        if (keyword === "Left" || keyword === "Right" || keyword === "Up" || keyword === "Down" || keyword === "Attack"){
            actionQue.push(keyword);
        } else {
            actionQue.push("comment");
        }
    }
    // 黙っていると勝手に終了するので再度起動する
    recognition.onerror = (e) => {
        if (e.error === "no-speech"){
            voiceSetup();
        }
    }
    // 音声認識の状態に合わせて観客の熱気を切り替える
    recognition.onend = () => {
        document.querySelector("#theater").classList.add("closed");
        document.querySelector("#audience").classList.add("closed");
        recognition.onaudiostart = () => {
            document.querySelector("#theater").classList.remove("closed");
            document.querySelector("#audience").classList.remove("closed");
        }
    }
    recognition.start()
}

// キーボード入力をセットアップする
function keySetup() {
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight"){
            actionQueue.push(event.key.replace("Arrow",""));
        }
        if (event.key === " "){
            actionQueue.push("Attack");
        }
    });
}

// 文章からキーワードを取得する
function getKeyWord(message) {
    const left_words = ["左", "ひだり"];
    const right_words = ["右", "みぎ"];
    const up_words = ["上", "うえ"];
    const down_words = ["下", "した"];
    const attack_words = ["今", "いま", "打て", "うて", "撃て", "打って", "撃って", "うって"];
    if(includesVoice(left_words,message)){
        return"Left";
    } else if(includesVoice(right_words,message)){
        return"Right";
    } else if(includesVoice(up_words,message)){
        return"Up";
    } else if(includesVoice(down_words,message)){
        return"Down";
    } else if(includesVoice(attack_words,message)){
        return"Attack";
    }
    return "";
}

// 文章にキーワードが含まれているかどうか
function includesVoice(words, message) {
    for (let i = 0; i < words.length; i++){
        if(message.includes(words[i])){
            return true;
        }
    }
    return false;
}
