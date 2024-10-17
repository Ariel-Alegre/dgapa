import React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
const ModernSchoolDetails = ({ school }) => {

  const {schoolId} = useParams()
  const [detailsSchool, setDetailsSchool] = React.useState([]);

  const OneSchool = async() => {
    const response = await axios.get(`http://localhost:3001/api/detail-school/${schoolId}`);
    setDetailsSchool(response.data.data)
  
   }

   React.useEffect(() => {
    OneSchool()
  }, []);
  return (
    <div className="school-container">
      <header className="school-header">
        <h1>{detailsSchool?.name}</h1>
      </header>
      
      <section className="school-info">
        <div className="info-section">
          <h2>Datos Generales</h2>
          <p><strong>Dirección:</strong> {detailsSchool?.address}</p>
          <p><strong>Municipio:</strong> {detailsSchool?.municipality}</p>
          <p><strong>Código Postal:</strong> {detailsSchool?.postalCode}</p>
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

 {/*      <section className="school-convocations">
        <h2>Convocatorias</h2>
        <div className="convocations-grid">
          {detailsSchool?.convocations.map((convocation, index) => (
            <div key={index} className="convocation-card">
              <h3>{convocation.name}</h3>
              <a href={convocation.pdfLink} target="_blank" rel="noopener noreferrer" className="pdf-link">
                <button>Descargar PDF</button>
              </a>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default ModernSchoolDetails;
