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
    setItems([...items, { name: productName, price: '',quantity: 1 }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', price: '',quantity: 1 }]);
  };

  const resetTable = () => {
    setItems(initialItems);
    localStorage.removeItem('budgetItems');
  };

  const totalValue = items.reduce((acc, item) => acc + (Number(item.price) || 0) * item.quantity, 0);
  const total = Number(totalValue.toFixed(2));
  const taxAmount = (total * taxPercentage) / 100;
  const totalWithTax = total + taxAmount;

// calculating remaining budget
  const remainingBudget = Number(budget) - totalWithTax;
  const remainingBudgetColor = remainingBudget >= 0 ? 'text-green-500' : 'text-red-500';
  
  

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Item</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} >
              <td className="flex  py-2 px-4 border-b items-center">
                <input
                  className="grow border rounded w-auto py-2 px-1"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                />
               <span colSpan="2" className='' >
                 <BarcodeScanner onProductFound={handleProductFound} />
                </span>
              </td>
              <td className="border-b">
              <input
                  type="number"
                  className="border rounded py-2 px-3 w-16"  // Using w-16 for width
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                />
              </td>

              <td className=" border-b relative m-2">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">$</span>
                <input
                    type="number"
                    className="shrink border rounded w-full py-2 px-3 pl-6" 
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                />
                </td>

            </tr>
          ))}
          
              <tr>
                  <td colSpan="2" className="py-2 px-4">
                      <div className="flex justify-center gap-2">
                          <button onClick={addItem} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Add Item
                          </button>

                      </div>
                  </td>
              </tr>

              <tr>
            <td className="py-2 px-4">Tax Percentage:</td>
            <td className=" relative">
                <span className="absolute left-1 top-1/2 transform -translate-y-1/2">%</span>
                        <input 
                          type="number" 
                          className="border rounded w-full py-2 px-3 pl-7"  
                          value={taxPercentage} 
                          onChange={(e) => setTaxPercentage(e.target.value ? Number(e.target.value) : "")}

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
        <td className=" relative">
            <span className="absolute left-1 top-1/2 transform -translate-y-1/2">$</span>
            <input
                type="number"
                className="border rounded w-full py-2 pl-7 pr-3"  
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
            />
         
        </td>
      </tr>
      <tr>
    <td className="flex justify-between items-center py-2 px-4">
        <span className={`mt-2 ${remainingBudgetColor}`}>
            Remaining: ${remainingBudget.toFixed(2)}
        </span>
    </td>
    <td className="py-2 px-4">
      <button 
      onClick={resetTable} 
      className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white text-xs sm:text-sm md:text-base font-bold py-2 px-4 rounded whitespace-nowrap overflow-hidden overflow-ellipsis">
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
