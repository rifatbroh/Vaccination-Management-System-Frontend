import Vaccine_list from "../components/Dashboard/Doctor/Vaccine_list";
import Footer from "../components/Header/Footer";
import Header from "../components/Header/Header";
import Counter from "../components/Hero/Counter";
import Hero from "../components/Hero/Hero";
import About from "./About";
import Appoinment from "./Appoinment";
import Doctors from "./Doctors";

const Landing_Page = () => {
    return (
        <div className="bg-[#e1eeff]">
            <Header />
            <Hero />
            <Counter />
            <About />
            <Doctors />
            <Appoinment />
           <Footer />
            
        </div>
    );
};

export default Landing_Page;