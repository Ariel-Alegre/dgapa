import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { FormRegister } from "../../redux/action";

const RegisterSchool = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    year_of_operation: "",
    province: "",
    sic: "",
    postgrado1: "",
    postgrado2: "",
    beca1: "",
    beca2: "",
    alumnos: [],
    egresados: [],
    doctoresJubilados: [],
    doctoresCandidatos: [],
    profesores: [],
    profesoresMaestrias: [],
    profesoresConDoctorados: [],
    plantel1: null,
    plantel2: null,
    plantel3: null,
    image: null,
    profesoresTemporales: [],
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loadingSuccess, setLoadingSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatearFechaLatina = (fecha) => {
    const fechaObj = new Date(fecha);
    const dia = String(fechaObj.getDate()).padStart(2, "0");
    const mes = String(fechaObj.getMonth() + 1).padStart(2, "0");
    const anio = fechaObj.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToList = (type, item) => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], item],
    }));
  };

  const handleDeleteFromList = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSuccess(true);

    try {
      const date = new Date(formData.year_of_operation);
      const formattedDate = `${String(date.getDate()).padStart(
        2,
        "0"
      )}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

      const data = new FormData();
      data.append("name", formData.name);
      data.append("address", formData.address);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("year_of_operation", formattedDate);
      data.append("province", formData.province);
      data.append("sic", formData.sic);
      data.append("postgrado1", formData.postgrado1);
      data.append("postgrado2", formData.postgrado2);
      data.append("beca1", formData.beca1);
      data.append("beca2", formData.beca2);
      if (formData.alumnos) {
        data.append("alumnos", JSON.stringify(formData.alumnos));
      }
      if (formData.egresados) {
        data.append("egresados", JSON.stringify(formData.egresados));
      }
      if (formData.doctoresJubilados) {
        data.append(
          "doctoresJubilados",
          JSON.stringify(formData.doctoresJubilados)
        );
      }
      if (formData.doctoresCandidatos) {
        data.append(
          "doctoresCandidatos",
          JSON.stringify(formData.doctoresCandidatos)
        );
      }
      if (formData.profesores) {
        data.append("profesores", JSON.stringify(formData.profesores));
      }
      if (formData.profesoresMaestrias) {
        data.append(
          "profesoresMaestrias",
          JSON.stringify(formData.profesoresMaestrias)
        );
      }
      if (formData.profesoresConDoctorados) {
        data.append(
          "profesoresConDoctorados",
          JSON.stringify(formData.profesoresConDoctorados)
        );
      }

      if (formData.image) {
        data.append("image", formData.image);
      }
      if (formData.plantel1) {
        data.append("plantel1", formData.plantel1);
      }
      if (formData.plantel2) {
        data.append("plantel2", formData.plantel2);
      }
      if (formData.plantel3) {
        data.append("plantel3", formData.plantel3);
      }
     await dispatch(FormRegister(data));
      // Envía los datos (descomentar esto una vez que todo esté correcto)

      alert("Escuela registrada con éxito!");
    } catch (error) {
      console.error("Error al registrar la escuela:", error); // Log del error
      alert("Hubo un error al registrar la escuela.");
    } finally {
      setLoadingSuccess(false);
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        year_of_operation: "",
        province: "",
        sic: "",
        postgrado1: "",
        postgrado2: "",
        beca1: "",
        beca2: "",
        alumnos: [],
        egresados: [],
        doctoresJubilados: [],
        doctoresCandidatos: [],
        profesores: [],
        profesoresMaestrias: [],
        profesoresConDoctorados: [],
        plantel1: null,
        plantel2: null,
        plantel3: null,
        image: null,
      });

      setPreviewImage(null);
    }
  };

  const handleAddAlumnos = (e) => {
    e.preventDefault();
    const { fechaDesdeAlumnos, fechaHastaAlumnos, cantidadAlumnos } = formData;
    if (fechaDesdeAlumnos && fechaHastaAlumnos && cantidadAlumnos) {
      handleAddToList("alumnos", { fechaDesdeAlumnos, fechaHastaAlumnos, cantidadAlumnos });
      setFormData((prev) => ({
        ...prev,
        fechaDesdeAlumnos: "",
        fechaHastaAlumnos: "",
        cantidadAlumnos: "",
      }));
    }
  };

  const handleAddEgresados = (e) => {
    e.preventDefault();
    const { fechaDesdeEgresados, fechaHastaEgresados, cantidadAlumnos } = formData;
    if (fechaDesdeEgresados && fechaHastaEgresados && cantidadAlumnos) {
      handleAddToList("egresados", { fechaDesdeEgresados, fechaHastaEgresados, cantidadAlumnos });
      setFormData((prev) => ({
        ...prev,
        fechaDesdeEgresados: "",
        fechaHastaEgresados: "",
        cantidadAlumnos: "",
      }));
    }
  };

  const handleAddDocotorJubilados = (e) => {
    e.preventDefault();
    const { doctor } = formData;
    if (doctor) {
      handleAddToList("doctoresJubilados", { doctor });
      setFormData((prev) => ({ ...prev, doctor: "" }));
    }
  };
  const handleAddDoctorCandidatos = (e) => {
    e.preventDefault();
    const { doctorCandidato } = formData;
    if (doctorCandidato) {
      handleAddToList("doctoresCandidatos", { doctorCandidato });
      setFormData((prev) => ({ ...prev, doctorCandidato: "" }));
    }
  };
  const handleAddProfesor = () => {
    const { textProfeactuales } = formData;
  
    if (textProfeactuales.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        profesoresTemporales: [...prev.profesoresTemporales, textProfeactuales], // Añade al array temporal
        textProfeactuales: "", // Limpia el input
      }));
    }
  };
  
  const handleAddProfesoresActuales = (e) => {
    e.preventDefault();
    const { fechaDesde, fechaHasta, profesoresTemporales } = formData;
  
    if (fechaDesde && fechaHasta && profesoresTemporales.length > 0) {
      // Añadir un nuevo registro con las fechas y los profesores
      setFormData((prev) => ({
        ...prev,
        profesores: [
          ...prev.profesores,
          {
            fechaDesde,
            fechaHasta,
            textProfeactuales: [...profesoresTemporales], // Copiar los profesores temporales
          },
        ],
        // Limpiar campos de fecha y la lista de profesores temporales
        fechaDesde: "",
        fechaHasta: "",
        profesoresTemporales: [], 
      }));
    }
  };
  
  

  const handleAddProfesoresMaestria = (e) => {
    e.preventDefault();
    const { fechaDesde, fechaHasta, textProfemaestria } = formData;
    if (fechaDesde && fechaHasta && textProfemaestria) {
      handleAddToList("profesoresMaestrias", {
        fechaDesde,
        fechaHasta,
        textProfemaestria,
      });
      setFormData((prev) => ({
        ...prev,
        fechaDesde: "",
        fechaHasta: "",
        textProfemaestria: "",
      }));
    }
  };

  const handleAddProfesoresDoctorado = (e) => {
    e.preventDefault();
    const { fechaDesde, fechaHasta, cantidadMaestros } = formData;
    if (fechaDesde && fechaHasta && cantidadMaestros) {
      handleAddToList("profesoresConDoctorados", {
        fechaDesde,
        fechaHasta,
        cantidadMaestros,
      });
      setFormData((prev) => ({
        ...prev,
        fechaDesde: "",
        fechaHasta: "",
        cantidadMaestros: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };
  return (
    <form onSubmit={handleSubmit} className="responsive-form">
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Dirección:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Teléfono:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Año de operación:</label>
        <input
          type="date" // Cambiado a tipo "text" para permitir el formato
          name="year_of_operation"
          value={formData.year_of_operation}
          onChange={handleInputChange}
          placeholder="dd/mm/aaaa" // Placeholder para indicar el formato esperado
        />
      </div>
      <div className="form-group">
        <label>Provincia:</label>
        <select
          name="province"
          value={formData.province}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccionar Provincia</option>
          <option value="Aguascalientes">Aguascalientes</option>
          <option value="Baja California">Baja California</option>
          <option value="Baja California Sur">Baja California Sur</option>
          <option value="Campeche">Campeche</option>
          <option value="Chiapas">Chiapas</option>
          <option value="Chihuahua">Chihuahua</option>
          <option value="Coahuila de Zaragoza">Coahuila de Zaragoza</option>
          <option value="Colima">Colima</option>
          <option value="Durango">Durango</option>
          <option value="Guanajuato">Guanajuato</option>
          <option value="Guerrero">Guerrero</option>
          <option value="Hidalgo">Hidalgo</option>
          <option value="Jalisco">Jalisco</option>
          <option value="Estado de México">Estado de México</option>
          <option value="Michoacán de Ocampo">Michoacán de Ocampo</option>
          <option value="Morelos">Morelos</option>
          <option value="Nayarit">Nayarit</option>
          <option value="Nuevo León">Nuevo León</option>
          <option value="Oaxaca">Oaxaca</option>
          <option value="Puebla">Puebla</option>
          <option value="Querétaro">Querétaro</option>
          <option value="Quintana Roo">Quintana Roo</option>
          <option value="San Luis Potosí">San Luis Potosí</option>
          <option value="Sinaloa">Sinaloa</option>
          <option value="Sonora">Sonora</option>
          <option value="Tabasco">Tabasco</option>
          <option value="Tamaulipas">Tamaulipas</option>
          <option value="Tlaxcala">Tlaxcala</option>
          <option value="Veracruz de Ignacio de la Llave">
            Veracruz de Ignacio de la Llave
          </option>
          <option value="Yucatán">Yucatán</option>
          <option value="Zacatecas">Zacatecas</option>
        </select>
      </div>
      <div className="form-group">
        <label>SIC:</label>
        <input
          type="text" // Cambiado a tipo "text" para permitir el formato
          name="sic"
          value={formData.sic}
          onChange={handleInputChange}
          placeholder="sic" // Placeholder para indicar el formato esperado
        />
      </div>
      <div className="form-group">
        <label>Enlace del primer postgrado:</label>
        <input
          type="text" // Cambiado a tipo "text" para permitir el formato
          name="postgrado1"
          value={formData.postgrado1}
          onChange={handleInputChange}
          placeholder="enlace del postgrado" // Placeholder para indicar el formato esperado
        />
      </div>
      <div className="form-group">
        <label>Enlace del segundo postgrado:</label>
        <input
          type="text" // Cambiado a tipo "text" para permitir el formato
          name="postgrado2"
          value={formData.postgrado2}
          onChange={handleInputChange}
          placeholder="enlace del postgrado" // Placeholder para indicar el formato esperado
        />
      </div>

      <div className="form-group">
        <label>Enlace de la primera beca:</label>
        <input
          type="text" // Cambiado a tipo "text" para permitir el formato
          name="beca1"
          value={formData.beca1}
          onChange={handleInputChange}
          placeholder="enlace del postgrado" // Placeholder para indicar el formato esperado
        />
      </div>

      <div className="form-group">
        <label>Enlace de la segunda beca:</label>
        <input
          type="text" // Cambiado a tipo "text" para permitir el formato
          name="beca2"
          value={formData.beca2}
          onChange={handleInputChange}
          placeholder="enlace del postgrado" // Placeholder para indicar el formato esperado
        />
      </div>
      <h2>Alumnos matriculados</h2>
      <input
        type="date"
        name="fechaDesdeAlumnos"
        value={formData.fechaDesdeAlumnos}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="fechaHastaAlumnos"
        value={formData.fechaHastaAlumnos}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="cantidadAlumnos"
        value={formData.cantidadAlumnos}
        onChange={handleInputChange}
      />
      <button onClick={handleAddAlumnos}>Agregar</button>
      <ul className="record-list">
        {formData.alumnos.map((registro, index) => (
          <li key={index}>
            <span>{`Desde: ${registro.fechaDesdeAlumnos}, Hasta: ${registro.fechaHastaAlumnos}, Cantidad: ${registro.cantidadAlumnos}`}</span>
            <button onClick={() => handleDeleteFromList("alumnos", index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h2>Egresados y titulados</h2>
      <input
        type="date"
        name="fechaDesdeEgresados"
        value={formData.fechaDesdeEgresados}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="fechaHastaEgresados"
        value={formData.fechaHastaEgresados}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="cantidadAlumnos"
        value={formData.cantidadAlumnos}
        onChange={handleInputChange}
      />
      <button onClick={handleAddEgresados}>Agregar</button>
      <ul className="record-list">
        {formData.egresados.map((registro, index) => (
          <li key={index}>
            <span>{`Desde: ${registro.fechaDesdeEgresados}, Hasta: ${registro.fechaHastaEgresados}, Cantidad: ${registro.cantidadAlumnos}`}</span>
            <button onClick={() => handleDeleteFromList("egresados", index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <h2>Lista de profesores actual</h2>
  
  {/* Input de fechas */}
  <input
    type="text"
    name="fechaDesde"
    value={formData.fechaDesde}
    onChange={handleInputChange}
    placeholder="Fecha Desde"
  />
  <input
    type="text"
    name="fechaHasta"
    value={formData.fechaHasta}
    onChange={handleInputChange}
    placeholder="Fecha Hasta"
  />
    
  {/* Campo para agregar un profesor */}
  <input
    type="text"
    name="textProfeactuales"
    value={formData.textProfeactuales}
    onChange={handleInputChange}
    placeholder="Nombre del Profesor"
  />
  
  {/* Botón para agregar profesor temporalmente */}
  <button type="button" onClick={handleAddProfesor}>Agregar Profesor</button>
  
  {/* Lista temporal de profesores */}
  <ul>
    {formData.profesoresTemporales && formData.profesoresTemporales.map((profe, i) => (
      <li key={i}>{`Profesor: ${profe}`}</li>
    ))}
  </ul>
  
  {/* Botón para agregar el registro completo */}
  <button onClick={handleAddProfesoresActuales}>Agregar Registro</button>
  
  {/* Lista de registros finales */}
  <ul className="record-list">
    {formData.profesores.map((registro, index) => (
      <li key={index}>
        <span>{`Desde: ${registro.fechaDesde}, Hasta: ${registro.fechaHasta}`}</span>
        <ul>
          {registro.textProfeactuales.map((profe, i) => (
            <li key={i}>{`Profesor: ${profe}`}</li>
          ))}
        </ul>
        <button onClick={() => handleDeleteFromList("profesores", index)}>
          Eliminar
        </button>
      </li>
    ))}
  </ul>
  

      <h2>Lista de profesores con maestrias</h2>
      <input
        type="date"
        name="fechaDesde"
        value={formData.fechaDesde}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="fechaHasta"
        value={formData.fechaHasta}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="textProfemaestria"
        value={formData.textProfemaestria}
        onChange={handleInputChange}
      />
      <button onClick={handleAddProfesoresMaestria}>Agregar</button>
      <ul className="record-list">
        {formData.profesoresMaestrias.map((registro, index) => (
          <li key={index}>
            <span>{`Desde: ${registro.fechaDesde}, Hasta: ${registro.fechaHasta}, profesor: ${registro.textProfemaestria}`}</span>
            <button
              onClick={() => handleDeleteFromList("profesoresMaestrias", index)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h2>Lista de profesores con doctorados</h2>
      <input
        type="date"
        name="fechaDesde"
        value={formData.fechaDesde}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="fechaHasta"
        value={formData.fechaHasta}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="cantidadMaestros"
        value={formData.cantidadMaestros}
        onChange={handleInputChange}
      />
      <button onClick={handleAddProfesoresDoctorado}>Agregar</button>
      <ul className="record-list">
        {formData.profesoresConDoctorados.map((registro, index) => (
          <li key={index}>
            <span>{`Desde: ${registro.fechaDesde}, Hasta: ${registro.fechaHasta}, Cantidad: ${registro.cantidadMaestros}`}</span>
            <button
              onClick={() =>
                handleDeleteFromList("profesoresConDoctorados", index)
              }
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h2>Doctores jubilados</h2>
      <input
        type="data"
        name="doctor"
        value={formData.doctor}
        onChange={handleInputChange}
      />
      <button onClick={handleAddDocotorJubilados}>Agregar</button>
      <ul className="record-list">
        {formData.doctoresJubilados.map((registro, index) => (
          <li key={index}>
            <span>{` ${registro.doctor}`}</span>
            <button
              onClick={() => handleDeleteFromList("doctoresJubilados", index)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h2>Doctores candidatos</h2>
      <input
        type="data"
        name="doctorCandidato"
        value={formData.doctorCandidato}
        onChange={handleInputChange}
      />
      <button onClick={handleAddDoctorCandidatos}>Agregar</button>
      <ul className="record-list">
        {formData.doctoresCandidatos.map((registro, index) => (
          <li key={index}>
            <span>{` ${registro.doctorCandidato}`}</span>
            <button
              onClick={() => handleDeleteFromList("doctoresCandidatos", index)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      {/* Repite la misma estructura para egresados, doctores y profesores */}

      <div>
        <label>PDF 1:</label>
        <input
          type="file"
          name="plantel1"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <label>PDF 2:</label>
        <input
          type="file"
          name="plantel2"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <label>PDF 3:</label>
        <input
          type="file"
          name="plantel3"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>
      <div className="form-group">
        <label>Subir imagen:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {previewImage && (
        <div className="preview-image">
          <p>Vista previa de la imagen:</p>
          <img src={previewImage} alt="Vista previa" />
        </div>
      )}
      <button type="submit">
        {loadingSuccess ? (
          <CircularProgress size={25} thickness={5} sx={{ color: "#fff" }} />
        ) : (
          "Registrarse"
        )}
      </button>
    </form>
  );
};

export default RegisterSchool;
