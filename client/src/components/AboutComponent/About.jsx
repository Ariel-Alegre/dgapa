import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { IoMdArrowUp } from "react-icons/io";
import { Global } from "../../assets/utils/utils";
import { Swiper,  } from "swiper/react";
import AOS from "aos";
export default function About() {
  const { pathname } = useLocation();

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
      </header>
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

        <section id="about" class="about section">
          <div class="container">
            <div class="row position-relative">
              <div
                class="col-lg-7 about-img"
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                <img src={require("../../assets/img/nosotros.jpg")} alt="" />
              </div>

              <div class="col-lg-7" data-aos="fade-up" data-aos-delay="100">
                <h2 class="inner-title">Presentación</h2>
                <div class="our-story">
                  <p>
                    El interés por conocer y comprender el subsistema de
                    formación de las Escuelas Normales Superiores resulta una
                    tarea de gran relevancia porque representan el espacio
                    institucional donde se forman, se negocian, se dirimen, e
                    incluso se imponen las decisiones de política educativa y de
                    formación que abordan el rumbo de la educación secundaria en
                    el país. Las Escuelas Normales Superiores, en su conjunto,
                    son las responsables de la formación, la investigación y la
                    difusión del conocimiento, por lo cual resultan ser un
                    objeto de estudio atractivo; conocerlas y comprenderlas nos
                    conduce a desentrañar su desempeño y resultados en función
                    de ciertas limitaciones que enfrentan al formar parte del
                    sistema de educación de tercer nivel de manera tardía. En
                    ese sentido, sirva este espacio para explorar, conocer y
                    ubicar el conjunto de las Escuelas Normales Superiores que
                    se encuentran a lo largo y ancho del territorio. Representa
                    un espacio para hacerlas visibles dentro del subsistema de
                    instituciones de educación superior en México.
                  </p>

                  {/*     <div class="watch-video d-flex align-items-center position-relative">
                    <i class="bi bi-play-circle"></i>
                    <a
                      href="https://www.youtube.com/watch?v=VideoDeLaEscuela"
                      class="glightbox stretched-link"
                    >
                      Ver Video
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  <section id="stats-counter" class="stats-counter section">
      
            <div class="container section-title" data-aos="fade-up">
              <h2>Stats</h2>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>
      
            <div class="container" data-aos="fade-up" data-aos-delay="100">
      
              <div class="row gy-4">
      
                <div class="col-lg-3 col-md-6">
                  <div class="stats-item d-flex align-items-center w-100 h-100">
                    <i class="bi bi-emoji-smile color-blue flex-shrink-0"></i>
                    <div>
                      <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" class="purecounter"></span>
                      <p>Happy Clients</p>
                    </div>
                  </div>
                </div>
      
                <div class="col-lg-3 col-md-6">
                  <div class="stats-item d-flex align-items-center w-100 h-100">
                    <i class="bi bi-journal-richtext color-orange flex-shrink-0"></i>
                    <div>
                      <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" class="purecounter"></span>
                      <p>Projects</p>
                    </div>
                  </div>
                </div>
      
                <div class="col-lg-3 col-md-6">
                  <div class="stats-item d-flex align-items-center w-100 h-100">
                    <i class="bi bi-headset color-green flex-shrink-0"></i>
                    <div>
                      <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" class="purecounter"></span>
                      <p>Hours Of Support</p>
                    </div>
                  </div>
                </div>
      
                <div class="col-lg-3 col-md-6">
                  <div class="stats-item d-flex align-items-center w-100 h-100">
                    <i class="bi bi-people color-pink flex-shrink-0"></i>
                    <div>
                      <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" class="purecounter"></span>
                      <p>Hard Workers</p>
                    </div>
                  </div>
                </div>
      
              </div>
      
            </div>
      
          </section> */}

        {/*    <section id="alt-services" class="alt-services section">
      
            <div class="container">
      
              <div class="row justify-content-around gy-4">
                <div class="features-image col-lg-6" data-aos="fade-up" data-aos-delay="100"><img src="https://normalessuperiores.org.mx/img/en-rural-salaices-chihuahua.jpg" alt=""/></div>
      
                <div class="col-lg-5 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                  <h3>Enim quis est voluptatibus aliquid consequatur fugiat</h3>
                  <p>Esse voluptas cumque vel exercitationem. Reiciendis est hic accusamus. Non ipsam et sed minima temporibus laudantium. Soluta voluptate sed facere corporis dolores excepturi</p>
      
                  <div class="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="300">
                    <i class="bi bi-easel flex-shrink-0"></i>
                    <div>
                      <h4><a href="" class="stretched-link">Lorem Ipsum</a></h4>
                      <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                    </div>
                  </div>
      
                  <div class="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="400">
                    <i class="bi bi-patch-check flex-shrink-0"></i>
                    <div>
                      <h4><a href="" class="stretched-link">Nemo Enim</a></h4>
                      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
                    </div>
                  </div>
      
                  <div class="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="500">
                    <i class="bi bi-brightness-high flex-shrink-0"></i>
                    <div>
                      <h4><a href="" class="stretched-link">Dine Pad</a></h4>
                      <p>Explicabo est voluptatum asperiores consequatur magnam. Et veritatis odit. Sunt aut deserunt minus aut eligendi omnis</p>
                    </div>
                  </div>
      
                  <div class="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="600">
                    <i class="bi bi-brightness-high flex-shrink-0"></i>
                    <div>
                      <h4><a href="" class="stretched-link">Tride clov</a></h4>
                      <p>Est voluptatem labore deleniti quis a delectus et. Saepe dolorem libero sit non aspernatur odit amet. Et eligendi</p>
                    </div>
                  </div>
      
                </div>
              </div>
      
            </div>
      
          </section> */}

        {/* <section id="alt-services-2" class="alt-services-2 section">
  <div class="container">
    <div class="row justify-content-around gy-4">
      <div
        class="col-lg-6 d-flex flex-column justify-content-center order-2 order-lg-1"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h3>Educación de Excelencia para Todos</h3>
        <p>
          En la Escuela Secundaria Greenwood, nos dedicamos a ofrecer una formación integral. 
          Promovemos el desarrollo académico, emocional y social de nuestros estudiantes para prepararlos para el futuro.
        </p>

        <div class="row">
          <div class="col-lg-6 icon-box d-flex">
            <i class="bi bi-easel flex-shrink-0"></i>
            <div>
              <h4>Clases Innovadoras</h4>
              <p>
                Utilizamos métodos de enseñanza modernos para fomentar el pensamiento crítico y la creatividad en nuestros estudiantes.
              </p>
            </div>
          </div>

          <div class="col-lg-6 icon-box d-flex">
            <i class="bi bi-patch-check flex-shrink-0"></i>
            <div>
              <h4>Excelencia Académica</h4>
              <p>
                Nuestro enfoque académico se centra en brindar una educación de calidad, que prepara a los estudiantes para los retos del mañana.
              </p>
            </div>
          </div>

          <div class="col-lg-6 icon-box d-flex">
            <i class="bi bi-brightness-high flex-shrink-0"></i>
            <div>
              <h4>Actividades Extracurriculares</h4>
              <p>
                Ofrecemos una amplia gama de actividades que permiten a los estudiantes desarrollar habilidades fuera del aula.
              </p>
            </div>
          </div>

          <div class="col-lg-6 icon-box d-flex">
            <i class="bi bi-brightness-high flex-shrink-0"></i>
            <div>
              <h4>Ambiente Inclusivo</h4>
              <p>
                Fomentamos un ambiente de respeto y apoyo donde cada estudiante puede crecer y prosperar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="features-image col-lg-5 order-1 order-lg-2"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <img
          src="https://normalessuperiores.org.mx/img/en-rural-salaices-chihuahua.jpg"
          alt="Imagen de la escuela"
        />
      </div>
    </div>
  </div>
</section> */}

        {/*    <section id="team" class="team section">
      
            <div class="container section-title" data-aos="fade-up">
              <h2>Team</h2>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>
      
            <div class="container">
      
              <div class="row gy-5">
      
                <div class="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="100">
                  <div class="member-img">
                    <img src="assets/img/team/team-1.jpg" class="img-fluid" alt=""/>
                    <div class="social">
                      <a href="#"><i class="bi bi-twitter-x"></i></a>
                      <a href="#"><i class="bi bi-facebook"></i></a>
                      <a href="#"><i class="bi bi-instagram"></i></a>
                      <a href="#"><i class="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                  <div class="member-info text-center">
                    <h4>Walter White</h4>
                    <span>Chief Executive Officer</span>
                    <p>Aliquam iure quaerat voluptatem praesentium possimus unde laudantium vel dolorum distinctio dire flow</p>
                  </div>
                </div>
      
                <div class="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="200">
                  <div class="member-img">
                    <img src="assets/img/team/team-2.jpg" class="img-fluid" alt=""/>
                    <div class="social">
                      <a href="#"><i class="bi bi-twitter-x"></i></a>
                      <a href="#"><i class="bi bi-facebook"></i></a>
                      <a href="#"><i class="bi bi-instagram"></i></a>
                      <a href="#"><i class="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                  <div class="member-info text-center">
                    <h4>Sarah Jhonson</h4>
                    <span>Product Manager</span>
                    <p>Labore ipsam sit consequatur exercitationem rerum laboriosam laudantium aut quod dolores exercitationem ut</p>
                  </div>
                </div>
      
                <div class="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="300">
                  <div class="member-img">
                    <img src="assets/img/team/team-3.jpg" class="img-fluid" alt=""/>
                    <div class="social">
                      <a href="#"><i class="bi bi-twitter-x"></i></a>
                      <a href="#"><i class="bi bi-facebook"></i></a>
                      <a href="#"><i class="bi bi-instagram"></i></a>
                      <a href="#"><i class="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                  <div class="member-info text-center">
                    <h4>William Anderson</h4>
                    <span>CTO</span>
                    <p>Illum minima ea autem doloremque ipsum quidem quas aspernatur modi ut praesentium vel tque sed facilis at qui</p>
                  </div>
                </div>
      
                <div class="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="400">
                  <div class="member-img">
                    <img src="assets/img/team/team-4.jpg" class="img-fluid" alt=""/>
                    <div class="social">
                      <a href="#"><i class="bi bi-twitter-x"></i></a>
                      <a href="#"><i class="bi bi-facebook"></i></a>
                      <a href="#"><i class="bi bi-instagram"></i></a>
                      <a href="#"><i class="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                  <div class="member-info text-center">
                    <h4>Amanda Jepson</h4>
                    <span>Accountant</span>
                    <p>Magni voluptatem accusamus assumenda cum nisi aut qui dolorem voluptate sed et veniam quasi quam consectetur</p>
                  </div>
                </div>
      
                <div class="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="500">
                  <div class="member-img">
                    <img src="assets/img/team/team-5.jpg" class="img-fluid" alt=""/>
                    <div class="social">
                      <a href="#"><i class="bi bi-twitter-x"></i></a>
                      <a href="#"><i class="bi bi-facebook"></i></a>
                      <a href="#"><i class="bi bi-instagram"></i></a>
                      <a href="#"><i class="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                  <div class="member-info text-center">
                    <h4>Brian Doe</h4>
                    <span>Marketing</span>
                    <p>Qui consequuntur quos accusamus magnam quo est molestiae eius laboriosam sunt doloribus quia impedit laborum velit</p>
                  </div>
                </div>
      
                <div class="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="600">
                  <div class="member-img">
                    <img src="assets/img/team/team-6.jpg" class="img-fluid" alt=""/>
                    <div class="social">
                      <a href="#"><i class="bi bi-twitter-x"></i></a>
                      <a href="#"><i class="bi bi-facebook"></i></a>
                      <a href="#"><i class="bi bi-instagram"></i></a>
                      <a href="#"><i class="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                  <div class="member-info text-center">
                    <h4>Josepha Palas</h4>
                    <span>Operation</span>
                    <p>Sint sint eveniet explicabo amet consequatur nesciunt error enim rerum earum et omnis fugit eligendi cupiditate vel</p>
                  </div>
                </div>
      
              </div>
      
            </div>
      
          </section> */}

        {/*  <section id="testimonials" class="testimonials section">
      
            <div class="container section-title" data-aos="fade-up">
              <h2>Testimonials</h2>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>
      
            <div class="container" data-aos="fade-up" data-aos-delay="100">
      
              <div class="swiper init-swiper">
                <script type="application/json" class="swiper-config">
                  {
                    "loop": true,
                    "speed": 600,
                    "autoplay": {
                      "delay": 5000
                    },
                    "slidesPerView": "auto",
                    "pagination": {
                      "el": ".swiper-pagination",
                      "type": "bullets",
                      "clickable": true
                    },
                    "breakpoints": {
                      "320": {
                        "slidesPerView": 1,
                        "spaceBetween": 40
                      },
                      "1200": {
                        "slidesPerView": 2,
                        "spaceBetween": 20
                      }
                    }
                  }
                </script> 
                <div class="swiper-wrapper">
      
                  <div class="swiper-slide">
                    <div class="testimonial-wrap">
                      <div class="testimonial-item">
                        <img src="assets/img/testimonials/testimonials-1.jpg" class="testimonial-img" alt=""/>
                        <h3>Saul Goodman</h3>
                        <h4>Ceo &amp; Founder</h4>
                        <div class="stars">
                          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                        </div>
                        <p>
                          <i class="bi bi-quote quote-icon-left"></i>
                          <span>Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.</span>
                          <i class="bi bi-quote quote-icon-right"></i>
                        </p>
                      </div>
                    </div>
                  </div>
      
                  <div class="swiper-slide">
                    <div class="testimonial-wrap">
                      <div class="testimonial-item">
                        <img src="assets/img/testimonials/testimonials-2.jpg" class="testimonial-img" alt=""/>
                        <h3>Sara Wilsson</h3>
                        <h4>Designer</h4>
                        <div class="stars">
                          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                        </div>
                        <p>
                          <i class="bi bi-quote quote-icon-left"></i>
                          <span>Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.</span>
                          <i class="bi bi-quote quote-icon-right"></i>
                        </p>
                      </div>
                    </div>
                  </div>
      
                  <div class="swiper-slide">
                    <div class="testimonial-wrap">
                      <div class="testimonial-item">
                        <img src="assets/img/testimonials/testimonials-3.jpg" class="testimonial-img" alt=""/>
                        <h3>Jena Karlis</h3>
                        <h4>Store Owner</h4>
                        <div class="stars">
                          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                        </div>
                        <p>
                          <i class="bi bi-quote quote-icon-left"></i>
                          <span>Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.</span>
                          <i class="bi bi-quote quote-icon-right"></i>
                        </p>
                      </div>
                    </div>
                  </div>
      
                  <div class="swiper-slide">
                    <div class="testimonial-wrap">
                      <div class="testimonial-item">
                        <img src="assets/img/testimonials/testimonials-4.jpg" class="testimonial-img" alt=""/>
                        <h3>Matt Brandon</h3>
                        <h4>Freelancer</h4>
                        <div class="stars">
                          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                        </div>
                        <p>
                          <i class="bi bi-quote quote-icon-left"></i>
                          <span>Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.</span>
                          <i class="bi bi-quote quote-icon-right"></i>
                        </p>
                      </div>
                    </div>
                  </div>
      
                  <div class="swiper-slide">
                    <div class="testimonial-wrap">
                      <div class="testimonial-item">
                        <img src="assets/img/testimonials/testimonials-5.jpg" class="testimonial-img" alt=""/>
                        <h3>John Larson</h3>
                        <h4>Entrepreneur</h4>
                        <div class="stars">
                          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                        </div>
                        <p>
                          <i class="bi bi-quote quote-icon-left"></i>
                          <span>Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.</span>
                          <i class="bi bi-quote quote-icon-right"></i>
                        </p>
                      </div>
                    </div>
                  </div>
      
                </div>
                <div class="swiper-pagination"></div>
              </div>
      
            </div>
      
          </section>
       */}

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
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1924 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia1.jpg")}
                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Primera institución encargada de la formación de
                              los maestros{" "}
                            </h4>
                            <p class="card-text m-0">
                              La Escuela Normal Superior Universitaria (ENSU),
                              de la antigua Facultad de Altos Estudios (FAE),
                              dependiente de la Universidad Nacional de México
                              (UNM), fue la primera institución encargada de la
                              formación de los maestros para la educación
                              secundaria. Fue cerrada temporalmente el mismo
                              año; reabierta en 1925; enseguida de la Facultad
                              de Filosofía y Letras en 1929 y separada de manera
                              definitiva de la UNM en 1933.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1924 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia2.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Creación del Consejo Nacional de la Educación
                              Superior{" "}
                            </h4>
                            <p class="card-text m-0">
                              Fue creado el Consejo Nacional de la Educación
                              Superior y de la Investigación Científica
                              (CNESIC), instancia encargada de organizar y
                              modificar los planes de estudio del Instituto de
                              Mejoramiento del Profesorado de Enseñanza
                              Secundaria (IMPES), antecedente de la Escuela
                              Normal Superior (ENS).{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1924 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia3.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Origen y Evolución del IMPES hacia la ENS{" "}
                            </h4>
                            <p class="card-text m-0">
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
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1924 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia4.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              La Enseñanza Normal Superior según la Ley Orgánica
                              de Educación{" "}
                            </h4>
                            <p class="card-text m-0">
                              En la Ley Orgánica de Educación, la Enseñanza
                              Normal Superior se impartía a los profesores
                              normalistas graduados en las escuelas normales
                              urbanas y a los de las rurales. Ambos profesores
                              los capacitaba para ejercer la docencia como
                              profesores de Educación Normal, Secundaria,
                              Técnica o de cualquier grado de la Educación
                              Superior y graduaba doctores en Ciencias de la
                              Educación (Artículo 71, Capítulo XIII).{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1942 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia5.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              La ENS en la Ley Orgánica de Educación de 1942{" "}
                            </h4>
                            <p class="card-text m-0">
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
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1944 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia6.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Creación de la ENS de Coahuila{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se creó la Escuela Normal Superior del Estado de
                              Coahuila, la cual quedó comprendida dentro de la
                              Universidad de Coahuila como institución pública
                              estatal. El 7 de abril de 1965 se separó de la
                              Universidad. (Hernández, 2017: 25){" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1947 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia7.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Fundación de escuelas{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se fundaron: la Escuela Normal Superior “FEP” del
                              D.F., la Escuela Normal Superior “Nueva Galicia”,
                              A.C., Guadalajara, Jal., y la Escuela Normal de
                              Sinaloa. Las dos primera instituciones educativas
                              particulares; la tercera pública estatal.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1950 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia8.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Instauración de la EN de la Constitución{" "}
                            </h4>
                            <p class="card-text m-0">
                              Fue instaurada la Escuela Normal de la
                              Constitución, antecedente de la Escuela Normal
                              "Manuel Ávila Camacho" y en 2012 recibió el
                              reconocimiento de Benemérita.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1951 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia9.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Historia y Cierre de la Escuela Normal Superior de
                              la Universidad Autónoma de Guerrero{" "}
                            </h4>
                            <p class="card-text m-0">
                              Constitución de la Escuela Normal Superior de la
                              Universidad Autónoma de Guerrero, imparte cursos
                              intensivos de verano para formar a maestros de
                              enseñanza media. El 25 de abril de 1985 se decretó
                              la extinción de la institución formadora y en el
                              ciclo 1986-1987 se impartió el último curso de
                              verano (Wences, s/f, Tomo II:218){" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1952 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia10.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Fundación de la Escuela Normal Superior de Puebla{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se estableció la Escuela Normal Superior de Puebla
                              (ENSEP) de sostenimiento estatal. En 1961 se
                              establecieron los cursos intensivos o de verano,
                              junto con los cursos ordinarios. Se fundaron 7
                              subsedes en la entidad; la última en 1997 (ENSEP,
                              s/f: 2).{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1954 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia11.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Escuela de la Universidad "Labastida"{" "}
                            </h4>
                            <p class="card-text m-0">
                              Surgió la Escuela Normal Superior de la
                              Universidad “Labastida”, Monterrey, N.L.,
                              institución formadora particular.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>2015 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia12.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Colegio "Benavente"{" "}
                            </h4>
                            <p class="card-text m-0">
                              Fundación del Colegio "Benavente" Puebla,
                              posteriormente denominado Escuela Normal Superior
                              “Benavente”, Puebla. Institución formadora de
                              sostenimiento particular.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1958 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia13.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Creación de la ENS de Nayarit{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se creó la Escuela Normal Superior de Nayarit
                              dentro del Instituto del Estado o Universidad
                              Autónoma de Nayarit. Por el Decreto 4876, 7 de
                              enero de 1967, se establece como organismo
                              público, con personalidad pública y patrimonio
                              propios{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1959 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia14.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Fundación de la ENS de Chihuahua{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se fundó la Escuela Normal Superior de Chihuahua
                              “Porfirio Parra” como institución educativa de
                              control público.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1960 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia15.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">Eventos generales </h4>
                            <p class="card-text m-0">
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
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1961 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia16.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Fundación de escuelas{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se fundaron: la Escuela Normal Superior del Estado
                              de Nuevo León, “Prof. Moisés Sáenz Garza” y la
                              Escuela Normal Oficial "Lic. Benito Juárez" como
                              centros de formación de carácter público estatal.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1962 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia17.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Constitución de la Escuela Normal de Chalco{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se constituyó la Escuela Normal de Chalco, como
                              institución pública estatal, en la formación de
                              maestros de secundaria en varias especialidades.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1964 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia18.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Instituciones formadoras particulares{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se establecieron la Escuela Normal Superior “Juana
                              de Asbaje”, Zamora, Michoacán y la Escuela Normal
                              Superior “Instituto América”, León, Guanajuato,
                              como instituciones formadoras particulares. La
                              primera incorporada a la SEP y la segunda al
                              gobierno el Estado.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1965 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia19.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Creación de escuelas{" "}
                            </h4>
                            <p class="card-text m-0">
                              Fueron creadas: la Escuela Normal Superior del
                              Sureste “Lic. Benito Juárez”, Oaxaca (cerrada) y
                              la Escuela Normal Superior Anexa al Instituto
                              “Justo Sierra”, León, Gto. Ambas escuelas
                              particulares. La primera fue cerrada y la segunda
                              fue incorprada al gobierno del Estado.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1966 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia20.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Concepción de escuelas{" "}
                            </h4>
                            <p class="card-text m-0">
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
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1967 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia21.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Fundación de nuevas ENS{" "}
                            </h4>
                            <p class="card-text m-0">
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
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1969 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia22.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Creación de la ENS de Tamaulipas{" "}
                            </h4>
                            <p class="card-text m-0">
                              Fue creada la Escuela Normal Superior de
                              Tamaulipas, de sostenimiento privado. Por acuerdo
                              del 2 de julio de 1970 se otorgó a “Promotora de
                              Educación Superior en Tamaulipas, Asociación
                              Civil”, autorización para que imparta enseñanza de
                              Normal Superior en la que se denominaría “Escuela
                              Normal Superior de Tamaulipas”.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1971 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia23.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">Nuevas ENS </h4>
                            <p class="card-text m-0">
                              Surgieron: la Escuela Normal Superior del Sur de
                              Tamaulipas, la Escuela Normal Superior de Oaxaca,
                              A.C., la Escuela Normal Superior de Yucatán,
                              “Antonio Betancourt Pérez” y la Escuela Normal de
                              Tejupilco. Las dos primeras particulares y las dos
                              últimas públicas estatales.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1972 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia24.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">ENS de Celaya </h4>
                            <p class="card-text m-0">
                              Se concibió la Escuela Normal Superior de Celaya
                              como Asociación Civil de sostenimiento particular,
                              incorporada al gobierno del Estado.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1973 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia25.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Establecimiento de escuelas{" "}
                            </h4>
                            <p class="card-text m-0">
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
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1974 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia26.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Fueron constituidas:{" "}
                            </h4>
                            <p class="card-text m-0">
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
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1975 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia27.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">Se crearon: </h4>
                            <p class="card-text m-0">
                              La Escuela Normal San Felipe del Progreso y la
                              Escuela Normal de Texcoco, como instituciones
                              públicas estatales en la formación de maestros de
                              secundaria.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1976 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia28.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Publicación del Acuerdo{" "}
                            </h4>
                            <p class="card-text m-0">
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
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1977 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia29.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Creación y Organización de Escuelas Normales
                              Superiores{" "}
                            </h4>
                            <p class="card-text m-0">
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
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1978 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia30.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">Se abrieron: </h4>
                            <p class="card-text m-0">
                              La Escuela Normal de Atizapán de Zaragoza y la
                              Escuela Normal No. 4 de Nezahualcóyotl, como
                              instituciones públicas estatales, en la formación
                              de maestros de secundaria.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1979 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia31.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Transformaciones en la Dirección de Educación
                              Normal Superior y Surgimiento de Nuevas
                              Instituciones{" "}
                            </h4>
                            <p class="card-text m-0">
                              Desaparece la naciente Dirección de Educación
                              Normal Superior y Especialidades, se convierte en
                              un Departamento y se estableció el Consejo
                              Nacional Consultivo de Educación Normal como
                              organismo para regularizar y racionalizar la
                              matrícula de las Escuelas Normales Superiores
                              Estatales. (Gámez, 1990: 14). Surgió la Escuela
                              Normal Superior de Ciudad Madero A.C., Tamaulipas,
                              como institución formadora particular.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1982 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia32.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Creación de ENS Federal en Veracruz{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se creó la Escuela Normal Superior Federal para
                              Cursos Intensivos en Veracruz, institución
                              educativa federal, como parte del proceso de
                              regionalización de la formación docente de
                              maestros, con tres departamentos de Control
                              escolar, Titulación e Investigación, Área
                              académica y Planeación Educativa.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1983 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia33.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">Se constituyen: </h4>
                            <p class="card-text m-0">
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
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1984 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia34.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">Se concibió: </h4>
                            <p class="card-text m-0">
                              La Escuela Normal Superior del Estado de Puebla,
                              como institución formadora de carácter público
                              estatal. Se publicó el Acuerdo que autorizó la
                              impartición de cursos intensivos en Campeche y
                              Michoacán (Gámez, 1990: 15).{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1985 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia35.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">ENS de Morelia </h4>
                            <p class="card-text m-0">
                              Surgió la Escuela Normal Superior de Morelia,
                              Michoacán, como institución formadora federal para
                              ofrecer cursos intensivos a estudiantes
                              procedentes de los estados de Guerrero, Jalisco,
                              Colima, Guanajuato y Michoacán.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1986 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia36.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Escuela Particular Normal Superior "Lic. Benito
                              Juárez"{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se fundó la Escuela Particular Normal Superior
                              “Lic. Benito Juárez”, (EPNSBJ), Morelos, como
                              iniciativa de la delegación XIX del SNTE,
                              "resultado del conflicto de intereses al interior
                              de la propia delegación, que llevó a la fractura
                              del profesorado que laboraba en la Escuela
                              Particular Normal Superior del Estado (EPNSE)
                              (González, Arredondo, Espinosa, 2009: 145){" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1987 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia37.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Transformación de la Escuela Normal Superior
                              Veracruzana Dr. Manuel Suárez Trujillo y
                              Surgimiento de Nuevas Instituciones{" "}
                            </h4>
                            <p class="card-text m-0">
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
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1988 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia38.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">Surgieron: </h4>
                            <p class="card-text m-0">
                              La Escuela Normal Superior Federal de Oaxaca, la
                              Escuela Normal Superior Federalizada del Estado de
                              Puebla (ENSFEP) y la Escuela Normal Superior de
                              Zacatecas. Las dos primeras como instituciones
                              públicas federales; la tercera como institución
                              educativa particular.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item left">
                    <div class="timeline-body d-md-flex justify-content-end">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
                          <span>1989 </span>
                        </div>
                      </div>
                      <div class="timeline-content timeline-indicator">
                        <div class="card border-0 shadow">
                          <img
                            class="card-img-top img-fluid"
                            loading="lazy"
                            src={require("../../assets/img/historia39.jpg")}

                            alt=""
                          />
                          <div class="card-body p-xl-4">
                            <h4 class="card-title mb-2">
                              Escuela Normal "Vicente Guerrero"{" "}
                            </h4>
                            <p class="card-text m-0">
                              Se creó la Escuela Normal "Vicente Guerrero", como
                              institución formadora pública de carácter estatal
                              y la Escuela Normal "Carrillo Cárdenas",
                              institución privada.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                 {/*  <li class="timeline-item right">
                    <div class="timeline-body ">
                      <div class="timeline-meta">
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
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
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
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
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
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
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
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
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
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
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
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
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
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
                        <div class="d-inline-flex flex-column px-2 py-1 text-primary-emphasis bg-primary-subtle border border-success-subtle rounded-2 text-md-end">
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
