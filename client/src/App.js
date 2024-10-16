import './App.css';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Test from './pages/Test';
import Gallery from './pages/Gallery';
import Queratero from './pages/SchoolProvinces/Queretaro';



function App() {
  return (
    <div >
      <Router>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/acerca" element={<About/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/contacto" element={<Contact/>} />
        <Route path="/galeria" element={<Gallery/>} />
        <Route path="/queretaro" element={<Queratero/>} />


        <Route path="/test" element={<Test/>} />




        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
