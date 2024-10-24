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

export default function CiudaddeMéxico() {
  const { pathname } = useLocation();
  const [allSchool, setAllschool] = useState([]);

  useEffect(() => {
    Global();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 10);
  }, [pathname]);

  const AllSchool = async () => {
    const response = await axios.get("https://dgapa-production.up.railway.app/api/escuelas");
    setAllschool(response.data.data);
  };

  useEffect(() => {
    AllSchool();
  }, []);

  const durangoSchools = allSchool.filter((data) => data.province === "Ciudad de México");

  return (
    <div className="about-page">
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
      <main className="main">
        <section id="about" className="about section" data-aos="fade-up">
          <div className="page-schools dark-background">
            <div
              className="container position-relative"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h1>Escuelas de Ciudad de México</h1>
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
                No hay escuelas registradas en Ciudad de México.
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
