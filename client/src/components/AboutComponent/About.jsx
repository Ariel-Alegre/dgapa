import React, {useEffect} from 'react'
import AOS from 'aos';
import imagesLoaded from 'imagesloaded';
import Isotope from 'isotope-layout';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from 'react-router-dom'
import GLightbox from 'glightbox'; // Importa GLightbox
import { BsList } from "react-icons/bs";

import 'glightbox/dist/css/glightbox.css'; // Asegúrate de importar el CSS
export default function About() {
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
  
    document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
      navmenu.addEventListener("click", function (e) {
        e.preventDefault();
        this.parentNode.classList.toggle("active");
        this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
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
      document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
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
    return (
        <div class="about-page">

<header id="header" class="header d-flex align-items-center fixed-top">
        <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <a href="/" class="logo d-flex align-items-center">
            <img src={require("../../assets/img/logo.png")} alt="" />
          </a>

          <nav id="navmenu" class="navmenu">
            <ul>
              <li>
                <a href="/" class="active">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/about">Acerca</a>
              </li>

              <li>
                <a href="/contacto">Contact</a>
              </li>
            </ul>
            <i class="mobile-nav-toggle d-xl-none bi bi-list"><BsList/></i>

          </nav>
        </div>
      </header>
      
        <main class="main">
      
          <div class="page-title dark-background" >
            <div class="container position-relative">
              <h1>About</h1>
              <nav class="breadcrumbs">
                <ol>
                  <li><a href="index.html">Home</a></li>
                  <li class="current">About</li>
                </ol>
              </nav>
            </div>
          </div>
      
          <section id="about" class="about section">
      
            <div class="container">
      
              <div class="row position-relative">
      
                <div class="col-lg-7 about-img" data-aos="zoom-out" data-aos-delay="200"><img src="assets/img/about.jpg"/></div>
      
                <div class="col-lg-7" data-aos="fade-up" data-aos-delay="100">
                  <h2 class="inner-title">Consequatur eius et magnam</h2>
                  <div class="our-story">
                    <h4>Est 1988</h4>
                    <h3>Our Story</h3>
                    <p>Inventore aliquam beatae at et id alias. Ipsa dolores amet consequuntur minima quia maxime autem. Quidem id sed ratione. Tenetur provident autem in reiciendis rerum at dolor. Aliquam consectetur laudantium temporibus dicta minus dolor.</p>
                    <ul>
                      <li><i class="bi bi-check-circle"></i> <span>Ullamco laboris nisi ut aliquip ex ea commo</span></li>
                      <li><i class="bi bi-check-circle"></i> <span>Duis aute irure dolor in reprehenderit in</span></li>
                      <li><i class="bi bi-check-circle"></i> <span>Ullamco laboris nisi ut aliquip ex ea</span></li>
                    </ul>
                    <p>Vitae autem velit excepturi fugit. Animi ad non. Eligendi et non nesciunt suscipit repellendus porro in quo eveniet. Molestias in maxime doloremque.</p>
      
                    <div class="watch-video d-flex align-items-center position-relative">
                      <i class="bi bi-play-circle"></i>
                      <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" class="glightbox stretched-link">Watch Video</a>
                    </div>
                  </div>
                </div>
      
              </div>
      
            </div>
      
          </section>
      
          <section id="stats-counter" class="stats-counter section">
      
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
      
          </section>
      
          <section id="alt-services" class="alt-services section">
      
            <div class="container">
      
              <div class="row justify-content-around gy-4">
                <div class="features-image col-lg-6" data-aos="fade-up" data-aos-delay="100"><img src="assets/img/alt-services.jpg" alt=""/></div>
      
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
      
          </section>
      
          <section id="alt-services-2" class="alt-services-2 section">
      
            <div class="container">
      
              <div class="row justify-content-around gy-4">
      
                <div class="col-lg-6 d-flex flex-column justify-content-center order-2 order-lg-1" data-aos="fade-up" data-aos-delay="100">
                  <h3>Enim quis est voluptatibus aliquid consequatur</h3>
                  <p>Esse voluptas cumque vel exercitationem. Reiciendis est hic accusamus. Non ipsam et sed minima temporibus laudantium. Soluta voluptate sed facere corporis dolores excepturi</p>
      
                  <div class="row">
      
                    <div class="col-lg-6 icon-box d-flex">
                      <i class="bi bi-easel flex-shrink-0"></i>
                      <div>
                        <h4>Lorem Ipsum</h4>
                        <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias </p>
                      </div>
                    </div>
      
                    <div class="col-lg-6 icon-box d-flex">
                      <i class="bi bi-patch-check flex-shrink-0"></i>
                      <div>
                        <h4>Nemo Enim</h4>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiise</p>
                      </div>
                    </div>
      
                    <div class="col-lg-6 icon-box d-flex">
                      <i class="bi bi-brightness-high flex-shrink-0"></i>
                      <div>
                        <h4>Dine Pad</h4>
                        <p>Explicabo est voluptatum asperiores consequatur magnam. Et veritatis odit</p>
                      </div>
                    </div>
      
                    <div class="col-lg-6 icon-box d-flex">
                      <i class="bi bi-brightness-high flex-shrink-0"></i>
                      <div>
                        <h4>Tride clov</h4>
                        <p>Est voluptatem labore deleniti quis a delectus et. Saepe dolorem libero sit</p>
                      </div>
                    </div>
      
                  </div>
      
                </div>
      
                <div class="features-image col-lg-5 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="200">
                  <img src="assets/img/features-3-2.jpg" alt=""/>
                </div>
      
              </div>
      
            </div>
      
          </section>
      
          <section id="team" class="team section">
      
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
      
          </section>
      
          <section id="testimonials" class="testimonials section">
      
            <div class="container section-title" data-aos="fade-up">
              <h2>Testimonials</h2>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>
      
            <div class="container" data-aos="fade-up" data-aos-delay="100">
      
              <div class="swiper init-swiper">
              {/*   <script type="application/json" class="swiper-config">
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
                </script> */}
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
      
        </main>
      
        <footer id="footer" class="footer dark-background">
      
          <div class="container footer-top">
            <div class="row gy-4">
              <div class="col-lg-4 col-md-6 footer-about">
                <a href="index.html" class="logo d-flex align-items-center">
                  <span class="sitename">UpConstruction</span>
                </a>
                <div class="footer-contact pt-3">
                  <p>A108 Adam Street</p>
                  <p>New York, NY 535022</p>
                  <p class="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                  <p><strong>Email:</strong> <span>info@example.com</span></p>
                </div>
                <div class="social-links d-flex mt-4">
                  <a href=""><i class="bi bi-twitter-x"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
      
              <div class="col-lg-2 col-md-3 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About us</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Terms of service</a></li>
                  <li><a href="#">Privacy policy</a></li>
                </ul>
              </div>
      
              <div class="col-lg-2 col-md-3 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li><a href="#">Web Design</a></li>
                  <li><a href="#">Web Development</a></li>
                  <li><a href="#">Product Management</a></li>
                  <li><a href="#">Marketing</a></li>
                  <li><a href="#">Graphic Design</a></li>
                </ul>
              </div>
      
              <div class="col-lg-2 col-md-3 footer-links">
                <h4>Hic solutasetp</h4>
                <ul>
                  <li><a href="#">Molestiae accusamus iure</a></li>
                  <li><a href="#">Excepturi dignissimos</a></li>
                  <li><a href="#">Suscipit distinctio</a></li>
                  <li><a href="#">Dilecta</a></li>
                  <li><a href="#">Sit quas consectetur</a></li>
                </ul>
              </div>
      
              <div class="col-lg-2 col-md-3 footer-links">
                <h4>Nobis illum</h4>
                <ul>
                  <li><a href="#">Ipsam</a></li>
                  <li><a href="#">Laudantium dolorum</a></li>
                  <li><a href="#">Dinera</a></li>
                  <li><a href="#">Trodelas</a></li>
                  <li><a href="#">Flexo</a></li>
                </ul>
              </div>
      
            </div>
          </div>
      
          <div class="container copyright text-center mt-4">
            <p>© <span>Copyright</span> <strong class="px-1 sitename">UpConstruction</strong> <span>All Rights Reserved</span></p>
            <div class="credits">
             
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
      
        </footer>
      
        <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
      
        <div id="preloader"></div>
      
       
      
      </div>
    )
}