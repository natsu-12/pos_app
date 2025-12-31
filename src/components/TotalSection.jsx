export default function TotalSection({ total, received, setReceived, change, onConfirm, selectedItems }) {
    const totalQty = selectedItems.reduce((sum, item) => sum + item.qty, 0);
    return (
        <div className="total-section">
            <ul className="total-selected-list">
                {selectedItems.map(item => (
                    <li key={item.id} className="total-selected-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty fixed-qty">x {item.qty}</span>
                        <span className="item-subtotal">¥{item.subtotal}</span>
                    </li>
                ))}
            </ul>
            <p className="total-amount">合計：¥{total}（{totalQty}点）</p>
            <input
                type="number"
                value={received}
                onChange={(e) => setReceived(e.target.value)}
                placeholder="受け取り金額"
                className="total-input"
            />
            <button
                onClick={onConfirm}
                className="total-confirm-button"
            >
                確定
            </button>
            {change !== null && (
                <p className="total-change">
                    お釣り：¥{change}
                </p>
            )}
        </div>
    );
}