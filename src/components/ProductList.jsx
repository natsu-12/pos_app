import ProductItem from "./ProductItem";

export default function ProductList({ products, cart, onIncrement, onDecrement }) {
    return (
        <div className="mb-4">
        {products.map((p) => {
            const qty = cart.find((item) => item.id === p.id)?.qty || 0;
            return (
            <ProductItem
                key={p.id}
                product={p}
                qty={qty}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
            />
            );
        })}
        </div>
    );
}