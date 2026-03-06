// 1秒に30回の更新
const INTERVAL = 1000 / 30;
// アクションを受け取るキュー
let actionQueue = [];
// コメントを受け取るキュー
let commentQueue = [];
// 前回の時間
let prevTime = 0;
// ゲームの状態
let gameState = {
    gameMode: "play",// "play" or "gameover" or "clear"
    counter: 1,
    obake: {
        direction: "Left", // "Up" or "Down" or "Left" or "Right"
        point: {
            x: 920,
            y: 240 + Math.random() * 250
        },
        atack: false,
        yaruki: 30,
    },
    kani: {
        direction: "Right", // "Up" or "Down" or "Left" or "Right"
        point: {
            x: 340,
            y: 240 + Math.random() * 250
        },
    },
    suika: {
        point: {
            x: 290,
            y: 240 + Math.random() * 250
        },
    },
}

// ゲームの流れをループする
function step(time) {
    if (time - prevTime >= INTERVAL) {
        const comment = commentQueue.shift(); // コメントを取得
        const action = actionQueue.shift(); // アクションを取得
        gameState = update(gameState, action); // 状態を更新
        render(gameState, comment); // 画面を描画
        prevTime = time;
    }
    requestAnimationFrame(step); // 次のstepを呼び出す
}

setup();
requestAnimationFrame(step);