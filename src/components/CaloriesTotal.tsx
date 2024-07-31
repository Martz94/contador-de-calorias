type CaloriesTotalprops = {
    calories: number
    text: string
}

const CaloriesTotal = ({calories, text} : CaloriesTotalprops) => {
  return (
    <div>
      <p className=" text-slate-600 font-bold rounded-full grid grid-cols-1 gap-3 text-center">
          <span className=" font-black text-6xl text-orange">{calories}</span>
          {text}
        </p>
    </div>
  )
}

export default CaloriesTotal
