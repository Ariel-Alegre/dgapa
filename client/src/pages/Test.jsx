import React, { useState } from "react";

const YouTubeVideo = () => {
  const [url, setUrl] = useState(""); // Estado para almacenar la URL del video
  const [videoID, setVideoID] = useState(null); // Estado para almacenar el ID del video

  // Extraer el ID del video de la URL de YouTube
  const getYouTubeID = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Maneja el cambio en el campo de entrada
  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    const id = getYouTubeID(url);
    setVideoID(id); // Establece el ID del video si es válido
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="Pega aquí la URL del video de YouTube"
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button type="submit">Ver Video</button>
      </form>

      {videoID ? (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            title="YouTube Video"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoID}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>
      ) : (
        <div>Por favor, ingresa una URL de video válida.</div>
      )}
    </div>
  );
};

export default YouTubeVideo;
