import React, {useEffect} from 'react'
import AOS from 'aos';
import imagesLoaded from 'imagesloaded';
import Isotope from 'isotope-layout';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from 'react-router-dom'
import GLightbox from 'glightbox'; // Importa GLightbox
import { BsList } from "react-icons/bs";

export default function Contact() {
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
        <div class="contact-page">

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
      
          <div class="page-title dark-background">
            <div class="container position-relative">
              <h1>Contact</h1>
              <nav class="breadcrumbs">
                <ol>
                  <li><a href="index.html">Home</a></li>
                  <li class="current">Contact</li>
                </ol>
              </nav>
            </div>
          </div>
      
          <section id="contact" class="contact section">
      
            <div class="container" data-aos="fade-up" data-aos-delay="100">
      
              <div class="row gy-4">
      
                <div class="col-lg-6">
                  <div class="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
                    <i class="bi bi-geo-alt"></i>
                    <h3>Address</h3>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
                </div>
      
                <div class="col-lg-3 col-md-6">
                  <div class="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                    <i class="bi bi-telephone"></i>
                    <h3>Call Us</h3>
                    <p>+1 5589 55488 55</p>
                  </div>
                </div>
      
                <div class="col-lg-3 col-md-6">
                  <div class="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                    <i class="bi bi-envelope"></i>
                    <h3>Email Us</h3>
                    <p>info@example.com</p>
                  </div>
                </div>
      
              </div>
      
              <div class="row gy-4 mt-1">
                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus" frameborder="0" class="maps"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
      
                <div class="col-lg-6">
                  <form action="forms/contact.php" method="post" class="php-email-form" data-aos="fade-up" data-aos-delay="400">
                    <div class="row gy-4">
      
                      <div class="col-md-6">
                        <input type="text" name="name" class="form-control" placeholder="Your Name" required=""/>
                      </div>
      
                      <div class="col-md-6 ">
                        <input type="email" class="form-control" name="email" placeholder="Your Email" required=""/>
                      </div>
      
                      <div class="col-md-12">
                        <input type="text" class="form-control" name="subject" placeholder="Subject" required=""/>
                      </div>
      
                      <div class="col-md-12">
                        <textarea class="form-control" name="message" rows="6" placeholder="Message" required=""></textarea>
                      </div>
      
                      <div class="col-md-12 text-center">
                        <div class="loading">Loading</div>
                        <div class="error-message"></div>
                        <div class="sent-message">Your message has been sent. Thank you!</div>
      
                        <button type="submit">Send Message</button>
                      </div>
      
                    </div>
                  </form>
                </div>
      
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