import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkLogin } from "../utils/helper";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { axiosGet } from "../utils/axiosHelper";
import apiRouter from "../utils/apiRouter";

const Home = () => {
  // Const
  const Router = useRouter();

  // State
  const [dashboardData, setDashboardData] = useState({
    user: 0,
    venders: 0,
    venue: 0,
  });

  // Effects
  useEffect(() => {
    const { isLogin, redirect } = checkLogin();
    if (!isLogin) {
      return Router.push(redirect);
    } else {
      fetchDashboardData();
    }
  }, []);

  // Methods

  const fetchDashboardData = async () => {
    try {
      const result = await axiosGet(apiRouter.DASHBOARD_DETAILS);
      console.log("result ::", result);
      if (result.status) {
        setDashboardData(result?.data?.data);
      }
    } catch (error) {}
  };

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
                  {/* <span class="label label-success pull-right">Monthly</span> */}
                  <h5>Users</h5>
                </div>
                <div class="ibox-content">
                  <h1 class="no-margins">{dashboardData?.user}</h1>
                  <div class="stat-percent font-bold text-success">
                    {/* 98% <i class="fa fa-bolt"></i> */}
                  </div>
                  <small>Total Users</small>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="ibox float-e-margins">
                <div class="ibox-title">
                  {/* <span class="label label-info pull-right">Annual</span> */}
                  <h5>Vendors</h5>
                </div>
                <div class="ibox-content">
                  <h1 class="no-margins">{dashboardData?.venders}</h1>
                  <div class="stat-percent font-bold text-info">
                    {/* 20% <i class="fa fa-level-up"></i> */}
                  </div>
                  <small>New Vendors</small>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="ibox float-e-margins">
                <div class="ibox-title">
                  {/* <span class="label label-primary pull-right">Today</span> */}
                  <h5>Venues</h5>
                </div>
                <div class="ibox-content">
                  <h1 class="no-margins">{dashboardData?.venue}</h1>
                  <div class="stat-percent font-bold text-navy">
                    {/* 44% <i class="fa fa-level-up"></i> */}
                  </div>
                  <small>New Venues</small>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="ibox float-e-margins">
                <div class="ibox-title">
                  {/* <span class="label label-danger pull-right">Low value</span> */}
                  <h5>Inquiries</h5>
                </div>
                <div class="ibox-content">
                  <h1 class="no-margins">80,600</h1>
                  <div class="stat-percent font-bold text-danger">
                    {/* 38% <i class="fa fa-level-down"></i> */}
                  </div>
                  <small>Total Inquiries</small>
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
