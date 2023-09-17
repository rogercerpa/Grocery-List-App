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
    <div className="container mx-auto p-5 space-y-4 divide-y-4 divide-slate-400/25">
      <table className="md:table w-full">
        <thead className="md:table-header-group">
          <tr className="md:table-row">
              <th className="table-cell py-1 px-2 text-xs md:py-2 md:px-4 md:text-base">Item</th>
              <th className="table-cell py-1 px-2 text-xs md:py-2 md:px-4 md:text-base">Quantity</th>
              <th className="table-cell py-1 px-2 text-xs md:py-2 md:px-4 md:text-base">Price</th>
          </tr>
      </thead>
        <tbody className="md:table-row-group">
          {items.map((item, index) => (
            <tr key={index} className="md:table-row" >
              <td className="table-cell py-1 px-2">
              <div className="flex flex-row space-x-2 gap-1">
                <input
                    className="grow border rounded w-full py-1 px-4 text-sm md:py-2 md:text-base"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                />
                <BarcodeScanner onProductFound={handleProductFound} />
            </div>
              </td>

              <td className="table-cell py-1 px-2">
              <input
                  type="number"
                  className="border rounded py-1 px-2 w-10 text-sm md:w-16 md:py-2 md:px-3 md:text-base"  // Using w-16 for width
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                />
                </td>
              <td className="table-cell py-1 px-2 relative">
                <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs md:left-2 md:text-base">$</span>
                <input
                    type="number"
                    className="shrink border rounded w-32 py-1 pl-1 text-sm md:py-2 md:pl-7 md:text-base" 
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

            <div className=''>
              <tr>
                <td className="py-2 px-2 md:px-4 text-xs md:text-base">Tax Percentage:</td>
                <td className="relative flex justify-end items-center">
                <span className="ml-2">%</span>
                    <input 
                        type="number" 
                        className="border rounded py-1 px-3 w-20"  
                        value={taxPercentage} 
                        onChange={(e) => setTaxPercentage(e.target.value ? Number(e.target.value) : "")}
                        
                    />
                    
                </td>
            </tr>


            <tr>
                <td className="text-xs md:text-base py-2 px-2 md:px-4">Tax Amount:</td>
                <td className="py-2 px-2 md:px-4">${taxAmount.toFixed(2)}</td>
            </tr>
            <tr>
                <td className="text-xs md:text-base py-2 px-2 md:px-4">Total + Tax:</td>
                <td className="py-2 px-2 md:px-4">${totalWithTax.toFixed(2)}</td>
            </tr>
            <tr>
                <td className="text-xs md:text-base py-2 px-2 md:px-4">Budget:</td>
                <td className="relative">
                    <span className="absolute left-1 top-1/2 transform -translate-y-1/2">$</span>
                    <input
                        type="number"
                        className="border rounded w-full md:w-20 py-2 pl-3 pr-3"  
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                </td>
            </tr>
            <tr>
                <td className="flex justify-between items-center py-2 px-2 md:px-4">
                    <span className={`mt-2 ${remainingBudgetColor}`}>
                        Remaining: ${remainingBudget.toFixed(2)}
                    </span>
                </td>
                <td className="py-2 px-2 md:px-4">
                    <button 
                        onClick={resetTable} 
                        className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white text-xs sm:text-sm md:text-base font-bold py-2 px-4 rounded whitespace-nowrap overflow-hidden overflow-ellipsis">
                        Reset Table
                    </button>
                </td>
            </tr>
            </div>

        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
