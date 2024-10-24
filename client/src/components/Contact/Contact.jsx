import React, {useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import { BsList } from "react-icons/bs";
import { Global } from "../../assets/utils/utils";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { BsWhatsapp } from 'react-icons/bs';

import { IoMdArrowUp } from "react-icons/io";

export default function Contact() {

  const { pathname } = useLocation();

  useEffect(() => {
    Global();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
                <Link to="/" >
                  Princípal
                </Link>
              </li>
              <li>
                <Link to="/acerca">Nosotros</Link>
              </li>
              <li>
                <Link to="/galeria" >Galeria</Link>
              </li>
              <li>
                <Link to="/contacto" class="active">Contacto</Link>
              </li>
            </ul>
            <BsList className="mobile-nav-toggle d-xl-none bi bi-list" />

          </nav>
        </div>
      </header>
      
        <main class="main">
      
          <div class="page-title dark-background">
            <div class="container position-relative" data-aos="fade-up" data-aos-delay="100">
              <h1>Contacto</h1>
          
            </div>
          </div>
      
          <section id="contact" class="contact section">
      
            <div class="container" data-aos="fade-up" data-aos-delay="100">
      
              <div class="row gy-4">
      
                <div class="col-lg-6">
                  <div class="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
                    <i class="bi bi-geo-alt"><BsWhatsapp/></i>
                    <h3>WhatsApp</h3>
                    <a href="https://wa.me/+525532230784"  target="__blank"> +52 (55) 3223 0784</a>

                  </div>
                </div>
      
                <div class="col-lg-3 col-md-6">
                  <div class="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                    <i class="bi bi-telephone"><LocalPhoneIcon/></i>
                    <h3>Llámanos</h3>
                    <a href="tel:+525532230784">+52 (55) 3223 0784</a>
                  </div>
                </div>
      
                <div class="col-lg-3 col-md-6">
                  <div class="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                    <i class="bi bi-envelope"><EmailIcon/></i>
                    <h3>Email Us</h3>
                    <p>
                    <a href={`mailto:rrgonzaga@comunidad.unam.mx`}>

                    rrgonzaga@comunidad.unam.mx
                    </a>
                    </p>
                  </div>
                </div>
      
              </div>
      
            {/*   <div class="row gy-4 mt-1">
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
      
              </div> */}
      
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
    )
}