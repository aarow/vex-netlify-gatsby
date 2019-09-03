import React, { useState } from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "./Content";
import posed from "react-pose";

const AccordionBodyPose = posed.div({
  start: {
    height: 0,
    overflow: "hidden"
  },
  end: {
    height: "auto",
    transition: {
      duration: 400
    }
  }
});

const Session = ({ show, session, toggleSession }) => (
  <div
    onMouseDown={() => {
      toggleSession(session.id);
    }}
  >
    <h2 className="accordion-header">{session.frontmatter.title}</h2>
    <div className="accordion-body">
      <AccordionBodyPose pose={show ? "end" : "start"}>
        <HTMLContent content={session.html} />
      </AccordionBodyPose>
    </div>
  </div>
);

const Sessions = ({ classList }) => {
  const [openSession, toggleSession] = useState("");
  return (
    <>
      <ul className="list-unstyled ">
        {classList.map(({ node: aClass }) => (
          <li key={aClass.id} className="accordion-container">
            <Session
              session={aClass}
              toggleSession={toggleSession}
              show={openSession === aClass.id}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

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
