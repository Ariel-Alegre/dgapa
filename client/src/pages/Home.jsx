import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Footer from "../components/Footer/Footer";
import HomeComponent from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <HomeComponent />

      <ButtonWhatsapp />
      <Footer />
    </div>
  );
}
