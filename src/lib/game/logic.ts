//ロジックは計算に専念させる。DOM操作はtsx側のスタイルに担わせる。

// 型定義（共通で使う）
export interface Point {
    x: number;
    y: number;
  }
  export interface GameObject {
    point: Point;
  }

export const getKaniDisplayPosition = (kani: GameObject): Point => {
return {
      x: kani.point.x - 60 / 2,
      y: kani.point.y - 40 / 2,
    };
};

