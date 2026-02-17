# Zo-na Website - Version 2

蔵王町の温泉熱栽培いちごスイーツを浅草で提供する「Zo-na（ゾーナ）」の新しいウェブサイトデザインです。

## 🍓 新デザインの特徴

### デザインの改善点
- **洗練されたいちごテーマ**: 全体をピンクにするのではなく、白ベースにグラデーションでいちごらしさを表現
- **いちごの種模様**: 背景に極薄のいちごの種模様を配置
- **セクションごとの配色**: ABOUTとSEASONALは白、EAT INとVISITは淡いピンクグラデーション
- **ホバーエフェクト**: カードが浮き上がるなど、インタラクティブな要素
- **美しいタイポグラフィ**: Crimson Pro（セリフ体）とNoto Sans JPの組み合わせ
- **スムーズなアニメーション**: ヒーローセクションのスライドショー、スクロール時のフェードイン

### 色使い
- **メインカラー**: いちごレッド (#E63946)
- **アクセント**: ディープレッド (#C1121F)
- **差し色**: ステムグリーン (#2D6A4F) - いちごのヘタの色
- **背景**: 白ベース with 淡いピンクのグラデーション

## 📁 ファイル構成

```
Zona-sp-v2/
├── index.html          # メインページ
├── style.css           # スタイルシート
├── script.js           # JavaScript（スライダー、アニメーション）
├── menu.html           # メニューページ（既存のものを使用）
├── images/             # 画像フォルダ（既存のものを使用）
│   ├── common/
│   ├── hero/
│   ├── about/
│   ├── menu/
│   ├── seasonal/
│   └── icons/
└── README.md           # このファイル

```

## 🚀 セットアップ方法

### 1. ファイルの配置
1. `index.html`、`style.css`、`script.js` を `Zona-sp-v2` フォルダに配置
2. 既存の `images` フォルダと `menu.html` をコピー

### 2. ローカルで確認
- VS Codeで開く
- Live Serverなどで表示確認
- または直接 `index.html` をブラウザで開く

### 3. GitHubにアップロード
```bash
git init
git add .
git commit -m "New design for Zo-na website"
git branch -M main
git remote add origin [your-github-repo-url]
git push -u origin main
```

### 4. GitHub Pagesで公開
1. GitHubリポジトリの Settings > Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Save

## 🎨 カスタマイズ

### 色を変更したい場合
`style.css` の最上部にある CSS変数を編集：
```css
:root {
    --strawberry-red: #E63946;  /* メインのいちご色 */
    --deep-red: #C1121F;        /* 濃いいちご色 */
    --stem-green: #2D6A4F;      /* ヘタの色 */
}
```

### スライドの速度を変更
`script.js` の以下の部分を編集：
```javascript
setInterval(nextSlide, 5000);  // 5000 = 5秒
```

## 📱 レスポンシブ対応

- **デスクトップ**: 1400px以上
- **タブレット**: 768px〜1024px
- **スマートフォン**: 480px〜768px
- **小画面**: 480px以下

すべてのデバイスで最適な表示になるよう設計されています。

## ✨ 主な機能

1. **自動スライドショー**: ヒーローセクションの画像が自動で切り替わる
2. **スムーズスクロール**: ナビゲーションリンクのクリックで滑らかにスクロール
3. **スクロールアニメーション**: 要素が画面に入るとフェードイン
4. **ホバーエフェクト**: カードやボタンにマウスを乗せると反応

## 🔧 今後の拡張予定

- [ ] ハンバーガーメニュー（モバイル対応）
- [ ] メニューページのリデザイン
- [ ] お問い合わせフォーム
- [ ] Google Maps埋め込み
- [ ] 多言語対応（英語/日本語切り替え）

## 📝 ライセンス

© Zo-na

---

**開発日**: 2026年2月17日
**デザインコンセプト**: 洗練されたいちごテーマ with 白ベース