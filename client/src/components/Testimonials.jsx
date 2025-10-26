import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Static testimonial data - you can replace this with data from your backend later
const testimonials = [
  {
    quote: "Vinitamart has changed the way I shop for groceries! The quality is always top-notch and the delivery is incredibly fast. Highly recommended!",
    author: "An Nguyen",
    location: "Hanoi",
  },
  {
    quote: "I love the wide range of organic products available. It's my go-to store for healthy and fresh food for my family. The prices are fair too.",
    author: "Linh Tran",
    location: "Ho Chi Minh City",
  },
  {
    quote: "The customer service is excellent. They were very helpful when I had a query about my order. A trustworthy and reliable service.",
    author: "Minh Pham",
    location: "Da Nang",
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text">
            What Our Customers Say
          </h2>
          <p className="text-base text-muted mt-2">
            Real stories from our happy clients.
          </p>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.testimonial-pagination' }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-3xl mx-auto">
                <p className="text-lg text-muted italic">"{testimonial.quote}"</p>
                <p className="mt-6 font-bold text-text text-lg">{testimonial.author}</p>
                <p className="text-sm text-muted">{testimonial.location}</p>
              </div>
            </SwiperSlide>
          ))}
          <div className="testimonial-pagination"></div>
        </Swiper>
      </div>
       <style>{`
        .testimonial-pagination {
          position: static;
          margin-top: 30px;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        .testimonial-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: var(--color-accent);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .testimonial-pagination .swiper-pagination-bullet-active {
          background-color: var(--color-primary);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;