import { useState, useEffect } from "react";
import { products } from "./data/products";
import ProductList from "./components/ProductList";
import TotalSection from "./components/TotalSection";
import ActionButtons from "./components/ActionButtons";

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [received, setReceived] = useState("");
  const [change, setChange] = useState(null);

  // 合計計算
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.id);
      return sum + (product?.unit_price || 0) * item.qty;
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  // 選択されたアイテムの詳細リスト
  const selectedItems = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return {
      id: item.id,
      name: product?.name,
      qty: item.qty,
      subtotal: (product?.unit_price || 0) * item.qty,
    };
  });

  const handleIncrement = (id) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      } else {
        return [...prev, { id, qty: 1 }];
      }
    });
  };

  const handleDecrement = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(i.qty - 1, 0) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const handleConfirm = () => {
    const ch = received - total;
    setChange(ch >= 0 ? ch : 0);

    // LocalStorageに販売履歴を保存
    const sales = JSON.parse(localStorage.getItem("pos_sales") || "[]");
    const sale = {
      id: Date.now(),
      items: cart,
      total,
      received: Number(received),
      change: ch >= 0 ? ch : 0,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("pos_sales", JSON.stringify([...sales, sale]));
  };

  const handleReset = () => {
    setCart([]);
    setReceived("");
    setChange(null);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">
        L’Atelier Natsume
      </h1>
      <h2 className="app-subtitle">お会計</h2>
      <ProductList
        products={products}
        cart={cart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
      <TotalSection
        total={total}
        received={received}
        setReceived={setReceived}
        change={change}
        onConfirm={handleConfirm}
        selectedItems={selectedItems}
      />
      <h3 className="app-thanks">お買い上げありがとうございます！</h3>
      <ActionButtons onReset={handleReset} />
    </div>
  );
}

export default App;