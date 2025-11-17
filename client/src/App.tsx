
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./views/Header";
import HomePage from "./views/HomePage";
import './index.css'
import MyHabitsView from "./views/MyHabitsView";

function App() {


  return (
    <div>

      <Header />
      <Router>
        <Routes>
          <Route path="">
            <Route path="/" element={<HomePage />} />
            <Route path="/myHabits" element={<MyHabitsView />} />
            
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
