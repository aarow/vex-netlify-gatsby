import React from 'react';
import PropTypes from 'prop-types';
import { HTMLContent } from './Content';

const PriceList = ({ priceList }) => (
  <>
    <ul className='list-unstyled row'>
      {priceList.map(priceItem => (
        <li key={priceItem.price} className='col-md-3 col-sm-6 text-center'>
          <PriceItem {...priceItem} />
        </li>
      ))}
    </ul>
  </>
);

const PriceItem = priceItem => (
  <>
    <h2>{priceItem.product_title}</h2>
    <div className='price'>
      <span>{priceItem.price}</span> / <span>{priceItem.unit}</span>
    </div>
    <div className='desc'>
      <HTMLContent content={priceItem.description} />
    </div>
    <a href={priceItem.link} className='btn btn-outline-primary'>
      {priceItem.link_title}
    </a>
  </>
);

PriceList.propTypes = {
  priceList: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      link: PropTypes.string,
      link_title: PropTypes.string,
      price: PropTypes.string,
      product_title: PropTypes.string,
      unit: PropTypes.string
    })
  )
};

export default PriceList;
