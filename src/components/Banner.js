import React from "react";
import PropTypes from "prop-types";

const Banner = ({ data }) => (
  <div className="columns">
    {data.map(banner => (
      <div key={price.plan} className="column">
        <section className="section">{banner.title}</section>
      </div>
    ))}
  </div>
);

Banner.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string
    })
  )
};

export default Banner;
