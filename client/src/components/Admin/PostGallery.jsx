import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
// Estilos para el contenedor del formulario
const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

// Estilos para el botón de subir
const UploadButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// Estilos para el input de archivo
const FileInput = styled.input`
  margin-top: 1rem;
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

// Estilos para la vista previa de la imagen
const ImagePreview = styled.img`
  margin-top: 1rem;
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 5px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const PostGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    // Crear una vista previa de la imagen
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Por favor selecciona una imagen antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("imageGallery", selectedImage);

    setUploading(true);
    try {
      const response = await axios.post("http://localhost:3001/api/post-gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Imagen subida:", response.data);
      setUploadSuccess(true); // Indicar que la imagen se subió con éxito
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Hubo un error al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormContainer>
      <Title>Subir Imagen a Galería</Title>
      <form onSubmit={handleSubmit}>
        <FileInput type="file" accept="image/*" onChange={handleImageChange} required />

        {previewImage && <ImagePreview src={previewImage} alt="Vista previa de la imagen" />}

        <UploadButton type="submit" disabled={uploading}>
          {uploading ? "Subiendo..." : "Subir Imagen"}
        </UploadButton>
      </form>

      {uploadSuccess && <p>¡Imagen subida con éxito!</p>}
    </FormContainer>
  );
};

export default PostGallery;
