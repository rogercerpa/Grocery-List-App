
import { useSwipeable } from 'react-swipeable';

const BudgetTableRow = ({ item, index, handleItemChange, deleteItem }) => {
    const handlers = useSwipeable({
      onSwipedLeft: () => deleteItem(index),
      preventDefaultTouchmoveEvent: true,
      trackMouse: true,
    });
  
    return (
      <tr className="border-b border-gray-200" {...handlers}>
        <td className="py-3 px-4">
          <input
            className="w-full border rounded py-2 px-3 text-base"
            value={item.name}
            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="number"
            className="w-full border rounded py-2 px-3 text-base"
            min="1"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
          />
        </td>
        <td className="py-3 px-4 relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base">$</span>
          <input
            type="number"
            className="w-full border rounded py-2 pl-8 text-base"
            style={{ minWidth: '80px' }}
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
          />
        </td>
      </tr>
    );
  };

  export default BudgetTableRow;