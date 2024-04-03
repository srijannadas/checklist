import { useState } from 'react'
import './App.css'
import Form from './component/Form/Form'

function App() {
  const [count, setCount] = useState(0)
  const leftLabels = ["Comment should be shown", "Include Score", "Take photos from camera"];
  const rightLabels = ["is the question marked as critical", "is mandatory"];
  

  return (
    <>
       <Form leftLabels={leftLabels} rightLabels={rightLabels}/>
      
    </>
  )
}

export default App
