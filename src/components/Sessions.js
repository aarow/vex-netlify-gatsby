import React from 'react';
import PropTypes from 'prop-types';
import { HTMLContent } from './Content';

const Session = ({ session: { frontmatter, html } }) => (
  <>
    <h2>{frontmatter.title}</h2>
    <HTMLContent content={html} />
  </>
);

const Sessions = ({ classList }) => (
  <>
    <ul className='list-unstyled row'>
      {classList.map(({ node: aClass }) => (
        <li key={aClass.id} className='col-lg-4 col-md-6 '>
          <Session session={aClass} />
        </li>
      ))}
    </ul>
  </>
);

Sessions.propTypes = {
  classList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      html: PropTypes.string,
      frontmatter: PropTypes.shape({
        title: PropTypes.string
      })
    })
  )
};

Session.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string,
    html: PropTypes.string,
    frontmatter: PropTypes.shape({
      title: PropTypes.string
    })
  })
};

export default Sessions;
