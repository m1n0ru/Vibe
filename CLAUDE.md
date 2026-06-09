# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ClenderDiary** — カレンダー付き日記Webアプリ。カレンダーから日付を選択し、その日の日記（タイトル・本文・気分）を記録・閲覧できる。

## Tech Stack

- **React** + **Vite** (SPA)
- **Bootstrap** (styling)
- **LocalStorage** (data persistence — no backend, no auth)

## Commands

```bash
npm install       # 依存関係インストール
npm run dev       # 開発サーバー起動
npm run build     # プロダクションビルド
npm run preview   # ビルド結果のプレビュー
```

## Architecture

```
src/
├── App.jsx                  # ルートコンポーネント・状態管理
├── components/
│   ├── Header.jsx           # アプリ名・月移動ボタン
│   ├── CalendarView.jsx     # 月カレンダー全体
│   ├── DayCell.jsx          # 各日付セル（日記有無のマーカー表示）
│   ├── DiaryEditor.jsx      # 選択日の日記入力・表示エリア
│   ├── MoodSelector.jsx     # 気分選択アイコン
│   └── DiaryForm.jsx        # タイトル・本文入力フォーム
└── utils/
    └── storage.js           # LocalStorage 読み書きユーティリティ
```

## Data Model (LocalStorage)

キー: `"clenderDiary"` に全日記をまとめてJSON保存。

```json
{
  "2026-06-09": {
    "title": "今日のできごと",
    "body": "日記本文...",
    "mood": "😊",
    "updatedAt": "2026-06-09T12:00:00"
  }
}
```

日付キーは `YYYY-MM-DD` 形式で統一。

## Key Decisions

- データはブラウザのLocalStorageのみに保存（サーバー不要）
- 選択中の日付・表示月は React state で管理（App.jsx が single source of truth）
- 日記が存在する日は DayCell にビジュアルマーカーを表示
- 今日の日付は初期選択状態にする
