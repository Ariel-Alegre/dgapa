import React from "react";
import { UpdateSchool } from "../../redux/action";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const PutSchool = ({ detailsSchool }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    schoolId: detailsSchool?.id || "",
    name: "",
    address: "",
    phone: "",
    email: "",
    year_of_operation: "",
    province: "",
    image: null,
  });
  const [loadingSuccess, setLoadingSuccess] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState(null);

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
    } else {
      setPreviewImage(null);
    }
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

      const formDataToSend = new FormData();
      formDataToSend.append("schoolId", formData.schoolId);

      formDataToSend.append("name", formData.name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("year_of_operation", formattedDate);
      formDataToSend.append("province", formData.province);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      await dispatch(UpdateSchool(formDataToSend));
      alert("Escuela actualizado correctamente");

      setPreviewImage(null);
    } catch (error) {
      console.error(
        "Error al enviar el formulario:",
        error.response || error.message
      );
    } finally {
      setLoadingSuccess(false);
      window.location.reload();
    }
  };

  React.useEffect(() => {
    if (detailsSchool) {
      setFormData({
        schoolId: detailsSchool.id || "",
        name: detailsSchool.name || "",
        address: detailsSchool.address || "",
        phone: detailsSchool.phone || "",
        email: detailsSchool.email || "",
        year_of_operation: detailsSchool.year_of_operation || "",
        province: detailsSchool.province || "",
        image: detailsSchool.image || null,
      });
      setPreviewImage(detailsSchool.image || null);
    }
  }, [detailsSchool]);

  return (
    <form onSubmit={handleSubmit} className="update-form">
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
          type="date"
          name="year_of_operation"
          value={formData.year_of_operation}
          onChange={handleInputChange}
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
          <option value={formData.province}>{formData.province}</option>
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <div className="preview-image">
        <p>Vista previa de la imagen:</p>
        {previewImage && (
          <img
            src={previewImage}
            alt="Vista previa"
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              objectFit: "cover",
            }}
          />
        )}
      </div>

      <button type="submit" className="button-form" disabled={loadingSuccess}>
        {loadingSuccess ? (
          <CircularProgress size={25} thickness={5} sx={{ color: "#fff" }} />
        ) : (
          "Registrarse"
        )}
      </button>
    </form>
  );
};

export default PutSchool;
