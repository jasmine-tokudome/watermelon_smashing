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

        // おばけの移動

        // カニは時間で気まぐれに方向転換

        // カニの移動

        // ゲームの状態をチェック

        nextState.counter++;
    }

    return nextState;
}

// 歩く
function walk(point, direction) {
    let { x, y } = point;
    const [top, left, bottom, right] = [190, 270, 540, 970];

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
    return false;
}

// スイカとの当たり判定
function hitSuika(obake, suika) {
    if (obake.atack) {

    }
    return false;
}
