import ContactComponent from '../components/Contact/Contact';
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Navbar from "../components/Navbar/Navbar";

export default function Contact() {
    return (
        <div>
      <Navbar/>

            <ContactComponent/>
      <ButtonWhatsapp />

            <Footer />

        </div>
    )
}