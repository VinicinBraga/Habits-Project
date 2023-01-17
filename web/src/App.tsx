import Habit from './components/Habit';
import './styles/global.css'

function App() {
  return (
    <div className="App">
      <Habit completed={10} />
      <Habit completed={9}/>
      <Habit completed={8} />

    </div>
  )
}

export default App
