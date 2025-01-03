import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer" class="footer dark-background">
      <div class="container footer-top">
        <div class="row gy-4">
          <div class="col-lg-4 col-md-6 footer-about">
            <Link
              href="/"
              class="logo d-flex align-items-center"
              style={{ textDecoration: "none" }}
            >
              <span class="sitename">DGAPA</span>
            </Link>
            <div class="footer-contact pt-3">
              <p>Contacto Dra. Rosalina Romero</p>
              <p class="mt-3">
                <strong>Teléfono:</strong>{" "}
                <span>
                  {" "}
                  <a href="tel:+525532230784">+52 (55) 3223 0784</a>
                </span>
              </p>
              <p>
                <strong>Correo electrónico:</strong>{" "}
                <span>
                  <a href={`mailto:rrgonzaga@comunidad.unam.mx`}>
                    rrgonzaga@comunidad.unam.mx
                  </a>
                </span>
              </p>
            </div>
            <div class="social-links d-flex mt-4">
             
              <a href="" target="_blank">
                <i class="bi bi-facebook">
                  <FacebookIcon />
                </i>
              </a>
              <a href="" target="_blank"  >
                <i class="bi bi-instagram">
                  <InstagramIcon />
                </i>
              </a>
            
            </div>
          </div>

          <div class="col-lg-2 col-md-3 footer-links">
            <h4>Menú</h4>
            <ul>
              <li>
                <Link to="/"> Princípal</Link>
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
          </div>
          <div class="col-lg-2 col-md-3 footer-links">
            <h4>Imagenes</h4>
            <ul>
              <li>
                <Link to="/escuelas">Todas las escuelas</Link>
              </li>
              <li>
                <Link to="/galeria">Galeria</Link>
              </li>
            </ul>
          </div>


          <div class="col-lg-2 col-md-3 footer-links">
            <h4>Términos</h4>
            <ul>
              <li>
                <Link to="/politica-privacidad">Política de Privacidad</Link>
              </li>
           
            </ul>
          </div>
   
        </div>
      </div>

      <div class="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span> <strong class="px-1 sitename">dgapa</strong>{" "}
          <span>Derechos Reservados.</span>
        </p>
      </div>
    </footer>
  );
}
