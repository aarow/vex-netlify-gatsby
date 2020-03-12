import React, { useState } from "react";
// import { Row, Col } from "reactstrap";

import AccordionList from "./Accordion";
import SessionSlider from "./SessionSlider";

const Sessions = ({ sessionList = [] }) => {
  const [currentSession, setCurrentSession] = useState(sessionList[0]);

  return (
    <div className="">
      <h2 className="text-center mb-5">Classes We Offer</h2>
      {/* <Col md="6"> */}
      <div className="trapezoid-clip--left" style={{}}>
        <SessionSlider classList={sessionList} currentClass={currentSession} />
      </div>
      {/* </Col>
      <Col md="6"> */}
      <div className="">
        <AccordionList
          itemList={sessionList}
          currentItem={currentSession}
          setCurrentItem={setCurrentSession}
          headerTag="h4"
          headerClass="h5"
          bodyClass="small pl-3"
        />
      </div>
      {/* </Col> */}
    </div>
  );
};

export default Sessions;
