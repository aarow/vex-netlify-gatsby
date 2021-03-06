import React, { useState, useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import { Link } from "react-scroll";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import Modal from "./Modal";
import Schedule from "./Schedule";
import Logo from "./Logo";

const SiteNavbar = () => {
  const [isOpen, toggleOpen] = useState(false);

  const navRef = useRef();

  useEffect(() => trackWindowScroll());

  const trackWindowScroll = () => {
    // navRef.current.style.borderBottom = `1px solid grey`;

    window.addEventListener(
      "scroll",
      throttle(() => {
        if (window.scrollY === 0)
          // navRef.current.style.borderBottom = `1px solid rgba(0, 0, 0, 0)`;
          navRef.current.classList.remove("shadow-sm", "bg-white");
        else {
          // navRef.current.style.borderBottom = `1px solid rgba(0, 0, 0, 0.125)`;
          navRef.current.classList.add("shadow-sm", "bg-white");
        }
      }, 100)
    );
  };

  return (
    <div
      ref={navRef}
      className="position-fixed fixed-top"
      style={{ transition: `all 250ms` }}
    >
      <Navbar color="light" light expand="md" className="bg-transparent w-100 ">
        <NavbarBrand href="/">
          <Logo className="site-logo" />
        </NavbarBrand>
        <NavbarToggler
          onClick={() => toggleOpen(!isOpen)}
          className="border-0"
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto text-uppercase" navbar>
            <ScrollingLink to="sectionClasses" offset={-160}>
              Classes
            </ScrollingLink>
            <ScrollingLink to="sectionTeam">Team</ScrollingLink>
            <ScrollingLink to="sectionPrices">Prices</ScrollingLink>
            <NavItem>
              <Modal
                trigger={
                  <NavLink href="#" className="text-uppercase">
                    Schedule
                  </NavLink>
                }
                content={<Schedule />}
              ></Modal>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const ScrollingLink = ({ to, offset = 0, children }) => (
  <NavItem>
    <Link
      href="#"
      className="nav-link"
      spy={true}
      activeClass="active"
      to={to}
      smooth={true}
      duration={500}
      isDynamic={true}
      offset={offset}
    >
      {children}
    </Link>
  </NavItem>
);

export default SiteNavbar;
