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

//　座標計算ロジック（中心から左上座標を算出）
export const getObakePos = (obake: GameObject) => ({ x: obake.point.x - 150, y: obake.point.y - 150 });
export const getKaniPos = (kani: GameObject) => ({ x: kani.point.x - 30, y: kani.point.x - 30});
export const getSuikaPos = (suika: GameObject) => ({x: suika.point.x - 40, y: suika.point.y - 40});

export const getKaniDisplayPosition = (kani: GameObject): Point => {
return {
      x: kani.point.x - 60 / 2,
      y: kani.point.y - 40 / 2,
    };
};

// コメントデータ生成ロジック
export const createCommentData = (text: string): CommentData => {
  const COLORS = ["violet", "pink", "gold", "greenyellow", "lightskyblue"];
  return {
    id: Math.random().toString(36).substring(7), // 一意のIDを付与
    text,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    x: 300 + Math.random() * 640,
    y: 650 + Math.random() * 150,
  };
};

