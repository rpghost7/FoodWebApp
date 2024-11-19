import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import rightArrow from './reshot-icon-right-arrow-UCA8NGYZDJ.svg'
import leftArrow from './reshot-icon-arrow-left-UZDAC2LESG.svg'
import chicken from './Chicken-Biryani-Recipe.jpg'
import pasta from './Pasta Image.jpg'
import pizza from './vegetarian-pizza.jpg'
import momos from './steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg'

function SimpleSlider() {
    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
          <button className="inline-block bg-stone-500 text-white-400 p-1 cursor-pointer absolute right-1 rounded-full top-1/2"  onClick={onClick}
          >
          <img className="w-10 hover:w-12 " src={rightArrow} alt="rightarrow"/>
          </button>
        );
      }
      
      function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <button className="inline-block bg-stone-500 rounded-full text-white-400 p-1 cursor-pointer absolute left-1 z-10 top-1/2" onClick={onClick}
            >
            <img className="w-8 hover:w-10" src={leftArrow} alt="leftarrow"/>
            </button>
        );
      }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className="flex flex-row justify-center mt-20">
    <div className="w-full">
      <Slider {...settings}>
        <div className="h-[40rem]">
          <img className="object-fill w-full h-full" src={chicken} alt='chicken'/>
        </div>
        <div className="h-[40rem]">
          <img className="object-fill w-full h-full" src={pizza} alt='pizza'/>
        </div>
        <div className="h-[40rem]">
          <img className="object-fill w-full h-full" src={pasta} alt='pasta'/>
        </div>
        <div className="h-[40rem]">
          <img className="object-fill w-full h-full" src={momos} alt='momos'/>
        </div>
       
      </Slider>
    </div>
   
    </div>
  );
}

export default SimpleSlider;
