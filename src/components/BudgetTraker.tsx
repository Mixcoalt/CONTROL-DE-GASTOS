import AmountDisplay from "./AmountDisplay";
import { useBodget } from "../hooks/useBodget";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetTraker() {
    const { state, totalExpense, remainingBudget, dispatch } = useBodget()

    const porcentage = +((totalExpense / state.budget) * 100).toFixed(2)



  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className=" flex justify-center">
            <CircularProgressbar
                value={porcentage}
                styles={buildStyles({
                    pathColor: porcentage === 100 ? '#d62626' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textSize: 8,
                    textColor: porcentage === 100 ? '#d62626' : '#3B82F6'
                })}
                text={`${porcentage}% Gastado`}
            />
        </div>

        <div className=" flex flex-col justify-center items-center gap-8"> 
            <button
                type="button"
                className=" bg-pink-600 p-2 text-white uppercase font-bold
                rounded-lg w-full"
                onClick={()=> dispatch({type: 'Restore-App'})}
            >
                Resetear App
            </button>

            <AmountDisplay 
                label='Presupuesto'
                amount={state.budget}
            />

            <AmountDisplay 
                label='Disponible'
                amount={remainingBudget}
            />

            <AmountDisplay 
                label='Gastado'
                amount={totalExpense}
            />
        </div>
    </div>
  )
}
