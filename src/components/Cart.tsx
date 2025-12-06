import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-sans font-bold text-brand-blue mb-2">Your cart is empty</h2>
          <p className="text-gray-700 mb-6 font-medium">Add some items to get started!</p>
          <button
            onClick={onContinueShopping}
            className="bg-brand-red text-white px-6 py-3 rounded-xl hover:bg-brand-red-dark transition-all duration-200 font-semibold shadow-lg"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onContinueShopping}
          className="flex items-center space-x-2 text-gray-600 hover:text-brand-blue transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-3xl font-sans font-bold text-brand-blue">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-brand-red hover:text-brand-red-dark transition-colors duration-200 font-semibold"
        >
          Clear All
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        {cartItems.map((item, index) => (
          <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-sans font-semibold text-gray-900 mb-1">{item.name}</h3>
                {item.selectedVariation && (
                  <p className="text-sm text-gray-500 mb-1">Size: {item.selectedVariation.name}</p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p className="text-sm text-gray-500 mb-1">
                    Add-ons: {item.selectedAddOns.map(addOn => 
                      addOn.quantity && addOn.quantity > 1 
                        ? `${addOn.name} x${addOn.quantity}`
                        : addOn.name
                    ).join(', ')}
                  </p>
                )}
                <p className="text-lg font-semibold text-gray-900">₱{item.totalPrice} each</p>
              </div>
              
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-3 bg-brand-yellow/30 rounded-xl p-1 border-2 border-brand-yellow">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-brand-yellow/50 rounded-lg transition-colors duration-200"
                  >
                    <Minus className="h-4 w-4 text-gray-800" />
                  </button>
                  <span className="font-bold text-gray-900 min-w-[32px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-brand-yellow/50 rounded-lg transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 text-gray-800" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">₱{item.totalPrice * item.quantity}</p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-brand-red hover:text-brand-red-dark hover:bg-brand-red/10 rounded-lg transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between text-2xl font-sans font-bold text-brand-blue mb-6">
          <span>Total:</span>
          <span>₱{parseFloat(getTotalPrice() || 0).toFixed(2)}</span>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full bg-brand-red text-white py-4 rounded-xl hover:bg-brand-red-dark transition-all duration-200 transform hover:scale-[1.02] font-bold text-lg shadow-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;