import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


//components:
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <h1>Hello</h1>
    </div>
    </Router>
  );
}

export default App;
