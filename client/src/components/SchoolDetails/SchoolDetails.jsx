import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Global } from "../../assets/utils/utils";

const SchoolDetails = () => {
  const {schoolId} = useParams()
  const [detailsSchool, setDetailsSchool] = React.useState([]);
  React.useEffect(() => {
    Global();
  }, []);
  const OneSchool = async() => {
    const response = await axios.get(`http://localhost:3001/api/detail-school/${schoolId}`);
    setDetailsSchool(response.data.data)
  
   }

   React.useEffect(() => {
    OneSchool()
  }, []);
  return (
    <div>
        <header id="header" class="header d-flex align-items-center fixed-top">
        <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <Link to="/" class="logo d-flex align-items-center">
            <img src={require("../../assets/img/logo-removebg.png")} alt="" />
          </Link>

          <nav id="navmenu" class="navmenu">
            <ul>
              <li>
                <Link to="/" >
                  Princípal
                </Link>
              </li>
              <li>
                <Link to="/acerca">Nosotros</Link>
              </li>
              <li>
                <Link to="/galeria">Galeria</Link>
              </li>
              <li>
                <Link to="/contacto">Contacto</Link>
              </li>
            </ul>
            <i class="mobile-nav-toggle d-xl-none bi bi-list">
              <BsList />
            </i>
          </nav>
        </div>
      </header>
    <div className="school-container">
      
    <header className="school-header">
      <h1>{detailsSchool?.name}</h1>
    </header>
    
    <section className="school-info">
      <div className="info-section">
        <h2>Datos Generales</h2>
     <p><strong>Provincia:</strong> {detailsSchool?.province}</p> 

        <p><strong>Dirección:</strong> {detailsSchool?.address}</p>
{/*         <p><strong>Municipio:</strong> {detailsSchool?.municipality}</p> */}
        {/* <p><strong>Código Postal:</strong> {detailsSchool?.postalCode}</p> */}
        <p><strong>Email:</strong> <a href={`mailto:${detailsSchool?.email}`}>{detailsSchool?.email}</a></p>
        <p><strong>Año de Fundación:</strong> {detailsSchool?.foundationYear}</p>
        <p><strong>Teléfonos:</strong> {detailsSchool?.phone}</p>
      </div>
      
      <div className="map-section">
        <iframe 
          title="school-location" 
          src={detailsSchool?.mapLink} 
          frameBorder="0" 
          style={{ border: 0 }}
          allowFullScreen 
        ></iframe>
      </div>
    </section>

     <section className="school-convocations">
      <h2>Convocatorias</h2>
      <div className="convocations-grid">
          <div className="convocation-card">
            <h3>asdasdasd</h3>
            <a href="/" target="_blank" rel="noopener noreferrer" className="pdf-link">
              <button>Descargar PDF</button>
            </a>
          </div>
      </div>
    </section>
  </div>
  </div>

  );
};

export default SchoolDetails;
