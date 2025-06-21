
const About = () => {
    return (
        <div>
            <div class="top-info flex pt-15 px-35 gap-25 justify-center">
                <div class="left-text">
                    <p class="text-5xl font-bold text-[#002570] w-100">Extra Ordinary <br /> <span class="text-[#1c76cb]">Vaccine Solutions</span></p>
                </div>
                <div class="right-text">
                    <p class="text-xl w-130">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, rem nulla sunt culpa ea, veniam illo ad id fugit quod, recusandae laboriosam reiciendis ex officia. Repellendus praesentium explicabo consequatur laboriosam?</p>
                </div>
            </div>

            {/* About vaccine type */}

            <div class="bottom-info flex justify-center gap-20 my-20">
                <div class="details-1 w-60 bg-white p-5 rounded-xl shadow-xl">
                    <div class="txt text-3xl font-bold text-[#002570]"><p>Orthopedic care sector</p></div>
                    <img class="h-20 w-20 my-3" src="https://www.svgrepo.com/show/485748/injection.svg" alt="" />
                    <p class="text-lg">Lorem ipsum dolor amet consectetur adipisicing elit. </p>
                    <p class="text-xl text-blue-500 mt-3 hover:underline"><a href="#">Learn More</a></p>
                </div>

                <div class="details-1 w-60 bg-white p-5 rounded-xl shadow-xl">
                    <div class="txt text-3xl font-bold text-[#002570]"><p>Orthopedic care sector</p></div>
                    <img class="h-20 w-20 my-3" src="https://www.svgrepo.com/show/485748/injection.svg" alt="" />
                    <p class="text-lg">Lorem ipsum dolor amet consectetur adipisicing elit. </p>
                    <p class="text-xl text-blue-500 mt-3 hover:underline"><a href="#">Learn More</a></p>
                </div>

                <div class="details-1 w-60 bg-white p-5 rounded-xl shadow-xl">
                    <div class="txt text-3xl font-bold text-[#002570]"><p>Orthopedic care sector</p></div>
                    <img class="h-20 w-20 my-3" src="https://www.svgrepo.com/show/485748/injection.svg" alt="" />
                    <p class="text-lg">Lorem ipsum dolor amet consectetur adipisicing elit. </p>
                    <p class="text-xl text-blue-500 mt-3 hover:underline"><a href="#">Learn More</a></p>
                </div>
            </div>
        </div>
    );
};

export default About;