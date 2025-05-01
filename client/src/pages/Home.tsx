import BookingImg from "../assets/bookingimage.png";
import { ReactTyped } from "react-typed";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import { Autoplay } from "swiper/modules"; // ✅ import Autoplay module

interface Testimonials {
  content: string
}

const Home = () => {
  const [testimonials, setTestimonials] = useState<Testimonials[]>([])

  useEffect(() => {
    api.get('api/testimonials/testimonials/')
    .then(res => setTestimonials(res.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section className="w-full min-h-[24rem] flex items-center justify-center bg-cyan-600 px-4 text-center">
        <div className="flex flex-col justify-center items-center space-y-4 max-w-2xl py-12">
          <ReactTyped
            className="text-3xl md:text-4xl font-extrabold text-stone-900 drop-shadow"
            strings={["Need to Book a Ride?", "Booking rides has never been easier!"]}
            typeSpeed={40}
            backSpeed={20}
            loop
          />
          <p className="text-white text-sm md:text-base">
            Never get stranded again! With Book Rider you can book your rides from anywhere in the country 24/7. Book a free trial ride today.
          </p>
          <Link to={'login'}>
            <button className="bg-stone-900 px-6 py-3 rounded-xl text-white font-medium hover:scale-105 transition-transform">
              Book Ride
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col-reverse md:flex-row justify-between p-8 bg-black text-white gap-6" id="about">
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <h2 className="text-3xl font-bold text-cyan-400">About Book Rider</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus natus aliquam facilis hic saepe voluptates praesentium alias impedit.
          </p>
          <h3 className="text-2xl font-semibold text-cyan-400">Why Choose Us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, soluta voluptates! Soluta dicta eveniet voluptatem.
          </p>
          <Link to={'login'}>
            <button className="bg-stone-900 px-6 py-3 rounded-xl text-white font-medium hover:scale-105 transition-transform">
              Take a Ride
            </button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img src={BookingImg} alt="Booking" className="w-full max-w-md rounded shadow-xl" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-cyan-50" id="testimonials">
        <h2 className="text-center text-3xl font-bold text-stone-800 mb-8">What Our Customers Say</h2>
        <Swiper
          className="w-full max-w-2xl mx-auto"
          modules={[Autoplay]} // ✅ register module
          speed={800} // transition speed (ms)
          autoplay={{ delay: 3000, disableOnInteraction: false }} // ✅ autoplay setup
          loop={true}
        >
          {testimonials.map((content, index) => (
            <SwiperSlide key={index} >
              <div className="bg-white rounded-xl shadow-md p-6 text-center text-stone-700">
                <p className="italic">“{content.content}”</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
};

export default Home;
