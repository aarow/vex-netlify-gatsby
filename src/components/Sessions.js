import React, { useState, useEffect } from "react";
import { HTMLContent } from "./Content";
import { Row, Col } from "reactstrap";

import SessionSlider from "./SessionSlider";
import AccordionList from "./Accordion";

const Sessions = ({ classList = [] }) => {
  const normalizeSessions = array => {
    return array.reduce((sessionList, { node: { id, html, frontmatter } }) => {
      sessionList[id] = {
        id,
        body: <HTMLContent content={html} />,
        header: frontmatter.title
      };
      return sessionList;
    }, {});
  };

  const sessionList = normalizeSessions(classList);

  const [currentSession, setCurrentSession] = useState(
    sessionList[Object.keys(sessionList)[0]]
  );

  const updateCurrentClass = classId => {
    setCurrentSession(sessionList[classId]);
  };

  useEffect(() => {
    console.log("sessions currentClass: ", currentSession);
  });

  return (
    <Row>
      <Col md="6">
        {/* <SessionSlider classList={classList} currentClass={currentClass} /> */}
      </Col>
      <Col md="6">
        <SessionAccordionList
          classList={sessionList}
          currentClass={currentSession}
          updateCurrentClass={setCurrentSession}
        />
      </Col>
    </Row>
  );
};

const SessionAccordionList = ({
  classList,
  currentClass,
  updateCurrentClass
}) => {
  const accordionList = Object.keys(classList).map(item => {
    return classList[item];
  });

  return (
    <>
      <AccordionList
        itemList={accordionList}
        currentItem={currentClass}
        setCurrentItem={updateCurrentClass}
      />
    </>
  );
};

export default Sessions;
