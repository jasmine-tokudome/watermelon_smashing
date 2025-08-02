// ゲームの状態を画面に描画する
function render(gameState, comment) {
    renderObake(gameState.obake, gameState.gameMode, gameState.counter);
    renderKani(gameState.kani);
    renderSuika(gameState.suika, gameState.gameMode);
    renderField(gameState.gameMode);
    renderComment(comment);
}

// おばけを描画する
function renderObake(obake, gameMode, counter) {
    const obakeElement = document.querySelector("#obake");
    const x = obake.point.x - 300 / 2;
    const y = obake.point.y - 300 / 2;
    obakeElement.setAttribute("x",x);
    obakeElement.setAttribute("y",y);
    if (gomeMode === "clear"){
        obakeElement.setAttribute("href","./images/ObakeClear.png");
    } else if (gameMode === "gameover"){
        obakeElement.setAttribute("href","./images/obakeGameover.png";)
    } else if (obake.atack && counter % 2){
        obakeElement.setAttribute("href", "./images/Obake" + obake.direction + "2.png");
    } else {
    obakeElement.setAttribute("href","./images/Obake" + obake.direction + "1.png");
    }
}

// カニを描画する
function renderKani(kani) {
    const kaniElement = document.querySelector("#kani");
    const x = kani.point.x - 60 / 2;
    const y = kani.point.y - 40 / 2;
    kaniElement.setAttribute("x", x);
    kaniElement.setAttribute("y", y);
}

// スイカを描画する
function renderSuika(suika, gameMode) {
    const suikaElement = document.querySelector("#suika");
    let suikaSize = 80;
    if (gameMode === "clear") {
        suikaElement.setAttribute("href", "./images/suika2.png");
    }
    const x = suika.point.x - suikaSize / 2;
    const y = suika.point.y - suikaSize / 2;
    suikaElement.setAttribute("x", x);
    suikaElement.setAttribute("y", y);
    suikaElement.setAttribute("width", suikaSize);
    suikaElement.setAttribute("height", suikaSize);
}

// フィールドを描画する
function renderField(gameMode) {
    const gameElement = document.querySelector("#field");
    gameElement.setAttribute("class", gameMode);
}

// 画面に声援を表示する
function renderComment(comment) {
    if (comment) {
        const COLORS = ["violet", "pink", "gold", "greenyellow", "lightskyblue"];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];;
        const x = 300 + Math.random() * 640;
        const y = 650 + Math.random() * 150;

        // 画面にコメントを表示する
        const text = createText(comment, x, y);
        const comments = document.querySelector("#comments");
        comments.appendChild(text);

        // 画面に吹き出しを表示する
        const balloons = document.querySelector("#balloons");
        const balloon = createBalloon(text, color);
        balloons.appendChild(balloon);

        // 3秒後に消す
        setTimeout(() => {
            text.remove();
            balloon.remove();
        }, 3000);

        console.log(comment);
    }
}

// SVGのテキスト要素を作成する
function createText(comment, x, y) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", `${x}px`);
    text.setAttribute("y", `${y}px`);
    text.setAttribute("font-size", "20px");
    text.setAttribute("class", "comment");
    text.textContent = comment;
    return text;
}

// SVGの吹き出しを作成する
function createBalloon(text, color) {
    const box = text.getBBox();
    const width = box.width + 40;
    const height = box.height + 20;
    const x = box.x - 20;
    const y = box.y - 10;
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const tongari = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // 四角の部分
    rect.setAttribute("x", `${x}px`);
    rect.setAttribute("y", `${y}px`);
    rect.setAttribute("height", `${height}px`)
    rect.setAttribute("width", `${width}px`);
    rect.setAttribute("rx", "10px");
    rect.setAttribute("ry", "10px");
    rect.setAttribute("fill", color);
    rect.setAttribute("class", "comment");
    // とんがり部分
    tongari.setAttribute("d", `M ${x + width / 2} ${y + height + 20} L ${x + width / 2 - 10} ${y + height} L ${x + width / 2 + 10} ${y + height} z`);
    tongari.setAttribute("fill", color);
    tongari.setAttribute("class", "comment");
    g.appendChild(rect);
    g.appendChild(tongari);
    return g;
}