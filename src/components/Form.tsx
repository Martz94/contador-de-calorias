import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4} from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions } from "../reducer/activity-reducer"
import { ActivityState } from "../reducer/activity-reducer"

export type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}

const Form = ({dispatch, state} : FormProps) => {

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if(state.activeId){
      const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectedActivity)
    }
  }, [state.activeId])

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'categories'].includes(e.target.id)
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSumit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'save-activity', payload: { newActivity: activity}})
    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <form className=" my-8 space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSumit}>
      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="category" className=" font-bold">Categoria:</label>
        <select className=" border border-slate-300 p.2 rounded-lg w-full bg-white p-2"
          id="category"
          value={activity.category}
          onChange={handleChange}>
          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="name" className=" font-bold">Actividad:</label>
        <input
          id="name"
          type="text"
          className=" border border-slate-300 p-2 rounded-lg"
          placeholder="Ejemplo: Comida, ejercicio, jugo..."
          value={activity.name}
          onChange={handleChange}>
        </input>
      </div>

      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="calories" className=" font-bold">Calorias:</label>
        <input
          id="calories"
          type="number"
          className=" border border-slate-300 p-2 rounded-lg"
          placeholder="Ejemplo: 10, 50, 100..."
          value={activity.calories}
          onChange={handleChange}>
        </input>
      </div>

      <input
        type="submit"
        className=" bg-sky-800 haver:bg-sky-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg disabled:opacity-10"
        value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
        disabled={!isValidActivity()}>
      </input>
    </form>
  )
}

export default Form
