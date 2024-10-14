import './App.css';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Test from './pages/Test';



function App() {
  return (
    <div >
      <Router>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/contacto" element={<Contact/>} />
        <Route path="/test" element={<Test/>} />




        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
