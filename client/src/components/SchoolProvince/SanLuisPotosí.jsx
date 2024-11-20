import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { IoMdArrowUp } from "react-icons/io";
import { Global } from "../../assets/utils/utils";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import axios from "axios";
import { Swiper,  } from "swiper/react";
import AOS from "aos";
export default function SanLuisPotosí() {
  const { pathname } = useLocation();
  const [allSchool, setAllschool] = useState([]);

  React.useEffect(() => {
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
    window.scrollTo(0, 10);
  }, [pathname]);

  const AllSchool = async () => {
    const response = await axios.get("http://localhost:3001/api/escuelas");
    setAllschool(response.data.data);
  };

  useEffect(() => {
    AllSchool();
  }, []);

  const durangoSchools = allSchool.filter((data) => data.province === "San Luis Potosí");

  return (
    <div className="about-page">
     
      <main className="main">
        <section id="about" className="about section" data-aos="fade-up">
          <div className="page-schools dark-background">
            <div
              className="container position-relative"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h1>Escuelas de San Luis Potosí</h1>
            </div>
          </div>
          <div className="container gallery-card">
            {durangoSchools.length > 0 ? (
              durangoSchools.map((data) => (
                <Link to={`/escuelas-detalles/${data.id}`} key={data.id} style={{textDecoration: "none"}}>
                  <Card sx={{ maxWidth: 345, width: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={data.image}
                        alt={data.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {data.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <EmailIcon /> {data.email}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <LocalPhoneIcon /> {data.phone}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <LocationOnIcon /> {data.province}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              ))
            ) : (
              <Typography variant="h6" sx={{ textAlign: "center", marginTop: 2 }}>
                No hay escuelas registradas en San Luis Potosí.
              </Typography>
            )}
          </div>
        </section>
      </main>

      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short">
          <IoMdArrowUp className="icon-color" />
        </i>
      </a>

      <div id="preloader"></div>
    </div>
  );
}
