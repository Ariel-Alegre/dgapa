import SchoolDetailsComponent from '../components/SchoolDetails/SchoolDetails'
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

export default function SchoolDetails() {
    return (
        <div>
      <Navbar/>

            <SchoolDetailsComponent/>
      <ButtonWhatsapp />

      <Footer />

        </div>
    )
}