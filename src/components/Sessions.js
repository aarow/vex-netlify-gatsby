import React, { useState } from "react";
// import { Row, Col } from "reactstrap";

import AccordionList from "./Accordion";
import SessionSlider from "./SessionSlider";

const Sessions = ({ sessionList = [] }) => {
  const [currentSession, setCurrentSession] = useState(sessionList[0]);

  return (
    <div className="clearfix">
      {/* <Col md="6"> */}
      <div className="w-50 float-left trapezoid-clip" style={{}}>
        <SessionSlider classList={sessionList} currentClass={currentSession} />
      </div>
      {/* </Col>
      <Col md="6"> */}
      <AccordionList
        itemList={sessionList}
        currentItem={currentSession}
        setCurrentItem={setCurrentSession}
        headerTag="h4"
        headerClass="h5"
        bodyClass="small pl-3"
      />
      {/* </Col> */}
    </div>
  );
};

export default Sessions;
