import React from "react";
// import { Link } from 'gatsby';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import Logo from "./Logo";

const SiteNavbar = class extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  componentDidMount() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <>
        <Navbar
          color="light"
          light
          expand="md"
          className="bg-transparent w-100"
        >
          <NavbarBrand href="/">
            <Logo className="site-logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="border-0" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto text-uppercase" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
  // render() {
  //   return (
  //     <>
  //       <nav
  //         className='navbar is-fixed-top'
  //         role='navigation'
  //         aria-label='main-navigation'>
  //         <div className='container'>
  //           <div className='navbar-brand'>
  //             <Link
  //               to='/'
  //               className='navbar-item navbar-brand--link '
  //               title='Vex Yoga &amp; Fitness'>
  //               <img
  //                 src={logo}
  //                 alt='Vex Yoga &amp; Fitness'
  //                 className='navbar-brand--logo'
  //               />
  //             </Link>
  //             {/* Hamburger menu */}
  //             <div className='navbar-burger burger' data-target='navMenu'>
  //               <span />
  //               <span />
  //               <span />
  //             </div>
  //           </div>
  //           <div id='navMenu' className='navbar-menu'>
  //             <div className='navbar-start has-text-centered' />
  //             <Link className='navbar-item' to='/about'>
  //               About
  //             </Link>
  //             <Link className='navbar-item' to='/classes'>
  //               Classes
  //             </Link>
  //             <Link className='navbar-item' to='/contact'>
  //               Contact
  //             </Link>
  //           </div>
  //         </div>
  //       </nav>
  //     </>
  //   );
  // }
};

export default SiteNavbar;
