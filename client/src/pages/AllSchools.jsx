import AllSchoolsComponents from '../components/AllSchools/AllSchools';
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Navbar from "../components/Navbar/Navbar";

export default function AllSchools() {
    return (
        <div>
      <Navbar/>

            <AllSchoolsComponents/>
            <ButtonWhatsapp />

<Footer />
        </div>
    )
}