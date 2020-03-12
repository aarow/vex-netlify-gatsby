import React from "react";
import { HTMLContent } from "./Content";
import { graphql, useStaticQuery } from "gatsby";
import Modal from "./Modal";

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
            html
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
      <div className="overflow-auto">
        <ul className="team-list--list list-unstyled mb-n5">
          {teamList.map(({ node: teamMember }) => (
            <li
              key={teamMember.id}
              className="team-list--item col-lg-4 col-sm-6 mb-5 float-left"
            >
              <Modal
                trigger={<TeamMember teamMember={teamMember} />}
                content={<TeamMemberDetails teamMember={teamMember} />}
              ></Modal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TeamMember = ({ teamMember }) => {
  const { frontmatter } = teamMember;

  return (
    <div className="team-list--card card  neumophic-up-flat border-0 text-center h-100">
      <div className="card-body py-5 d-flex flex-column justify-content-between align-items-center">
        <div className="avatar--circle--outer mb-3 d-flex align-items-center justify-content-center neumophic-down-flat">
          <div
            className="avatar--circle bg-full "
            style={{
              backgroundImage: `url("${frontmatter.image.publicURL}")`
            }}
          ></div>
        </div>
        <h4 className="mb-0">{frontmatter.title}</h4>
        <div className="mb-3">
          <small>{frontmatter.job_title}</small>
        </div>
      </div>
    </div>
  );
};

const TeamMemberDetails = ({ teamMember, className = "" }) => {
  const { frontmatter, html } = teamMember;

  return (
    <div
      className={
        className +
        "team-list--details team-member--details  container-fluid min-vh-100"
      }
    >
      <div className="row h-100 ">
        <div className=" col-sm-5 p-0 mt-md-5 text-right">
          <div
            className="team-member--avatar bg-full d-inline-block"
            style={{
              backgroundImage: `url("${frontmatter.image.publicURL}")`
            }}
          ></div>
        </div>
        <div className="team-member--content col-sm-7 py-5 px-4 p-sm-5 ">
          <div className="d-flex">
            <div className="col-lg-9 col-xl-7">
              <h3 className="mb-3">{frontmatter.title}</h3>
              <div className="mb-3">
                <small>{frontmatter.job_title}</small>
              </div>
              <HTMLContent content={html} className="text-left overflow-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
