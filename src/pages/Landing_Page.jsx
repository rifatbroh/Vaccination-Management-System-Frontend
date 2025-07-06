import { useRef } from "react";
import Vaccine_list from "../components/Dashboard/Doctor/Vaccine_list";
import Footer from "../components/Header/Footer";
import Header from "../components/Header/Header";
import Counter from "../components/Hero/Counter";
import Hero from "../components/Hero/Hero";
import About from "./About";
import Appoinment from "./Appoinment";
import ContactUs from "./ContactUs";
import Doctors from "./Doctors";

const Landing_Page = () => {
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const campaignRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="bg-[#e1eeff]">
            <Header
                onScrollToHero={() => scrollToSection(heroRef)}
                onScrollToAbout={() => scrollToSection(aboutRef)}
                onScrollToCampaign={() => scrollToSection(campaignRef)}
                onScrollToContact={() => scrollToSection(contactRef)}
            />

            <div ref={heroRef}>
                <Hero />
            </div>

            <Counter />

            <div ref={aboutRef}>
                <About />
            </div>

            <div ref={campaignRef}>
                <Doctors />
            </div>

            <Appoinment />

            <div ref={contactRef}>
                <ContactUs />
            </div>

            <Footer />
        </div>
    );
};

export default Landing_Page;
