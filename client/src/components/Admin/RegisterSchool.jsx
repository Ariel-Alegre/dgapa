import React, { useState } from "react";
import { FormRegister } from "../../redux/action";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const RegisterSchool = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    year_of_operation: "",
    province: "",
    image: null,
  });
  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSuccess(true);
  
    try {
      const date = new Date(formData.year_of_operation);
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("year_of_operation", formattedDate);
      formDataToSend.append("province", formData.province);
  
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }
  
      await dispatch(FormRegister(formDataToSend));
      console.log("Datos del formulario enviados:", formDataToSend);
    } catch (error) {
      console.error("Error al enviar el formulario:", error.response || error.message);
    } finally {
      setLoadingSuccess(false);
      alert("Escuela registrada correctamente");
      setFormData({

      name: "",
      address: "",
      phone: "",
      email: "",
      year_of_operation: "",
      province: "",
      image: null,
    })
    setPreviewImage(null)

    }
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
          required
        />
      </div>
      <div className="form-group">
        <label>Dirección:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Teléfono:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
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
          required
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
        <label>Subir imagen:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>

      {previewImage && (
        <div className="preview-image">
          <p>Vista previa de la imagen:</p>
          <img src={previewImage} alt="Vista previa" />
        </div>
      )}

      <button type="submit" className="button-form">
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
