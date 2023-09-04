import React from 'react'
import BudgetTable  from "../components/BudgetTable"


function Calculator() {
  return (
<div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center ">
    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 my-4">
        Calculate your Grocery cost
    </h1>
    <h2 className="text-base md:text-lg lg:text-xl leading-8 text-gray-600 my-4">
        Stay within budget! Add all your items as you go.
    </h2>
    <div className="w-full mt-6">
        <BudgetTable/>
    </div>
</div>

  )
}

export default Calculator