import React from "react";
import { motion } from "framer-motion";

const AccordionList = ({
  itemList,
  currentItem,
  setCurrentItem,
  headerTag = "div",
  headerClass = "",
  bodyClass = ""
}) => {
  const updateCurrentItem = item => {
    if (currentItem.id !== item.id) {
      setCurrentItem(item);
    }
  };

  return (
    <ul className="list-unstyled">
      {itemList.map(item => (
        <li key={item.id} className="accordion-container mb-2">
          <Accordion
            item={item}
            updateCurrentItem={updateCurrentItem}
            currentItem={currentItem}
            header={React.createElement(
              headerTag,
              { className: headerClass },
              item.header
            )}
            bodyClass={bodyClass}
          />
        </li>
      ))}
    </ul>
  );
};

const Accordion = ({
  item,
  currentItem,
  updateCurrentItem,
  header,
  bodyClass
}) => {
  const isOpen = item.id === currentItem.id;

  const variants = {
    open: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 }
  };

  return (
    <article>
      <motion.header initial={false} onClick={() => updateCurrentItem(item)}>
        <div className={`${isOpen ? "open" : "collapsed"} accordion-header`}>
          {header}
        </div>
      </motion.header>
      <motion.div
        key={item.id}
        initial="collapsed"
        animate={isOpen ? "open" : "collapsed"}
        variants={variants}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        className=""
      >
        <div className={`accordion-body ${bodyClass}`}>
          <div className="d-inline--children">{item.body}</div>
        </div>
      </motion.div>
    </article>
  );
};

export default AccordionList;
