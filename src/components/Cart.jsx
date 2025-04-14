import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";

const Cart = () => {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * (parseFloat(item.price) || 0), 0);

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        setTimeout(() => {
            navigate("/home");
        }, 2000); // Navigate after 2 seconds
    };

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
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full mt-4"
                    >
                        Confirm Order
                    </button>
                </div>
            )}

            {orderPlaced && (
                <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4 animate-bounce">🎉 Order has been placed!</h3>
                        <p className="text-gray-500">Redirecting to home...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
