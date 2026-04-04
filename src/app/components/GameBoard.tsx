// src/components/GameBoard.tsx
'use client';

import { GameObject, GameMode, CommentData, getObakePos, getKaniPos, getSuikaPos } from '@/lib/game/logic';

interface Props {
    obake: GameObject;
    kani: GameObject;
    suika: GameObject;
    gameMode: GameMode;
    comments: CommentData[];
}

export default function GameBoard({ obake, kani, suika, gameMode, comments }: Props) {
    // 1. ロジックを使って表示座標を計算
    const obakePos = getObakePos(obake);
    const kaniPos = getKaniPos(kani);
    const suikaPos = getSuikaPos(suika);

    // 2. 宣言的なUIの構築（JSX）
  return (
    <svg id="field" className={gameMode} width="100%" height="800">
      
      {/* おばけの描画 */}
      <image id="obake" href="/images/obake.png" x={obakePos.x} y={obakePos.y} width="300" height="300" />

      {/* カニの描画 */}
      <image id="kani" href="/images/kani.png" x={kaniPos.x} y={kaniPos.y} width="60" height="40" />

      {/* スイカの描画（gameModeによる画像の切り替え） */}
      <image 
        id="suika" 
        href={gameMode === 'clear' ? '/images/suika2.png' : '/images/suika.png'} 
        x={suikaPos.x} 
        y={suikaPos.y} 
        width="80" 
        height="80" 
      />

      {/* コメント（吹き出し）の描画ループ */}
      {comments.map((comment) => {
        // 文字数から吹き出しの幅を概算（ReactでDOM要素のサイズを測る手間を省く王道テクニック）
        const width = comment.text.length * 20 + 40; 
        const height = 40;
        const rectX = comment.x - 20;
        const rectY = comment.y - 25;

        return (
          <g key={comment.id} className="comment">
            {/* 吹き出しの四角 */}
            <rect x={rectX} y={rectY} width={width} height={height} rx="10" ry="10" fill={comment.color} />
            {/* 吹き出しのしっぽ（とんがり） */}
            <path 
              d={`M ${rectX + width / 2} ${rectY + height + 20} L ${rectX + width / 2 - 10} ${rectY + height} L ${rectX + width / 2 + 10} ${rectY + height} z`} 
              fill={comment.color} 
            />
            {/* テキスト本体 */}
            <text x={comment.x} y={comment.y} fontSize="20" fill="black">
              {comment.text}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
