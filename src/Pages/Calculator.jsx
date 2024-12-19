import React from 'react'
import BudgetTable  from "../components/BudgetTable"


function Calculator() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4 text-center">
        Calculate Your Grocery Cost
      </h1>
      <h2 className="mt-4 text-base sm:text-lg lg:text-xl leading-6 text-gray-600 text-center">
        Stay within budget! Add all your items as you go.
      </h2>
      <div className="w-full mt-6">
        <BudgetTable />
      </div>
    </div>
  )
}

export default Calculator