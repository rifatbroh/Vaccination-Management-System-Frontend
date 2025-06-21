import Header from "../components/Header/Header";
import Counter from "../components/Hero/Counter";
import Hero from "../components/Hero/Hero";
import About from "./About";

const Landing_Page = () => {
    return (
        <div className="bg-[#e1eeff]">
            <Header />
            <Hero />
            <Counter />
            <About />
        </div>
    );
};

export default Landing_Page;