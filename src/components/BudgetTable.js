import React, { useState, useEffect } from 'react';

const BudgetTable = () => {
  const initialItems = [{ name: '', price: '' }];
  const [items, setItems] = useState([{ name: '', price: '' }]);
  const [budget, setBudget] = useState('');

  useEffect(() => {
    localStorage.setItem('budgetItems', JSON.stringify(items));
  }, [items]);


  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', price: '' }]);
  };

  const resetTable = () => {
    setItems(initialItems);
    localStorage.removeItem('budgetItems');
  };

  const total = items.reduce((acc, item) => acc + (Number(item.price) || 0), 0);

  return (
    <div className="w-full max-w-md mx-auto mt-5">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Item</th>
            <th className="py-2 px-4 border-b">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">
                <input
                  className="border rounded w-full py-2 px-3"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  className="border rounded w-full py-2 px-3"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="2" className="py-2 px-4">
              <button onClick={addItem} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Item
              </button>
              <button 
                    onClick={resetTable} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                Reset Table
            </button>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4">Total:</td>
            <td className="py-2 px-4">${total}</td>
          </tr>
          <tr>
            <td className="py-2 px-4">Budget:</td>
            <td className="py-2 px-4">
              <input
                type="number"
                className="border rounded w-full py-2 px-3"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
