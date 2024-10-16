import { Swiper,  } from "swiper/react";
import AOS from "aos";

export const Global = () => {

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
}