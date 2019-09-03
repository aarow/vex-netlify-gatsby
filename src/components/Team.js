import React from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "./Content";

const Team = ({ teamList }) => (
  <div className="team-list--container ">
    <h2 className="text-center my-5">Your Vex Team</h2>
    <ul className="team-list--list list-unstyled row">
      {teamList.map(({ node: teamMember }) => (
        <li
          key={teamMember.id}
          className="team-list--item col-lg-4 col-sm-6 mb-5"
        >
          <TeamMember teamMember={teamMember} />
        </li>
      ))}
    </ul>
  </div>
);

const TeamMember = ({ teamMember }) => {
  const { frontmatter, html } = teamMember;
  return (
    <div class="team-list--card card border-0 text-center h-100">
      <div class="card-body py-5 ">
        {frontmatter.image.publicURL && (
          <div
            className="avatar--circle bg-full mx-auto mb-3"
            style={{ backgroundImage: `url("${frontmatter.image.publicURL}")` }}
          />
        )}
        <h3 className="mb-0">{frontmatter.title}</h3>
        <div className="mb-3">
          <small>{frontmatter.job_title}</small>
        </div>

        <HTMLContent content={html} className="team-list--description" />

        {frontmatter.email && (
          <p>
            <a href={frontmatter.email}>{frontmatter.email}</a>
          </p>
        )}
      </div>
    </div>
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
