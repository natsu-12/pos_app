export default function TotalSection({ total, received, setReceived, change, onConfirm, selectedItems }) {
    const totalQty = selectedItems.reduce((sum, item) => sum + item.qty, 0);
    const handleKeypadClick = (value) => {
        setReceived((prev) => {
            const current = String(prev ?? "");

            if (value === "clear") return "";
            if (value === "back") return current.slice(0, -1);

            if (current === "0") {
                return value === "00" ? "0" : value;
            }

            return current + value;
        });
    };
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
                type="text"
                value={received === "" ? "" : `¥${received}`}
                readOnly
                placeholder="受け取り金額"
                className="total-input"
            />

            <div className="keypad">
                <button type="button" onClick={() => handleKeypadClick("1")}>1</button>
                <button type="button" onClick={() => handleKeypadClick("2")}>2</button>
                <button type="button" onClick={() => handleKeypadClick("3")}>3</button>
                <button type="button" onClick={() => handleKeypadClick("4")}>4</button>
                <button type="button" onClick={() => handleKeypadClick("5")}>5</button>
                <button type="button" onClick={() => handleKeypadClick("6")}>6</button>
                <button type="button" onClick={() => handleKeypadClick("7")}>7</button>
                <button type="button" onClick={() => handleKeypadClick("8")}>8</button>
                <button type="button" onClick={() => handleKeypadClick("9")}>9</button>
                <button type="button" onClick={() => handleKeypadClick("00")}>00</button>
                <button type="button" onClick={() => handleKeypadClick("0")}>0</button>
                <button type="button" onClick={() => handleKeypadClick("back")}>←</button>
                <button type="button" onClick={() => handleKeypadClick("clear")} className="keypad-clear">クリア</button>
            </div>
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