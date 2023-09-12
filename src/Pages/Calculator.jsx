import React from 'react'
import BudgetTable  from "../components/BudgetTable"


function Calculator() {
  return (
<div className="w-full flex flex-col items-center ">
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Calculate your Grocery cost
    </h1>
    <h2 className="mt-6 text-lg leading-8 text-gray-600">
        Stay within budget! Add all your items as you go.
    </h2>
    <div >
        <BudgetTable/>
    </div>
</div>

  )
}

export default Calculator