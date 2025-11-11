export default function TotalSection({ total, received, setReceived, change, onConfirm }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <p className="text-lg">合計：¥{total}</p>
            <input
                type="number"
                value={received}
                onChange={(e) => setReceived(e.target.value)}
                placeholder="受け取り金額"
                className="mt-2 w-full border rounded p-2"
            />
            <button
                onClick={onConfirm}
                className="mt-3 w-full bg-amber-200 hover:bg-amber-300 rounded p-2 font-semibold"
            >
                確定
            </button>
            {change !== null && (
            <p className="mt-2 text-xl font-bold text-green-700">
            お釣り：¥{change}
            </p>
            )}
        </div>
    );
}