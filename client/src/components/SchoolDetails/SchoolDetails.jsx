import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { Global } from "../../assets/utils/utils";
import EmailIcon from "@mui/icons-material/Email";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { IoMdArrowUp } from "react-icons/io";
import { Image } from "antd";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { Swiper } from "swiper/react";
import AOS from "aos";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from 'react-bootstrap/Accordion';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

const containerStyle = {
  width: "345px",
  height: "250px",
  maxWidth: "100%",
};
const defaultCenter = {
  lat: -12.0464,
  lng: -77.0428,
};

const SchoolDetails = () => {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = React.useState({});
  const handleExpandClick = (cardId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [cardId]: !prevExpanded[cardId],
    }));
  };
  const { schoolId } = useParams();
  const [detailsSchool, setDetailsSchool] = React.useState([]);
  const [center, setCenter] = React.useState(defaultCenter); // Coordenadas del mapa
  const [videoID, setVideoID] = React.useState(null); // Estado para almacenar el ID del video
  useEffect(() => {
    window.scrollTo(0, 20);
  }, [pathname]);
  const getYouTubeID = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = url ? url.match(regex) : null;
    return match ? match[1] : null;
  };

  useEffect(() => {
    // Aquí podrías cargar los detalles de la escuela usando schoolId, por ejemplo, a través de una API
    // setDetailsSchool(dataObtenida);

    // Actualiza el videoID si urlYoutube existe
    if (detailsSchool.urlYoutube) {
      const id = getYouTubeID(detailsSchool.urlYoutube);
      setVideoID(id);
    }
  }, [detailsSchool]);

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
  const OneSchool = async () => {
    try {
      // Hacer una solicitud GET para obtener los detalles de la escuela
      const response = await axios.get(
        `https://dgapa-production-a45f.up.railway.app/api/detail-school/${schoolId}`
      );

      // Guardar los detalles de la escuela en el estado
      setDetailsSchool(response.data.data);
    } catch (error) {
      console.error("Error al obtener los detalles de la escuela:", error);
    }
  };

  React.useEffect(() => {
    OneSchool();
  }, []);

  React.useEffect(() => {
    if (
      detailsSchool &&
      detailsSchool.address &&
      window.google &&
      window.google.maps &&
      window.google.maps.Geocoder
    ) {
      // Función para geocodificar la dirección usando la API de Google Maps
      const geocodeAddress = async (address) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === "OK" && results[0]) {
            const location = results[0].geometry.location;
            const newCenter = {
              lat: location.lat(),
              lng: location.lng(),
            };
            setCenter(newCenter); // Actualizamos el centro del mapa con las coordenadas obtenidas
          } else {
            console.error("No se pudo geocodificar la dirección:", status);
            alert(
              "No se pudo encontrar la ubicación de la dirección proporcionada."
            );
          }
        });
      };

      // Geocodifica la dirección cuando está disponible
      geocodeAddress(detailsSchool?.address);
    } else if (
      !window.google ||
      !window.google.maps ||
      !window.google.maps.Geocoder
    ) {
      console.error("La API de Google Maps no se ha cargado correctamente.");
    }
  }, [detailsSchool]);

  return (
    <div>
      <div class="container details-page">
        <div class="row">
          <div class="col-md-3 order-last d-none d-sm-block">
            <div class="sticky-top py-3 right-navbar">
              <hr class="visually-hidden" />
              <h6>{detailsSchool?.name}</h6>
              <hr />
              <nav
                id="navbar"
                class="h-100 d-flex align-items-center border-start"
              >
                <nav class="nav nav-pills flex-column">
                  <a class="nav-link2  ms-1" href="#item-datos-generales" style={{color:"black", fontWeight: "bold", textDecoration: "none", ":hover": {color: "red"}}}>
                    Datos generales
                  </a>
                  <a class="nav-link2 ms-1  " href="#item-youtube" style={{color:"black", fontWeight: "bold", textDecoration: "none"}}>
                    Multimedia
                  </a>
                  <a class=" nav-link2 ms-1" href="#item-convocatorias" style={{color:"black", fontWeight: "bold", textDecoration: "none"}}>
                    Convocatorias
                  </a>
                  <nav class="nav nav-pills flex-column">
                    <a
                      class=" nav-link2 ms-3"
                      href="#item-convocatorias-escuelas"
                      style={{color:"grey", textDecoration: "none" }}
                    >
                     Licenciaturas

                    </a>
                    <a
                      class=" nav-link2 ms-3"
                      href="#item-convocatorias-posgrados"
                      style={{color:"grey", textDecoration: "none" }}
                    >
                      Posgrados (maestría/doctorado)
                    </a>
                    <a class=" nav-link2 ms-3" 
                    href="#item-becas"
                    style={{color:"grey",textDecoration: "none" }}
                    >
                    Becas
                  </a>
                  </nav>
               
                  <a class=" nav-link2 ms-1" href="#item-linea-tiempo"
                  style={{color:"black", fontWeight: "bold", textDecoration: "none"}}
                  >
                    Linea del tiempo
                  </a>
                  <a class=" nav-link2 ms-1" href="#item-alumnos"
                  style={{color:"black", fontWeight: "bold", textDecoration: "none"}}
                  >
                    Histórico de alumnos
                  </a>
                  <nav class="nav nav-pills flex-column">
                    <a
                      class=" nav-link2 ms-3"
                      href="#item-numero-alumnos-matriculados"
                      style={{color:"black", textDecoration: "none" }}
                    >
                      Alumnos matriculados 
                    </a>

                    <a
                      class=" nav-link2 ms-5"
                      href="#item-numero-alumnos-matriculados"
                      style={{color:"grey", textDecoration: "none"}}
                    >
                     Modalidad escolarizada

                    </a>

                    <a
                      class=" nav-link2 ms-5"
                      href="#item-numero-alumnos-matriculados"
                      style={{color:"grey", textDecoration: "none" }}
                    >
                     Modalidad mixta


                    </a>
                    <a
                      class=" nav-link2 ms-3"
                      href="#item-numero-maestros-egresados-mixta"
                      style={{color:"black", textDecoration: "none" }}

                    >
                      Egresados y titulados 
                    </a>
                    <a
                      class=" nav-link2 ms-5"
                      href="#item-numero-alumnos-matriculados"
                      style={{color:"grey",  textDecoration: "none"}}

                    >
                     Modalidad escolarizada

                    </a>

                    <a
                      class=" nav-link2 ms-5"
                      href="#item-numero-alumnos-matriculados"
                      style={{color:"grey", textDecoration: "none" }}

                    >
                     Modalidad mixta

                    </a>
                  </nav>
                  <a class=" nav-link2 ms-1" href="#item-edades"
                   style={{color:"black", fontWeight: "bold", textDecoration: "none" }}
                  >
                    Profesorado
                  </a>
                  <nav class="nav nav-pills flex-column">
                  <a
                      class=" nav-link2 ms-3"
                      href="#item-numero-alumnos-matriculados"
                      style={{color:"grey", textDecoration: "none"}}

                    >
                   Profesorado actual


                    </a>
                    <a
                      class=" nav-link2 ms-3"
                      href="#item-edades-profesorado-maestria"
                      style={{color:"grey", textDecoration: "none"}}

                    >
                     Edades del profesorado
                    </a>
                    <a
                      class=" nav-link2 ms-3"
                      href="#item-edades-profesorado-doctorado"
                      style={{color:"grey",textDecoration: "none" }}

                    >
                    Con maestría

                    </a>

                    <a
                      class=" nav-link2 ms-3"
                      href="#item-edades-profesorado-doctorado"
                      style={{color:"grey", textDecoration: "none"}}

                    >
                    Con doctorado

                    </a>
                    <a
                      class=" nav-link2 ms-3"
                      href="#item-edades-profesorado-doctorado"
                      style={{color:"grey", textDecoration: "none"}}

                    >
                    Matricula docente

                    </a>
                    <a
                      class=" nav-link2 ms-3"
                      href="#item-edades-profesorado-doctorado"
                      style={{color:"grey",textDecoration: "none" }}

                    >
                   Matrículas docentes con especialidad

                    </a>
                  </nav>
                  <a class=" nav-link2 ms-1" href="#item-doctores"
                   style={{color:"black", fontWeight: "bold", textDecoration: "none" }}
                  
                  >
                    Doctores con SNI
                  </a>
                  <nav class="nav nav-pills flex-column">
                    <a
                      class=" nav-link2 ms-3"
                      href="#item-doctores-jubilados"
                      style={{color:"grey", textDecoration: "none"}}

                    >
                      Doctores jubilados

                    </a>
                    <a
                      class=" nav-link2 ms-3"
                      href="#item-doctores-candidatos"
                      style={{color:"grey", textDecoration: "none"}}

                    >
                     Doctores candidatos

                    </a>
                  </nav>
                  <nav class="nav nav-pills flex-column">
                  <a class=" nav-link2 ms-1" href="#item-4-2"
                   style={{color:"black", fontWeight: "bold", textDecoration: "none" }}
                  
                  >
                  Cuerpos académicos

                    </a>
                    <a class=" nav-link2 ms-1" href="#item-4-2"
                   style={{color:"black", fontWeight: "bold", textDecoration: "none" }}

                    >
                    Oferta académica

                    </a>
                    <a class="nav-link2 ms-1" href="#item-4-2"
                   style={{color:"black", fontWeight: "bold", textDecoration: "none" }}
                    
                    >
                    Historia
                    </a>
                  
                  </nav>
                </nav>
              </nav>
            </div>
          </div>{" "}
          <div class="col-md-9">
            <header class="container">
              <div class="row p-3">
                <div class="col d-flex align-items-center justify-content-center">
                  <h1 data-aos="fade-up" class="text-center">
                    {detailsSchool?.name}
                  </h1>
                </div>
                <hr />
              </div>
            </header>
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar"
              data-bs-smooth-scroll="true"
              tabindex="0"
              class="scrollspy"
            >
              <div id="item-datos-generales" className="info-section">
                <div data-aos="fade-up" class="container">
                  <h2>Datos Generales </h2>
                </div>
                <section class="container">
                  <div class="row justify-content-center">
                    <div class="col-md-5 d-flex flex-column align-items-start">
                      <div class="d-block mb-2">
                        <div
                          data-aos="fade-up"
                          class="badge bg-primary bg-gradient mb-2"
                        >
                          Pública/ Federal{" "}
                        </div>
                      </div>
                      <p data-aos="fade-up" class="lead">
                        {detailsSchool && detailsSchool.address}
                        <br />
                        {detailsSchool && detailsSchool.province}
                      </p>
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                      >
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={center}
                          zoom={10}
                        >
                          {/* Marcador en la ubicación seleccionada */}
                          {detailsSchool.address && detailsSchool.address && (
                            <Marker position={center} />
                          )}
                        </GoogleMap>
                      </LoadScript>
                    </div>
                    <div class="col-md-7">
                      <div class="row mb-5">
                        <div
                          data-aos="fade-up"
                          class="col d-flex flex-column align-items-start justify-content-start"
                        >
                          <i class="fa fa-envelope fa-3x text-primary">
                            <EmailIcon />
                          </i>
                          <p class="lead fw-semibold mb-0">email</p>
                          <a href={`mailto:${detailsSchool.email}`}>
                            {detailsSchool.email}
                          </a>
                        </div>
                        {detailsSchool?.sic && (
                          <div
                            data-aos="fade-up"
                            class="col d-flex flex-column align-items-start justify-content-start"
                          >
                            <i class="fa fa-bookmark fa-3x text-primary">
                              <BookmarkAddedIcon />
                            </i>
                            <p class="lead fw-semibold mb-0">
                              SIC
                              <br />
                              <span class="fw-lighter fs-6">
                                Sistema de Información Cultural
                              </span>
                            </p>
                            <a href={detailsSchool?.sic} target="_blank">
                              Consultar
                            </a>
                          </div>
                        )}
                      </div>
                      <div class="row">
                        <div
                          data-aos="fade-up"
                          class="col d-flex flex-column align-items-start justify-content-start"
                        >
                          <i class="fa fa-calendar fa-3x text-primary">
                            <CalendarMonthIcon />
                          </i>
                          <p class="lead fw-semibold mb-0">Año de fundación</p>{" "}
                          {detailsSchool?.year_of_operation}
                        </div>
                        {/*     <div
                          data-aos="fade-up"
                          class="col d-flex flex-column align-items-start justify-content-start"
                        >
                          <i class="fa fa-phone fa-3x text-primary">
                            <LocalPhoneIcon />
                          </i>
                          <p class="lead fw-semibold mb-0">Teléfono/s</p>
                          {detailsSchool?.phone}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <br />
              <div id="item-youtube">
                {detailsSchool.urlYoutube && (
                  <div className="info-section">
                    <div data-aos="fade-up" class="container">
                      <h2>Video de youtube </h2>
                    </div>
                    <div id="item-convocatorias-escuelas" class="mb-5">
                      <section data-aos="fade-up" class="container">
                        <div class="row my-3 mt-4">
                          <div class="col d-flex align-items-center "></div>
                        </div>
                        <div
                          style={{
                            position: "relative",
                            paddingBottom: "56.25%",
                          }}
                        >
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
                      </section>
                    </div>
                  </div>
                )}

                <div style={{ marginTop: "-150px" }}>
                  <section data-aos="fade-up" class="container">
                    <h2 style={{ textAlign: "center" }}> Galeria</h2>

                    <div className="galeria-details">
                      <Image
                        height={180}
                        width={200}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                      <Image
                        height={180}
                        width={200}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />{" "}
                      <Image
                        height={180}
                        width={200}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />{" "}
                      <Image
                        height={180}
                        width={200}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                  </section>
                </div>
              </div>

              <br />
              {detailsSchool?.plantel1 ||
              detailsSchool?.plantel2 ||
              detailsSchool?.plantel3 ? (
                <div id="item-convocatorias">
                  <div className="info-section">
                    <div data-aos="fade-up" class="container">
                      <h2>Convocatorias </h2>
                    </div>


                    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Licenciaturas</Accordion.Header>
        <Accordion.Body>
        <section data-aos="fade-up" class="container">
                        <div class="row my-3 mt-4">
                          <div class="col d-flex align-items-center ">
                            <h4> {detailsSchool?.name}</h4>
                          </div>
                        </div>

                        <div class="row my-3">
                          {detailsSchool?.plantel1 && (
                            <div class="col-md-4 col-xl-3 d-flex justify-content-start align-items-center mb-4 h-100">
                              <div class="card text-center">
                                <div class="card-header">
                                  <b>
                                    Plantel: {detailsSchool?.name}
                                    del Estado de {detailsSchool?.province}
                                  </b>
                                </div>
                                <div class="card-body">
                                  <div class="row align-items-center mb-3">
                                    <div class="col">
                                      <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                                        Convocatoria abierta
                                      </div>
                                    </div>
                                  </div>
                                  <div class="row align-items-center">
                                    <div class="col">
                                      <a
                                        target="_blank"
                                        href={detailsSchool?.plantel1}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          class="card-pdf"
                                          x="48"
                                          y="48"
                                          viewBox="0 0 512 512"
                                        >
                                          <path
                                            d="M128 0c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32V128L352 0H128z"
                                            fill="#e2e5e7"
                                          />
                                          <path
                                            d="M384 128h96L352 0v96c0 17.6 14.4 32 32 32z"
                                            fill="#b0b7bd"
                                          />
                                          <path
                                            fill="#cad1d8"
                                            d="M480 224l-96-96h96z"
                                          />
                                          <path
                                            d="M416 416c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V256c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v160z"
                                            fill="#f15642"
                                          />
                                          <path
                                            d="M101.744 303.152c0-4.224 3.328-8.832 8.688-8.832h29.552c16.64 0 31.616 11.136 31.616 32.48 0 20.224-14.976 31.488-31.616 31.488h-21.36v16.896c0 5.632-3.584 8.816-8.192 8.816-4.224 0-8.688-3.184-8.688-8.816v-72.032zm16.88 7.28v31.872h21.36c8.576 0 15.36-7.568 15.36-15.504 0-8.944-6.784-16.368-15.36-16.368h-21.36zM196.656 384c-4.224 0-8.832-2.304-8.832-7.92v-72.672c0-4.592 4.608-7.936 8.832-7.936h29.296c58.464 0 57.184 88.528 1.152 88.528h-30.448zm8.064-72.912V368.4h21.232c34.544 0 36.08-57.312 0-57.312H204.72zm99.152 1.024v20.336h32.624c4.608 0 9.216 4.608 9.216 9.072 0 4.224-4.608 7.68-9.216 7.68h-32.624v26.864c0 4.48-3.184 7.92-7.664 7.92-5.632 0-9.072-3.44-9.072-7.92v-72.672c0-4.592 3.456-7.936 9.072-7.936h44.912c5.632 0 8.96 3.344 8.96 7.936 0 4.096-3.328 8.704-8.96 8.704h-37.248v.016z"
                                            fill="#fff"
                                          />
                                          <path
                                            d="M400 432H96v16h304c8.8 0 16-7.2 16-16v-16c0 8.8-7.2 16-16 16z"
                                            fill="#cad1d8"
                                          />
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {detailsSchool?.plantel2 && (
                            <div class="col-md-4 col-xl-3 d-flex justify-content-start align-items-center mb-4 h-100">
                              <div class="card text-center">
                                <div class="card-header">
                                  <b>
                                    Plantel: {detailsSchool?.name}
                                    del Estado de {detailsSchool?.province}
                                  </b>
                                </div>
                                <div class="card-body">
                                  <div class="row align-items-center mb-3">
                                    <div class="col">
                                      <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                                        Convocatoria abierta
                                      </div>
                                    </div>
                                  </div>
                                  <div class="row align-items-center">
                                    <div class="col">
                                      <a
                                        target="_blank"
                                        href={detailsSchool?.plantel2}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          class="card-pdf"
                                          x="48"
                                          y="48"
                                          viewBox="0 0 512 512"
                                        >
                                          <path
                                            d="M128 0c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32V128L352 0H128z"
                                            fill="#e2e5e7"
                                          />
                                          <path
                                            d="M384 128h96L352 0v96c0 17.6 14.4 32 32 32z"
                                            fill="#b0b7bd"
                                          />
                                          <path
                                            fill="#cad1d8"
                                            d="M480 224l-96-96h96z"
                                          />
                                          <path
                                            d="M416 416c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V256c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v160z"
                                            fill="#f15642"
                                          />
                                          <path
                                            d="M101.744 303.152c0-4.224 3.328-8.832 8.688-8.832h29.552c16.64 0 31.616 11.136 31.616 32.48 0 20.224-14.976 31.488-31.616 31.488h-21.36v16.896c0 5.632-3.584 8.816-8.192 8.816-4.224 0-8.688-3.184-8.688-8.816v-72.032zm16.88 7.28v31.872h21.36c8.576 0 15.36-7.568 15.36-15.504 0-8.944-6.784-16.368-15.36-16.368h-21.36zM196.656 384c-4.224 0-8.832-2.304-8.832-7.92v-72.672c0-4.592 4.608-7.936 8.832-7.936h29.296c58.464 0 57.184 88.528 1.152 88.528h-30.448zm8.064-72.912V368.4h21.232c34.544 0 36.08-57.312 0-57.312H204.72zm99.152 1.024v20.336h32.624c4.608 0 9.216 4.608 9.216 9.072 0 4.224-4.608 7.68-9.216 7.68h-32.624v26.864c0 4.48-3.184 7.92-7.664 7.92-5.632 0-9.072-3.44-9.072-7.92v-72.672c0-4.592 3.456-7.936 9.072-7.936h44.912c5.632 0 8.96 3.344 8.96 7.936 0 4.096-3.328 8.704-8.96 8.704h-37.248v.016z"
                                            fill="#fff"
                                          />
                                          <path
                                            d="M400 432H96v16h304c8.8 0 16-7.2 16-16v-16c0 8.8-7.2 16-16 16z"
                                            fill="#cad1d8"
                                          />
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {detailsSchool?.plantel3 && (
                            <div class="col-md-4 col-xl-3 d-flex justify-content-start align-items-center mb-4 h-100">
                              <div class="card text-center">
                                <div class="card-header">
                                  <b>
                                    Plantel: {detailsSchool?.name}
                                    de {detailsSchool?.province}
                                  </b>
                                </div>
                                <div class="card-body">
                                  <div class="row align-items-center mb-3">
                                    <div class="col">
                                      <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                                        Convocatoria abierta
                                      </div>
                                    </div>
                                  </div>
                                  <div class="row align-items-center">
                                    <div class="col">
                                      <a
                                        target="_blank"
                                        href={detailsSchool?.plantel3}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          class="card-pdf"
                                          x="48"
                                          y="48"
                                          viewBox="0 0 512 512"
                                        >
                                          <path
                                            d="M128 0c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32V128L352 0H128z"
                                            fill="#e2e5e7"
                                          />
                                          <path
                                            d="M384 128h96L352 0v96c0 17.6 14.4 32 32 32z"
                                            fill="#b0b7bd"
                                          />
                                          <path
                                            fill="#cad1d8"
                                            d="M480 224l-96-96h96z"
                                          />
                                          <path
                                            d="M416 416c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V256c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v160z"
                                            fill="#f15642"
                                          />
                                          <path
                                            d="M101.744 303.152c0-4.224 3.328-8.832 8.688-8.832h29.552c16.64 0 31.616 11.136 31.616 32.48 0 20.224-14.976 31.488-31.616 31.488h-21.36v16.896c0 5.632-3.584 8.816-8.192 8.816-4.224 0-8.688-3.184-8.688-8.816v-72.032zm16.88 7.28v31.872h21.36c8.576 0 15.36-7.568 15.36-15.504 0-8.944-6.784-16.368-15.36-16.368h-21.36zM196.656 384c-4.224 0-8.832-2.304-8.832-7.92v-72.672c0-4.592 4.608-7.936 8.832-7.936h29.296c58.464 0 57.184 88.528 1.152 88.528h-30.448zm8.064-72.912V368.4h21.232c34.544 0 36.08-57.312 0-57.312H204.72zm99.152 1.024v20.336h32.624c4.608 0 9.216 4.608 9.216 9.072 0 4.224-4.608 7.68-9.216 7.68h-32.624v26.864c0 4.48-3.184 7.92-7.664 7.92-5.632 0-9.072-3.44-9.072-7.92v-72.672c0-4.592 3.456-7.936 9.072-7.936h44.912c5.632 0 8.96 3.344 8.96 7.936 0 4.096-3.328 8.704-8.96 8.704h-37.248v.016z"
                                            fill="#fff"
                                          />
                                          <path
                                            d="M400 432H96v16h304c8.8 0 16-7.2 16-16v-16c0 8.8-7.2 16-16 16z"
                                            fill="#cad1d8"
                                          />
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </section>
   
        </Accordion.Body>
      </Accordion.Item>

      {detailsSchool?.postgrado1 || detailsSchool?.postgrado2 ? (
      <Accordion.Item eventKey="1">
        <Accordion.Header> Posgrados (maestría / doctorado)</Accordion.Header>
        <Accordion.Body>
        <section data-aos="fade-up" class="container">
                        <div class="row my-3">
                          {detailsSchool?.postgrado2 ? (
                            <div class="col-md-4 col-xl-3 d-flex justify-content-start align-items-center mb-4 h-100">
                              <div class="card text-center">
                                <div class="card-header">
                                  <b>Posgrado: Maestría en Educación</b>
                                </div>
                                <div class="card-body">
                                  <div class="row align-items-center mb-3">
                                    <div class="col">
                                      <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                                        Convocatoria abierta
                                      </div>
                                    </div>
                                  </div>
                                  <div class="row align-items-center">
                                    <div class="col">
                                      <a
                                        target="_blank"
                                        href={detailsSchool?.postgrado1}
                                      >
                                        <svg
                                          width="48"
                                          height="48"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g id="Interface / External_Link">
                                            <path
                                              id="Vector"
                                              d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                                              stroke="#000000"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {detailsSchool?.postgrado2 ? (
                            <div class="col-md-4 col-xl-3 d-flex justify-content-start align-items-center mb-4 h-100">
                              <div class="card text-center">
                                <div class="card-header">
                                  <b>
                                    Posgrado: Maestría en Liderazgo y
                                    Transformación Educativa.
                                  </b>
                                </div>
                                <div class="card-body">
                                  <div class="row align-items-center mb-3">
                                    <div class="col">
                                      <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                                        Convocatoria abierta
                                      </div>
                                    </div>
                                  </div>
                                  <div class="row align-items-center">
                                    <div class="col">
                                      <a
                                        target="_blank"
                                        href={detailsSchool?.postgrado2}
                                      >
                                        <svg
                                          width="48"
                                          height="48"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g id="Interface / External_Link">
                                            <path
                                              id="Vector"
                                              d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                                              stroke="#000000"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </section>
        </Accordion.Body>
      </Accordion.Item>
      ) : null}




{detailsSchool?.beca1 || detailsSchool?.beca2 ? (

  
  
  <Accordion.Item eventKey="2">
        <Accordion.Header>Becas</Accordion.Header>
        <Accordion.Body>
        <section data-aos="fade-up" class="container">
                      <div class="row my-3">
                        {detailsSchool?.beca1 ? (
                          <div class="col-md-4 col-xl-3 d-flex justify-content-start align-items-center mb-4 h-100">
                            <div class="card text-center">
                              <div class="card-header">
                                <b>Beca: de exención</b>
                              </div>
                              <div class="card-body">
                                <a target="_blank" href={detailsSchool?.beca1}>
                                  <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g id="Interface / External_Link">
                                      <path
                                        id="Vector"
                                        d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                                        stroke="#000000"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </g>
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        <div class="col-md-4 col-xl-3 d-flex justify-content-start align-items-center mb-4 h-100">
                          {detailsSchool?.beca2 ? (
                            <div class="card text-center">
                              <div class="card-header">
                                <b>Beca: manutención y apoyo para transporte</b>
                              </div>
                              <div class="card-body">
                                <a target="_blank" href={detailsSchool?.beca2}>
                                  <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g id="Interface / External_Link">
                                      <path
                                        id="Vector"
                                        d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                                        stroke="#000000"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </g>
                                  </svg>
                                </a>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </section>
        </Accordion.Body>
      </Accordion.Item>
):null}


      </Accordion>
                 
                  </div>
                 
                </div>
              ) : null}
              

              <section id="services" class="services section light-background">
                <div class="container section-title" data-aos="fade-up">
                  <h2>Historia a través del tiempo</h2>
                </div>

                <div class="container" data-aos="fade-up">
                  <div class="row no-gutters">
                    <div class="col-12 linea-tiempo ">
                      <ul class="timeline ms-2">
                        <li class="timeline-item left">
                          <div class="timeline-body d-md-flex justify-content-end">
                            <div class="timeline-meta">
                              <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">
                                <span className="number-history">1983 </span>
                              </div>
                            </div>
                            <div class="timeline-content timeline-indicator">
                              <Card className="card">
                                <CardMedia
                                  component="img"
                                  height="250"
                                  image={require("../../assets/img/escuelaQueretaro/imagen1.png")}
                                  alt="Historia"
                                />
                                <CardContent>
                                  <Typography
                                    variant="body2"
                                    class="card-title mb-2 text-align-center"
                                  >
                                    Primera institución encargada de la
                                    formación de los maestros{" "}
                                  </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                  <ExpandMore
                                    expand={expanded[1]}
                                    onClick={() => handleExpandClick(1)}
                                    aria-expanded={expanded[1]}
                                    aria-label="show more"
                                  >
                                    <ExpandMoreIcon />
                                  </ExpandMore>
                                </CardActions>
                                <Collapse
                                  in={expanded[1]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <CardContent>
                                    <Typography
                                      sx={{ marginBottom: 2 }}
                                      class="card-text m-0"
                                    >
                                      <ul>
                                        <li>
                                          11 de abril: se publica el Acuerdo No.
                                          101 en el DOF, en el que se ordena la
                                          desconcentración de los cursos
                                          intensivos para profesores foráneos
                                          con el propósito de evitar gastos de
                                          traslado, hospedaje y alimentación de
                                          los docentes. Para esto la Escuela
                                          Normal Superior de México deja de
                                          tener injerencia en la organización e
                                          impartición de los cursos intensivos y
                                          se establecen sedes en Sonora,
                                          Veracruz, Aguascalientes y Querétaro.
                                        </li>

                                        <li>
                                          Nace la Escuela Normal Superior
                                          Federal para cursos intensivos en
                                          Querétaro con tres departamentos de
                                          Control escolar, Titulación e
                                          Investigación, Área académica y
                                          Planeación Educativa.
                                        </li>

                                        <li>
                                          1 de julio: Se establece la Comisión
                                          que se encargará de la elaboración del
                                          proyecto de reestructuración académica
                                          y admisnistrativa de la ENSM, debido a
                                          su falta de propuesta propia desde
                                          1976, por lo que se continuaban usando
                                          los mismo planes de estudio de la
                                          reforma realizada en 1959, causando
                                          que el egresado de la ENSM no reuniera
                                          el mínimo académico necesario.
                                        </li>

                                        <li>
                                          Se modifica el plan de estudios de las
                                          escuelas normales, y quedan
                                          conformados en dos líneas generales:
                                          tronco común y troco diferencial.
                                        </li>

                                        <li></li>
                                      </ul>
                                    </Typography>
                                  </CardContent>
                                </Collapse>
                              </Card>
                            </div>
                          </div>
                        </li>
                        <li class="timeline-item right">
                          <div class="timeline-body ">
                            <div class="timeline-meta">
                              <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">
                                <span className="number-history">1984 </span>
                              </div>
                            </div>
                            <div class="timeline-content timeline-indicator">
                              <Card className="card">
                                <CardMedia
                                  component="img"
                                  height="250"
                                  image={require("../../assets/img/escuelaQueretaro/imagen2.png")}
                                  alt="Historia"
                                />
                                <CardContent>
                                  <Typography
                                    variant="body2"
                                    class="card-title mb-2 text-align-center"
                                  >
                                    Creación del Consejo Nacional de la
                                    Educación Superior{" "}
                                  </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                  <ExpandMore
                                    expand={expanded[2]}
                                    onClick={() => handleExpandClick(2)}
                                    aria-expanded={expanded[2]}
                                    aria-label="show more"
                                  >
                                    <ExpandMoreIcon />
                                  </ExpandMore>
                                </CardActions>
                                <Collapse
                                  in={expanded[2]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <CardContent>
                                    <Typography
                                      sx={{ marginBottom: 2 }}
                                      class="card-text m-0"
                                    >
                                      <ul>
                                        <li>
                                          23 de marzo: La educación normal
                                          básica queda elevada a nivel
                                          licenciatura.
                                        </li>

                                        <li>
                                          Los alumnos de cursos intensivos de la
                                          Escuela Normal Superior en Querétaro a
                                          través de los programas denominados
                                          Consejo Superior Estudiantil
                                          Coordinadora, le presentan al Director
                                          un pliego petitorio en el cual se
                                          anotan al menos 30 demandas respecto a
                                          temas económicos, académicos,
                                          políticos y admisistrativos, demandas
                                          que años anteriores había planteado la
                                          Escuela Normal Superior de México, si
                                          embargo no tuvieron la posibilidad de
                                          seguir luchando por sus demandas.
                                        </li>

                                        <li>
                                          Se establece que las escuelas normales
                                          debían realizar tanto actividades de
                                          docencia como de investigación
                                          educativa y de difusión cultural.
                                        </li>
                                      </ul>
                                    </Typography>
                                  </CardContent>
                                </Collapse>
                              </Card>
                            </div>
                          </div>
                        </li>
                        <li class="timeline-item left">
                          <div class="timeline-body d-md-flex justify-content-end">
                            <div class="timeline-meta">
                              <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">
                                <span className="number-history">1923 </span>
                              </div>
                            </div>
                            <div class="timeline-content timeline-indicator">
                              <Card className="card">
                                <CardMedia
                                  component="img"
                                  height="250"
                                  image={require("../../assets/img/escuelaQueretaro/imagen3.png")}
                                  alt="Historia"
                                />
                                <CardContent>
                                  <Typography
                                    variant="body2"
                                    class="card-title mb-2 text-align-center"
                                  >
                                    Origen y Evolución del IMPES hacia la ENS{" "}
                                  </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                  <ExpandMore
                                    expand={expanded[3]}
                                    onClick={() => handleExpandClick(3)}
                                    aria-expanded={expanded[3]}
                                    aria-label="show more"
                                  >
                                    <ExpandMoreIcon />
                                  </ExpandMore>
                                </CardActions>
                                <Collapse
                                  in={expanded[3]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <CardContent>
                                    <Typography
                                      sx={{ marginBottom: 2 }}
                                      class="card-text m-0"
                                    >
                                      <ul>
                                        <li>
                                          La duración de las licenciaturas pasan
                                          a ser de 4 años en lugar de 6, además
                                          la modalidad pasa a ser
                                          semiescolarizada.
                                        </li>
                                      </ul>
                                    </Typography>
                                  </CardContent>
                                </Collapse>
                              </Card>
                            </div>
                          </div>
                        </li>
                        <li class="timeline-item right">
                          <div class="timeline-body ">
                            <div class="timeline-meta">
                              <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">
                                <span className="number-history">2000 </span>
                              </div>
                            </div>
                            <div class="timeline-content timeline-indicator">
                              <Card className="card">
                                <CardMedia
                                  component="img"
                                  height="250"
                                  image={require("../../assets/img/escuelaQueretaro/imagen4.png")}
                                  alt="Historia"
                                />
                                <CardContent>
                                  <Typography
                                    variant="body2"
                                    class="card-title mb-2 text-align-center"
                                  >
                                    La Enseñanza Normal Superior según la Ley
                                    Orgánica de Educación{" "}
                                  </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                  <ExpandMore
                                    expand={expanded[4]}
                                    onClick={() => handleExpandClick(4)}
                                    aria-expanded={expanded[4]}
                                    aria-label="show more"
                                  >
                                    <ExpandMoreIcon />
                                  </ExpandMore>
                                </CardActions>
                                <Collapse
                                  in={expanded[4]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <CardContent>
                                    <Typography
                                      sx={{ marginBottom: 2 }}
                                      class="card-text m-0"
                                    >
                                      <ul>
                                        <li>
                                          Amplía su oferta académica ofreciendo
                                          estudios a nivel licenciatura y
                                          maestría, así como cursos, talleres y
                                          diplomados que coadyuvan a la
                                          actualización y capacitación del
                                          docente con el propósito de cumplir a
                                          cabalidad con lo dispuesto en el
                                          artículo 3 de la CPEUM.
                                        </li>
                                      </ul>
                                    </Typography>
                                  </CardContent>
                                </Collapse>
                              </Card>
                            </div>
                          </div>
                        </li>
                        <li class="timeline-item left">
                          <div class="timeline-body d-md-flex justify-content-end">
                            <div class="timeline-meta">
                              <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">
                                <span className="number-history">2014 </span>
                              </div>
                            </div>
                            <div class="timeline-content timeline-indicator">
                              <Card className="card">
                                <CardMedia
                                  component="img"
                                  height="250"
                                  image={require("../../assets/img/historia5.jpg")}
                                  alt="Historia"
                                />
                                <CardContent>
                                  <Typography
                                    variant="body2"
                                    class="card-title mb-2 text-align-center"
                                  >
                                    La ENS en la Ley Orgánica de Educación de
                                    1942{" "}
                                  </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                  <ExpandMore
                                    expand={expanded[5]}
                                    onClick={() => handleExpandClick(5)}
                                    aria-expanded={expanded[5]}
                                    aria-label="show more"
                                  >
                                    <ExpandMoreIcon />
                                  </ExpandMore>
                                </CardActions>
                                <Collapse
                                  in={expanded[5]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <CardContent>
                                    <Typography
                                      sx={{ marginBottom: 2 }}
                                      class="card-text m-0"
                                    >
                                      <ul>
                                        <li>
                                          Se comienza la construcción de las
                                          nuevas instalaciones de la Escuela
                                          Normal Superior de Querétaro, ubicada
                                          en Pie de la Cuesta.
                                        </li>
                                      </ul>
                                    </Typography>
                                  </CardContent>
                                </Collapse>
                              </Card>
                            </div>
                          </div>
                        </li>
                        <li class="timeline-item right">
                          <div class="timeline-body ">
                            <div class="timeline-meta">
                              <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">
                                <span className="number-history">2015 </span>
                              </div>
                            </div>
                            <div class="timeline-content timeline-indicator">
                              <Card className="card">
                                <CardMedia
                                  component="img"
                                  height="250"
                                  image={require("../../assets/img/historia6.jpg")}
                                  alt="Historia"
                                />
                                <CardContent>
                                  <Typography
                                    variant="body2"
                                    class="card-title mb-2 text-align-center"
                                  >
                                    Creación de la ENS de Coahuila{" "}
                                  </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                  <ExpandMore
                                    expand={expanded[6]}
                                    onClick={() => handleExpandClick(6)}
                                    aria-expanded={expanded[6]}
                                    aria-label="show more"
                                  >
                                    <ExpandMoreIcon />
                                  </ExpandMore>
                                </CardActions>
                                <Collapse
                                  in={expanded[6]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <CardContent>
                                    <Typography
                                      sx={{ marginBottom: 2 }}
                                      class="card-text m-0"
                                    >
                                      <ul>
                                        <li>
                                          Se abre la modalidad presencial.
                                        </li>

                                        <li>
                                          La ENSQ de incorpora a la comisión de
                                          Educación de la Coparmex colabornado
                                          en actividades interuniversitarias .
                                        </li>

                                        <li>
                                          a ENSQ participó en la primera Sesión
                                          Plenaria de la Comisión Estatal para
                                          la Planeación de Educación Superior
                                          (COEPES).
                                        </li>

                                        <li>
                                          Se entregan las instalaciones de la
                                          ENSQ en Pie de la Cuesta.
                                        </li>

                                        <li>
                                          Agosto: se da inicio a la oferta
                                          educativa de la Licenciatura en
                                          Educación Secundaria en modalidad
                                          escolarizada con una duración de 4
                                          años, con las especialidades de
                                          Matemáticas y Español.
                                        </li>

                                        <li>
                                          Se cierra la oferta educativa en
                                          modalidad mixta debido a que ya no
                                          existía una población de profesores
                                          que no contaran con alguna
                                          licenciatura, y esta modalidad estaba
                                          durugida a docentes frente a grupo que
                                          no contaban con licenciatura.
                                        </li>
                                      </ul>
                                    </Typography>
                                  </CardContent>
                                </Collapse>
                              </Card>
                            </div>
                          </div>
                        </li>
                        <li class="timeline-item left">
                          <div class="timeline-body d-md-flex justify-content-end">
                            <div class="timeline-meta">
                              <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">
                                <span className="number-history">2016 </span>
                              </div>
                            </div>
                            <div class="timeline-content timeline-indicator">
                              <Card className="card">
                                <CardMedia
                                  component="img"
                                  height="250"
                                  image={require("../../assets/img/historia7.jpg")}
                                  alt="Historia"
                                />
                                <CardContent>
                                  <Typography
                                    variant="body2"
                                    class="card-title mb-2 text-align-center"
                                  >
                                    Fundación de escuelas{" "}
                                  </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                  <ExpandMore
                                    expand={expanded[7]}
                                    onClick={() => handleExpandClick(7)}
                                    aria-expanded={expanded[7]}
                                    aria-label="show more"
                                  >
                                    <ExpandMoreIcon />
                                  </ExpandMore>
                                </CardActions>
                                <Collapse
                                  in={expanded[7]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <CardContent>
                                    <Typography
                                      sx={{ marginBottom: 2 }}
                                      class="card-text m-0"
                                    >
                                      <ul>
                                        <li>
                                          Se implementa la Licenciatura en
                                          Educación secundaria en modalidad
                                          escolarizada.
                                        </li>
                                        <li>
                                          Egresa la primera generación de
                                          modalidad presencial.
                                        </li>

                                        <li>
                                          La ESNQ y el Centro Educativo y
                                          Cultural del Estado de Querétaro
                                          "Manuel Gómez Morín" (CECEQ),
                                          implementaron el programa piloto
                                          "Apoyo a Tareas de Biblioteca", a
                                          partir de la necesidad de atender
                                          algunas recomendaciones
                                          internacionales sobre el uso de
                                          bibliotecas públicas en la
                                          construcción de conocimiento.
                                        </li>

                                        <li>
                                          Se actualiza la Maestría en Educación
                                        </li>
                                      </ul>
                                    </Typography>
                                  </CardContent>
                                </Collapse>
                              </Card>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
             
              {(detailsSchool.alumnos && detailsSchool.alumnos.length > 0) ||
              (detailsSchool.alumnas && detailsSchool.alumnas.length > 0) ||
              (detailsSchool.egresados && detailsSchool.egresados.length > 0) ||
              (detailsSchool.egresadas &&
                detailsSchool.egresadas.length > 0) ? (
                <div class="row">
                  <div id="item-alumnos" class="py-5">
                    <div data-aos="fade-up" class="container">
                      <h2>Histórico de alumnos </h2>
                    </div>
                    <div class="accordion px-3" id="accordionAlumnos">
                      <div id="item-numero-alumnos-matriculados">
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="headingAlumnos">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseAlumnos"
                              aria-expanded="true"
                              aria-controls="collapseAlumnos"
                            >
                              Alumnos matriculados: Modalidad escolarizada.
                            </button>
                          </h2>
                          <div
                            id="collapseAlumnos"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingAlumnos"
                            data-bs-parent="#accordionAlumnos"
                          >
                            <div class="accordion-body">
                              <section class="container">
                                <div class="row mb-3">
                                  <div class="col d-flex align-items-center">
                                    <h4>Alumnos matriculados: Modalidad escolarizada.</h4>
                                  </div>
                                </div>
                            
                                {detailsSchool && detailsSchool?.alumnos && (
                                  <div className="cardalumn-container">
                                    {detailsSchool.alumnos &&
                                      detailsSchool.alumnos.map(
                                        (data, index) => (
                                          <div
                                            className="row justify-content-center"
                                            key={index}
                                          >
                                            <div className="col-md-6 col-lg-3 my-3">
                                              <div className="alumn-card text-center shadow-sm">
                                                <div className="card-body">
                                                  <p className="card-text mb-0">
                                                    Ciclo escolar{" "}
                                                    {(data.fechaDesdeAlumnos &&
                                                      data.fechaDesdeAlumnos.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}{" "}
                                                    -{" "}
                                                    {(data.fechaDesdeAlumnos &&
                                                      data.fechaDesdeAlumnos.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}
                                                  </p>
                                                  <hr />
                                                  <p>
                                                    <b className="fs-2 text-primary mb-2">
                                                      {data.cantidadAlumnos}
                                                      <br />
                                                      <span className="fs-4 fw-medium">
                                                        Alumnos
                                                      </span>
                                                    </b>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>
                                )}

                                {detailsSchool?.alumnas && (
                                  <div className="cardalumn-container">
                                    {detailsSchool?.alumnas &&
                                      detailsSchool.alumnas.map(
                                        (data, index) => (
                                          <div
                                            className="row justify-content-center"
                                            key={index}
                                          >
                                            <div className="col-md-6 col-lg-3 my-3">
                                              <div className="alumn-card text-center shadow-sm">
                                                <div className="card-body">
                                                  <p className="card-text mb-0">
                                                    Ciclo escolar{" "}
                                                    {(data.fechaDesdeAlumnas &&
                                                      data.fechaDesdeAlumnas.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}{" "}
                                                    -{" "}
                                                    {(data.fechaDesdeAlumnas &&
                                                      data.fechaDesdeAlumnas.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}
                                                  </p>
                                                  <hr />
                                                  <p>
                                                    <b className="fs-2 text-primary mb-2">
                                                      {data.cantidadAlumnas}
                                                      <br />
                                                      <span className="fs-4 fw-medium">
                                                        Alumnas
                                                      </span>
                                                    </b>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>
                                )}
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div id="item-numero-alumnos-matriculados">
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="headingAlumnos2">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseAlumnos2"
                              aria-expanded="true"
                              aria-controls="collapseAlumnos2"
                            >
                              Alumnos matriculados: Modalidad Mixta.
                            </button>
                          </h2>
                          <div
                            id="collapseAlumnos2"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingAlumnos2"
                            data-bs-parent="#accordionAlumnos2"
                          >
                            <div class="accordion-body">
                              <section class="container">
                                <div class="row mb-3">
                                  <div class="col d-flex align-items-center">
                                    <h4>Alumnos matriculados: Modalidad Mixta.</h4>
                                  </div>
                                </div>
                          
                                {detailsSchool && detailsSchool?.alumnos && (
                                  <div className="cardalumn-container">
                                    {detailsSchool.alumnos &&
                                      detailsSchool.alumnos.map(
                                        (data, index) => (
                                          <div
                                            className="row justify-content-center"
                                            key={index}
                                          >
                                            <div className="col-md-6 col-lg-3 my-3">
                                              <div className="alumn-card text-center shadow-sm">
                                                <div className="card-body">
                                                  <p className="card-text mb-0">
                                                    Ciclo escolar{" "}
                                                    {(data.fechaDesdeAlumnos &&
                                                      data.fechaDesdeAlumnos.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}{" "}
                                                    -{" "}
                                                    {(data.fechaDesdeAlumnos &&
                                                      data.fechaDesdeAlumnos.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}
                                                  </p>
                                                  <hr />
                                                  <p>
                                                    <b className="fs-2 text-primary mb-2">
                                                      {data.cantidadAlumnos}
                                                      <br />
                                                      <span className="fs-4 fw-medium">
                                                        Alumnos
                                                      </span>
                                                    </b>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>
                                )}

                                {detailsSchool?.alumnas && (
                                  <div className="cardalumn-container">
                                    {detailsSchool?.alumnas &&
                                      detailsSchool.alumnas.map(
                                        (data, index) => (
                                          <div
                                            className="row justify-content-center"
                                            key={index}
                                          >
                                            <div className="col-md-6 col-lg-3 my-3">
                                              <div className="alumn-card text-center shadow-sm">
                                                <div className="card-body">
                                                  <p className="card-text mb-0">
                                                    Ciclo escolar{" "}
                                                    {(data.fechaDesdeAlumnas &&
                                                      data.fechaDesdeAlumnas.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}{" "}
                                                    -{" "}
                                                    {(data.fechaDesdeAlumnas &&
                                                      data.fechaDesdeAlumnas.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}
                                                  </p>
                                                  <hr />
                                                  <p>
                                                    <b className="fs-2 text-primary mb-2">
                                                      {data.cantidadAlumnas}
                                                      <br />
                                                      <span className="fs-4 fw-medium">
                                                        Alumnas
                                                      </span>
                                                    </b>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>
                                )}
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>

                      {detailsSchool?.egresados || detailsSchool?.egresadas ? (
                        <div id="item-numero-maestros-egresados-mixta">
                          <div class="accordion-item">
                            <h2
                              class="accordion-header"
                              id="headingMaestrosMixta"
                            >
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseMaestrosMixta"
                                aria-expanded="false"
                                aria-controls="collapseMaestrosMixta"
                              >
                               Alumnos egresados y titulados: Modalidad escolarizada
                              </button>
                            </h2>
                            <div
                              id="collapseMaestrosMixta"
                              class="accordion-collapse collapse"
                              aria-labelledby="headingMaestrosMixta"
                              data-bs-parent="#accordionAlumnos"
                            >
                              <div class="accordion-body">
                                <section class="container">
                                  <div class="row my-3">
                                    <div class="col d-flex align-items-center">
                                      <h4>Alumnos egresados y titulados: Modalidad escolarizada</h4>
                                    </div>
                                  </div>
                            
                                  <div className="cardalumn-container">
                                    {detailsSchool?.egresados &&
                                      detailsSchool.egresados.map(
                                        (data, index) => (
                                          <div
                                            className="row justify-content-center d-flex"
                                            key={index}
                                          >
                                            <div className="col-md-6 col-lg-3 my-3 ">
                                              <div className="alumn-card text-center shadow-sm">
                                                <div className="card-body">
                                                  <p className="card-text mb-0">
                                                    Ciclo escolar{" "}
                                                    {(data.fechaDesdeEgresados &&
                                                      data.fechaHastaEgresados.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}{" "}
                                                    -{" "}
                                                    {(data.fechaDesdeEgresados &&
                                                      data.fechaHastaEgresados.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}
                                                  </p>
                                                  <hr />
                                                  <p>
                                                    <b className="fs-2 text-primary mb-2">
                                                      {
                                                        data.cantidadAlumnosEgresados
                                                      }
                                                      <br />
                                                      <span className="fs-4 fw-medium">
                                                        Alumnos
                                                      </span>
                                                    </b>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>
                                  <div className="cardalumn-container">
                                    {detailsSchool?.egresadas &&
                                      detailsSchool.egresadas.map(
                                        (data, index) => (
                                          <div
                                            className="row justify-content-center d-flex"
                                            key={index}
                                          >
                                            <div className="col-md-6 col-lg-3 my-3 ">
                                              <div className="alumn-card text-center shadow-sm">
                                                <div className="card-body">
                                                  <p className="card-text mb-0">
                                                    Ciclo escolar{" "}
                                                    {(data.fechaDesdeEgresadas &&
                                                      data.fechaHastaEgresadas.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}{" "}
                                                    -{" "}
                                                    {(data.fechaDesdeEgresadas &&
                                                      data.fechaHastaEgresadas.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}
                                                  </p>
                                                  <hr />
                                                  <p>
                                                    <b className="fs-2 text-primary mb-2">
                                                      {
                                                        data.cantidadAlumnasEgresadas
                                                      }
                                                      <br />
                                                      <span className="fs-4 fw-medium">
                                                        Alumnas
                                                      </span>
                                                    </b>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <hr />
                    </div>
                  </div>
                </div>
              ) : null}

          {/*     <div
                data-aos="fade-up"
                data-aos-duration="3000"
                class="container"
              >
                <h2 style={{ textAlign: "center" }}>NOMBRAMIENTOS</h2>
              </div>
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>NOMBRE</th>
                      <th>NOMBRAMIENTO </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dato 1</td>
                      <td>Dato 2</td>
                      <td>Dato 2</td>
                    </tr>
                    <tr>
                      <td>Dato 3</td>
                      <td>Dato 4</td>
                      <td>Dato 4</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}

            {/*   <div
                data-aos="fade-up"
                data-aos-duration="3000"
                class="container"
              >
                <h2 style={{ textAlign: "center" }}>
                  No. DE DOCENTES CON ESPECIALIDAD
                </h2>
              </div>
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>OFERTA</th>
                      <th>ESPECIALIDAD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dato 1</td>
                      <td>Dato 2</td>
                      <td>Dato 2</td>
                    </tr>
                    <tr>
                      <td>Dato 3</td>
                      <td>Dato 4</td>
                      <td>Dato 4</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}

              {(detailsSchool.profesoresMaestrias &&
                detailsSchool.profesoresMaestrias.length > 0) ||
              (detailsSchool.profesores &&
                detailsSchool.profesores.length > 0) ||
              (detailsSchool.profesoresConDoctorados &&
                detailsSchool.profesoresConDoctorados.length > 0) ? (
                <div id="item-edades" class="my-5">
                  <div data-aos="fade-up" class="container">
                    <h2>Profesorado </h2>
                  </div>

                  <div class="accordion px-3" id="accordionProfesores">
                    <div id="item-edades-profesorado-actual">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="profesoradoActual">
                          <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#colapsarActual"
                            aria-expanded="true"
                            aria-controls="colapsarActual"
                          >
                            Profesorado Actual
                          </button>
                        </h2>
                        <div
                          id="colapsarActual"
                          class="accordion-collapse collapse"
                          aria-labelledby="profesoradoActual"
                          data-bs-parent="#accordionProfesores"
                        >
                          <div className="accordion-body">
                            <section className="container">
                              <h4 className="mb-4">
                                Lista de profesores actual
                              </h4>

                              {detailsSchool?.profesores &&
                                detailsSchool?.profesores.map((data, index) => (
                                  <div
                                    key={index}
                                    className="row my-3 justify-content-center"
                                  >
                                    <div className="col-md-7 d-flex justify-content-center align-items-center">
                                      <div
                                        id="simple-list-item-3"
                                        className="card text-center w-100"
                                      >
                                        <div className="card-header fs-3 fw-bold">
                                          Lista de nombres y edades del ciclo{" "}
                                          {data.fechaDesde} - {data.fechaHasta}
                                        </div>
                                        <div className="card-body m-0 p-0">
                                          {/* Lista ordenada con los profesores */}
                                          <ol className="list-group">
                                            {data.textProfeactuales.map(
                                              (row, index) => (
                                                <li
                                                  key={index}
                                                  className="list-group-item"
                                                >
                                                  {index + 1}. {row}
                                                </li>
                                              )
                                            )}
                                          </ol>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </section>
                          </div>
                        </div>
                      </div>
                    </div>


                    <Accordion>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Edades del profesorado</Accordion.Header>
        <Accordion.Body>
        <div className="tabla-container">
      <p className="tabla-periodo">PERIODO: 2023-2024</p>
      <table className="tabla">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nombre</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cecilia Alejandra De Jesús Martínez</td>
            <td>27</td>
          </tr>
          <tr>
            <td>2</td>
            <td>María del Mar Estrada Rebull</td>
            <td>38</td>
          </tr>
          <tr className="no-border">
            <td>3</td>
            <td>Estefanny Delgado Rivera</td>
            <td>32</td>
          </tr>
        </tbody>
      </table>
    </div>
        </Accordion.Body>
      </Accordion.Item>




      {detailsSchool.profesoresMaestrias &&
                    detailsSchool.profesoresMaestrias.length > 0 ? (
      <Accordion.Item eventKey="5">
        <Accordion.Header>Con maestría </Accordion.Header>
        <Accordion.Body>
        <div className="tabla-container">
      <p className="tabla-periodo">PERIODO: 2023-2024</p>
      <table className="tabla">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nombre</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cecilia Alejandra De Jesús Martínez</td>
            <td>27</td>
          </tr>
          <tr>
            <td>2</td>
            <td>María del Mar Estrada Rebull</td>
            <td>38</td>
          </tr>
          <tr className="no-border">
            <td>3</td>
            <td>Estefanny Delgado Rivera</td>
            <td>32</td>
          </tr>
        </tbody>
      </table>
    </div>
        </Accordion.Body>
      </Accordion.Item>
                    ) : null}


{detailsSchool.profesoresConDoctorados &&
                    detailsSchool.profesoresConDoctorados.length > 0 ? (
      <Accordion.Item eventKey="6">
        <Accordion.Header>Con doctorado </Accordion.Header>
        <Accordion.Body>
        <div className="tabla-container">
      <p className="tabla-periodo">PERIODO: 2023-2024</p>
      <table className="tabla">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nombre</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cecilia Alejandra De Jesús Martínez</td>
            <td>27</td>
          </tr>
          <tr>
            <td>2</td>
            <td>María del Mar Estrada Rebull</td>
            <td>38</td>
          </tr>
          <tr className="no-border">
            <td>3</td>
            <td>Estefanny Delgado Rivera</td>
            <td>32</td>
          </tr>
        </tbody>
      </table>
    </div>
        </Accordion.Body>
      </Accordion.Item>
                    ) : null}





      <Accordion.Item eventKey="7">
        <Accordion.Header> Matricula docente</Accordion.Header>
        <Accordion.Body>
  
                                  <div className="cardalumn-container">
                                    {detailsSchool.alumnos &&
                                      detailsSchool.alumnos.map(
                                        (data, index) => (
                                          <div
                                            className="row justify-content-center"
                                            key={index}
                                          >
                                            <div className="col-md-6 col-lg-3 my-3">
                                              <div className="alumn-card text-center shadow-sm">
                                                <div className="card-body">
                                                  <p className="card-text mb-0">
                                                    Ciclo escolar{" "}
                                                    {(data.fechaDesdeAlumnos &&
                                                      data.fechaDesdeAlumnos.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}{" "}
                                                    -{" "}
                                                    {(data.fechaDesdeAlumnos &&
                                                      data.fechaDesdeAlumnos.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}
                                                  </p>
                                                  <hr />
                                                  <p>
                                                    <b className="fs-2 text-primary mb-2">
                                                      {data.cantidadAlumnos}
                                                      <br />
                                                      <span className="fs-4 fw-medium">
                                                        Docentes
                                                      </span>
                                                    </b>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>

        </Accordion.Body>
      </Accordion.Item>



      <Accordion.Item eventKey="8">
        <Accordion.Header> Matrículas docentes con especialidad</Accordion.Header>
        <Accordion.Body>
        <div className="cardalumn-container">
                                    {detailsSchool.alumnos &&
                                      detailsSchool.alumnos.map(
                                        (data, index) => (
                                          <div
                                            className="row justify-content-center"
                                            key={index}
                                          >
                                            <div className="col-md-6 col-lg-3 my-3">
                                              <div className="alumn-card text-center shadow-sm">
                                                <div className="card-body">
                                                  <p className="card-text mb-0">
                                                    Ciclo escolar{" "}
                                                    {(data.fechaDesdeAlumnos &&
                                                      data.fechaDesdeAlumnos.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}{" "}
                                                    -{" "}
                                                    {(data.fechaDesdeAlumnos &&
                                                      data.fechaDesdeAlumnos.split(
                                                        "-"
                                                      )[0]) ||
                                                      ""}
                                                  </p>
                                                  <hr />
                                                  <p>
                                                    <b className="fs-2 text-primary mb-2">
                                                      {data.cantidadAlumnos}
                                                      <br />
                                                      <span className="fs-4 fw-medium">
                                                        Docentes
                                                      </span>
                                                    </b>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>

        </Accordion.Body>
      </Accordion.Item>
     
    </Accordion>


                 
                 
                  </div>
                </div>
              ) : null}

              {(detailsSchool.doctoresCandidatos &&
                detailsSchool.doctoresCandidatos.length > 0) ||
              (detailsSchool.doctoresJubilados &&
                detailsSchool.doctoresJubilados.length > 0) ? (
                <div class="row">
                  <div id="item-doctores" class="my-3">
                    <div
                      data-aos="fade-up"
                      data-aos-duration="3000"
                      class="container"
                    >
                      <h2>Doctores con SNI </h2>
                    </div>
                    <div class="accordion px-3" id="accordionDoctores">
                      <div id="item-doctores-jubilados">
                        <div class="accordion-item">
                          <h2
                            class="accordion-header"
                            id="headingDoctoresJubilados"
                          >
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseDoctoresJubilados"
                              aria-expanded="true"
                              aria-controls="collapseDoctoresJubilados"
                            >
                              Doctores con jubilados
                            </button>
                          </h2>
                          <div
                            id="collapseDoctoresJubilados"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingDoctoresJubilados"
                            data-bs-parent="#accordionDoctores"
                          >
                            <div class="accordion-body">
                              <section class="container">
                              <div className="doctor-tabla-container">
      <p className="doctor-tabla-periodo">Histórico</p>
      <table className="doctor-tabla">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nombre</th>
            <th>Nivel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cecilia Alejandra De Jesús Martínez</td>
            <td>Jubilado</td>
          </tr>
          <tr>
            <td>2</td>
            <td>María del Mar Estrada Rebull</td>
            <td>Jubilado</td>
          </tr>
          <tr className="no-border">
            <td>3</td>
            <td>Estefanny Delgado Rivera</td>
            <td>Jubilado</td>
          </tr>
        </tbody>
      </table>
    </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="item-doctores-candidatos">
                        <div class="accordion-item">
                          <h2
                            class="accordion-header"
                            id="headingDoctoresCandidatos"
                          >
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseDoctoresCandidatos"
                              aria-expanded="false"
                              aria-controls="collapseDoctoresCandidatos"
                            >
                              Doctores con candidatos
                            </button>
                          </h2>
                          <div
                            id="collapseDoctoresCandidatos"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingDoctoresCandidatos"
                            data-bs-parent="#accordionDoctores"
                          >
                            <div class="accordion-body">
                              <section class="container">
                              <div className="doctor-tabla-container">
      <p className="doctor-tabla-periodo">Actual</p>
      <table className="doctor-tabla">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nombre</th>
            <th>Nivel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cecilia Alejandra De Jesús Martínez</td>
            <td>Candidatos</td>
          </tr>
          <tr>
            <td>2</td>
            <td>María del Mar Estrada Rebull</td>
            <td>Jubilado</td>
          </tr>
          <tr className="no-border">
            <td>3</td>
            <td>Estefanny Delgado Rivera</td>
            <td>Candidatos</td>
          </tr>
        </tbody>
      </table>
    </div>
            
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

            



<br />




<Accordion >
      <Accordion.Item eventKey="9">
        <Accordion.Header>Cuerpos académicos
        </Accordion.Header>
        <Accordion.Body>
        <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  border: "1px solid black",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#003F82FF",
                      textAlign: "center",
                    }}
                  >
                    <th
                      style={{
                        padding: "10px",
                        fontSize: "1.2em",
                        border: "1px solid black",
                        color: "white"
                      }}
                    >
                      PERIODO
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        fontSize: "1.2em",
                        border: "1px solid black",
                        color: "white"

                      }}
                    >
                      Descripción
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        fontSize: "1.2em",
                        border: "1px solid black",
                        color: "white"

                      }}
                    >
                     Estado:
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px", color: "red", textAlign: "center" }}>
                      2023
                    </td>
                    <td
                      style={{ border: "1px solid black", padding: "5px",textAlign: "center",  }}
                    >
                    No cuenta con cuerpos academicos para la segunda mitad de 2024


                    </td>
                    <td
                      style={{ border: "1px solid black", padding: "5px", textAlign: "center" }}
                    >
                     s/d


                    </td>
                  </tr>
                
                </tbody>
              </table>
        </Accordion.Body>
      </Accordion.Item>




      <Accordion.Item eventKey="10">
        <Accordion.Header>Oferta académicos
        </Accordion.Header>
        <Accordion.Body>
        <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  border: "1px solid black",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#003F82FF",
                      textAlign: "center",
                    }}
                  >
                    <th
                      style={{
                        padding: "10px",
                        fontSize: "1.2em",
                        border: "1px solid black",
                        color: "white"
                      }}
                    >
                      N
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        fontSize: "1.2em",
                        border: "1px solid black",
                        color: "white"

                      }}
                    >
                      Oferta
                    </th>
                  
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px", textAlign: "center"}}>
                      1
                    </td>
                    <td
                      style={{ border: "1px solid black", padding: "5px", textAlign: "center" }}
                    >
                  Especialidad en Telesecundaria

                    </td>
                  
                  </tr>
                
                </tbody>
              </table>
        </Accordion.Body>
      </Accordion.Item>




      <Accordion.Item eventKey="11">
        <Accordion.Header>Historia
        </Accordion.Header>
        <Accordion.Body style={{border: "1px solid blue", padding: "10px", width: "50%", margin: "auto", marginTop: "10px"}}>
        La Escuela Normal Superior de Querétaro surgió en 1983 por parte del gobierno 
federal, la institución surge como consecuencia de la descentralización llegando 
al estado en forma de cursos intensivos enfocados en profesores frente a grupo. 
Los cursos se impartieron durante muchos años en la Universidad Autónoma de 
Querétaro en la cual llegaron a estudiar cerca de 1000 alumnos en los años 90s 
como parte de los cursos mixtos, la ENSQro durante sus primeros años 
compartió oferta educativa con la "Escuela Normal Superior de Querétaro A.C." 
una escuela de iniciativa privada que pertenecía al SNTE y que brindaba una 
alternativa a los cursos intensivos de la ENSM. 
La ENSQro cuanta hoy en día con instalaciones propias que le fueron otorgadas 
por la federación en la década de 2010, cuanta con múltiples edificios que 
albergan laboratorios, auditorio y biblioteca. A partir de que Normal obtuvo sus 
propias instalaciones se ha dedicado a incrementar la calidad académica por 
medio de publicaciones, congresos y fomento a cuerpos académicos.
        </Accordion.Body>
      </Accordion.Item>
    
    </Accordion>

           {/*    <table
                style={{
                  width: "50%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  border: "1px solid black",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#FFD966",
                      textAlign: "center",
                    }}
                  >
                    <th
                      colSpan="2"
                      style={{
                        padding: "10px",
                        fontSize: "1.2em",
                        border: "1px solid black",
                      }}
                    >
                      Medios de contacto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Correo:
                    </td>
                    <td
                      style={{ border: "1px solid black", padding: "5px" }}
                    ></td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Página web:
                    </td>
                    <td
                      style={{ border: "1px solid black", padding: "5px" }}
                    ></td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Número de teléfono:
                    </td>
                    <td
                      style={{ border: "1px solid black", padding: "5px" }}
                    ></td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Facebook:
                    </td>
                    <td
                      style={{ border: "1px solid black", padding: "5px" }}
                    ></td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Instagram:
                    </td>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      sadasdasdsad
                    </td>
                  </tr>
                </tbody>
              </table> */}

              <a
                href="#"
                id="scroll-top"
                class="scroll-top d-flex align-items-center justify-content-center"
              >
                <i class="bi bi-arrow-up-short">
                  <IoMdArrowUp className="icon-color" />
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetails;
