import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import chicken from './Chicken-Biryani-Recipe.jpg'
import pasta from './Pasta Image.jpg'
import pizza from './vegetarian-pizza.jpg'
import momos from './steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg'
import { ReactComponent as LeftArrow } from './Arrow-left.svg';
import { ReactComponent as RightArrow } from './Arrow-right.svg';
function SimpleSlider() {
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <button className="inline-block bg-stone-400 cursor-pointer absolute right-1 rounded-full top-1/2" onClick={onClick}
      >

        <RightArrow className="w-10 hover:w-12"></RightArrow>
      </button>
    );
  }
  //   customising my own arrows
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <button className="inline-block bg-stone-400 rounded-full cursor-pointer absolute left-1 z-10 top-1/2" onClick={onClick}
      >

        <LeftArrow className="w-10 hover:w-12"></LeftArrow>
      </button>
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    customPaging: (i) => (
      <div className="cursor-pointer my-1">

        <span className="w-4 h-1 bg-white inline-block dot-inner"></span>
      </div>
    ),
  };
  //   this is how to use custom dots also called custom paging
  return (
    <div className="flex flex-row justify-center mt-20">
      <div className="w-full">
        <Slider {...settings}>
          <div className="h-[65rem]">
            <img className="object-fill w-full h-full" src={chicken} alt='chicken' />
          </div>
          <div className="h-[65rem]">
            <img className="object-fill w-full h-full" src={pizza} alt='pizza' />
          </div>
          <div className="h-[65rem]">
            <img className="object-fill w-full h-full" src={pasta} alt='pasta' />
          </div>
          <div className="h-[65rem]">
            <img className="object-fill w-full h-full" src={momos} alt='momos' />
          </div>

        </Slider>
      </div>

    </div>
  );
}

export default SimpleSlider;
