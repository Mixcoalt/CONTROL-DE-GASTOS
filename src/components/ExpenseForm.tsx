import { categories } from "../data/categories";
import type { DraftExpense, Value } from "../types";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css';
import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useBodget } from "../hooks/useBodget";


export default function ExpenseForm() {

    const { dispatch, state, remainingBudget } = useBodget()

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })



    const [error, setError] = useState('')

    const [previusAmount, setPreviosAmount] = useState(0)
    

    useEffect(()=> {
        if(state.editingId){
            const editingExpenses = state.expense.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpenses)
            setPreviosAmount(editingExpenses.amount)
        }
    }, [state.editingId])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) =>{
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        })
    }

    const handleDate = ((value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    })

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //validar

        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }

        //Validar que no se pase del limite
        if((expense.amount - previusAmount) > remainingBudget){
            setError('Ese gasto se sale del presupuesto')
            return
        }

        //!Agregar o actuliazar el gasto

        if(state.editingId){
            dispatch({type: 'Update-Expenses', payload: {expense: {id: state.editingId, ...expense}}})
        }else{
            dispatch({type: 'Add-Expense', payload: { expense }})
        }

        

        //!Reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviosAmount(0)
    }

  return (
    <form action="" className="space-y-5" onSubmit={ handleSubmit}>
        <legend className=" uppercase text-center text-2xl font-black border-b-4
        border-blue-500 py-2">
            {state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
        </legend>

        {error && 
            <ErrorMessage>
                {error}
            </ErrorMessage>
        }

        <div className=" flex flex-col gap-2">
            <label htmlFor="expenseName">
                Nombre: 
            </label>

            <input type="text" 
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className=" bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
                
            />
        </div>

        <div className=" flex flex-col gap-2">
            <label htmlFor="amount">
                Cantidad: 
            </label>

            <input type="text" 
                id="amount"
                placeholder="Añade la cantidad del gasto: EJ: 300"
                className=" bg-slate-100 p-2"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>


        <div className=" flex flex-col gap-2">
            <label htmlFor="category">
                Categoria: 
            </label>

            <select 
                id="category"
                className=" bg-slate-100 p-2"
                name="category"
                value={expense.category}
                onChange={handleChange}
            
            >
                <option value="">-- Seleccione --</option>
                {categories.map(categoria =>(
                    <option
                        key={categoria.id}
                        value={categoria.id}
                    >
                        {categoria.name}
                    </option>
                ))}
            </select>
        </div>

        <div className=" flex flex-col gap-2">
            <label htmlFor="date">
                Fecha Gasto: 
            </label>

            <DatePicker 
                className=' bg-slate-100 p-2 border-0'
                value={expense.date}
                onChange={handleDate}
            />
        </div>

        <input type="submit" 
            className=" bg-blue-600 cursor-pointer w-full p-2 text-white uppercase
            font-bold rounded-lg"
            value={state.editingId ? 'Guardar Cambios' : 'Registar Gasto'}
        />
    </form>
  )
}
