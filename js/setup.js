// ゲームを初期化する
function setup() {
    keySetup();
    voiceSetup();
}

// 音声認識をセットアップする
function voiceSetup() {

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

    return "";
}

// 文章にキーワードが含まれているかどうか
function includesVoice(words, message) {

    return false;
}
