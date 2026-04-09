// src/lib/game/logic.ts

// ==========================================
// 1. 型定義（データの設計図）
// ==========================================
export interface Point { x: number; y: number; }
export type Direction = 'Up' | 'Down' | 'Left' | 'Right';
export type GameMode = 'play' | 'clear' | 'gameover';
export type Action = Direction | 'Attack' | null;

export interface Obake {
  point: Point;
  direction: Direction;
  attack: boolean;
  yaruki: number;
}

export interface Kani {
  point: Point;
  direction: Direction;
}

export interface Suika {
  point: Point;
}

export interface GameState {
  obake: Obake;
  kani: Kani;
  suika: Suika;
  gameMode: GameMode;
  counter: number;
}

export interface CommentData {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
}

// ==========================================
// 2. 描画用ロジック（表示座標やデータの計算）
// ==========================================
// ※GameObjectをより正確な各キャラクターの型に更新しました
export const getObakePos = (obake: Obake): Point => ({ x: obake.point.x - 150, y: obake.point.y - 150 });
export const getKaniPos = (kani: Kani): Point => ({ x: kani.point.x - 30, y: kani.point.y - 20 });
export const getSuikaPos = (suika: Suika): Point => ({ x: suika.point.x - 40, y: suika.point.y - 40 });

export const createCommentData = (text: string): CommentData => {
  const COLORS = ["violet", "pink", "gold", "greenyellow", "lightskyblue"];
  return {
    id: Math.random().toString(36).substring(7),
    text,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    x: 300 + Math.random() * 640,
    y: 650 + Math.random() * 150,
  };
};

// ==========================================
// 3. 更新用ロジック（ゲームの状態変化）
// ==========================================
export const walk = (point: Point, direction: Direction): Point => {
  let { x, y } = point;
  const top = 190, left = 270, bottom = 540, right = 970;
  
  switch (direction) {
    case "Up": y = Math.max(top, y - 1); break;
    case "Down": y = Math.min(bottom, y + 1); break;
    case "Left": x = Math.max(left, x - 1); break;
    case "Right": x = Math.min(right, x + 1); break;
  }
  return { x, y };
};

export const hitKani = (obake: Obake, kani: Kani): boolean => {
  const dx = kani.point.x - obake.point.x;
  const dy = kani.point.y - obake.point.y;
  return Math.sqrt(dx * dx + dy * dy) < 60;
};

export const hitSuika = (obake: Obake, suika: Suika): boolean => {
  if (!obake.attack) return false;

  const barPoint = { ...obake.point };
  switch (obake.direction) {
    case "Up": barPoint.y -= 50; break;
    case "Down": barPoint.y += 50; break;
    case "Left": barPoint.x -= 50; break;
    case "Right": barPoint.x += 50; break;
  }
  
  const dx = suika.point.x - barPoint.x;
  const dy = suika.point.y - barPoint.y;
  return Math.sqrt(dx * dx + dy * dy) < 30;
};

export const checkMode = (obake: Obake, kani: Kani, suika: Suika): GameMode => {
  if (hitKani(obake, kani)) return "gameover";
  if (hitSuika(obake, suika)) return "clear";
  return "play";
};

export const updateState = (nowState: GameState, action: Action): GameState => {
  const nextState = structuredClone(nowState);

  if (nextState.gameMode === "play") {
    if (action === "Attack") {
      nextState.obake.attack = true;
    } else if (action === "Up" || action === "Down" || action === "Left" || action === "Right") {
      nextState.obake.direction = action;
    }

    if (action) {
      nextState.obake.yaruki = 90;
    }

    nextState.obake.yaruki = Math.max(nextState.obake.yaruki - 1, 0);
    if (nextState.obake.yaruki === 0) {
      nextState.obake.attack = false;
      const dirs: Direction[] = ["Up", "Down", "Left", "Right"];
      nextState.obake.direction = dirs[Math.floor(Math.random() * dirs.length)];
      nextState.obake.yaruki = 45;
    }

    nextState.obake.point = walk(nextState.obake.point, nextState.obake.direction);

    if (nextState.counter % 25 === 0) {
      const dirs: Direction[] = ["Up", "Down", "Left", "Right"];
      nextState.kani.direction = dirs[Math.floor(Math.random() * dirs.length)];
    }
    nextState.kani.point = walk(nextState.kani.point, nextState.kani.direction);

    nextState.gameMode = checkMode(nextState.obake, nextState.kani, nextState.suika);
    nextState.counter++;
  }

  return nextState;
};
