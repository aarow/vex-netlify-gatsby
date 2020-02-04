import React, { useState } from "react";
// import PropTypes from "prop-types";
import { HTMLContent } from "./Content";
// import posed from "react-pose";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({ i, expanded, setExpanded, header, body }) => {
  const isOpen = i === expanded;

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <article>
      <motion.header
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <h2 className="accordion-header">{header}</h2>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0, overflow: "hidden" }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="accordion-body">{body}</div>
          </motion.section>
        )}
      </AnimatePresence>
    </article>
  );
};

const Sessions = ({ classList }) => {
  const [expanded, setExpanded] = useState(0);

  return (
    <>
      <ul className="list-unstyled ">
        {classList.map(({ node: singleClass }, index) => (
          <li key={singleClass.id} className="accordion-container">
            <Accordion
              i={singleClass.id}
              expanded={expanded}
              setExpanded={setExpanded}
              body={<HTMLContent content={singleClass.html} />}
              header={singleClass.frontmatter.title}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

// const AccordionBodyPose = posed.div({
//   start: {
//     height: 0,
//     overflow: "hidden"
//   },
//   end: {
//     height: "auto",
//     transition: {
//       duration: 400
//     }
//   }
// });

// const Session = ({ show, session, toggleSession, index }) => (
//   <div
//     onMouseDown={() => {
//       toggleSession(session.id);
//     }}
//   >
//     <h2 className="accordion-header">{session.frontmatter.title}</h2>
//     <div className="accordion-body">
//       <AccordionBodyPose pose={show ? "end" : "start"}>
//         <HTMLContent content={session.html} />
//       </AccordionBodyPose>
//     </div>
//   </div>
// );

// const Sessions = ({ classList }) => {
//   const [openSession, toggleSession] = useState(classList[0].node.id);

//   return (
//     <>
//       <ul className="list-unstyled ">
//         {classList.map(({ node: singleClass }, index) => (
//           <li key={singleClass.id} className="accordion-container">
//             <Session
//               session={singleClass}
//               toggleSession={toggleSession}
//               show={openSession === singleClass.id}
//               index={index}
//             />
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// Sessions.propTypes = {
//   classList: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//       html: PropTypes.string,
//       frontmatter: PropTypes.shape({
//         title: PropTypes.string
//       })
//     })
//   )
// };

// Session.propTypes = {
//   session: PropTypes.shape({
//     id: PropTypes.string,
//     html: PropTypes.string,
//     frontmatter: PropTypes.shape({
//       title: PropTypes.string
//     })
//   })
// };

export default Sessions;
