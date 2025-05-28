import React, { Suspense } from 'react'; // Suspense をインポート

export default function CustomersLayout({ children }) {
  return (
    <div>
      {/* customers 関連の共通レイアウト要素をここに追加できます */}
      {/* 例: <nav>顧客管理メニュー</nav> */}

      {/* children を Suspense でラップする */}
      <Suspense fallback={<div>顧客情報を読み込み中...</div>}>
        {children}
      </Suspense>
    </div>
  );
}
