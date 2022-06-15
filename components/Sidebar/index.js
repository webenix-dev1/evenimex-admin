import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileSelector, removeProfileData } from "../../redux/profileSlice";
import { removeTokenFromLocal } from "../../utils/helper";
import router from "../../utils/router";
import { Avatar } from "@agney/react-avatar";

const Sidebar = (props) => {
  const { cloaseForm } = props;
  const Router = useRouter();
  const { userData } = useSelector(profileSelector);
  const dispatch = useDispatch();

  const [isVenueEntity, setIsVenueEntity] = useState(false);
  // Method
  const logout = () => {
    dispatch(removeProfileData);
    removeTokenFromLocal();
    Router.push(router.SIGNIN);
  };

  return (
    <nav className="navbar-default navbar-static-side" role="navigation">
      <div className="sidebar-collapse">
        <ul className="nav metismenu" id="side-menu">
          <li className="nav-header">
            <div className="dropdown profile-element">
              {" "}
              <span>
                {/* <img
                  alt="image"
                  className="img-circle"
                  src="/img/profile_small.jpg"
                /> */}
                <Avatar
                  backgrounds={["#1ab394"]}
                  text={`${userData?.user?.fname.charAt(
                    0
                  )}${userData?.user?.lname.charAt(0)}`}
                  htmlWidth="50px"
                />
              </span>
              <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                <span className="clear">
                  {" "}
                  <span className="block m-t-xs">
                    {" "}
                    <strong className="font-bold">
                      {userData?.user?.fname} {userData?.user?.lname}
                    </strong>
                  </span>{" "}
                  {/* <span className="text-muted text-xs block">
                    Art Director <b className="caret"></b>
                  </span>{" "} */}
                </span>{" "}
              </a>
              {/* <ul className="dropdown-menu animated fadeInRight m-t-xs">
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
                <li onClick={logout}>
                  <a href="#">Logout</a>
                </li>
              </ul> */}
            </div>
            <div className="logo-element">IN+</div>
          </li>
          <li
            className={Router.pathname === router.HOME ? "active" : ""}
            onClick={cloaseForm}
          >
            <Link href={router.HOME}>
              <a href={router.HOME}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">Dashboard</span>
              </a>
            </Link>
          </li>
          <li
            className={Router.pathname === router.ADMINLIST ? "active" : ""}
            onClick={cloaseForm}
          >
            <Link href={router.ADMINLIST}>
              <a href={router.ADMINLIST}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">Admin</span>
              </a>
            </Link>
          </li>
          <li
            className={Router.pathname === router.USERS ? "active" : ""}
            onClick={cloaseForm}
          >
            <Link href={router.USERS}>
              <a href={router.USERS}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">Users</span>
              </a>
            </Link>
          </li>
          <li
            className={Router.pathname === router.VENDERS ? "active" : ""}
            onClick={cloaseForm}
          >
            <Link href={router.VENDERS}>
              <a href={router.VENDERS}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">Venders</span>
              </a>
            </Link>
          </li>
          <li
            className={Router.pathname === router.HERO_BANNER ? "active" : ""}
            onClick={cloaseForm}
          >
            <Link href={router.HERO_BANNER}>
              <a href={router.HERO_BANNER}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">Home Slider</span>
              </a>
            </Link>
          </li>
          <li
            className={Router.pathname === router.VENUE_LIST ? "active" : ""}
            onClick={cloaseForm}
          >
            <Link href={router.VENUE_LIST}>
              <a href={router.VENUE_LIST}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">Venue List</span>
              </a>
            </Link>
          </li>
          <li
            className={Router.pathname === router.CONTACTUS ? "active" : ""}
            onClick={cloaseForm}
          >
            <Link href={router.CONTACTUS}>
              <a href={router.CONTACTUS}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">Contact List</span>
              </a>
            </Link>
          </li>
          <li
            className={Router.pathname === router.ENQUIRY ? "active" : ""}
            onClick={cloaseForm}
          >
            <Link href={router.ENQUIRY}>
              <a href={router.ENQUIRY}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">Enquiry List</span>
              </a>
            </Link>
          </li>
          <li
            className={Router.pathname === router.EVENT_BOOK ? "active" : ""}
            onClick={cloaseForm}
          >
            <Link href={router.EVENT_BOOK}>
              <a href={router.EVENT_BOOK}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">EventBook List</span>
              </a>
            </Link>
          </li>
          <li
            className={Router.pathname.includes("venue/") ? "active" : ""}
            onClick={() => {
              setIsVenueEntity(!isVenueEntity);
            }}
          >
            <a href="#">
              <i className="fa fa-th-large"></i>{" "}
              <span className="nav-label">Venue Entity</span>{" "}
              <span className="fa arrow"></span>
            </a>
            <ul
              className="nav nav-second-level collapse"
              style={{
                height: isVenueEntity ? "auto" : 0,
                display: isVenueEntity ? "block" : "none",
              }}
            >
              <li
                onClick={cloaseForm}
                className={
                  Router.pathname === router.VENUE_BEVERAGE ? "active" : ""
                }
              >
                <Link href={router.VENUE_BEVERAGE}>
                  <a href="#">Venue Beverage</a>
                </Link>
              </li>
              <li
                onClick={cloaseForm}
                className={
                  Router.pathname === router.VENUE_DISABLED ? "active" : ""
                }
              >
                <Link href={router.VENUE_DISABLED}>
                  <a href="#">Venue Disabled Facility</a>
                </Link>
              </li>
              <li
                onClick={cloaseForm}
                className={
                  Router.pathname === router.VENUE_EQUIPMENT ? "active" : ""
                }
              >
                <Link href={router.VENUE_EQUIPMENT}>
                  <a href="#">Venue Equipment</a>
                </Link>
              </li>
              <li
                onClick={cloaseForm}
                className={
                  Router.pathname === router.VENUE_EVENT ? "active" : ""
                }
              >
                <Link href={router.VENUE_EVENT}>
                  <a href="#">Venue Events</a>
                </Link>
              </li>
              <li
                onClick={cloaseForm}
                className={
                  Router.pathname === router.VENUE_FACILITY ? "active" : ""
                }
              >
                <Link href={router.VENUE_FACILITY}>
                  <a href="#">Venue Facility</a>
                </Link>
              </li>
              <li
                onClick={cloaseForm}
                className={
                  Router.pathname === router.VENUE_LOCATION ? "active" : ""
                }
              >
                <Link href={router.VENUE_LOCATION}>
                  <a href="#">Venue Location</a>
                </Link>
              </li>
              <li
                onClick={cloaseForm}
                className={
                  Router.pathname === router.VENUE_LOCATION_CITY ? "active" : ""
                }
              >
                <Link href={router.VENUE_LOCATION_CITY}>
                  <a href="#">Venue Location City</a>
                </Link>
              </li>

              <li
                onClick={cloaseForm}
                className={
                  Router.pathname === router.VENUE_LOCATION_TYPE ? "active" : ""
                }
              >
                <Link href={router.VENUE_LOCATION_TYPE}>
                  <a href="#">Venue Location Type</a>
                </Link>
              </li>
              <li
                onClick={cloaseForm}
                className={
                  Router.pathname === router.VENUE_MENU ? "active" : ""
                }
              >
                <Link href={router.VENUE_MENU}>
                  <a href="#">Venue Menu</a>
                </Link>
              </li>
              <li
                onClick={cloaseForm}
                className={
                  Router.pathname === router.VENUE_SERVICE ? "active" : ""
                }
              >
                <Link href={router.VENUE_SERVICE}>
                  <a href="#">Venue Services</a>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
