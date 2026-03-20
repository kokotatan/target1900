# Target 1900 - Modernized Base

英単語帳「Target 1900」の学習をサポートするWebアプリケーションの基盤です。
技術負債を解消し、TypeScript + Vite + Tailwind 4 による現代的な構成に刷新されました。

## 更新内容 (Takeover Phase 1)

- **TypeScript Migration**: 全ての主要ファイルを `.tsx` / `.ts` に移行し、型安全性を確保。
- **Data-Driven Logic**: `sections.ts` のハードコードを廃止し、データ配列に基づく動的な計算ロジックにリファクタリング。
- **Modernized Styling**: 
  - 不足していた CSS 変数の定義と、グローバルなスタイリング基盤の見直し。
  - Tailwind 4 への最適化。
- **Project Quality**: Prettier の導入と、`tsconfig.json` の Vite 向け最適化。

## 開発ガイド

### セットアップ
```bash
npm install
```

### 開発サーバー起動
```bash
npm run dev
```

### ビルド
```bash
npm run build
```
