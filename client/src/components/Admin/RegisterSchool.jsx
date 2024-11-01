import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { FormRegister } from "../../redux/action";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
const RegisterSchool = () => {
  const dispatch = useDispatch();
  const autocompleteRef = useRef(null); // Referencia para el Autocomplete

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    year_of_operation: "",
    province: "",
    sic: "",
    urlYoutube: "",

    postgrado1: "",
    postgrado2: "",
    beca1: "",
    beca2: "",
    alumnos: [],
    alumnas: [],

    egresados: [],
    egresadas: [],

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
    profesoresTemporalesMaestria: [],
    profesoresTemporalesDoctorado: [],
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
      data.append("urlYoutube", formData.urlYoutube);

      data.append("postgrado1", formData.postgrado1);
      data.append("postgrado2", formData.postgrado2);
      data.append("beca1", formData.beca1);
      data.append("beca2", formData.beca2);
      if (formData.alumnos) {
        data.append("alumnos", JSON.stringify(formData.alumnos));
      }
      if (formData.alumnas) {
        data.append("alumnas", JSON.stringify(formData.alumnas));
      }
      if (formData.egresados) {
        data.append("egresados", JSON.stringify(formData.egresados));
      }

      if (formData.egresadas) {
        data.append("egresadas", JSON.stringify(formData.egresadas));
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
      handleAddToList("alumnos", {
        fechaDesdeAlumnos,
        fechaHastaAlumnos,
        cantidadAlumnos,
      });
      setFormData((prev) => ({
        ...prev,
        fechaDesdeAlumnos: "",
        fechaHastaAlumnos: "",
        cantidadAlumnos: "",
      }));
    }
  };

  const handleAddAlumnas = (e) => {
    e.preventDefault();
    const { fechaDesdeAlumnas, fechaHastaAlumnas, cantidadAlumnas } = formData;
    if (fechaDesdeAlumnas && fechaHastaAlumnas && cantidadAlumnas) {
      handleAddToList("alumnas", {
        fechaDesdeAlumnas,
        fechaHastaAlumnas,
        cantidadAlumnas,
      });
      setFormData((prev) => ({
        ...prev,
        fechaDesdeAlumnas: "",
        fechaHastaAlumnas: "",
        cantidadAlumnas: "",
      }));
    }
  };

  const handleAddEgresados = (e) => {
    e.preventDefault();
    const {
      fechaDesdeEgresados,
      fechaHastaEgresados,
      cantidadAlumnosEgresados,
    } = formData;
    if (
      fechaDesdeEgresados &&
      fechaHastaEgresados &&
      cantidadAlumnosEgresados
    ) {
      handleAddToList("egresados", {
        fechaDesdeEgresados,
        fechaHastaEgresados,
        cantidadAlumnosEgresados,
      });
      setFormData((prev) => ({
        ...prev,
        fechaDesdeEgresados: "",
        fechaHastaEgresados: "",
        cantidadAlumnosEgresados: "",
      }));
    }
  };

  const handleAddEgresadas = (e) => {
    e.preventDefault();
    const {
      fechaDesdeEgresadas,
      fechaHastaEgresadas,
      cantidadAlumnasEgresadas,
    } = formData;
    if (
      fechaDesdeEgresadas &&
      fechaHastaEgresadas &&
      cantidadAlumnasEgresadas
    ) {
      handleAddToList("egresadas", {
        fechaDesdeEgresadas,
        fechaHastaEgresadas,
        cantidadAlumnasEgresadas,
      });
      setFormData((prev) => ({
        ...prev,
        fechaDesdeEgresadas: "",
        fechaHastaEgresadas: "",
        cantidadAlumnasEgresadas: "",
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
  const handleAddProfesorMaestria = () => {
    const { textProfeMaestria } = formData;

    if (textProfeMaestria.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        profesoresTemporalesMaestria: [
          ...prev.profesoresTemporalesMaestria,
          textProfeMaestria,
        ], // Añade al array temporal
        textProfeMaestria: "", // Limpia el input
      }));
    }
  };
  const handleProfesoresMaestria = (e) => {
    e.preventDefault();
    const {
      fechaDesdeMaestria,
      fechaHastaMaestria,
      profesoresTemporalesMaestria,
    } = formData;

    if (
      fechaDesdeMaestria &&
      fechaHastaMaestria &&
      profesoresTemporalesMaestria.length > 0
    ) {
      // Añadir un nuevo registro con las fechas y los profesores
      setFormData((prev) => ({
        ...prev,
        profesoresMaestrias: [
          ...prev.profesoresMaestrias,
          {
            fechaDesdeMaestria,
            fechaHastaMaestria,
            textProfeMaestria: [...profesoresTemporalesMaestria], // Copiar los profesores temporales
          },
        ],
        // Limpiar campos de fecha y la lista de profesores temporales
        fechaDesdeMaestria: "",
        fechaHastaMaestria: "",
        profesoresTemporalesMaestria: [],
      }));
    }
  };

  const handleAddProfesorDoctorado = () => {
    const { textProfeDoctorado } = formData;

    if (textProfeDoctorado.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        profesoresTemporalesDoctorado: [
          ...prev.profesoresTemporalesDoctorado,
          textProfeDoctorado,
        ], // Añade al array temporal
        textProfeDoctorado: "", // Limpia el input
      }));
    }
  };
  const handleProfesoresDoctorado = (e) => {
    e.preventDefault();
    const {
      fechaDesdeDoctorado,
      fechaHastaDoctorado,
      profesoresTemporalesDoctorado,
    } = formData;

    if (
      fechaDesdeDoctorado &&
      fechaHastaDoctorado &&
      profesoresTemporalesDoctorado.length > 0
    ) {
      // Añadir un nuevo registro con las fechas y los profesores
      setFormData((prev) => ({
        ...prev,
        profesoresConDoctorados: [
          ...prev.profesoresConDoctorados,
          {
            fechaDesdeDoctorado,
            fechaHastaDoctorado,
            textProfeDoctorado: [...profesoresTemporalesDoctorado], // Copiar los profesores temporales
          },
        ],
        // Limpiar campos de fecha y la lista de profesores temporales
        fechaDesdeDoctorado: "",
        fechaHastaDoctorado: "",
        profesoresTemporalesDoctorado: [],
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

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (place?.geometry) {
        const addressComponents = place.address_components;
        if (addressComponents) {
          setFormData({
            ...formData,
            address: place.formatted_address,
          });
        } else {
          console.error("No se pudo obtener los componentes de la dirección.");
        }
      } else {
        console.error("No se pudo obtener la información de geometría.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="responsive-form">
      <div className="form-group">
        <label>Nombre de la escuela:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Dirección:</label>
        <LoadScript
          googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
          libraries={["places"]} // Necesario para usar Autocomplete
        >
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Autocomplete>
        </LoadScript>
      </div>

      <div className="form-group">
        <label>Teléfono:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Telefóno" // Placeholder para indicar el formato esperado

        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Correo electrónico" // Placeholder para indicar el formato esperado

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
        <label>Enlace de youtube:</label>
        <input
          type="text" // Cambiado a tipo "text" para permitir el formato
          name="urlYoutube"
          value={formData.urlYoutube}
          onChange={handleInputChange}
          placeholder="Enlace de youtube" // Placeholder para indicar el formato esperado
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
        type="text"
        name="fechaDesdeAlumnos"
        value={formData.fechaDesdeAlumnos}
        onChange={handleInputChange}
        placeholder="Fecha Desde" // Placeholder para indicar el formato esperado

      />
      <input
        type="text"
        name="fechaHastaAlumnos"
        value={formData.fechaHastaAlumnos}
        onChange={handleInputChange}
        placeholder="Fecha Hasta" // Placeholder para indicar el formato esperado

      />
      <input
        type="number"
        name="cantidadAlumnos"
        value={formData.cantidadAlumnos}
        onChange={handleInputChange}
        placeholder="Cantidad" // Placeholder para indicar el formato esperado

      />
      <button onClick={handleAddAlumnos}>Agregar</button>
      <ul className="record-list">
        {formData.alumnos &&
          formData.alumnos.map((registro, index) => (
            <li key={index}>
              <span>{`Desde: ${registro.fechaDesdeAlumnos}, Hasta: ${registro.fechaHastaAlumnos}, Cantidad: ${registro.cantidadAlumnos}`}</span>
              <button onClick={() => handleDeleteFromList("alumnos", index)}>
                Eliminar
              </button>
            </li>
          ))}
      </ul>

      <h2>Alumnas matriculadas</h2>
      <input
        type="text"
        name="fechaDesdeAlumnas"
        value={formData.fechaDesdeAlumnas}
        onChange={handleInputChange}
        placeholder="Fecha Desde" // Placeholder para indicar el formato esperado

      />
      <input
        type="text"
        name="fechaHastaAlumnas"
        value={formData.fechaHastaAlumnas}
        onChange={handleInputChange}
        placeholder="Fecha Hasta" // Placeholder para indicar el formato esperado

      />
      <input
        type="number"
        name="cantidadAlumnas"
        value={formData.cantidadAlumnas}
        onChange={handleInputChange}
        placeholder="Cantidad" // Placeholder para indicar el formato esperado

      />
      <button onClick={handleAddAlumnas}>Agregar</button>
      <ul className="record-list">
        {formData.alumnas &&
          formData.alumnas.map((registro, index) => (
            <li key={index}>
              <span>{`Desde: ${registro.fechaDesdeAlumnas}, Hasta: ${registro.fechaHastaAlumnas}, Cantidad: ${registro.cantidadAlumnas}`}</span>
              <button onClick={() => handleDeleteFromList("alumnas", index)}>
                Eliminar
              </button>
            </li>
          ))}
      </ul>

      <h2>Egresados y titulados</h2>
      <input
        type="text"
        name="fechaDesdeEgresados"
        value={formData.fechaDesdeEgresados}
        onChange={handleInputChange}
        placeholder="Fecha Desde" // Placeholder para indicar el formato esperado

      />
      <input
        type="text"
        name="fechaHastaEgresados"
        value={formData.fechaHastaEgresados}
        onChange={handleInputChange}
        placeholder="Fecha Hasta" // Placeholder para indicar el formato esperado

      />
      <input
        type="number"
        name="cantidadAlumnosEgresados"
        value={formData.cantidadAlumnosEgresados}
        onChange={handleInputChange}
        placeholder="Cantidad" // Placeholder para indicar el formato esperado

      />
      <button onClick={handleAddEgresados}>Agregar</button>
      <ul className="record-list">
        {formData.egresados.map((registro, index) => (
          <li key={index}>
            <span>{`Desde: ${registro.fechaDesdeEgresados}, Hasta: ${registro.fechaHastaEgresados}, Cantidad: ${registro.cantidadAlumnosEgresados}`}</span>
            <button onClick={() => handleDeleteFromList("egresados", index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h2>Egresadas y tituladas</h2>
      <input
        type="text"
        name="fechaDesdeEgresadas"
        value={formData.fechaDesdeEgresadas}
        onChange={handleInputChange}
        placeholder="Fecha Desde" // Placeholder para indicar el formato esperado

      />
      <input
        type="text"
        name="fechaHastaEgresadas"
        value={formData.fechaHastaEgresadas}
        onChange={handleInputChange}
        placeholder="Fecha Hasta" // Placeholder para indicar el formato esperado

      />
      <input
        type="number"
        name="cantidadAlumnasEgresadas"
        value={formData.cantidadAlumnasEgresadas}
        onChange={handleInputChange}
        placeholder="Cantidad" // Placeholder para indicar el formato esperado

      />
      <button onClick={handleAddEgresadas}>Agregar</button>
      <ul className="record-list">
        {formData.egresadas.map((registro, index) => (
          <li key={index}>
            <span>{`Desde: ${registro.fechaDesdeEgresadas}, Hasta: ${registro.fechaHastaEgresadas}, Cantidad: ${registro.cantidadAlumnasEgresadas}`}</span>
            <button onClick={() => handleDeleteFromList("egresadas", index)}>
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
      <button type="button" onClick={handleAddProfesor}>
        Agregar Profesor
      </button>

      {/* Lista temporal de profesores */}
      <ul>
        {formData.profesoresTemporales &&
          formData.profesoresTemporales.map((profe, i) => (
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

      {/* Input de fechas */}
      <input
        type="text"
        name="fechaDesdeMaestria"
        value={formData.fechaDesdeMaestria}
        onChange={handleInputChange}
        placeholder="Fecha Desde"
      />
      <input
        type="text"
        name="fechaHastaMaestria"
        value={formData.fechaHastaMaestria}
        onChange={handleInputChange}
        placeholder="Fecha Hasta"
      />

      {/* Campo para agregar un profesor */}
      <input
        type="text"
        name="textProfeMaestria"
        value={formData.textProfeMaestria}
        onChange={handleInputChange}
        placeholder="Nombre del Profesor"
      />

      {/* Botón para agregar profesor temporalmente */}
      <button type="button" onClick={handleAddProfesorMaestria}>
        Agregar Profesor
      </button>

      {/* Lista temporal de profesores */}
      <ul>
        {formData.profesoresTemporalesMaestria &&
          formData.profesoresTemporalesMaestria.map((profe, i) => (
            <li key={i}>{`Profesor: ${profe}`}</li>
          ))}
      </ul>

      {/* Botón para agregar el registro completo */}
      <button onClick={handleProfesoresMaestria}>Agregar Registro</button>

      {/* Lista de registros finales */}
      <ul className="record-list">
        {formData.profesoresMaestrias.map((registro, index) => (
          <li key={index}>
            <span>{`Desde: ${registro.fechaDesdeMaestria}, Hasta: ${registro.fechaHastaMaestria}`}</span>
            <ul>
              {registro.textProfeMaestria.map((profe, i) => (
                <li key={i}>{`Profesor: ${profe}`}</li>
              ))}
            </ul>
            <button
              onClick={() => handleDeleteFromList("profesoresMaestrias", index)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h2>Lista de profesores con doctorados</h2>

      {/* Input de fechas */}
      <input
        type="text"
        name="fechaDesdeDoctorado"
        value={formData.fechaDesdeDoctorado}
        onChange={handleInputChange}
        placeholder="Fecha Desde"
      />
      <input
        type="text"
        name="fechaHastaDoctorado"
        value={formData.fechaHastaDoctorado}
        onChange={handleInputChange}
        placeholder="Fecha Hasta"
      />

      {/* Campo para agregar un profesor */}
      <input
        type="text"
        name="textProfeDoctorado"
        value={formData.textProfeDoctorado}
        onChange={handleInputChange}
        placeholder="Nombre del Profesor"
      />

      {/* Botón para agregar profesor temporalmente */}
      <button type="button" onClick={handleAddProfesorDoctorado}>
        Agregar Profesor
      </button>

      {/* Lista temporal de profesores */}
      <ul>
        {formData.profesoresTemporalesDoctorado &&
          formData.profesoresTemporalesDoctorado.map((profe, i) => (
            <li key={i}>{`Profesor: ${profe}`}</li>
          ))}
      </ul>

      {/* Botón para agregar el registro completo */}
      <button onClick={handleProfesoresDoctorado}>Agregar Registro</button>

      {/* Lista de registros finales */}
      <ul className="record-list">
        {formData.profesoresConDoctorados.map((registro, index) => (
          <li key={index}>
            <span>{`Desde: ${registro.fechaDesdeDoctorado}, Hasta: ${registro.fechaHastaDoctorado}`}</span>
            <ul>
              {registro.textProfeDoctorado.map((profe, i) => (
                <li key={i}>{`Profesor: ${profe}`}</li>
              ))}
            </ul>
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
