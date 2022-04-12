import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileSelector, removeProfileData } from "../../redux/profileSlice";
import { removeTokenFromLocal } from "../../utils/helper";
import router from "../../utils/router";

const Sidebar = () => {
  const Router = useRouter();
  const { userData } = useSelector(profileSelector);
  console.log("userData ::", userData);
  const dispatch = useDispatch();

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
                    <strong className="font-bold">
                      {userData?.user?.fname} {userData?.user?.lname}
                    </strong>
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
                <li onClick={logout}>
                  <a href="#">Logout</a>
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
          <li className={Router.pathname === router.USERS ? "active" : ""}>
            <Link href={router.USERS}>
              <a href={router.USERS}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">Users</span>
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
                <Link href={router.VENUE_BEVERAGE}>
                  <a href="#">Venue Beverage</a>
                </Link>
              </li>
              <li>
                <Link href={router.VENUE_DISABLED}>
                  <a href="#">Venue Disabled Facility</a>
                </Link>
              </li>
              <li>
                <Link href={router.VENUE_EQUIPMENT}>
                  <a href="#">Venue Equipment</a>
                </Link>
              </li>
              <li>
                <Link href={router.VENUE_EVENT}>
                  <a href="#">Venue Events</a>
                </Link>
              </li>
              <li>
                <Link href={router.VENUE_FACILITY}>
                  <a href="#">Venue Facility</a>
                </Link>
              </li>
              <li>
                <Link href={router.VENUE_LOCATION}>
                  <a href="#">Venue Location</a>
                </Link>
              </li>
              <li>
                <Link href={router.VENUE_LOCATION_CITY}>
                  <a href="#">Venue Location City</a>
                </Link>
              </li>

              <li>
                <Link href={router.VENUE_LOCATION_TYPE}>
                  <a href="#">Venue Location Type</a>
                </Link>
              </li>
              <li>
                <Link href={router.VENUE_MENU}>
                  <a href="#">Venue Menu</a>
                </Link>
              </li>
              <li>
                <Link href={router.VENUE_SERVICE}>
                  <a href="#">Venue Services</a>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href={router.VENUE_DETAIL}>
              <a href={router.VENUE_DETAIL}>
                <i className="fa fa-th-large"></i>{" "}
                <span className="nav-label">Venue Details</span>{" "}
                <span className="fa arrow"></span>
              </a>
            </Link>
            <ul className="nav nav-second-level">
              <li>
                <Link href={router.VENUE_DETAIL}>
                  <a href="#">Venue</a>
                </Link>
              </li>
              <li>
                <Link href={router.VENUE_PLACE}>
                  <a href="#">Venue Places</a>
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
