import React from "react";
// import { HTMLContent } from "./Content";
import { Link, graphql, useStaticQuery } from "gatsby";

export default props => {
  const {
    allMarkdownRemark: { edges: teamList }
  } = useStaticQuery(graphql`
    query TeamSectionQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "team-member" } } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 94)
            id
            fields {
              slug
            }
            frontmatter {
              title
              job_title
              email
              image {
                id
                publicURL
              }
            }
          }
        }
      }
    }
  `);

  return (
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
};

const TeamMember = ({ teamMember }) => {
  const { frontmatter, html } = teamMember;
  return (
    <div className="team-list--card card border-0 text-center h-100">
      <div className="card-body py-5 d-flex flex-column justify-content-between align-items-center">
        <div className="avatar--circle--outer ">
          <div className="avatar--circle--outline"></div>
          <div
            className="avatar--circle bg-full mx-auto mb-3 "
            style={{ backgroundImage: `url("${frontmatter.image.publicURL}")` }}
          ></div>
        </div>
        <h3 className="mb-0">{frontmatter.title}</h3>
        <div className="mb-3">
          <small>{frontmatter.job_title}</small>
        </div>

        {/* <HTMLContent content={html} className="team-list--description" /> */}
        <div className="flex-grow-1">{teamMember.excerpt}</div>
        <Link className="mt-3" to={teamMember.fields.slug}>
          <i className="material-icons-round md-48">add_circle_outline</i>
        </Link>
      </div>
    </div>
  );
};
