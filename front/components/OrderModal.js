'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function OrderModal({
  isOpen,
  onClose,
  totalPrice,
  perfumeId,
  selectedScents,
  selectedSize,
  selectedIntensity,
  selectedBottle,
  selectedPremium,
}) {
  const [formData, setFormData] = useState({
    gift_message: '',
    delivery_date: '',
    sample: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      perfumeId,
      gift_message: formData.gift_message,
      delivery_date: formData.delivery_date,
      sample: formData.sample,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create order');
      console.log('Order success:', data);
      onClose();
    } catch (err) {
      console.error('Error submitting order:', err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Complete Your Order</h2>

        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <p>Selected Scents: {selectedScents.map(s => s.name).join(', ')}</p>
            <p>Size: {selectedSize.name}</p>
            <p>Intensity: {selectedIntensity.name}</p>
            <p>Bottle: {selectedBottle.name}</p>
            {selectedPremium.length > 0 && (
              <p>Premium Ingredients: {selectedPremium.map(p => p.name).join(', ')}</p>
            )}
            <p className="text-lg font-semibold mt-4">Total: ${totalPrice}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Gift Message (optional)</label>
            <textarea
              value={formData.gift_message}
              onChange={(e) => setFormData({ ...formData, gift_message: e.target.value })}
              rows={2}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preferred Delivery Date</label>
            <input
              type="date"
              required
              value={formData.delivery_date}
              onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sample"
              checked={formData.sample}
              onChange={(e) => setFormData({ ...formData, sample: e.target.checked })}
              className="h-4 w-4"
            />
            <label htmlFor="sample" className="text-sm">Include 25% Sample (adds 25% to price)</label>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:border-purple-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
