// src/app/customers/check/page.jsx

import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import { notFound } from 'next/navigation'; // 必要であれば、notFound() をインポート

async function fetchCustomer(id) {
  const res = await fetch(
    process.env.API_ENDPOINT + `/customers?customer_id=${id}`,
    {
      cache: "no-store", // SSR/SSG時も常に最新のデータを取得するため (任意)
    }
  );
  if (!res.ok) {
    // APIからのエラーレスポンスをコンソールに出力してデバッグしやすくする
    const errorText = await res.text();
    console.error(`Failed to fetch customer with ID ${id}. Status: ${res.status}, Body: ${errorText}`);
    throw new Error("Failed to fetch customer"); // エラーを再スロー
  }
  return res.json();
}

// 修正点: 引数を { searchParams } に変更
export default async function ReadPage({ searchParams }) {
  // 修正点: searchParams から customer_id を取得
  const id = searchParams.customer_id; // URLが ?customer_id=... の場合

  // IDが提供されていない場合のハンドリング
  if (!id) {
    console.warn("customer_id が URL クエリパラメータで提供されていません。");
    // IDがない場合は、404ページを表示するか、顧客一覧ページにリダイレクトするなど、
    // アプリケーションの要件に応じた適切なエラーハンドリングを行う
    notFound(); // 例: 404ページを表示
    // あるいは: return <div>顧客IDが指定されていません。</div>;
  }

  let customerInfo;
  try {
    customerInfo = await fetchCustomer(id);
  } catch (error) {
    console.error("顧客情報のフェッチ中にエラー:", error);
    // データフェッチエラー時のハンドリング
    notFound(); // 例: 404ページを表示
    // あるいは: return <div>顧客情報の取得に失敗しました。</div>;
  }


  // APIのレスポンスが配列で、かつ最初の要素にidがあることを想定
  // customerInfo が null/undefined であったり、空配列だったり、
  // 最初の要素に id プロパティがない場合のチェック
  if (!customerInfo || !Array.isArray(customerInfo) || customerInfo.length === 0 || !customerInfo[0] || typeof customerInfo[0].id === 'undefined') {
    console.warn(`取得した顧客データが不正またはidプロパティがありません。ID: ${id}, データ:`, customerInfo);
    notFound(); // 不正なデータの場合は404
  }

  return (
    <>
      {/* この alert は "更新しました" とありますが、ReadPage なので表示意図を確認してください */}
      <div className="alert alert-success">顧客情報を表示しています</div> {/* より適切な文言に修正 */}
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...customerInfo[0]} />
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}
>>>>>>> b940a316ea793f3e8f5f9a3812ffb415fc2ee1d4
