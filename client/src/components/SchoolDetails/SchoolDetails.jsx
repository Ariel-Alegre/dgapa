import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Global } from "../../assets/utils/utils";
import EmailIcon from "@mui/icons-material/Email";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

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
  const { schoolId } = useParams();
  const [detailsSchool, setDetailsSchool] = React.useState([]);
  const [center, setCenter] = React.useState(defaultCenter); // Coordenadas del mapa

  console.log(detailsSchool);
  React.useEffect(() => {
    Global();
  }, []);
  const OneSchool = async () => {
    const response = await axios.get(
      `https://dgapa-production.up.railway.app/api/detail-school/${schoolId}`
    );
    setDetailsSchool(response.data.data);
  };

  React.useEffect(() => {
    OneSchool();
  }, []);
  return (
    <div>
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
                <Link to="/contacto">Contacto</Link>
              </li>
            </ul>
            <BsList className="mobile-nav-toggle d-xl-none bi bi-list" />

          </nav>
        </div>
      </header>
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
                  <a class="vinculos nav-link" href="#item-datos-generales">
                    Datos generales
                  </a>
                  <a class="vinculos nav-link" href="#item-convocatorias">
                    Convocatorias
                  </a>
                  <nav class="nav nav-pills flex-column">
                    <a
                      class="vinculos nav-link ms-3"
                      href="#item-convocatorias-escuelas"
                    >
                      Escuelas normales superiores
                    </a>
                    <a
                      class="vinculos nav-link ms-3"
                      href="#item-convocatorias-posgrados"
                    >
                      Posgrados (maestría/doctorado)
                    </a>
                  </nav>
                  <a class="vinculos nav-link" href="#item-becas">
                    Becas
                  </a>
                  {/*  <a class="vinculos nav-link" href="#item-linea-tiempo">
                    Linea del tiempo
                  </a> */}
                  <a class="vinculos nav-link" href="#item-alumnos">
                    Histórico de alumnos
                  </a>
                  <nav class="nav nav-pills flex-column">
                    <a
                      class="vinculos nav-link ms-3"
                      href="#item-numero-alumnos-matriculados"
                    >
                      Alumnos matriculados <br /> modalidad escolarizada
                    </a>
                    <a
                      class="vinculos nav-link ms-3"
                      href="#item-numero-maestros-egresados-mixta"
                    >
                      Egresados y titulados <br /> modalidad mixta
                    </a>
                    <a
                      class="vinculos nav-link ms-3"
                      href="#item-numero-maestros-egresados-escolarizada"
                    >
                      Egresados y titulados <br /> modalidad escolarizada
                    </a>
                  </nav>
                  <a class="vinculos nav-link" href="#item-edades">
                    Profesorado
                  </a>
                  <nav class="nav nav-pills flex-column">
                    <a
                      class="vinculos nav-link ms-3"
                      href="#item-edades-profesorado-actual"
                    >
                      Profesorado actual
                    </a>
                    <a
                      class="vinculos nav-link ms-3"
                      href="#item-edades-profesorado-maestria"
                    >
                      Con estudios de maestría
                    </a>
                    <a
                      class="vinculos nav-link ms-3"
                      href="#item-edades-profesorado-doctorado"
                    >
                      Con estudios de doctorado
                    </a>
                  </nav>
                  <a class="vinculos nav-link" href="#item-doctores">
                    Doctores con SNI
                  </a>
                  <nav class="nav nav-pills flex-column">
                    <a
                      class="vinculos nav-link ms-3"
                      href="#item-doctores-jubilados"
                    >
                      Número de doctores jubilados
                    </a>
                    <a
                      class="vinculos nav-link ms-3"
                      href="#item-doctores-candidatos"
                    >
                      Número de doctores candidatos
                    </a>
                  </nav>
                  <nav class="nav nav-pills flex-column">
                    <a class="vinculos nav-link" href="#item-4-2">
                      Tabla de datos
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
                        {detailsSchool.address}
                        <br />
                        {detailsSchool.province}
                      </p>
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                      >
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={center}
                          zoom={12}
                        >
                          {/* Marcador en la ubicación seleccionada */}
                          {detailsSchool && detailsSchool.address && (
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
                        <div
                          data-aos="fade-up"
                          class="col d-flex flex-column align-items-start justify-content-start"
                        >
                          <i class="fa fa-phone fa-3x text-primary">
                            <LocalPhoneIcon />
                          </i>
                          <p class="lead fw-semibold mb-0">Teléfono/s</p>
                          {detailsSchool?.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <br />
              <div id="item-convocatorias">
                <div className="info-section">
                  <div data-aos="fade-up" class="container">
                    <h2>Convocatorias </h2>
                  </div>
                  <div id="item-convocatorias-escuelas" class="mb-5">
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
                                        class="card-img"
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
                                        class="card-img"
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
                                        class="card-img"
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
                  </div>
                </div>
                {detailsSchool?.postgrado1 || detailsSchool?.postgrado2 ? (
                  <div
                    id="item-convocatorias-posgrados"
                    class="my-5 info-section"
                  >
                    <div data-aos="fade-up" class="container">
                      <h2>Posgrados </h2>
                    </div>
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
                  </div>
                ) : null}
              </div>
              <br />
              {detailsSchool?.beca1 || detailsSchool?.beca2 ? (
                <div className="info-section">
                  <div data-aos="fade-up" class="container ">
                    <h2>Becas </h2>
                  </div>
                  <div id="item-becas" class="mt-5">
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
                  </div>
                </div>
              ) : null}

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
                            Histórico de Alumnos
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
                                  <h4>Alumnos matriculados</h4>
                                </div>
                              </div>
                              <div class="row mb-3">
                                <div class="col d-flex align-items-center">
                                  <h6>Modalidad escolarizada</h6>
                                </div>
                              </div>
                              <div className="cardalumn-container">


                              {detailsSchool?.alumnos &&
                                detailsSchool.alumnos.map((data, index) => (
                                  <div
                                    className="row justify-content-center"
                                    key={index}
                                  >
                                    <div className="col-md-6 col-lg-3 my-3">
                                      <div className="alumn-card text-center shadow-sm">
                                        <div className="card-body">
                                          <p className="card-text mb-0">
                                            Ciclo escolar{" "}
                                            {(data.fechaDesde &&
                                              data.fechaDesde.split("-")[0]) ||
                                              ""}{" "}
                                            -{" "}
                                            {(data.fechaHasta &&
                                              data.fechaHasta.split("-")[0]) ||
                                              ""}
                                          </p>
                                          <hr />
                                          <p>
                                            <b className="fs-2 text-primary mb-2">
                                              {data.cantidadAlumnos}
                                              <br />
                                              <span className="fs-4 fw-medium">
                                                alumnos
                                              </span>
                                            </b>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="item-numero-maestros-egresados-mixta">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingMaestrosMixta">
                          <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseMaestrosMixta"
                            aria-expanded="false"
                            aria-controls="collapseMaestrosMixta"
                          >
                            Maestros Egresados (Modalidad Mixta)
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
                                  <h4>Egresados y titulados</h4>
                                </div>
                              </div>
                              <div class="row my-3">
                                <div class="col d-flex align-items-center">
                                  <h6>Modalidad mixta</h6>
                                </div>
                              </div>
                              <div className="cardalumn-container">

                              {detailsSchool?.egresados &&
                                detailsSchool.egresados.map((data, index) => (
                                  <div
                                    className="row justify-content-center d-flex"
                                    key={index}
                                  >
                                    <div className="col-md-6 col-lg-3 my-3 " >
                                      <div className="alumn-card text-center shadow-sm">
                                        <div className="card-body">
                                          <p className="card-text mb-0">
                                            Ciclo escolar{" "}
                                            {(data.fechaDesde &&
                                              data.fechaDesde.split("-")[0]) ||
                                              ""}{" "}
                                            -{" "}
                                            {(data.fechaHasta &&
                                              data.fechaHasta.split("-")[0]) ||
                                              ""}
                                          </p>
                                          <hr />
                                          <p>
                                            <b className="fs-2 text-primary mb-2">
                                              {data.cantidadAlumnos}
                                              <br />
                                              <span className="fs-4 fw-medium">
                                                alumnos
                                              </span>
                                            </b>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                            </section>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />
                  </div>
                </div>
              </div>
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
                          Actual
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
                            <h4 className="mb-4">Lista de profesores actual</h4>
                           
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
                  <div id="item-edades-profesorado-maestria">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="profesoradoMaestria">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#colapsarMaestria"
                          aria-expanded="false"
                          aria-controls="colapsarMaestria"
                        >
                          Con Maestría
                        </button>
                      </h2>
                      <div
                        id="colapsarMaestria"
                        class="accordion-collapse collapse"
                        aria-labelledby="profesoradoMaestria"
                        data-bs-parent="#accordionProfesores"
                      >
                        <div class="accordion-body">
                          <section class="container">
                            <h4 class="mb-4">
                              Lista de profesores con maestría
                            </h4>
                            <div class="row my-3 justify-content-center">
                              <div class="col-md-6 d-flex justify-content-center align-items-center">
                                <div class="card mb-4">
                                  <div class="card-header">
                                    <h2 class="card-title">
                                      Lista de nombres y edades año: 2016{" "}
                                    </h2>
                                  </div>
                                  <div class="card-body">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        1. Ixchel Aguilar Rangel, 34 años
                                      </li>
                                      <li class="list-group-item">
                                        2. María Concepción Leal García, 48 años
                                      </li>
                                      <li class="list-group-item">
                                        3. María Eugenia López Peña, 48 años
                                      </li>
                                      <li class="list-group-item">
                                        4. Martha Nictze ha Frías Lara, 36 años
                                      </li>
                                      <li class="list-group-item">
                                        5. Rogelio González Hernández, 44 años
                                      </li>
                                      <li class="list-group-item">
                                        6. Alberto Alonso Partida, 60 años
                                      </li>
                                      <li class="list-group-item">
                                        7. Angelica Vazquez Ricaño, 55 años
                                      </li>
                                      <li class="list-group-item">
                                        8. Rosa María Magallanes Moreno, 68 años
                                      </li>
                                      <li class="list-group-item">
                                        9. José Martín Hurtado Galves, 54 años
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6 d-flex justify-content-center align-items-center">
                                <div class="card mb-4">
                                  <div class="card-header">
                                    <h2 class="card-title">
                                      Lista de nombres y edades año: 2017{" "}
                                    </h2>
                                  </div>
                                  <div class="card-body">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        1. Ixchel Aguilar Rangel, 35 años
                                      </li>
                                      <li class="list-group-item">
                                        2. María Concepción Leal García, 49 años
                                      </li>
                                      <li class="list-group-item">
                                        3. María Eugenia López Peña, 49 años
                                      </li>
                                      <li class="list-group-item">
                                        4. Martha Nictze ha Frías Lara, 37 años
                                      </li>
                                      <li class="list-group-item">
                                        5. Rogelio González Hernández, 45 años
                                      </li>
                                      <li class="list-group-item">
                                        6. Alberto Alonso Partida, 61 años
                                      </li>
                                      <li class="list-group-item">
                                        7. Angelica Vazquez Ricaño, 56 años
                                      </li>
                                      <li class="list-group-item">
                                        8. Rosa María Magallanes Moreno, 69 años
                                      </li>
                                      <li class="list-group-item">
                                        9. José Martín Hurtado Galves, 55 años
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row my-3 justify-content-center">
                              <div class="col-md-6 d-flex justify-content-center align-items-center">
                                <div class="card mb-4">
                                  <div class="card-header">
                                    <h2 class="card-title">
                                      Lista de nombres y edades año: 2018{" "}
                                    </h2>
                                  </div>
                                  <div class="card-body">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        1. Ixchel Aguilar Rangel, 36 años
                                      </li>
                                      <li class="list-group-item">
                                        2. María Concepción Leal García, 50 años
                                      </li>
                                      <li class="list-group-item">
                                        3. María Eugenia López Peña, 50 años
                                      </li>
                                      <li class="list-group-item">
                                        4. Martha Nictze ha Frías Lara, 38 años
                                      </li>
                                      <li class="list-group-item">
                                        5. Rogelio González Hernández, 46 años
                                      </li>
                                      <li class="list-group-item">
                                        6. Alberto Alonso Partida, 62 años
                                      </li>
                                      <li class="list-group-item">
                                        7. Angelica Vazquez Ricaño, 57 años
                                      </li>
                                      <li class="list-group-item">
                                        8. Rosa María Magallanes Moreno, 70 años
                                      </li>
                                      <li class="list-group-item">
                                        9. José Martín Hurtado Galves, 56 años
                                      </li>
                                      <li class="list-group-item">
                                        10. Gabriela Valeria Villavicencio
                                        Valdez, 35 años
                                      </li>
                                      <li class="list-group-item">
                                        11. Jannet Guadalupe Figueroa Hidalgo,
                                        30 años
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6 d-flex justify-content-center align-items-center">
                                <div class="card mb-4">
                                  <div class="card-header">
                                    <h2 class="card-title">
                                      Lista de nombres y edades año: 2019{" "}
                                    </h2>
                                  </div>
                                  <div class="card-body">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        1. Ixchel Aguilar Rangel, 37 años
                                      </li>
                                      <li class="list-group-item">
                                        2. María Concepción Leal García, 51 años
                                      </li>
                                      <li class="list-group-item">
                                        3. María Eugenia López Peña, 51 años
                                      </li>
                                      <li class="list-group-item">
                                        4. Martha Nictze ha Frías Lara, 37 años
                                      </li>
                                      <li class="list-group-item">
                                        5. Rogelio González Hernández, 47 años
                                      </li>
                                      <li class="list-group-item">
                                        6. Alberto Alonso Partida, 63 años
                                      </li>
                                      <li class="list-group-item">
                                        7. Angelica Vazquez Ricaño, 58 años
                                      </li>
                                      <li class="list-group-item">
                                        8. Rosa María Magallanes Moreno, 71 años
                                      </li>
                                      <li class="list-group-item">
                                        10. Gabriela Valeria Villavicencio
                                        Valdez, 36 años
                                      </li>
                                      <li class="list-group-item">
                                        11. Jannet Guadalupe Figueroa Hidalgo,
                                        31 años
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row my-3 justify-content-center">
                              <div class="col-md-6 d-flex justify-content-center align-items-center">
                                <div class="card mb-4">
                                  <div class="card-header">
                                    <h2 class="card-title">
                                      Lista de nombres y edades año: 2023 - 2024{" "}
                                    </h2>
                                  </div>
                                  <div class="card-body">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        1. Jesús Alejandro Báez Rodríguez, 35
                                        años
                                      </li>
                                      <li class="list-group-item">
                                        2. Jannet Guadalupe Figueroa Hidalgo, 35
                                        años
                                      </li>
                                      <li class="list-group-item">
                                        3. Nayely Cancino Banderas, 37 años
                                      </li>
                                      <li class="list-group-item">
                                        4. Ixchel Aguilar Rangel, 42 años
                                      </li>
                                      <li class="list-group-item">
                                        5. María Concepción Leal García, 54 años
                                      </li>
                                      <li class="list-group-item">
                                        6. María Eugenia López Peña, 55 años
                                      </li>
                                      <li class="list-group-item">
                                        7. Gabriela Valeria Villavicencio
                                        Valdez, 40 años
                                      </li>
                                      <li class="list-group-item">
                                        8. Martha Nictze ha Frías Lara, 42 años
                                      </li>
                                      <li class="list-group-item">
                                        10. Rogelio González Hernández, 51 años
                                      </li>
                                      <li class="list-group-item">
                                        11. Alberto Alonso Partida, 67 años
                                      </li>
                                      <li class="list-group-item">
                                        11. Angelica Vazquez Ricaño, 62 años
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="item-edades-profesorado-doctorado" class="mb-5">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="profesoradoDoctorado">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#colapsarDoctorado"
                          aria-expanded="false"
                          aria-controls="colapsarDoctorado"
                        >
                          Con Doctorado
                        </button>
                      </h2>
                      <div
                        id="colapsarDoctorado"
                        class="accordion-collapse collapse"
                        aria-labelledby="profesoradoDoctorado"
                        data-bs-parent="#accordionProfesores"
                      >
                        <div class="accordion-body">
                          <section class="container">
                            <h4 class="mb-4">
                              Lista de profesores con doctorado
                            </h4>
                            <div class="row my-3 justify-content-center">
                              <div class="col-md-7 d-flex justify-content-center align-items-center">
                                <div
                                  id="simple-list-item-3"
                                  class="card text-center w-100"
                                >
                                  <div class="card-header fs-3 fw-bold">
                                    Lista de nombres y edades del ciclo 2023 -
                                    2024{" "}
                                  </div>
                                  <div class="card-body m-0 p-0">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        1. Jesús Alejandro Báez Rodríguez, 35
                                        años
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="card-body m-0 p-0">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        2. Jannet Guadalupe Figueroa Hidalgo, 35
                                        años
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="card-body m-0 p-0">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        3. Nayely Cancino Banderas, 37 años
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="card-body m-0 p-0">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        4. Ixchel Aguilar Rangel, 42 años
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="card-body m-0 p-0">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        5. María Concepción Leal García, 54 años
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="card-body m-0 p-0">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        6. María Eugenia López Peña, 55 años
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="card-body m-0 p-0">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        7. Gabriela Valeria Villavicencio
                                        Valdez, 40 años
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="card-body m-0 p-0">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        8. Martha Nictze ha Frías Lara, 42 años
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="card-body m-0 p-0">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        9. Rogelio González Hernández, 51 años
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="card-body m-0 p-0">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        10. Alberto Alonso Partida, 67 años
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="card-body m-0 p-0">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        11. Angelica Vazquez Ricaño, 62 años
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                            Doctores con SNI jubilados
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
                              <h4 class="mb-4">Lista de doctores jubilados</h4>
                              <div class="row my-3 justify-content-center">
                                <div class="col-md-5 d-flex justify-content-center align-items-center">
                                  <div
                                    id="simple-list-item-3"
                                    class="card text-center w-100"
                                  >
                                    <div class="card-header fs-3 fw-bold">
                                      Lista de nombres del ciclo historico{" "}
                                    </div>

                                    {detailsSchool?.doctoresJubilados &&
                                      detailsSchool?.doctoresJubilados.map(
                                        (data, index) => (
                                          <div class="card-body m-0 p-0">
                                            <ol class="list-group">
                                              <li
                                                key={index}
                                                class="list-group-item"
                                              >
                                                {index + 1}. {data.doctor}
                                              </li>
                                            </ol>
                                          </div>
                                        )
                                      )}
                                  </div>
                                </div>
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
                            Doctores con SNI candidatos
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
                              <h4 class="mb-4">Lista de doctores candidatos</h4>
                              <div class="row my-3 justify-content-center">
                                <div class="col-md-5 d-flex justify-content-center align-items-center">
                                  <div
                                    id="simple-list-item-3"
                                    class="card text-center w-100"
                                  >
                                    <div class="card-header fs-3 fw-bold">
                                      Lista de nombres del ciclo actual{" "}
                                    </div>
                                    {detailsSchool?.doctoresCandidatos &&
                                      detailsSchool?.doctoresCandidatos.map(
                                        (data, index) => (
                                          <div class="card-body m-0 p-0">
                                            <ul class="list-group">
                                              <li class="list-group-item">
                                                {index + 1}.{" "}
                                                {data.doctorCandidato}
                                              </li>
                                            </ul>
                                          </div>
                                        )
                                      )}
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetails;
