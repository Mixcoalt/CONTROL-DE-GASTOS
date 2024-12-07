import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBodget = () =>{
    const context = useContext(BudgetContext)

    if(!context){
        throw new Error('useBodget must be used within a BudgetProvider')
    }

    return context
}