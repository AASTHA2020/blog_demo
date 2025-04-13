import React from "react";
import useCartStore from "../store/cartStore";

const Cart = () => {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * (parseFloat(item.price) || 0), 0);

    return (
        <div className="mt-28 mb-8 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">🛒 Your Cart</h2>

            {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div className="max-w-3xl mx-auto space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    <p className="text-sm text-gray-500">Price: ${item.price ? item.price.toFixed(2) : "0.00"}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="text-right font-semibold text-lg pt-4">
                        Total Items: {totalItems}
                    </div>
                    <div className="text-right font-semibold text-lg">
                        Total Price: ${totalPrice.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
