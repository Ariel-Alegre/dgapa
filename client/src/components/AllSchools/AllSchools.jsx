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

export default function AllSchools() {
  const { pathname } = useLocation();
  const [allSchool, setAllschool] = useState([]);

  useEffect(() => {
    Global();
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
                <Link to="/acerca">Nosotros</Link>
              </li>
              <li>
                <Link to="/galeria">Galeria</Link>
              </li>
              <li>
                <Link to="/contacto">Contacto</Link>
              </li>
            </ul>
            <i class="mobile-nav-toggle d-xl-none bi bi-list">
              <BsList />
            </i>
          </nav>
        </div>
      </header>
      <main class="main">
        <section id="about" class="about section" data-aos="fade-up">
          <div class="page-schools dark-background">
            <div
              class="container position-relative"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h1>Escuelas de México</h1>
            </div>
          </div>
          <div class="container gallery-card">
            {allSchool?.map((data) => (
              <Link to={`/escuelas-detalles/${data.id}`} style={{textDecoration: "none"}}>
              <Card sx={{ maxWidth: 345, width: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={data.image}
                    alt="green iguana"
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

            ))}
          </div>
        </section>

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
