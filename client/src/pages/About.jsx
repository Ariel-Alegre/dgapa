import AboutComponent from '../components/AboutComponent/About';
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

export default function About() {
    return(
        <div>

<Navbar/>

            <AboutComponent/>
            <ButtonWhatsapp/>
            <Footer />

        </div>
    )
}