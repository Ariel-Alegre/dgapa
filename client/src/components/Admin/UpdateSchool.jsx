import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdArrowUp } from "react-icons/io";
import { Global } from "../../assets/utils/utils";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PutSchool from "./PutSchool";
import { DeleteSchool } from "../../redux/action";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  boxShadow: 24,
};
export default function UpdateSchool() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [allSchool, setAllschool] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [detailsSchool, setDetailsSchools] = React.useState([]);
  const handleOpen = async (schoolId) => {
    setOpen(true);
    const response = await axios.get(
      `http://localhost:3001/api/detail-school/${schoolId}`
    );
    setDetailsSchools(response.data.data);
  };
  const handleClose = () => setOpen(false);
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

  // Función para eliminar escuela
  const handleDelete = async (id) => {
    try {
      dispatch(DeleteSchool(id));
      alert("Escuela eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la escuela", error);
      alert("Error al eliminar la escuela");
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className="about-page">
      <main className="main">
        <section id="about" className="about section" data-aos="fade-up">
          <div className="container gallery-card">
            {allSchool?.map((data) => (
              <Card sx={{ maxWidth: 345, width: 345 }} key={data.id}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={data.image}
                    alt="School logo"
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

                    {/* Botones de Actualizar y Eliminar */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "10px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        onClick={() => handleOpen(data.id)}
                      >
                        Actualizar
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(data.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <PutSchool detailsSchool={detailsSchool} />
            </Box>
          </Modal>
        </section>
      </main>

      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <IoMdArrowUp className="icon-color" />
      </a>

      <div id="preloader"></div>
    </div>
  );
}
