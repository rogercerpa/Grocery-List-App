import React, { useState, useEffect } from 'react';
import BarcodeScanner from './BarcodeScanner'; // Assuming they're in the same directory


const BudgetTable = () => {
  const initialItems = [{ name: '', price: '' }];

    // Check local storage first for items
  const localStorageItems = JSON.parse(localStorage.getItem('budgetItems'));

  const [items, setItems] = useState(localStorageItems || initialItems);
  const [budget, setBudget] = useState('');
  const [taxPercentage, setTaxPercentage] = useState(0);

  const handleProductFound = (productName) => {
    setItems([...items, { name: productName, price: '' }]);
  };
  
  
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

  const totalValue = items.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const total = Number(totalValue.toFixed(2));
  const taxAmount = (total * taxPercentage) / 100;
  const totalWithTax = total + taxAmount;

// calculating remaining budget
  const remainingBudget = Number(budget) - totalWithTax;
  const remainingBudgetColor = remainingBudget >= 0 ? 'text-green-500' : 'text-red-500';
  
  

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
              {/* <td colSpan="2" className="py-2 px-4">
                 <BarcodeScanner onProductFound={handleProductFound} />
             </td> */}
              <td className="py-2 px-4 border-b relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">$</span>
                <input
                    type="number"
                    className="border rounded w-full py-2 px-3 pl-6" // added padding-left (pl-6) to accommodate the $ symbol
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
               <td className="py-2 px-4">Tax Percentage:</td>
               <td className="py-2 px-4 relative">
               <span className="absolute left-2 top-1/2 transform -translate-y-1/2">%</span>
               <input 
                  type="number" 
                  className="border rounded w-full py-2 px-3 pl-6" 
                  value={taxPercentage} 
                  onChange={(e) => setTaxPercentage(Number(e.target.value))} 
              />
          </td>
        </tr>

        <tr>
             <td className="py-2 px-4">Tax Amount:</td>
             <td className="py-2 px-4">${taxAmount.toFixed(2)}</td>
        </tr>
       <tr>
            <td className="py-2 px-4">Total + Tax:</td>
            <td className="py-2 px-4">${totalWithTax.toFixed(2)}</td>
       </tr>

       <tr>
           <td className="py-2 px-4">Budget:</td>
           <td className="py-2 px-4 relative">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">$</span>
         <input
            type="number"
            className="border rounded w-full py-2 pl-6 pr-3"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <div className={`mt-2 ${remainingBudgetColor}`}>
            Remaining: ${remainingBudget.toFixed(2)}
          </div>
         </td>
       </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
