import { useMemo } from "react"
import { useBodget } from "../hooks/useBodget"
import { ExpenseDetails } from "./ExpenseDetails"

const ExpenseList = () => {

    const { state } = useBodget()

    const filterdExpenses = state.currentCategory ? state.expense.filter(
        expenses => expenses.category === state.currentCategory
    ) : state.expense

    const isEmpty = useMemo(()=> filterdExpenses.length === 0, [state.expense])

  return (
    <div className=" pt-10">
        {isEmpty ? 
            <p className=" text-gray-600 text-2xl font-bold">
                No hay gastos
            </p> : (
                <>
                    <p className=" text-gray-600 text-2xl font-bold my-5">
                        Listado de Gastos
                    </p>
                    {filterdExpenses.map(expense => (
                        <ExpenseDetails
                            key={expense.id}
                            expense={expense}
                        
                        />
                    ))}
                </>
            )
        
        }
    </div>
  )
}

export default ExpenseList
