import React, { useEffect, useState } from "react";
import { getVenueNameById } from "../../utils/helper";
import Header from "../../components/Header";
import LoaderComponent from "../../components/LoaderComponent";
import Sidebar from "../../components/Sidebar";
import apiRouter from "../../utils/apiRouter";
import { axiosGet, axiosPost } from "../../utils/axiosHelper";


const Ratings = () => {
  // Const
  // State
  const [ratingsList, setRatingsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ratingData, setRatingData] = useState({});
  
  // Effects
  useEffect(() => {
    fetchRatingsList();
  }, []);

  // Method
  const fetchRatingsList = async () => {
    try {
      setIsLoading(true);
      const result = await axiosGet(apiRouter.RATINGS_LIST);
      if (result.status) {
        setRatingsList(result?.data?.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemDelete = async (val) => {
    const { id } = val;

    try {
      setIsLoading(true);

      const result = await axiosGet(
        apiRouter.REMOVE_RATINGS_LIST + "/" + id
      );
      if (result.status) {
        fetchRatingsList();
      }
    } catch (error) {
      console.log("Error ::", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="wrapper">
      <Sidebar/>

      <div id="page-wrapper" className="gray-bg dashbard-1">
        {/* Header */}
        <Header />
        {/* Ratings Table */}
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox">
                <div className="ibox-title">
                  <h5>Ratings</h5>
                  <div className="ibox-tools">
                    <a className="collapse-link">
                      <i className="fa fa-chevron-up"></i>
                    </a>
                  </div>
                </div>

                <div className="ibox-content">
                  <div className="table-responsive">
                    <table
                      id="adminDatatable"
                      className="table table-striped table-bordered table-hover"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          {/* <!-- <th>Id</th> --> */}
                          <th>Venue Name</th>
                          <th>Rating</th>
                          <th>User Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          {/* <!-- <th>Id</th> --> */}
                          <th>Venue Name</th>
                          <th>Rating</th>
                          <th>User Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </tfoot>
                      <tbody>
                        {ratingsList?.map((item, index) => {
                          return (
                            <tr className="gradeX" key={index}>
                              <td>{item.venueSpace.name}</td>
                              <td>{item.rating}</td>
                              <td>{item.user.fname} {item.user.lname}</td>
                              <td>{item.isActive ? "active" : "disabled"}</td>
                              <td className="center">
                                <a
                                  href="javascript:void(0)"
                                  id="data.id"
                                  className="admin_remove btn btn-danger btn-sm"
                                  onClick={() => handleItemDelete(item)}
                                >
                                  <i className="fa fa-trash"></i>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* End Ratings Table */}
      </div>
      {isLoading && <LoaderComponent isLoading={isLoading} />}
    </div>
  );
};

export default Ratings;
