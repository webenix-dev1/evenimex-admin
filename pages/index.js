import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { checkLogin } from "../utils/helper";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

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
        <Sidebar />

        <div id="page-wrapper" className="gray-bg dashbard-1">
          {/* Header */}
          <Header />
          {/* End Header */}

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
