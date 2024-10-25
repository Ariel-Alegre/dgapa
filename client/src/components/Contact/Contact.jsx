import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { Global } from "../../assets/utils/utils";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { BsWhatsapp } from "react-icons/bs";
import { Swiper } from "swiper/react";
import AOS from "aos";
import { IoMdArrowUp } from "react-icons/io";
import { ContactUs } from "../../redux/action";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
export default function Contact() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [messageSuccess, setMesageSuccess] = useState(false);

  useEffect(() => {
    const toggleScrolled = () => {
      const selectBody = document.querySelector("body");
      const selectHeader = document.querySelector("#header");
      if (!selectHeader) return;
      if (
        !selectHeader.classList.contains("scroll-up-sticky") &&
        !selectHeader.classList.contains("sticky-top") &&
        !selectHeader.classList.contains("fixed-top")
      )
        return;
      window.scrollY > 100
        ? selectBody.classList.add("scrolled")
        : selectBody.classList.remove("scrolled");
    };

    // Añadir eventos de scroll
    document.addEventListener("scroll", toggleScrolled);
    toggleScrolled(); // Llamar inmediatamente para verificar si la página ya está scrolleada.

    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

    const mobileNavToogle = () => {
      document.querySelector("div").classList.toggle("mobile-nav-active"); // Cambiar 'div' por un selector más específico
      mobileNavToggleBtn.classList.toggle("bi-list");
      mobileNavToggleBtn.classList.toggle("bi-x");
    };

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
    }

    document.querySelectorAll("#navmenu a").forEach((navmenu) => {
      navmenu.addEventListener("click", () => {
        if (document.querySelector(".mobile-nav-active")) {
          mobileNavToogle();
        }
      });
    });

    document
      .querySelectorAll(".navmenu .toggle-dropdown")
      .forEach((navmenu) => {
        navmenu.addEventListener("click", function (e) {
          e.preventDefault();
          this.parentNode.classList.toggle("active");
          this.parentNode.nextElementSibling.classList.toggle(
            "dropdown-active"
          );
          e.stopImmediatePropagation();
        });
      });

    // Eliminar el preloader inmediatamente si existe
    const preloader = document.querySelector("#preloader");
    if (preloader) {
      preloader.remove();
    }

    let scrollTop = document.querySelector(".scroll-top");
    if (scrollTop) {
      const toggleScrollTop = () => {
        window.scrollY > 100
          ? scrollTop.classList.add("active")
          : scrollTop.classList.remove("active");
      };

      scrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      document.addEventListener("scroll", toggleScrollTop);
      toggleScrollTop(); // Verificar estado inicial del scroll-top
    }

    // Inicialización de AOS (Animaciones)
    const aosInit = () => {
      if (typeof AOS !== "undefined") {
        AOS.init({
          duration: 600,
          easing: "ease-in-out",
          once: true,
          mirror: false,
        });
        AOS.refresh();
      }
    };
    aosInit(); // Llamar directamente para inicializar sin depender de 'load'

    // Inicialización de Swiper
    const initSwiper = () => {
      document
        .querySelectorAll(".init-swiper")
        .forEach(function (swiperElement) {
          const configElement = swiperElement.querySelector(".swiper-config");
          if (configElement) {
            let config = JSON.parse(configElement.innerHTML.trim());
            if (!swiperElement.classList.contains("swiper-tab")) {
              new Swiper(swiperElement, config);
            }
          }
        });
    };
    initSwiper(); // Llamar directamente sin depender de 'load'

    // Limpieza al desmontar el componente
    return () => {
      document.removeEventListener("scroll", toggleScrolled);
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.removeEventListener("click", mobileNavToogle);
      }
    };
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSuccess(true)
    setTimeout( async () => {
      
    try {
      await dispatch(ContactUs(data));
    } catch (error) {
      console.error(error);
    } finally{
    setLoadingSuccess(false)
    setMesageSuccess(true)


    }
  }, 1000);

  };

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div class="contact-page">
      <header id="header" class="header d-flex align-items-center fixed-top">
        <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <Link to="/" class="logo d-flex align-items-center">
            <img src={require("../../assets/img/logo-removebg.png")} alt="" />
          </Link>

          <nav id="navmenu" class="navmenu">
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
                <Link to="/contacto" class="active">
                  Contacto
                </Link>
              </li>
            </ul>
            <BsList className="mobile-nav-toggle d-xl-none bi bi-list" />
          </nav>
        </div>
      </header>

      <main class="main">
        <div class="page-title dark-background">
          <div
            class="container position-relative"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h1>Contacto</h1>
          </div>
        </div>

        <section id="contact" class="contact section">
          <div class="container" data-aos="fade-up" data-aos-delay="100">
            <div class="row gy-4">
              <div class="col-lg-6">
                <div
                  class="info-item d-flex flex-column justify-content-center align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i class="bi bi-geo-alt">
                    <BsWhatsapp />
                  </i>
                  <h3>WhatsApp</h3>
                  <a href="https://wa.me/+525532230784" target="__blank">
                    {" "}
                    +52 (55) 3223 0784
                  </a>
                </div>
              </div>

              <div class="col-lg-3 col-md-6">
                <div
                  class="info-item d-flex flex-column justify-content-center align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i class="bi bi-telephone">
                    <LocalPhoneIcon />
                  </i>
                  <h3>Llámanos</h3>
                  <a href="tel:+525532230784">+52 (55) 3223 0784</a>
                </div>
              </div>

              <div class="col-lg-3 col-md-6">
                <div
                  class="info-item d-flex flex-column justify-content-center align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <i class="bi bi-envelope">
                    <EmailIcon />
                  </i>
                  <h3>Email Us</h3>
                  <p>
                    <a href={`mailto:rrgonzaga@comunidad.unam.mx`}>
                      rrgonzaga@comunidad.unam.mx
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div class="row gy-4 mt-1">
              <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
              
                <img class="maps" src={require("../../assets/img/contactanos.png")} alt="" />

              </div>

              <div class="col-lg-6">
                <form
                  onSubmit={handleSubmit}
                  class="php-email-form"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div class="row gy-4">
                    <div class="col-md-6">
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        class="form-control"
                        placeholder="Nombre"
                        required
                      />
                    </div>

                    <div class="col-md-6 ">
                      <input
                        type="email"
                        class="form-control"
                        onChange={handleChange}
                        name="email"
                        placeholder="Correo electrónico"
                        required=""
                      />
                    </div>

                    <div class="col-md-12">
                      <input
                        type="text"
                        class="form-control"
                        onChange={handleChange}
                        name="subject"
                        placeholder="Asunto"
                        required
                      />
                    </div>

                    <div class="col-md-12">
                      <textarea
                        class="form-control"
                        name="message"
                        onChange={handleChange}
                        rows="6"
                        placeholder="Message"
                        required
                      ></textarea>
                    </div>

                    <div class="col-md-12 text-center">
                      <div class="loading">Loading</div>
                      <div class="error-message"></div>
                      <div class="sent-message">
                        Your message has been sent. Thank you!
                      </div>

                      <button type="submit">   {loadingSuccess ? (
          <CircularProgress size={25} thickness={5} sx={{ color: "#fff" }} />
        ) : (
          "Enviar mensaje"
        )}</button>

        {messageSuccess ? (

          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
    Mensaje enviado corectamente gracias por comunicarse con nosotros.
    </Alert>
        ): null}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <a
        href="#"
        id="scroll-top"
        class="scroll-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short">
          <IoMdArrowUp className="icon-color" />
        </i>
      </a>

      <div id="preloader"></div>
    </div>
  );
}
