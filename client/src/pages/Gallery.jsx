import GalleryComponent from '../components/Gallery/Gallery'
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Navbar from "../components/Navbar/Navbar";

export default function Gallery() {
    return(
        <div>
      <Navbar/>

  <GalleryComponent/>
  <ButtonWhatsapp />
  <Footer />
        </div>
    )
}