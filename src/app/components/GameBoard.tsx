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
