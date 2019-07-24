import React from "react";
import PropTypes from "prop-types";

const Banner = ({ slideList }) => (
  <div className="vex-banner--slide--container">
    {slideList.map(slide => (
      <div
        key={slide.title}
        className="vex-banner--slide bg-full d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url("${slide.background_image.publicURL}")`
        }}
      >
        <div className="text-white slide-body">{slide.title}</div>
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
