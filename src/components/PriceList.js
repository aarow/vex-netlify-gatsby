import React from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "./Content";

const PriceList = ({ priceList }) => (
  <div className="price-list--container">
    <h2 className="price-list--title text-center my-5">{priceList.title}</h2>
    <ul className="price-list--item list-unstyled row">
      {priceList.prices.map(priceItem => (
        <li
          key={priceItem.price}
          className="price-list--item col-lg-3 col-sm-6 mb-3 mb-lg-0 text-center"
        >
          <PriceItem {...priceItem} />
        </li>
      ))}
    </ul>
  </div>
);

const PriceItem = priceItem => (
  <div className="price-list--card card h-100 border-0">
    <div className="card-body py-5">
      <h3 className="mb-3">{priceItem.product_title}</h3>

      <div className="desc mb-3">
        <HTMLContent content={priceItem.description} />
      </div>
      <div className="price mb-3">
        <span className="h4">${priceItem.price}</span>
        <span> per {priceItem.unit}</span>
        <br />
        <small>(3 Month Autopay Discount)</small>
      </div>

      <a href={priceItem.link} className="btn btn-dark btn-sm py-1 px-4">
        {priceItem.link_title}
      </a>
    </div>
  </div>
);

PriceList.propTypes = {
  priceList: PropTypes.shape({
    title: PropTypes.string,
    prices: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        link: PropTypes.string,
        link_title: PropTypes.string,
        price: PropTypes.string,
        product_title: PropTypes.string,
        unit: PropTypes.string
      })
    )
  })
};

export default PriceList;
