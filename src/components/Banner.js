import React from "react";
import PropTypes from "prop-types";

const Banner = ({ html, frontmatter: { background_image } }) => (
  <>
    <div
      className="vex-banner--slide bg-full d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url("${background_image.publicURL}")`
      }}
    >
      <div
        className="slide-body text-center"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  </>
);

Banner.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  html: PropTypes.string,
  background_image: PropTypes.shape({
    publicURL: PropTypes.string
  })
};

export default Banner;
