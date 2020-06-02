import { useState } from "react";
import Link from "next/link";
import Router from "next/router";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

import styles from "./header.module.css";
import { isAuth, signout } from "../../actions/authActions";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className={styles.primary} light expand="md">
        <Link href="/">
          <NavLink
            className={`${styles.link} ${styles.title} font-weight-bold`}
          >
            {process.env.APP_NAME}
          </NavLink>
        </Link>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signup">
                    <NavLink className={styles.link}>Signup</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signin">
                    <NavLink className={styles.link}>Login</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink
                  className={styles.link}
                  onClick={() => signout(() => Router.replace("/signin"))}
                >
                  Signout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
