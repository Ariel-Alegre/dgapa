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
import Durango from './pages/SchoolProvinces/Durango';
import Guanajuato from './pages/SchoolProvinces/Guanajuato';
import Aguascalientes from './pages/SchoolProvinces/Aguascalientes';
import BajaCalifornia from './pages/SchoolProvinces/BajaCalifornia';
import BajaCaliforniaSur from './pages/SchoolProvinces/BajaCaliforniaSur';
import Campeche from './pages/SchoolProvinces/Campeche';
import Chiapas from './pages/SchoolProvinces/Chiapas';
import Chihuahua from './pages/SchoolProvinces/Chihuahua';
import CiudaddeMéxico from './pages/SchoolProvinces/CiudaddeMéxico';
import Coahuila from './pages/SchoolProvinces/Coahuila';
import Colima from './pages/SchoolProvinces/Colima';
import EstadodeMéxico from './pages/SchoolProvinces/EstadodeMéxico';
import Guerrero from './pages/SchoolProvinces/Guerrero';
import Hidalgo from './pages/SchoolProvinces/Hidalgo';
import Jalisco from './pages/SchoolProvinces/Jalisco';
import Michoacán from './pages/SchoolProvinces/Michoacán';
import Morelos from './pages/SchoolProvinces/Morelos';
import Nayarit from './pages/SchoolProvinces/Nayarit';
import NuevoLeón from './pages/SchoolProvinces/NuevoLeón';
import Oaxaca from './pages/SchoolProvinces/Oaxaca';
import Puebla from './pages/SchoolProvinces/Puebla';
import QuintanaRoo from './pages/SchoolProvinces/QuintanaRoo';
import SanLuisPotosí from './pages/SchoolProvinces/SanLuisPotosí';
import Sinaloa from './pages/SchoolProvinces/Sinaloa';
import Sonora from './pages/SchoolProvinces/Sonora';
import Tabasco from './pages/SchoolProvinces/Tabasco';
import Tamaulipas from './pages/SchoolProvinces/Tamaulipas';
import Tlaxcala from './pages/SchoolProvinces/Tlaxcala';
import Veracruz from './pages/SchoolProvinces/Veracruz';
import Yucatán from './pages/SchoolProvinces/Yucatán';
import Zacatecas from './pages/SchoolProvinces/Zacatecas';
import Login from './pages/Login';

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
        <Route path="/escuelas" element={<AllSchools/>} />
        <Route path="/escuelas-detalles/:schoolId" element={<SchoolDetails/>} />

        <Route path="/Aguascalientes" element={<Aguascalientes/>} />
        <Route path="/Baja-California" element={<BajaCalifornia/>} />
        <Route path="/Baja-California-Sur" element={<BajaCaliforniaSur/>} />
        <Route path="/Campeche" element={<Campeche/>} />
        <Route path="/Chiapas" element={<Chiapas/>} />
        <Route path="/Chihuahua" element={<Chihuahua/>} />
        <Route path="/Coahuila" element={<Coahuila/>} />
        <Route path="/Colima" element={<Colima/>} />
        <Route path="/Ciudad-de-México" element={<CiudaddeMéxico/>} />
        <Route path="/Guanajuato" element={<Guanajuato/>} />
        <Route path="/Guerrero" element={<Guerrero/>} />
        <Route path="/Hidalgo" element={<Hidalgo/>} />
        <Route path="/Jalisco" element={<Jalisco/>} />
        <Route path="/Estado-de-México" element={<EstadodeMéxico/>} />
        <Route path="/Michoacán" element={<Michoacán/>} />
        <Route path="/Morelos" element={<Morelos/>} />
        <Route path="/Nayarit" element={<Nayarit/>} />
        <Route path="/Nuevo-León" element={<NuevoLeón/>} />
        <Route path="/Oaxaca" element={<Oaxaca/>} />
        <Route path="/Puebla" element={<Puebla/>} />
        <Route path="/Quintana-Roo" element={<QuintanaRoo/>} />
        <Route path="/San-Luis-Potosí" element={<SanLuisPotosí/>} />
        <Route path="/Sinaloa" element={<Sinaloa/>} />
        <Route path="/Sonora" element={<Sonora/>} />
        <Route path="/Tabasco" element={<Tabasco/>} />
        <Route path="/Tamaulipas" element={<Tamaulipas/>} />
        <Route path="/Tlaxcala" element={<Tlaxcala/>} />
        <Route path="/Veracruz" element={<Veracruz/>} />
        <Route path="/Yucatán" element={<Yucatán/>} />
        <Route path="/Zacatecas" element={<Zacatecas/>} />
        <Route path="/Querétaro" element={<Queratero/>} />
        <Route path="/Durango" element={<Durango/>} />


        <Route path="/iniciar-sesión" element={<Login/>} />


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
