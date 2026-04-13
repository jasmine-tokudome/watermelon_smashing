'use client';

import { useState, useEffect, useRef } from 'react';
import GameBoard from '@/components/GameBoard';
import { 
  GameState, Action, CommentData, 
  updateState, createCommentData 
} from '@/lib/game/logic';

// 1. ゲームの初期状態（スタート時の配置）
const initialGameState: GameState = {
  obake: { point: { x: 500, y: 400 }, direction: 'Up', attack: false, yaruki: 45 },
  kani: { point: { x: 300, y: 300 }, direction: 'Right' },
  suika: { point: { x: 600, y: 600 } },
  gameMode: 'play',
  counter: 0,
};

export default function GamePage() {
  // 2. 状態（State）の管理
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [comments, setComments] = useState<CommentData[]>([]);

  // プレイヤーの入力を一時保存する「裏の箱」（Stateと違い、更新しても画面が再描画されない）
  const actionRef = useRef<Action>(null);

  // 3. キーボード操作の受付
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': actionRef.current = 'Up'; break;
        case 'ArrowDown': actionRef.current = 'Down'; break;
        case 'ArrowLeft': actionRef.current = 'Left'; break;
        case 'ArrowRight': actionRef.current = 'Right'; break;
        case ' ': actionRef.current = 'Attack'; break; // スペースキーで攻撃
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown); // 画面を閉じたら解除
  }, []);

  // 4. ゲームループ（心臓部：1秒間に約30回計算を回す）
  useEffect(() => {
    // ゲームオーバーやクリアの時はタイマーを止める
    if (gameState.gameMode !== 'play') return;

    const timerId = setInterval(() => {
      setGameState((prevState) => {
        // 現在のキー入力を取得し、すぐに空に戻す（押しっぱなし判定を防ぐため）
        const currentAction = actionRef.current;
        actionRef.current = null;

        // logic.tsの関数を使って、古い状態から新しい状態を計算して返す
        return updateState(prevState, currentAction);
      });
    }, 1000 / 30); // 33ミリ秒に1回（約30FPS）実行

    return () => clearInterval(timerId); // 次のループが始まる前に前のタイマーを消す
  }, [gameState.gameMode]); // gameModeが変わった時だけタイマーを再設定する

  // 5. 声援（コメント）を送るボタンの処理
  const handleCheer = () => {
    // 応援した時も、おばけの「やる気」を回復させるためにActionをダミーで送る
    actionRef.current = 'Attack'; 

    const cheers = ["がんばれ！", "あっちだ！", "いけー！", "カニに注意！"];
    const randomText = cheers[Math.floor(Math.random() * cheers.length)];
    const newComment = createCommentData(randomText);

    // 画面にコメントを追加
    setComments((prev) => [...prev, newComment]);

    // 3秒後に「自分と同じID以外のコメントだけを残す（＝自分を消す）」
    setTimeout(() => {
      setComments((prev) => prev.filter((c) => c.id !== newComment.id));
    }, 3000);
  };

  // 6. 画面の組み立て（JSX）
  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>🍉 スイカ割りゲーム 🍉</h1>
      
      {/* 応援ボタン */}
      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={handleCheer}
          style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}
        >
          📣 声援を送る！
        </button>
      </div>

      {/* ゲーム画面本体（GameBoardコンポーネントに最新のデータを渡すだけ） */}
      <div style={{ width: '800px', height: '600px', margin: '0 auto', border: '2px solid black', overflow: 'hidden' }}>
        <GameBoard 
          obake={gameState.obake}
          kani={gameState.kani}
          suika={gameState.suika}
          gameMode={gameState.gameMode}
          counter={gameState.counter}
          comments={comments}
        />
      </div>

      {/* ゲームオーバー時のリトライボタン */}
      {gameState.gameMode !== 'play' && (
        <div style={{ marginTop: '20px' }}>
          <h2>{gameState.gameMode === 'clear' ? '🎉 クリア！ 🎉' : '💀 ゲームオーバー 💀'}</h2>
          <button onClick={() => setGameState(initialGameState)}>もう一度遊ぶ</button>
        </div>
      )}
    </div>
  );
}
