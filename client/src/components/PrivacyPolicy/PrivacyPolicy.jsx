import React from "react";
import { Link } from 'react-router-dom';
import { BsList } from "react-icons/bs";

const PrivacyPolicy = () => {
  return (
    <div>
          <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src={require("../../assets/img/logo-removebg.png")} alt="" />
          </Link>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <Link to="/">Princípal</Link>
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
            <BsList className="mobile-nav-toggle d-xl-none bi bi-list" />

          </nav>
        </div>
      </header>
    <div className="privacy-policy-container">
      <h1>Política de Privacidad</h1>
      <p>
        Esta Política de Privacidad describe cómo recopilamos, usamos y
        compartimos su información personal cuando utiliza nuestro servicio.
      </p>

      <h2>1. Información que Recopilamos</h2>
      <p>
        Recopilamos información que usted nos proporciona directamente, como su
        nombre, dirección de correo electrónico y otros detalles de contacto
        cuando se registra en nuestra plataforma.
      </p>

      <h2>2. Uso de la Información</h2>
      <p>
        Utilizamos su información para proporcionar, mantener y mejorar nuestros
        servicios, así como para comunicarnos con usted sobre actualizaciones,
        ofertas y otra información relevante.
      </p>

      <h2>3. Compartir Información</h2>
      <p>
        No compartimos su información personal con terceros, excepto en casos
        donde sea necesario para cumplir con la ley o proteger nuestros derechos.
      </p>

      <h2>4. Seguridad</h2>
      <p>
        Implementamos medidas de seguridad para proteger su información personal
        y evitar accesos no autorizados. Sin embargo, no podemos garantizar la
        seguridad absoluta de la información transmitida a través de Internet.
      </p>

      <h2>5. Cambios a esta Política</h2>
      <p>
        Podemos actualizar esta Política de Privacidad de vez en cuando. Le
        notificaremos sobre cambios significativos a través de nuestro sitio web.
      </p>

      <h2>Contacto</h2>
      <p>
        Si tiene preguntas sobre nuestra Política de Privacidad, contáctenos en
        contacto@tuempresa.com.
      </p>
    </div>
    </div>

  );
};

export default PrivacyPolicy;
