import { useReducer, createContext, Dispatch, ReactNode, useMemo} from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/butget-reducers"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpense: number
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

export const BudgetProvider = ({children}: BudgetProviderProps) => {
   
    const [ state, dispatch ] = useReducer(budgetReducer, initialState)

    const totalExpense = useMemo(()=> state.expense.reduce((total, expenses)  => expenses.amount + total, 0) , [state.budget])
        
    const remainingBudget = state.budget - totalExpense


    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpense,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}