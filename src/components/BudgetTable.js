import React, { useState, useEffect } from 'react';
import BarcodeScanner from './BarcodeScanner'; // Assuming they're in the same directory

const BudgetTable = () => {
  const initialItems = [{ name: '', price: '', quantity: 1 }];

  // Check local storage first for items
  const localStorageItems = JSON.parse(localStorage.getItem('budgetItems'));
  const localStorageTaxPercentage = localStorage.getItem('taxPercentage');
  const localStorageBudget = localStorage.getItem('budget');

  const [items, setItems] = useState(localStorageItems || initialItems);
  const [taxPercentage, setTaxPercentage] = useState(localStorageTaxPercentage || 0);
  const [budget, setBudget] = useState(localStorageBudget || '');

  useEffect(() => {
    localStorage.setItem('budgetItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('taxPercentage', taxPercentage);
    localStorage.setItem('budget', budget);
  }, [taxPercentage, budget]);

  const handleProductFound = (productName) => {
    console.log(productName);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', price: '', quantity: 1 }]);
  };

  const resetTable = () => {
    setItems(initialItems);
    localStorage.removeItem('budgetItems');
  };

  const totalValue = items.reduce((acc, item) => acc + (Number(item.price) || 0) * item.quantity, 0);
  const total = Number(totalValue.toFixed(2));
  const taxAmount = (total * taxPercentage) / 100;
  const totalWithTax = total + taxAmount;

  // Calculating remaining budget
  const remainingBudget = Number(budget) - totalWithTax;
  const remainingBudgetColor = remainingBudget >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="container mx-auto p-5 space-y-4 divide-y divide-gray-200">
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Item</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Quantity</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-2 px-4">
                <input
                  className="w-full border rounded py-1 px-2 text-sm"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="number"
                  className="w-full border rounded py-1 px-2 text-sm"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                />
              </td>
              <td className="py-2 px-4 relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm">$</span>
                <input
                  type="number"
                  className="w-full border rounded py-1 pl-6 text-sm"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" className="py-2 px-4">
              <button onClick={addItem} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Item
              </button>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-sm">Tax Percentage:</td>
            <td colSpan="2" className="py-2 px-4">
              <input
                type="number"
                className="w-full border rounded py-1 px-2 text-sm"
                value={taxPercentage}
                onChange={(e) => setTaxPercentage(e.target.value ? Number(e.target.value) : "")}
              />
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-sm">Tax Amount:</td>
            <td colSpan="2" className="py-2 px-4">${taxAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-sm">Total + Tax:</td>
            <td colSpan="2" className="py-2 px-4">${totalWithTax.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-sm">Budget:</td>
            <td colSpan="2" className="py-2 px-4">
              <input
                type="number"
                className="w-full border rounded py-1 px-2 text-sm"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-sm">
              <span className={`font-bold ${remainingBudgetColor}`}>
                Remaining: ${remainingBudget.toFixed(2)}
              </span>
            </td>
            <td colSpan="2" className="py-2 px-4">
              <button
                onClick={resetTable}
                className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Reset Table
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
