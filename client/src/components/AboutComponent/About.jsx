import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { IoMdArrowUp } from "react-icons/io";
import { Global } from "../../assets/utils/utils";
import { Swiper } from "swiper/react";
import AOS from "aos";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

export default function About() {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = React.useState({});


  const handleExpandClick = (cardId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [cardId]: !prevExpanded[cardId],
    }));
  };
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
  return (
    <div class="about-page">
      {/* <header id="header" class="header d-flex align-items-center fixed-top">
        <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <Link to="/" class="logo d-flex align-items-center">
            <img src={require("../../assets/img/logo-removebg.png")} alt="" />
          </Link>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <Link to="/">Princípal</Link>
              </li>
              <li>
                <Link to="/acerca" class="active">
                  Nosotros
                </Link>
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
      </header> */}
      <main class="main">
        <div class="page-title dark-background">
          <div
            class="container position-relative"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h1>Acerca de nosotros</h1>
          </div>
        </div>

     

    

       <section id="alt-services-2" class="alt-services-2 section">
  <div class="container">
    <div class="row justify-content-around gy-4">
      <div
        class="col-lg-6 d-flex flex-column justify-content-center order-2 order-lg-1"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h3>Presentación</h3>
        <p>
        El interés por conocer y comprender el subsistema de formación de las Escuelas Normales Superiores resulta una tarea de gran relevancia porque representan el espacio institucional donde se forman, se negocian, se dirimen, e incluso se imponen las decisiones de política educativa y de formación que abordan el rumbo de la educación secundaria en el país.
        <br />
        <br />
         Las Escuelas Normales Superiores, en su conjunto, son las responsables de la formación, la investigación y la difusión del conocimiento, por lo cual resultan ser un objeto de estudio atractivo; conocerlas y comprenderlas nos conduce a desentrañar su desempeño y resultados en función de ciertas limitaciones que enfrentan al formar parte del sistema de educación de tercer nivel de manera tardía. 
         <br />
         <br />
         En ese sentido, sirva este espacio para explorar, conocer y ubicar el conjunto de las Escuelas Normales Superiores que se encuentran a lo largo y ancho del territorio.
         <br />
         <br />
          Representa un espacio para hacerlas visibles dentro del subsistema de instituciones de educación superior en México.
        </p>

       
      </div>

      <div
        class="features-image col-lg-5 order-1 order-lg-2"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <img
          src={require("../../assets/img/nosotros.jpg")} 
          alt="Imagen de la escuela"
        />
      </div>
    </div>
  </div>
</section>

     

        

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
                          <span className="number-history">1924 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia1.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                              Primera institución encargada de la formación de
                              los maestros{" "}
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
                          <Collapse in={expanded[1]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                                La Escuela Normal Superior Universitaria (ENSU),
                                de la antigua Facultad de Altos Estudios (FAE),
                                dependiente de la Universidad Nacional de México
                                (UNM), fue la primera institución encargada de
                                la formación de los maestros para la educación
                                secundaria. Fue cerrada temporalmente el mismo
                                año; reabierta en 1925; enseguida de la Facultad
                                de Filosofía y Letras en 1929 y separada de
                                manera definitiva de la UNM en 1933.{" "}
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

                          <span className="number-history">1924 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                      <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia2.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                               Creación del Consejo Nacional de la Educación
                               Superior{" "}
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
                          <Collapse in={expanded[2]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                              Fue creado el Consejo Nacional de la Educación
                              Superior y de la Investigación Científica
                              (CNESIC), instancia encargada de organizar y
                              modificar los planes de estudio del Instituto de
                              Mejoramiento del Profesorado de Enseñanza
                              Secundaria (IMPES), antecedente de la Escuela
                              Normal Superior (ENS).{" "}
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

                          <span className="number-history">1924 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                   

                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia3.jpg")}
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
                          <Collapse in={expanded[3]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                          Fundación del Instituto de Mejoramiento del
                              Profesorado de Enseñanza Secundaria (IMPES), que
                              más tarde se transformó en Escuela Normal Superior
                              (ENS), como centro de formación de profesores de
                              educación secundaria. En un primer momento, se
                              adscribió al Departamento de Enseñanza Secundaria
                              de la Dirección General de Segunda Enseñanza.
                              Posteriormente, dependió administrativamente de la
                              Dirección General de Enseñanza Superior e
                              Investigación Científica de la Secretaría de
                              Educación Pública (SEP).{" "}
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

                          <span className="number-history">1924 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                    

                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia4.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                             La Enseñanza Normal Superior según la Ley Orgánica
                             de Educación{" "}
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
                          <Collapse in={expanded[4]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                      En la Ley Orgánica de Educación, la Enseñanza
                              Normal Superior se impartía a los profesores
                              normalistas graduados en las escuelas normales
                              urbanas y a los de las rurales. Ambos profesores
                              los capacitaba para ejercer la docencia como
                              profesores de Educación Normal, Secundaria,
                              Técnica o de cualquier grado de la Educación
                              Superior y graduaba doctores en Ciencias de la
                              Educación (Artículo 71, Capítulo XIII).{" "}
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

                          <span className="number-history">1942 </span>
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
                           La ENS en la Ley Orgánica de Educación de 1942{" "}
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
                          <Collapse in={expanded[5]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                    La ENS fue concebida como la única institución
                              educativa a nivel federal para formar maestros
                              posprimarios, así como para preparar burócratas,
                              intelectuales y especialistas. La Ley Orgánica de
                              la Educación Pública de 1942 estableció que "los
                              cursos superiores que se hagan en universidades,
                              tendrán igual validez que los realizados en
                              escuelas normales superiores y furndar institutos
                              de mejoramiento profesional para elevar el nivel
                              cultural técnico y pedagógico de los maestros en
                              servicios". (Artículo 81, Capítulo XI).{" "}
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

                          <span className="number-history">1944 </span>
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
                          <Collapse in={expanded[6]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                    Se creó la Escuela Normal Superior del Estado de
                              Coahuila, la cual quedó comprendida dentro de la
                              Universidad de Coahuila como institución pública
                              estatal. El 7 de abril de 1965 se separó de la
                              Universidad. (Hernández, 2017: 25){" "}
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

                          <span className="number-history">1947 </span>
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
                          <Collapse in={expanded[7]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                      Se fundaron: la Escuela Normal Superior “FEP” del
                              D.F., la Escuela Normal Superior “Nueva Galicia”,
                              A.C., Guadalajara, Jal., y la Escuela Normal de
                              Sinaloa. Las dos primera instituciones educativas
                              particulares; la tercera pública estatal.{" "}
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

                          <span className="number-history">1950 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                       

                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia8.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                          Instauración de la EN de la Constitución{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[8]}
                              onClick={() => handleExpandClick(8)}
                              aria-expanded={expanded[8]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[8]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                    Fue instaurada la Escuela Normal de la
                              Constitución, antecedente de la Escuela Normal
                              "Manuel Ávila Camacho" y en 2012 recibió el
                              reconocimiento de Benemérita.{" "}
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

                          <span className="number-history">1951 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                    
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia9.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                            Historia y Cierre de la Escuela Normal Superior de
                            la Universidad Autónoma de Guerrero{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[9]}
                              onClick={() => handleExpandClick(9)}
                              aria-expanded={expanded[9]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[9]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                       Constitución de la Escuela Normal Superior de la
                              Universidad Autónoma de Guerrero, imparte cursos
                              intensivos de verano para formar a maestros de
                              enseñanza media. El 25 de abril de 1985 se decretó
                              la extinción de la institución formadora y en el
                              ciclo 1986-1987 se impartió el último curso de
                              verano (Wences, s/f, Tomo II:218){" "}
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

                          <span className="number-history">1952 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                    
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia10.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                         Fundación de la Escuela Normal Superior de Puebla{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[10]}
                              onClick={() => handleExpandClick(10)}
                              aria-expanded={expanded[10]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[10]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                     Se estableció la Escuela Normal Superior de Puebla
                              (ENSEP) de sostenimiento estatal. En 1961 se
                              establecieron los cursos intensivos o de verano,
                              junto con los cursos ordinarios. Se fundaron 7
                              subsedes en la entidad; la última en 1997 (ENSEP,
                              s/f: 2).{" "}
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

                          <span className="number-history">1954 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
               
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia11.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                         Escuela de la Universidad "Labastida"{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[11]}
                              onClick={() => handleExpandClick(11)}
                              aria-expanded={expanded[11]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[11]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                     Surgió la Escuela Normal Superior de la
                              Universidad “Labastida”, Monterrey, N.L.,
                              institución formadora particular.{" "}
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
                            image={require("../../assets/img/historia12.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                         Colegio "Benavente"{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[12]}
                              onClick={() => handleExpandClick(12)}
                              aria-expanded={expanded[12]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[12]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                    Fundación del Colegio "Benavente" Puebla,
                              posteriormente denominado Escuela Normal Superior
                              “Benavente”, Puebla. Institución formadora de
                              sostenimiento particular.{" "}
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

                          <span className="number-history">1958 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                   
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia13.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                              Creación de la ENS de Nayarit{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[13]}
                              onClick={() => handleExpandClick(13)}
                              aria-expanded={expanded[13]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[13]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                        Se creó la Escuela Normal Superior de Nayarit
                              dentro del Instituto del Estado o Universidad
                              Autónoma de Nayarit. Por el Decreto 4876, 7 de
                              enero de 1967, se establece como organismo
                              público, con personalidad pública y patrimonio
                              propios{" "}
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

                          <span className="number-history">1959 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                     
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia14.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                             Fundación de la ENS de Chihuahua{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[14]}
                              onClick={() => handleExpandClick(14)}
                              aria-expanded={expanded[14]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[14]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                     Se fundó la Escuela Normal Superior de Chihuahua
                              “Porfirio Parra” como institución educativa de
                              control público.{" "}
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

                          <span className="number-history">1960 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                       
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia15.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                             Eventos generales 
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[15]}
                              onClick={() => handleExpandClick(15)}
                              aria-expanded={expanded[15]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[15]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                        Fue constituida la Escuela Normal Superior de
                              Chihuahua, Prof. José E. Medrano”. Inicia
                              funciones con los planes de estudio y reglamentos
                              de la Escuela Normal Superior de la Ciudad de
                              México y en abril de 1962 por decreto del
                              gobernador se constituye con personalidad jurídica
                              y patrimonio propios. (Trujillo, 2014: 28). En
                              1995 se abrieron las unidades en Parral y Ciudad
                              Juárez y en 2002 en Nuevo Casas Grandes.
                              Posteriormente se abrieron las extensiones de
                              Cuauhtémoc, Creel y Chínipas (Trujillo, 2014: 32).
                              Se crearon: la Escuela Normal de Atlacomulco y la
                              Escuela Normal de Tlalnepantla como instituciones
                              públicas estatales en la formación de maestros de
                              secundaria.{" "}
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

                          <span className="number-history">1961 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                   
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia16.jpg")}
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
                              expand={expanded[16]}
                              onClick={() => handleExpandClick(16)}
                              aria-expanded={expanded[16]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[16]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                              Se fundaron: la Escuela Normal Superior del Estado
                              de Nuevo León, “Prof. Moisés Sáenz Garza” y la
                              Escuela Normal Oficial "Lic. Benito Juárez" como
                              centros de formación de carácter público estatal.{" "}
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

                          <span className="number-history">1962 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                    
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia17.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                            Constitución de la Escuela Normal de Chalco{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[17]}
                              onClick={() => handleExpandClick(17)}
                              aria-expanded={expanded[17]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[17]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                                Se constituyó la Escuela Normal de Chalco, como
                              institución pública estatal, en la formación de
                              maestros de secundaria en varias especialidades.{" "}
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

                          <span className="number-history">1964 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                    
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia18.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                           Instituciones formadoras particulares{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[18]}
                              onClick={() => handleExpandClick(18)}
                              aria-expanded={expanded[18]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[18]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                             Se establecieron la Escuela Normal Superior “Juana
                              de Asbaje”, Zamora, Michoacán y la Escuela Normal
                              Superior “Instituto América”, León, Guanajuato,
                              como instituciones formadoras particulares. La
                              primera incorporada a la SEP y la segunda al
                              gobierno el Estado.{" "}
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

                          <span className="number-history">1965 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                     
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia19.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                           Creación de escuelas{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[19]}
                              onClick={() => handleExpandClick(19)}
                              aria-expanded={expanded[19]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[19]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                            Fueron creadas: la Escuela Normal Superior del
                              Sureste “Lic. Benito Juárez”, Oaxaca (cerrada) y
                              la Escuela Normal Superior Anexa al Instituto
                              “Justo Sierra”, León, Gto. Ambas escuelas
                              particulares. La primera fue cerrada y la segunda
                              fue incorprada al gobierno del Estado.{" "}
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

                          <span className="number-history">1966 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                     

                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia20.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                           Concepción de escuelas{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[20]}
                              onClick={() => handleExpandClick(20)}
                              aria-expanded={expanded[20]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[20]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                                  Se concibieron: la Escuela Normal Superior “Flores
                              Magón” y la Escuela Normal Superior de Tlaxcala.
                              La primera particular estuvo funcionando sin
                              autorización, por lo que fue clausurada y la
                              segunda un grupo maestros liderados por Tomas
                              Munive Osorno integran “El patronato Pro-normal
                              superior de Tlaxcala" fuera de la esfera de
                              influencia del Instituto de Estudios Superiores
                              del Estado (IESE), bajo el control de la
                              Federación de Estudiantes Tlaxcaltecas (FET) y del
                              PRI.{" "}
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

                          <span className="number-history"> 1967 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                      
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia21.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                            Fundación de nuevas ENS{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[21]}
                              onClick={() => handleExpandClick(21)}
                              aria-expanded={expanded[21]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[21]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                               Se fundaron: la Escuela Normal Superior Oficial de
                              Guanajuato, la Escuela Normal Superior del Estado
                              de México, la Escuela Normal Núm. 1 de Toluca como
                              instituciones públicas estatales y la Escuela
                              Normal Superior de Morelos con el nombre de
                              Instituto Morelense de Estudios Superiores, que en
                              1971 se denominó: Escuela Normal Superior del
                              Estado de Morelos y en 1988 posteriormente a
                              Escuela Particular Normal Superior del Estado
                              (EPNSE) (Araujo y Estrada, 2009: 43, 49). Las dos
                              primeras de sostenimiento estatal y la última
                              particular que pasó a ser de sostenimiento estatal
                              (Araujo y Estrada, 2009: 43){" "}
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

                          <span className="number-history">1969 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                      
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia22.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                            Creación de la ENS de Tamaulipas{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[22]}
                              onClick={() => handleExpandClick(22)}
                              aria-expanded={expanded[22]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[22]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                              Fue creada la Escuela Normal Superior de
                              Tamaulipas, de sostenimiento privado. Por acuerdo
                              del 2 de julio de 1970 se otorgó a “Promotora de
                              Educación Superior en Tamaulipas, Asociación
                              Civil”, autorización para que imparta enseñanza de
                              Normal Superior en la que se denominaría “Escuela
                              Normal Superior de Tamaulipas”.{" "}
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

                          <span className="number-history">1971 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                     
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia23.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                           Nuevas ENS 
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[23]}
                              onClick={() => handleExpandClick(23)}
                              aria-expanded={expanded[23]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[23]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                             Surgieron: la Escuela Normal Superior del Sur de
                              Tamaulipas, la Escuela Normal Superior de Oaxaca,
                              A.C., la Escuela Normal Superior de Yucatán,
                              “Antonio Betancourt Pérez” y la Escuela Normal de
                              Tejupilco. Las dos primeras particulares y las dos
                              últimas públicas estatales.{" "}
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

                          <span className="number-history">1972 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                    
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia24.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                           ENS de Celaya 
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[24]}
                              onClick={() => handleExpandClick(24)}
                              aria-expanded={expanded[24]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[24]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                           Se concibió la Escuela Normal Superior de Celaya
                              como Asociación Civil de sostenimiento particular,
                              incorporada al gobierno del Estado.{" "}
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

                          <span className="number-history">1973 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia25.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                          Establecimiento de escuelas{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[25]}
                              onClick={() => handleExpandClick(25)}
                              aria-expanded={expanded[25]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[25]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                Se establecieron: la Escuela Normal Superior de
                              Chiapas de sostenimiento privado y por decreto No.
                              57 pasó a ser estatal, la Escuela Normal Superior
                              de Jalisco y la Escuela Normal Superior de
                              Michoacán. Las tres instituciones dependientes del
                              gobierno de los Estados. La Escuela Normal
                              Superior de Michoacán se transformó en el
                              Instituto Michoacano de Ciencias de la Educación
                              “José María Morelos”, por Decreto Gobierno del
                              Estado, del 24 de marzo de 1986. Se creó la
                              Escuela Normal de Naucalpan, como institución
                              pública estatal en la formación de maestros de
                              secundaria.{" "}
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

                          <span className="number-history">1974 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                       
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia26.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                         Fueron constituidas:{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[26]}
                              onClick={() => handleExpandClick(26)}
                              aria-expanded={expanded[26]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[26]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                La Escuela Normal Superior de Sinaloa, la Escuela
                              Normal Superior de la Laguna, Cursos Intensivos,
                              A.C., Durango, la Escuela Normal Superior de
                              Durango y la Escuela Normal Superior “Justo
                              Sierra”, A.C., Puebla. Todas escuelas particulares
                              incorporadas a los gobiernos de los Estados.
                              Surgieron: la Escuela Normal de Capulhuac, la
                              Escuela Normal de Cuautitlán Izcalli, la Escuela
                              Normal de Santiago Tianguistenco, la Escuela
                              Normal de Sultepec, la Escuela Normal de
                              Tenancingo, la Escuela Normal de Teotihuacán, la
                              Escuela Normal de Valle de Bravo, la Escuela
                              Normal No. 2 de Nezahualcóyotl como instituciones
                              públicas estatales, en la formación de maestros de
                              secundaria.{" "}
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

                          <span className="number-history">1975 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                    
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia27.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                         Se crearon:{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[27]}
                              onClick={() => handleExpandClick(27)}
                              aria-expanded={expanded[27]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[27]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                 La Escuela Normal San Felipe del Progreso y la
                              Escuela Normal de Texcoco, como instituciones
                              públicas estatales en la formación de maestros de
                              secundaria.{" "}
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

                          <span className="number-history">1976 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                      
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia28.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                        Publicación del Acuerdo{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[28]}
                              onClick={() => handleExpandClick(28)}
                              aria-expanded={expanded[28]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[28]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                    Por el cual se establece el bachillerato y los
                              planes de estudio de Educación Normal a nivel
                              Licenciatura. Se fundaron: la Escuela Normal
                              Superior del Estado Baja California Sur, “Prof.
                              Enrique Estrada Lucero”, dependiente del gobierno
                              del Estado; la Escuela Normal Superior de
                              Querétaro, A. C., y la Escuela Normal Superior del
                              Sur de Tamaulipas A.C, instituciones educativas
                              particulares. La primera se incorporó al gobierno
                              del Estado como organismo público con personalidad
                              jurídica y patrimonio propios.{" "}
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

                          <span className="number-history">1977 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                    
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia29.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                             Creación y Organización de Escuelas Normales
                             Superiores{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[29]}
                              onClick={() => handleExpandClick(29)}
                              aria-expanded={expanded[29]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[29]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                      Se estableció la Dirección de Educación Normal
                              Superior y Especialidades para administrar,
                              dirigir y supervisar el funcionamiento de la
                              Escuela Normal Superior de México y de las 5
                              normales superiores particulares incorporadas a la
                              Federación. Se instauraron: la Escuela Normal
                              Superior de Aguascalientes, “José Santos Valdés”,
                              institución formadora de carácter federal, la
                              Escuela Normal Superior de Ecatepec, la Escuela
                              Normal de Amecameca y la Escuela Normal Santa Ana
                              Zicatecoyan de sostenimiento estatal (en la
                              formación de maestros de secundaria) y la Escuela
                              Normal Superior del Estado de Hidalgo de
                              sostenimiento particular. Las dos últimas
                              instituciones formadoras fueron incorporadas a los
                              gobiernos de los Estados. La Escuela Normal
                              Superior de Chiapas por convenio de 1977 transita
                              del sostenimiento estatal al federal.{" "}
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

                          <span className="number-history">1978 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                 
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia30.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                             Se abrieron:
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[30]}
                              onClick={() => handleExpandClick(30)}
                              aria-expanded={expanded[30]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[30]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                   La Escuela Normal de Atizapán de Zaragoza y la
                              Escuela Normal No. 4 de Nezahualcóyotl, como
                              instituciones públicas estatales, en la formación
                              de maestros de secundaria.{" "}
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

                          <span className="number-history">1979 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                    
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia31.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                               Transformaciones en la Dirección de Educación
                              Normal Superior y Surgimiento de Nuevas
                              Instituciones{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[31]}
                              onClick={() => handleExpandClick(31)}
                              aria-expanded={expanded[31]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[31]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
                 Desaparece la naciente Dirección de Educación
                              Normal Superior y Especialidades, se convierte en
                              un Departamento y se estableció el Consejo
                              Nacional Consultivo de Educación Normal como
                              organismo para regularizar y racionalizar la
                              matrícula de las Escuelas Normales Superiores
                              Estatales. (Gámez, 1990: 14). Surgió la Escuela
                              Normal Superior de Ciudad Madero A.C., Tamaulipas,
                              como institución formadora particular.{" "}
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

                          <span className="number-history">1982 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                     
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia32.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                             Creación de ENS Federal en Veracruz{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[32]}
                              onClick={() => handleExpandClick(32)}
                              aria-expanded={expanded[32]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[32]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
               Se creó la Escuela Normal Superior Federal para
                              Cursos Intensivos en Veracruz, institución
                              educativa federal, como parte del proceso de
                              regionalización de la formación docente de
                              maestros, con tres departamentos de Control
                              escolar, Titulación e Investigación, Área
                              académica y Planeación Educativa.{" "}
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

                          <span className="number-history">1983 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                      
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia33.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                             Se constituyen:
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[33]}
                              onClick={() => handleExpandClick(33)}
                              aria-expanded={expanded[33]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[33]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
               La Escuela Normal Superior Federal Cursos
                              Intensivos Campeche, Escuela Normal Superior de
                              Querétaro y la Escuela Normal Superior de Santa
                              Ana, Sonora, como instituciones de formación de
                              carácter público federal, ante la publicación del
                              Acuerdo 101 por el que desaparecieron los cursos
                              intensivos para profesores foráneos que vebía
                              impartiendo la Escuela Normal Superior de México.
                              En 1993, se crearon 5 subsedes de la Escuela
                              Normal Superior de Santa Ana, posteriormente, de
                              Hermosillo: Navojoa, Nacozari, Ciudad Obregón, San
                              Luis Río Colorado y Sahuaripa. Actualmente ya no
                              operan las subsedes de Nacozari y Sahuaripa.{" "}
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
                            image={require("../../assets/img/historia34.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                            Se concibió:
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[34]}
                              onClick={() => handleExpandClick(34)}
                              aria-expanded={expanded[34]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[34]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
              La Escuela Normal Superior del Estado de Puebla,
                              como institución formadora de carácter público
                              estatal. Se publicó el Acuerdo que autorizó la
                              impartición de cursos intensivos en Campeche y
                              Michoacán (Gámez, 1990: 15).{" "}
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

                          <span className="number-history">1985 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                       
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia35.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                           ENS de Morelia
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[35]}
                              onClick={() => handleExpandClick(35)}
                              aria-expanded={expanded[35]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[35]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
              Surgió la Escuela Normal Superior de Morelia,
                              Michoacán, como institución formadora federal para
                              ofrecer cursos intensivos a estudiantes
                              procedentes de los estados de Guerrero, Jalisco,
                              Colima, Guanajuato y Michoacán.{" "}
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

                          <span className="number-history">1986 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                       
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia36.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                              Escuela Particular Normal Superior "Lic. Benito
                              Juárez"{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[36]}
                              onClick={() => handleExpandClick(36)}
                              aria-expanded={expanded[36]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[36]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
          Se fundó la Escuela Particular Normal Superior
                              “Lic. Benito Juárez”, (EPNSBJ), Morelos, como
                              iniciativa de la delegación XIX del SNTE,
                              "resultado del conflicto de intereses al interior
                              de la propia delegación, que llevó a la fractura
                              del profesorado que laboraba en la Escuela
                              Particular Normal Superior del Estado (EPNSE)
                              (González, Arredondo, Espinosa, 2009: 145){" "}
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

                          <span className="number-history">1987 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                     
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia37.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                                 Transformación de la Escuela Normal Superior
                              Veracruzana Dr. Manuel Suárez Trujillo y
                              Surgimiento de Nuevas Instituciones{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[37]}
                              onClick={() => handleExpandClick(37)}
                              aria-expanded={expanded[37]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[37]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
         Se estableció la Escuela Normal Superior
                              Veracruzana Dr. Manuel Suárez Trujillo como
                              institución formadora pública estatal que ofreció
                              la Licenciatura en Educación Media en modalidad
                              abierta. En 1996 se crearon subsedes en Tuxpan,
                              Poza Rica, Córdoba, Minatitlán, Pánuco, San Andrés
                              Tuxtla, Martínez de la Torre y Xalapa en modalidad
                              mixta. Un año despúes se autorizó la modalidad
                              escolarizada y la semiescolarizada. En 2004 por la
                              falta de presupuesto desaparecen la mayor parte de
                              las subsedes, a pesar de tener una gran demanda en
                              el estado. De las siete subsedes originalmente
                              establecidas, sólo se mantuvieron dos, Córdoba y
                              Xalapa, mismas que fueron cerradas en el 2011 y
                              2012 respectivamente. Además, surgió el Instituto
                              Superior de Educación Normal del Estado de Colima
                              "Profr. Gregorio Torres Quintero", antes
                              denominado Escuela Normal de Maestros Profr.
                              Gregorio Torres Quintero, como instituto público
                              del gobierno estatal y la Escuela Normal Superior
                              "Prof. Salomón Barrancos Aguilar" del Instituto
                              Campechano como institución pública estatal.{" "}
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

                          <span className="number-history">1988 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
               
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            image={require("../../assets/img/historia38.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                               Surgieron:
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[38]}
                              onClick={() => handleExpandClick(38)}
                              aria-expanded={expanded[38]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[38]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
        La Escuela Normal Superior Federal de Oaxaca, la
                              Escuela Normal Superior Federalizada del Estado de
                              Puebla (ENSFEP) y la Escuela Normal Superior de
                              Zacatecas. Las dos primeras como instituciones
                              públicas federales; la tercera como institución
                              educativa particular.{" "}
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

                          <span className="number-history">1989 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                   
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="250"
                            width="100%"
                            image={require("../../assets/img/historia39.jpg")}
                            alt="Historia"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              class="card-title mb-2 text-align-center"
                            >
                               Escuela Normal "Vicente Guerrero"{" "}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[39]}
                              onClick={() => handleExpandClick(39)}
                              aria-expanded={expanded[39]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse in={expanded[39]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography
                                sx={{ marginBottom: 2 }}
                                class="card-text m-0"
                              >
      Se creó la Escuela Normal "Vicente Guerrero", como
                              institución formadora pública de carácter estatal
                              y la Escuela Normal "Carrillo Cárdenas",
                              institución privada.{" "}
                              </Typography>
                            </CardContent>
                          </Collapse>
                        </Card>
                      </div>
                    </div>
                  </li>
                  {/*  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">

                          <span>1993 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src="https://normalessuperiores.org.mx/img/timeline/general/navojoa.png "
                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">Se establecieron: </h4>
                            <p class="card-text m-0">
                              La Escuela Normal Superior, Plantel Navojoa,
                              Sonora, la Escuela Superior Lic. Miguel Alemán
                              Valdés, Tlaxcala y la Escuela Normal de Estudios
                              Superiores del Magisterio Potosino. La primera
                              como extensión de la Escuela Normal Superior,
                              plantel Hermosillo; la segunda como institución
                              formadora particular; la tercera como institución
                              pública estatal.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">

                          <span>1995 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src="https://normalessuperiores.org.mx/img/timeline/general/tehuacan.jpg "
                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2"></h4>
                            <p class="card-text m-0">
                              Fundación de la Escuela Normal Superior de
                              Tehuacán, Puebla, como institución pública
                              estatal.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">

                          <span>1996 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src="https://normalessuperiores.org.mx/ "
                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2"></h4>
                            <p class="card-text m-0">
                              Se abrió el plantel Guillermo Prieto de la Escuela
                              Normal Superior del Estado de Nuevo León, “Prof.
                              Moisés Sáenz Garza”, como unidad académica
                              desconcentrada.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">

                          <span>1997 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src="https://normalessuperiores.org.mx/img/timeline/general/quintanaroo.jpg "
                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">Se constituyeron: </h4>
                            <p class="card-text m-0">
                              La Escuela Normal Superior “Andrés Quintana Roo” y
                              la Escuela Normal Superior del Istmo de
                              Tehuantepec de Oaxaca como instituciones
                              formadoras particulares.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">

                          <span>1998 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src="https://normalessuperiores.org.mx/img/timeline/general/iesen.jpeg "
                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">Se instauraron: </h4>
                            <p class="card-text m-0">
                              El Instituto de Estudios Superiores de Eduación
                              Normal General Lázaro Cárdenas del Río (IESEN),
                              como institución educativa pública federal y la
                              Escuela Normal Regional de Tierra Caliente, como
                              institución pública estatal{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">

                          <span>1999 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src="https://normalessuperiores.org.mx/img/timeline/general/tijuana.png "
                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2"></h4>
                            <p class="card-text m-0">
                              Se creó la Escuela Normal Fronteriza Tijuana como
                              institución formadora pública federal.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">

                          <span>2002 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src="https://normalessuperiores.org.mx/img/timeline/general/ensupeh.jpg "
                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Fundación de ENS en Hidalgo{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se fundó la Escuela Normal Superior Pública del
                              Estado de Hidalgo (ENSUPEH), como institución
                              formadora pública federal. En 2010 2010 el
                              ejecutivo del estado donó un terreno para la
                              construcción de la escuela, en 2015 se
                              construyeron aulas y módulos y en 2016 se
                              inauguraron las instalaciones.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column text-primary-emphasis  border border-success-subtle text-md-end bg-number-history">

                          <span>2003 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src="https://normalessuperiores.org.mx/img/timeline/general/mixteca.jpg "
                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              ENS nueva en Puebla{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se estableció la Escuela Normal Superior Mixteca
                              Baja A.C., Puebla, como institución educativa
                              formadora de carácter particular.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                </ul>
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
