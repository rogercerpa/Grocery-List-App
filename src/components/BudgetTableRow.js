import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const BudgetTableRow = ({ item, index, handleItemChange, deleteItem }) => {
  const [swipeDistance, setSwipeDistance] = useState(0);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Left') {
        setSwipeDistance(Math.min(eventData.absX, 100)); // Limit swipe distance to 100px
      }
    },
    onSwipedLeft: () => {
      if (swipeDistance > 50) { // Threshold for deletion
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

  return (
    <tr className="relative border-b border-gray-200" {...handlers}>
      <td
        className="py-3 px-4 transition-all duration-300"
        style={{ opacity: 1 - swipeDistance / 100 }}
      >
        <input
          className="w-full border rounded py-2 px-3 text-base"
          value={item.name}
          onChange={(e) => handleItemChange(index, 'name', e.target.value)}
        />
      </td>
      <td
        className="py-3 px-4 transition-all duration-300"
        style={{ opacity: 1 - swipeDistance / 100 }}
      >
        <input
          type="number"
          className="w-full border rounded py-2 px-3 text-base"
          min="1"
          value={item.quantity}
          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
        />
      </td>
      <td
        className="py-3 px-4 relative transition-all duration-300"
        style={{ opacity: 1 - swipeDistance / 100 }}
      >
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base">$</span>
        <input
          type="number"
          className="w-full border rounded py-2 pl-8 text-base"
          style={{ minWidth: '80px' }}
          value={item.price}
          onChange={(e) => handleItemChange(index, 'price', e.target.value)}
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
  );
};

export default BudgetTableRow;