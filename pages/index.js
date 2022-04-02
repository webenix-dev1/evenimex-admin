import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { checkLogin } from "../utils/helper";

const Home = () => {
  // Const
  const Router = useRouter();

  // State

  // useEffect(() => {
  //   const { isLogin, redirect } = checkLogin();
  //   if (!isLogin) {
  //     return Router.push(redirect);
  //   }
  // }, []);

  // Methods

  return (
    <>
      <div id="wrapper">
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
                  <a
                    data-toggle="dropdown"
                    className="dropdown-toggle"
                    href="#"
                  >
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
              <li className="active">
                <a href="layouts.html">
                  <i className="fa fa-diamond"></i>{" "}
                  <span className="nav-label">Home Slider</span>
                </a>
              </li>
              <li>
                <a href="index.html">
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

        <div id="page-wrapper" className="gray-bg dashbard-1">
          <div className="row border-bottom">
            <nav
              className="navbar navbar-static-top"
              role="navigation"
              style={{ marginBottom: 0 }}
            >
              <div className="navbar-header">
                <a
                  className="navbar-minimalize minimalize-styl-2 btn btn-primary "
                  href="#"
                >
                  <i className="fa fa-bars"></i>{" "}
                </a>
              </div>
              <ul className="nav navbar-top-links navbar-right">
                <li>
                  <a href="login.html">
                    <i className="fa fa-sign-out"></i> Log out
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Dashboard */}

          <div class="row">
            <div class="col-lg-3">
              <div class="ibox float-e-margins">
                <div class="ibox-title">
                  <span class="label label-success pull-right">Monthly</span>
                  <h5>Income</h5>
                </div>
                <div class="ibox-content">
                  <h1 class="no-margins">40 886,200</h1>
                  <div class="stat-percent font-bold text-success">
                    98% <i class="fa fa-bolt"></i>
                  </div>
                  <small>Total income</small>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="ibox float-e-margins">
                <div class="ibox-title">
                  <span class="label label-info pull-right">Annual</span>
                  <h5>Orders</h5>
                </div>
                <div class="ibox-content">
                  <h1 class="no-margins">275,800</h1>
                  <div class="stat-percent font-bold text-info">
                    20% <i class="fa fa-level-up"></i>
                  </div>
                  <small>New orders</small>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="ibox float-e-margins">
                <div class="ibox-title">
                  <span class="label label-primary pull-right">Today</span>
                  <h5>visits</h5>
                </div>
                <div class="ibox-content">
                  <h1 class="no-margins">106,120</h1>
                  <div class="stat-percent font-bold text-navy">
                    44% <i class="fa fa-level-up"></i>
                  </div>
                  <small>New visits</small>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="ibox float-e-margins">
                <div class="ibox-title">
                  <span class="label label-danger pull-right">Low value</span>
                  <h5>User activity</h5>
                </div>
                <div class="ibox-content">
                  <h1 class="no-margins">80,600</h1>
                  <div class="stat-percent font-bold text-danger">
                    38% <i class="fa fa-level-down"></i>
                  </div>
                  <small>In first month</small>
                </div>
              </div>
            </div>
          </div>

          {/* End Dashboard */}
        </div>
      </div>
    </>
  );
};

export default Home;
