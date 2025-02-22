import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import BarcodeScanner from './BarcodeScanner';

const BudgetTableRow = ({ item, index, handleItemChange, deleteItem }) => {
  const [swipeDistance, setSwipeDistance] = useState(0);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Left') {
        setSwipeDistance(Math.min(eventData.absX, 100));
      }
    },
    onSwipedLeft: () => {
      if (swipeDistance > 50) {
        deleteItem(index);
      }
      setSwipeDistance(0);
    },
    onSwipedRight: () => {
      setSwipeDistance(0);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleProductFound = (productName) => {
    handleItemChange(index, 'name', productName);
  };

  return (
    <>
      {index === 0 && (
        <tr>
          <th className="py-3 px-1 text-center text-sm font-medium text-gray-700 w-6">Scan</th>
          <th className="py-3 px-2 text-center text-sm font-medium text-gray-700 w-56">Item</th>
          <th className="py-3 px-2 text-center text-sm font-medium text-gray-700 w-8">Qty</th>
          <th className="py-3 px-2 text-center text-sm font-medium text-gray-700 w-12">Price</th>
        </tr>
      )}
      <tr className="relative border-b border-gray-200" {...handlers}>
        <td className="py-1 px-1 w-6">
          <BarcodeScanner onProductFound={handleProductFound} />
        </td>
        <td
          className="py-2 px-2 transition-all duration-300"
          style={{ opacity: 1 - swipeDistance / 100 }}
        >
          <input
            className="w-full border rounded py-1 px-2 text-sm"
            value={item.name}
            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
            maxLength="20"
            style={{ minWidth: '200px' }} // Large: fits ~20 characters
          />
        </td>
        <td
          className="py-2 px-2 transition-all duration-300"
          style={{ opacity: 1 - swipeDistance / 100 }}
        >
          <input
            type="number"
            className="w-full border rounded py-1 px-2 text-sm"
            min="1"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            maxLength="2"
            style={{ minWidth: '30px' }} // Small: fits 2 digits
          />
        </td>
        <td
          className="py-2 px-2 relative transition-all duration-300"
          style={{ opacity: 1 - swipeDistance / 100 }}
        >
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm">$</span>
          <input
            type="number"
            className="w-full border rounded py-1 pl-6 text-sm"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
            maxLength="4"
            style={{ minWidth: '50px' }} // Medium: fits 4 digits + $
          />
        </td>
        <td
          className="absolute right-0 top-0 h-full flex items-center justify-center text-white transition-all duration-300"
          style={{
            width: `${swipeDistance}px`,
            backgroundColor: swipeDistance > 50 ? 'red' : 'rgba(255, 0, 0, 0.5)',
          }}
        >
          <span>Delete</span>
        </td>
      </tr>
    </>
  );
};

export default BudgetTableRow;