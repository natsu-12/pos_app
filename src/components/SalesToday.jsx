import { useMemo } from "react";

function ymdLocal(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export default function SalesToday({ products }) {
    const todayKey = ymdLocal(new Date());

    const salesToday = useMemo(() => {
    const sales = JSON.parse(localStorage.getItem("pos_sales") || "[]");
    return sales.filter((s) => {
        if (!s.createdAt) return false;
        return ymdLocal(new Date(s.createdAt)) === todayKey;
    });
    }, [todayKey]);

    const totalSales = salesToday.reduce((sum, s) => sum + (Number(s.total) || 0), 0);

  // items が cart形式（{id, qty}）でも表示できるように、products から名前を引く
    const resolveItemLabel = (item) => {
    if (item.name) return item.name; // もし name が保存されているならそれを使う
    const p = products.find((pp) => Number(pp.id) === Number(item.id));
    return p?.name ?? `ID:${item.id}`;
    };

    const resolveItemSubtotal = (item) => {
    if (typeof item.subtotal === "number") return item.subtotal; // もし subtotal が保存されているならそれを使う
    const p = products.find((pp) => Number(pp.id) === Number(item.id));
    const price = Number(p?.price) || 0;
    return price * (Number(item.qty) || 0);
    };

    return (
    <div className="sales-container">
        <h2 className="sales-title">当日売上（{todayKey}）</h2>

        <div className="sales-summary">
        <div>件数：{salesToday.length}件</div>
        <div>売上合計：¥{totalSales}</div>
        </div>

        {salesToday.length === 0 ? (
        <p className="sales-empty">本日の売上データはまだありません</p>
        ) : (
        <div className="sales-list">
            {salesToday
            .slice()
            .reverse()
            .map((s) => (
                <div key={s.id} className="sales-card">
                <div className="sales-card-head">
                    <div className="sales-time">
                    {new Date(s.createdAt).toLocaleTimeString("ja-JP", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                    </div>
                    <div className="sales-total">¥{s.total}</div>
                </div>

                <div className="sales-items">
                    {(s.items || []).map((it, idx) => (
                    <div key={idx} className="sales-item-row">
                        <span className="sales-item-name">{resolveItemLabel(it)}</span>
                        <span className="sales-item-qty">x {it.qty}</span>
                        <span className="sales-item-subtotal">¥{resolveItemSubtotal(it)}</span>
                    </div>
                    ))}
                </div>

                <div className="sales-footer">
                    <span>受取：¥{s.received}</span>
                    <span>釣銭：¥{s.change}</span>
                </div>
                </div>
            ))}
        </div>
        )}
    </div>
    );
}