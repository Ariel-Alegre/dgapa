import React from "react";
import { useLocation } from 'react-router-dom';

const PrivacyPolicy = () => {
  const { pathname } = useLocation();



React.useEffect(() => {
  window.scrollTo(0, 0);
  
}, [pathname]);
  
  return (
    <div>
        
    <div className="privacy-policy-container">
      <h1>Política de Privacidad</h1>
      <p>
      En www.normalessuperiores.org.mx, trabajamos cumpliendo con las leyes aplicables para la protección de datos personales en los Estados Unidos Mexicanos y contamos con políticas institucionales diseñadas para la protección de la información de nuestros usuarios.

      </p>

      <h2>SEGURIDAD DE LA INFORMACIÓN</h2>
      <p>
      En NORMALESSUPERIORES por ningún motivo y sin su previa autorización, se proporcionará su información personal a terceras personas, excepto cuando la información personal no se identifique como suya. Si usted no estuviera de acuerdo con cualquier término del Aviso de Protección de Datos Personales de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares por favor háganoslo saber a través de cualquiera de las siguientes formas:
<br />
Nuestra página WEB: <a href="www.normalessuperiores.org.mx">www.normalessuperiores.org.mx</a>
<br />

Correo electrónico: rrgonzaga@comunidad.unam.mx
<br />

Vía telefónica: 5532230784

      </p>

      <h2>TÉRMINOS Y CONDICIONES</h2>
      <p>
      El sitio <a href="www.normalessuperiores.org.mx"> www.normalessuperiores.org.mx</a> ha sido creado por NORMALESSUPERIORES con fines eminentemente de carácter académico que concentra datos históricos, información estadística, así como nombres de maestros, directores y personal administrativo que integran las escuelas normales superiores ubicadas en la República Mexicana. Una vez que tengamos su información personal, nos comprometemos a no utilizarla para ningún propósito distinto al académico.

      </p>

      <h2>POLÍTICA RESPVÍNCULOS A OTROS SITIOS WEB</h2>
      <p>
      Los “cookies” son archivos pequeños colocados en el disco duro por un sitio web. Estos archivos identifican información específica acerca de las visitas que se hayan hecho al sitio web. Con miras a facilitar la navegación en nuestra página y la captación de información respecto al número de visitantes a nuestro sitio, así como para determinar si son nuevas o repetidas visitas, cabe la posibilidad de que coloquemos ciertas cookies dentro de nuestro sitio web. Sólo hacemos uso de esta información para seguir los patrones de navegación de nuestros usuarios y poder mejorar nuestra página y hacer que sea más amigable y nos permita satisfacer sus necesidades. Usted puede configurar su navegador para restringir el acceso de “cookies”.
      </p>

      <h2>VÍNCULOS A OTROS SITIOS WEB
      </h2>
      <p>
      Cualquier sitio de un tercero con links desde nuestro sitio web no queda bajo el control de NORMALESSUPERIORES y no nos responsabilizamos de su contenido. Le facilitamos a usted dichos links únicamente para mayor comodidad, y la inclusión de cualquier link en un sitio web no implica la aceptación y respaldo por parte nuestra del contenido de dicho sitio, ni representan ningún tipo de relación entre NORMALESSUPERIORES y el titular del sitio web al que se pueda acceder. Respetamos su privacidad. Le está permitido acceder y navegar por la mayor parte del sitio web sin necesidad de revelar sus datos personales. Cuando recabemos o utilicemos sus datos personales, protegeremos su privacidad según lo dispuesto por la legislación aplicable y por las políticas de privacidad de NORMALESSUPERIORES.

      </p>

    </div>
    </div>

  );
};

export default PrivacyPolicy;
