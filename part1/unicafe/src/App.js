import { useState } from 'react'

const Title = ({ title }) => {
  console.log('Rendering Title component'); // Added console log
  return <h1>{title}</h1> 
}

const Statistics = ({ stat }) => {
  console.log('Rendering Statistics component'); // Added console log
  return <h1>{stat}</h1> 
}

const StatisticLine = ({ text, count }) => {
  console.log('Rendering StatisticLine component'); // Added console log
  return (
    <tr>
      <td>{text}</td>
      <td>{count}</td>
    </tr>
  )
}

const Button = ({ handler, text }) => {
  console.log('Rendering Button component'); // Added console log
  return (
    <button onClick={handler}>{text}</button>
  )
}


const App = () => {

  console.log('Rendering App component'); // Added console log

  const title = "give feedback"
  const statistics = "statistics"

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const increaseGood = () => {
    console.log('Increase good')
    const updateGood = good + 1 
    setGood(updateGood)
    setAll(allClicks.concat('G'))
    setTotal(updateGood+neutral+bad)
    setAverage((updateGood-bad)/(updateGood+neutral+bad))
    setPositive(updateGood/(updateGood+neutral+bad)*100)
  }

  const increaseNeutral = () => {
    console.log('Increase neutral')
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    setAll(allClicks.concat('N'))
    setTotal(good+updateNeutral+bad)
    setAverage((good-bad)/(good+updateNeutral+bad))
    setPositive(good/(good+updateNeutral+bad)*100)
  }

  const increaseBad = () => {
    console.log('Increase bad')
    const updateBad = bad + 1
    setBad(updateBad)
    setAll(allClicks.concat('B'))
    setTotal(good+neutral+updateBad)
    setAverage((good-updateBad)/(good+neutral+updateBad))
    setPositive(good/(good+neutral+updateBad)*100)
  }

  const hasFeedback = allClicks.length>0

  return (
    <div>
      <Title title={title}/>
      <Button handler={increaseGood} text="good"/>
      <Button handler={increaseNeutral} text="neutral"/>
      <Button handler={increaseBad} text="bad"/>
      <Statistics stat={statistics}/>

      {hasFeedback && (
        <>
      <table>
        <tbody>
        <StatisticLine text="good" count={good}/>
        <StatisticLine text="neutral" count={neutral}/>
        <StatisticLine text="bad" count={bad}/>
        <StatisticLine text="all" count={total}/>
        <StatisticLine text="average" count={average}/>
        <StatisticLine text="positive" count={`${positive}%`} />
        </tbody>
      </table>
      </>
      )}

      {!hasFeedback && <div>No feedback given</div>}

    </div>
  )
}

export default App
