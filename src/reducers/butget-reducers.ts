import { v4 as uuidv4} from "uuid"
import { Category, DraftExpense, Expense } from "../types"


export type BudgetActions = 
{ type: 'Add-Budget', payload: {budget: number} } |
{type: 'Show-Modal'} |
{type : 'Close-Modal'} |
{type : 'Add-Expense', payload : {expense: DraftExpense}} |
{type: 'Remove-Expense', payload: {id: Expense['id']}} |
{type: 'Get-Expense-By-Id', payload: {id: Expense['id']}} |
{type: 'Update-Expenses', payload: {expense: Expense}} |
{type: 'Restore-App'} |
{type: 'Add-Filter-Category', payload: {id: Category['id']}}

export type BudgetState = {
    budget: number
    modal: boolean
    expense: Expense[]
    editingId:  Expense['id']
    currentCategory: Category['id']
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpense = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState : BudgetState = {
    budget: initialBudget(),
    modal: false,
    expense: localStorageExpense(),
    editingId: '',
    currentCategory: ''
}

const createExpense = ((drafExpense : DraftExpense) : Expense =>{
    return{
        ...drafExpense,
        id: uuidv4()
    }
})

export const budgetReducer = (
    state: BudgetState,
    action: BudgetActions
)=>{

    if (action.type === 'Add-Budget') {
        return{
            ...state,
            budget: action.payload.budget
        }
    }

    if(action.type ===  'Show-Modal'){
        return{
            ...state,
            modal: true
        }
    }

    if(action.type ===  'Close-Modal'){
        return{
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'Add-Expense'){
        const Expense = createExpense(action.payload.expense)
        return {
            ...state,
            expense: [...state.expense, Expense],
            modal: false
        }
    }

    if(action.type === 'Remove-Expense'){
        return{
            ...state,
            expense:  state.expense.filter(  
                exepenses => exepenses.id !== action.payload.id
            )
        }
    }

    if(action.type === 'Get-Expense-By-Id'){
        return{
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if(action.type === 'Update-Expenses'){
        return{
            ...state,
            expense: state.expense.map(expenses => expenses.id === action.payload.expense.id ? action.payload.expense : expenses),
            modal: false,
            editingId: ''

        }
    }

    if(action.type === 'Restore-App'){
        return{
            ...state,
            budget: 0,
            expense: []
        }
    }

    if(action.type === 'Add-Filter-Category'){
        return{
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state
}