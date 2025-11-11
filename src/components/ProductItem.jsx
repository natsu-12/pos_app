export default function ProductItem({ product, qty, onIncrement, onDecrement }) {
    return (
        <div className="product-item">
            <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">¥{product.price}</p>
            </div>
            <div className="product-buttons">
                <button
                    onClick={() => onDecrement(product.id)}
                    className="product-btn-minus"
                >
                    -
                </button>
                <span className="product-qty">{qty}</span>
                <button
                    onClick={() => onIncrement(product.id)}
                    className="product-btn-plus"
                >
                    +
                </button>
            </div>
        </div>
    );
}