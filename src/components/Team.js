import React from 'react';
import PropTypes from 'prop-types';
import { HTMLContent } from './Content';

const Team = ({ teamList }) => (
  <>
    <ul className='list-unstyled row'>
      {teamList.map(({ node: teamMember }) => (
        <li key={teamMember.id} className='col-lg-4 col-sm-6 '>
          <TeamMember teamMember={teamMember} />
        </li>
      ))}
    </ul>
  </>
);

const TeamMember = ({ teamMember }) => {
  const { frontmatter, html } = teamMember;
  return (
    <>
      {frontmatter.image.publicURL && (
        <div
          className='avatar--circle bg-full'
          style={{ backgroundImage: `url("${frontmatter.image.publicURL}")` }}
        />
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
