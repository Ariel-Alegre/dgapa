import React from 'react';

const TransportCard = ({handleNext}) => {
  const transportOptions = [
    {
      title: "SUV Transportation",
      price: "$2565.00 MXN",
      oldPrice: "$3664.29 MXN",
      imageUrl: require('../../assets/img/Home/auto-1.jpg'), // Reemplaza con la URL o ruta de la imagen correcta
      features: [
        "Private service",
        "Courtesy stop (up to 20 minutes)",
        "Airport taxes and insurance",
        "Service 24/7",
        "Flight monitoring",
        "Cold water bottle",
        "Meet & Greet at the Airport",
        "Complimentary beer"
      ]
    },
    {
      title: "Van Transportation",
      price: "$2755.00 MXN",
      oldPrice: "$3936.71 MXN",
      imageUrl: require('../../assets/img/Home/auto-2.jpg'), // Reemplaza con la URL o ruta de la imagen correcta

      features: [
        "Private service",
        "Courtesy stop (up to 20 minutes)",
        "Airport taxes and insurance",
        "Service 24/7",
        "Flight monitoring",
        "Cold water bottle",
        "Meet & Greet at the Airport",
        "Complimentary beer"
      ]
    },
    {
      title: "Luxury Transportation",
      price: "$3173.00 MXN",
      oldPrice: "$4532.86 MXN",
      imageUrl: require('../../assets/img/Home/auto-4.jpg'), // Reemplaza con la URL o ruta de la imagen correcta

      features: [
        "Private service",
        "Courtesy stop (up to 20 minutes)",
        "Airport taxes and insurance",
        "Service 24/7",
        "Flight monitoring",
        "Cold water bottle",
        "Meet & Greet at the Airport",
        "Complimentary beer"
      ]
    }
  ];

  const handleSelectTransportation = (title, price) => {
    try {
      // Recuperar formData existente desde el localStorage
      let formData = JSON.parse(localStorage.getItem('formData')) || {};

      // Agregar los detalles del transporte seleccionado
      formData.transportation = { title, price };

      // Guardar el formData actualizado en localStorage
      localStorage.setItem('formData', JSON.stringify(formData));

      // Continuar con la siguiente acción
      handleNext();
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
    }
  };

  return (
    <div className='card-body'>
      <div className="transport-container">
        {transportOptions.map((option, index) => (
          <div className="card" key={index}>
            <img src={option.imageUrl} alt={option.title} className="card-image" />
            <h3>{option.title}</h3>
            <p><span className="price">{option.price}</span> <span className="old-price">{option.oldPrice}</span></p>
            <ul className="features">
              {option.features.map((feature, idx) => (
                <li key={idx}>✔ {feature}</li>
              ))}
            </ul>
            <div className='button-container'>
              <button onClick={() => handleSelectTransportation(option.title, option.price)}>
                Select Transportation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportCard;
