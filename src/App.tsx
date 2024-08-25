import { useReducer, useEffect, useMemo} from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducer/activity-reducer"
import ActivityList from "./components/ActivityList"
import CaloriesTracker from "./components/CaloriesTracker"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])

  return (
    <>
      <header className=" bg-sky-800 py-5 px-2">
        <div className=" max-w-4xl mx-auto my-3 flex justify-between items-center">
          <h1 className=" text-center text-lg font-bold text-white
           uppercase">
            Contador de calorias
          </h1>
          <button
          className=" bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase
           text-white cursor-pointer rounded-xl text-sm disabled:opacity-50"
             disabled={!canRestartApp()}
             onClick={ ()=> dispatch({type: 'restart-app'})}>
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="py-0 px-5">
        <div className=" max-w-4xl mx-auto">
          <Form
            dispatch={dispatch} 
            state={state}/>
        </div>
      </section>

      <section className=" block sm:flex py-3  mx-auto max-w-4xl">
        <div>
        <ActivityList
         activities={state.activities} 
         dispatch={dispatch}/>
        </div>
        <div className=" p-auto max-w-4xl mx-auto ">
            <CaloriesTracker
                activities={state.activities}/>
        </div>
      </section>
    </>
  )
}

export default App
