import './App.css';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Test from './pages/Test';
import Gallery from './pages/Gallery';
import Queratero from './pages/SchoolProvinces/Queretaro';
import Admin from './pages/Admin';
import FormSchool from './components/Admin/RegisterSchool';
import PostGallery from './components/Admin/PostGallery';
import AllSchools from './pages/AllSchools';
import UpdateSchool from './components/Admin/UpdateSchool';
import SchoolDetails from './pages/SchoolDetails';




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
        <Route path="/escuelas" element={<AllSchools/>} />
        <Route path="/escuelas-detalles/:schoolId" element={<SchoolDetails/>} />




        <Route path="/test" element={<Test/>} />

        <Route path="/administrar" element={<Admin/>} >
        <Route path="publicar-escuela" element={<FormSchool/>} />
        <Route path="actualizar-escuela" element={<UpdateSchool/>} />

        <Route path="publicar-galeria" element={<PostGallery/>} />

        </Route>




        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
