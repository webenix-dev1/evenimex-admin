import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import router from "../../utils/router";

const Sidebar = () => {
  const Router = useRouter();
  return (
    <nav className="navbar-default navbar-static-side" role="navigation">
      <div className="sidebar-collapse">
        <ul className="nav metismenu" id="side-menu">
          <li className="nav-header">
            <div className="dropdown profile-element">
              {" "}
              <span>
                <img
                  alt="image"
                  className="img-circle"
                  src="img/profile_small.jpg"
                />
              </span>
              <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                <span className="clear">
                  {" "}
                  <span className="block m-t-xs">
                    {" "}
                    <strong className="font-bold">David Williams</strong>
                  </span>{" "}
                  <span className="text-muted text-xs block">
                    Art Director <b className="caret"></b>
                  </span>{" "}
                </span>{" "}
              </a>
              <ul className="dropdown-menu animated fadeInRight m-t-xs">
                <li>
                  <a href="profile.html">Profile</a>
                </li>
                <li>
                  <a href="contacts.html">Contacts</a>
                </li>
                <li>
                  <a href="mailbox.html">Mailbox</a>
                </li>
                <li className="divider"></li>
                <li>
                  <a href="login.html">Logout</a>
                </li>
              </ul>
            </div>
            <div className="logo-element">IN+</div>
          </li>
          <li className={Router.pathname === router.HOME ? "active" : ""}>
            <Link href={router.HOME}>
              <a href={router.HOME}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">Dashboard</span>
              </a>
            </Link>
          </li>
          <li
            className={Router.pathname === router.HERO_BANNER ? "active" : ""}
          >
            <Link href={router.HERO_BANNER}>
              <a href={router.HERO_BANNER}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">Home Slider</span>
              </a>
            </Link>
          </li>
          <li className={Router.pathname === router.VENUE ? "active" : ""}>
            <a href="#">
              <i className="fa fa-th-large"></i>{" "}
              <span className="nav-label">Venue Entity</span>{" "}
              <span className="fa arrow"></span>
            </a>
            <ul className="nav nav-second-level">
              <li>
                <a href="#">Venue Beverage</a>
              </li>
              <li>
                <a href="#">Venue Disabled Facility</a>
              </li>
              <li>
                <a href="#">Venue Equipment</a>
              </li>
              <li>
                <a href="#">Venue Events</a>
              </li>
              <li>
                <a href="#">Venue Facility</a>
              </li>
              <li>
                <a href="#">Venue Location</a>
              </li>
              <li>
                <a href="#">Venue Location City</a>
              </li>
              <li>
                <a href="#">Venue Location Type</a>
              </li>
              <li>
                <a href="#">Venue Menu</a>
              </li>
              <li>
                <a href="#">Venue Services</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="index.html">
              <i className="fa fa-th-large"></i>{" "}
              <span className="nav-label">Vender Details</span>{" "}
              <span className="fa arrow"></span>
            </a>
            <ul className="nav nav-second-level">
              <li>
                <a href="#">Vender List</a>
              </li>
              <li>
                <a href="#">Venue Create</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
