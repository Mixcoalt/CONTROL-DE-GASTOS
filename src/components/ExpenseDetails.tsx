import { useMemo } from "react"
import {  
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
}from 'react-swipeable-list'
import { Expense } from "../types"
import { formatDate } from "../utilities"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import "react-swipeable-list/dist/styles.css"
import { useBodget } from "../hooks/useBodget"

type ExpenseDetailsProps = {
    expense: Expense
}

export const ExpenseDetails = ({expense} : ExpenseDetailsProps) => {

  const { dispatch } = useBodget()

  const categoryInfo = useMemo(() => categories.filter(cat => cat.id=== expense.category)[0] , [expense])

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={()=> dispatch({type: 'Get-Expense-By-Id', payload:{id: expense.id}})}
      >
        Actuializar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingAction = () => (
    <TrailingActions>
      <SwipeAction
        onClick={()=> dispatch({type: 'Remove-Expense', payload: {id: expense.id}})}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )


  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingAction()}
      >

      
        <div className=" bg-white shadow-lg p-10 w-full border-b border-gray-300
        flex gap-5 items-center">

            <div>
                <img 
                  src={`/icono_${categoryInfo.icon}.svg`} 
                  alt="Icono gasto" 
                  className=" w-20"
                />
            </div>
              
            <div className=" flex-1 space-y-2">
              <p className=" text-sm font-bold uppercase text-slate-500">
                {categoryInfo.name}
              </p>

              <p>
                {expense.expenseName}
              </p>

              <p className=" text-slate-600 text-sm">
                {formatDate( expense.date!.toString())}
              </p>
            </div>

            <AmountDisplay 
              amount={expense.amount}
            />
        </div>

      </SwipeableListItem>
    </SwipeableList>
  )
}
