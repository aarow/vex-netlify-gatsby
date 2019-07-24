import React from "react";
import PropTypes from "prop-types";

const Banner = ({ slideList }) => (
  <div className="">
    {slideList.map(slide => (
      <div key={slide.title} className="">
        <div
          className="bg-full"
          style={{
            backgroundImage: `url("${slide.background_image.publicURL}")`
          }}
        >
          <div className="text-white">{slide.title}</div>
        </div>
      </div>
    ))}
  </div>
);

Banner.propTypes = {
  slideList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      background_image: PropTypes.shape({
        publicURL: PropTypes.string
      })
    })
  )
};

export default Banner;
