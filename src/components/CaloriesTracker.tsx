import { useMemo } from "react"
import type {Activity} from "../types"
import CaloriesTotal from "./CaloriesTotal"

type CaloriesTrackerProps = {
    activities: Activity[]
}

const CaloriesTracker = ({activities}: CaloriesTrackerProps) => {

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.
    category === 1 ? total + +activity.calories : total, 0), [activities])

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.
    category === 2 ? total + +activity.calories : total, 0), [activities])

    const totalCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])
  return (
    <>
      <h2 className=" text-4xl font-black text-slate-600 text-center">Resumen de Calorias</h2>
      <div className=" text-black block justify-between gap-5 mt-10">
        <CaloriesTotal
          calories = {caloriesConsumed}

          text = 'consumidas'
        />
       <CaloriesTotal
          calories = {caloriesBurned}
          text = 'Ejercicio'
        />
         <CaloriesTotal
          calories = {totalCalories}
          text = 'Diferencia'
        />
      </div>   
    </>
  )
}

export default CaloriesTracker
