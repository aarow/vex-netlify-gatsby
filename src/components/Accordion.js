import React from "react";
import { motion } from "framer-motion";

const AccordionList = ({ itemList, currentItem, setCurrentItem }) => (
  <ul className="list-unstyled ">
    {itemList.map((item, index) => (
      <li key={item.id} className="accordion-container">
        <Accordion
          id={item.id}
          expanded={currentItem}
          setExpanded={setCurrentItem}
          body={item.body}
          header={item.header}
        />
      </li>
    ))}
  </ul>
);

const Accordion = ({ id, expanded, setExpanded, header, body }) => {
  const isOpen = id === expanded;
  const variants = {
    open: { opacity: 1, height: "auto", overflow: "hidden" },
    collapsed: { opacity: 0, height: 0, overflow: "hidden" }
  };

  return (
    <article>
      <motion.header
        initial={false}
        onClick={() => setExpanded(isOpen ? false : id)}
      >
        <h2 className="accordion-header">{header}</h2>
      </motion.header>
      <motion.section
        key={id}
        initial="collapsed"
        animate={isOpen ? "open" : "collapsed"}
        variants={variants}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
      >
        <div className="accordion-body">{body}</div>
      </motion.section>
    </article>
  );
};

export default AccordionList;
