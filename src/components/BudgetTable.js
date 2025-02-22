import React, { useState, useEffect } from 'react';
import BarcodeScanner from './BarcodeScanner'; // Assuming they're in the same directory
import BudgetTableRow from './BudgetTableRow'; // Import the BudgetTableRow component

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
    // Add a new item with the scanned product name
    setItems([...items, { name: productName, price: '', quantity: 1 }]);
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

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
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
      <BarcodeScanner onProductFound={handleProductFound} />
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left text-base font-medium text-gray-700">Item</th>
            <th className="py-3 px-4 text-left text-base font-medium text-gray-700">Quantity</th>
            <th className="py-3 px-4 text-left text-base font-medium text-gray-700">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <BudgetTableRow
              key={index}
              item={item}
              index={index}
              handleItemChange={handleItemChange}
              deleteItem={deleteItem}
            />
          ))}
          <tr>
            <td colSpan="3" className="py-3 px-4">
              <button onClick={addItem} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded">
                Add Item
              </button>
            </td>
          </tr>
          <tr>
            <td className="py-3 px-4 text-base">Tax Percentage:</td>
            <td colSpan="2" className="py-3 px-4">
              <input
                type="number"
                className="w-full border rounded py-2 px-3 text-base"
                value={taxPercentage}
                onChange={(e) => setTaxPercentage(e.target.value ? Number(e.target.value) : "")}
              />
            </td>
          </tr>
          <tr>
            <td className="py-3 px-4 text-base">Tax Amount:</td>
            <td colSpan="2" className="py-3 px-4">${taxAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="py-3 px-4 text-base">Total + Tax:</td>
            <td colSpan="2" className="py-3 px-4">${totalWithTax.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="py-3 px-4 text-base">Budget:</td>
            <td colSpan="2" className="py-3 px-4">
              <input
                type="number"
                className="w-full border rounded py-2 px-3 text-base"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="py-3 px-4 text-base">
              <span className={`font-bold ${remainingBudgetColor}`}>
                Remaining: ${remainingBudget.toFixed(2)}
              </span>
            </td>
            <td colSpan="2" className="py-3 px-4">
              <button
                onClick={resetTable}
                className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded"
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
