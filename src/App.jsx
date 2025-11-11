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
    <div className="min-h-screen bg-[#F5F5F4] p-4">
      <h1 className="text-center text-2xl font-semibold mb-4 text-gray-700">
        L’Atelier Natsume POS
      </h1>
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
      />
      <ActionButtons onReset={handleReset} />
    </div>
  );
}

export default App;