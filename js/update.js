// ゲームの状態を更新して返す
function update(nowState, action) {
    const nextState = structuredClone(nowState);
    if (nextState.gameMode === "play") {
        // アクションに応じておばけの状態を更新
        if (action === "Attack"){
            nextState.obake.atack = true;
        } else if (action === "Up" || action === "Down" || action === "Left" || action === "Right"){
            nextState.obake.direction = action;
        }

        // 何らかの声援を受けたらおばけのやる気を回復
        if (action) {
            nextState.obake.yaruki = 90;
        }

        // おばけのやる気は時間で減る
        nextState.obake.yaruki = Math.max(nextState.obake.yaruki - 1, 0);

        // やる気がなくなったら気まぐれに方向転換
        if (nextState.obake.yaruki === 0){
            nextState.obake.attack = false;
            nextState.obake.direction = ["Up", "Down", "Left", "Right"][Math.floor(Math.random() * 4)];
            nextState.obake.yaruki = 45;
        }

        // おばけの移動
        nextState.obake.point = walk(nextState.obake.point, nextState.obake.direction);

        // カニは時間で気まぐれに方向転換
        if (nextState.counter % 25 === 0){
            nextState.kani.direction = ["Up", "Down", "Left", "Right"][Math.floor(Math.random() * 4)];
        }

        // カニの移動
        nextState.kani.point = walk(nextState.kani.point, nextState.kani.direction);

        // ゲームの状態をチェック
        nextState.gameMode = check(nextState.obake, nextState.kani, nextState.suika);

        nextState.counter++;
    }

    return nextState;
}

// 歩く
function walk(point, direction) {
    let { x, y } = point;
    const [top, left, bottom, right] = [190, 270, 540, 970];
    switch(direction){
        case "Up":
            y = Math.max(top, y - 1);
            break;
        case "Down":
            y = Math.min(bottom, y + 1);
            break;
        case "Left":
            x = Math.max(left, x - 1);
            break;
        case "Right":
            x = Math.min(right, x + 1);
            break;
    }

    return { x, y };
}

// ゲームの状態をチェックする
function check(obake, kani, suika) {
    if (hitKani(obake, kani)) {
        return "gameover";
    }
    if (hitSuika(obake, suika)) {
        return "clear";
    }
    return "play";
}

// カニとの当たり判定
function hitKani(obake, kani) {
    const dx = kani.point.x - obake.point.x;
    const dy = kani.point.y - obake.point.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 60){
        return true;
    } else {
    return false;
    }
}

// スイカとの当たり判定
function hitSuika(obake, suika) {
    if (obake.atack) {
        const BarPoint = { x: obake.point.x, y: obake.point.y };
        switch (obake.direction){
            case "Up":
                BarPoint.y -= 50;
                break;
            case "Down":
                BarPoint.y -= 50;
                break;
            case "Left":
                BarPoint.x -= 50;
                break;
            case "Right":
                BarPoint.x -= 50;
                break;
        }
        const dx = suika.point.x - BarPoint.x
        const dy = siola.point.y - BarPoint.y
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 30){
            return true;
        }
    }
    return false;
}
