import './App.css'
import BaristaForm from './Components/BaristaForm';
import Grinder from './assets/Grinder.png'

function App() {

  return (
    <>
    <img src={Grinder} alt="Grinder" className="grinder"/>
    <div className="title-container">
      <h1>On My Grind</h1>
      <p>So you think you can barista? Let's put that to the test...</p>
    </div>
      <BaristaForm />
    </>
  )
}

export default App
