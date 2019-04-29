import React from 'react';
import PropTypes from 'prop-types';
import { HTMLContent } from './Content';

const Team = ({ teamList }) => (
  <>
    <ul className='list-unstyled row'>
      {teamList.map(({ node: teamMember }) => (
        <li key={teamMember.id} className='col-lg-4 col-sm-6 '>
          {console.log(teamMember)}
          <TeamMember teamMember={teamMember} />
        </li>
      ))}
    </ul>
  </>
);

const TeamMember = ({ teamMember }) => {
  const { frontmatter, html, image, email } = teamMember;
  return (
    <>
      {frontmatter.image.publicURL && (
        <img src={frontmatter.image.publicURL} className='w-100' />
      )}
      <h2 className='text-center'>{frontmatter.title}</h2>
      {frontmatter.email && (
        <p>
          <a href={frontmatter.email}>{frontmatter.email}</a>
        </p>
      )}

      <HTMLContent content={html} />
    </>
  );
};

Team.propTypes = {
  team: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string
    })
  )
};

export default Team;
