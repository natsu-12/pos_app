export default function ProductItem({ product, qty, onIncrement, onDecrement }) {
    return (
        <div className="flex items-center justify-between bg-white rounded-xl shadow p-3 mb-2">
            <div>
                <p className="font-semibold text-gray-700">{product.name}</p>
                <p className="text-sm text-gray-500">¥{product.price}</p>
            </div>
        <div className="flex items-center gap-2">
            <button
            onClick={() => onDecrement(product.id)}
            className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300"
            >
            -
            </button>
            <span className="w-6 text-center">{qty}</span>
            <button
            onClick={() => onIncrement(product.id)}
            className="bg-amber-200 px-3 py-1 rounded-full hover:bg-amber-300"
            >
            +
            </button>
        </div>
        </div>
    );
}