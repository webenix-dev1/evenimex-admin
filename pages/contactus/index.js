import React, { useEffect, useState } from "react";
import { Head } from "next/document";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import LoaderComponent from "../../components/LoaderComponent";
import Sidebar from "../../components/Sidebar";
import apiRouter from "../../utils/apiRouter";
import { axiosGet, axiosPost } from "../../utils/axiosHelper";

const ContactUs = () => {
  // Const
  const { register, setValue, handleSubmit, watch, errors, reset } = useForm();
  // State
  const [venueEntityList, setVenueEntityList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditId, setIsEditId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Effects
  useEffect(() => {
    fetchVenueEntityList();
  }, []);

  // Method
  const fetchVenueEntityList = async () => {
    try {
      setIsLoading(true);
      const result = await axiosGet(apiRouter.CONTACTUS_LIST);
      console.log("result ::", result);
      if (result.status) {
        setVenueEntityList(result?.data?.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleFormToggle = (val) => {
    if (val === false) {
      reset();
      setIsEditId(false);
    }
    setIsFormOpen(val);
  };

  const handleFormEdit = async (data) => {
    const { id, isActive, isApprove } = data;
    handleFormToggle(true);

    setIsEditId(id);
    setTimeout(() => {
      setValue("isApprove", isApprove);
      setValue("isActive", isActive);
    }, 300);
  };

  const handleFormSubmit = async (val) => {
    console.log("val ::", val);
    const { isActive, isApprove } = val;
    const insertData = {
      isActive,
      isApprove,
    };
    if (isEditId) {
      insertData.venueId = isEditId;
    }
    console.log("insertData ::", insertData, isActive);

    try {
      setIsLoading(true);
      const result = await axiosPost(apiRouter.VENUE_UPDATE, insertData);
      if (result.status) {
        setIsEditId("");
        handleFormToggle(false);
        fetchVenueEntityList();
      }
    } catch (error) {
      console.log("Error ::", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemDelete = async (val) => {
    const { id } = val;

    const res = confirm(`Are you sure you want to remove this contact`);

    if (res) {
      try {
        setIsLoading(true);

        const result = await axiosGet(apiRouter.REMOVE_CONTACTUS + "/" + id);
        if (result.status) {
          fetchVenueEntityList();
          handleFormToggle(false);
        }
      } catch (error) {
        console.log("Error ::", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Render

  return (
    <>
      <div id="wrapper">
        <Sidebar cloaseForm={() => handleFormToggle(false)} />

        <div id="page-wrapper" className="gray-bg dashbard-1">
          {/* Header */}
          <Header />
          {/* End Header */}

          {/* Banner Form */}
          {isFormOpen && (
            <div className="wrapper wrapper-content animated fadeInRight">
              <div className="row">
                <div className="col-lg-12">
                  <div className="ibox ">
                    <div className="ibox-title">
                      <h5>
                        Contact <small>Create</small>
                      </h5>
                    </div>
                    <div className="ibox-content">
                      <div className="row">
                        <div className="col-sm-12">
                          <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div>
                              <label>
                                {" "}
                                <input
                                  type="checkbox"
                                  name="isApprove"
                                  defaultChecked={true}
                                  ref={register({
                                    required: true,
                                  })}
                                  class="i-checks"
                                />{" "}
                                Approve Venue{" "}
                              </label>
                            </div>
                            <div>
                              <label>
                                {" "}
                                <input
                                  type="checkbox"
                                  name="isActive"
                                  defaultChecked={true}
                                  ref={register({
                                    required: false,
                                  })}
                                  class="i-checks"
                                />{" "}
                                Venue Is Active{" "}
                              </label>
                            </div>

                            <div className="hr-line-dashed"></div>
                            <div className="form-group row">
                              <div className="col-sm-4 col-sm-offset-2">
                                <a
                                  href="javascript:void(0)"
                                  className="btn btn-white btn-sm"
                                  onClick={() => {
                                    handleFormToggle(false);
                                  }}
                                >
                                  Cancel
                                </a>
                                {"  "}
                                <button className="btn btn-primary btn-sm">
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* End Banner Form */}

          {/* Hero Table */}
          <div className="wrapper wrapper-content animated fadeInRight">
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox">
                  <div className="ibox-title">
                    <h5>Contact List</h5>
                    <div className="ibox-tools">
                      <a className="collapse-link">
                        <i className="fa fa-chevron-up"></i>
                      </a>
                      <a
                        href="javascript:void(0)"
                        onClick={() => {
                          // handleFormToggle(true);
                        }}
                      >
                        <i className="fa fa-plus" title="Add Contact"></i>
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
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Action</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {venueEntityList?.map((item, index) => {
                            return (
                              <tr className="gradeX" key={index}>
                                <td>
                                  {item.fname} {item.lname}
                                </td>
                                <td>{item.phone} </td>
                                <td>{item.email}</td>
                                <td>{item.message}</td>
                                <td className="center">
                                  {/* <a
                                    href="javascript:void(0)"
                                    className="btn btn-primary btn-sm"
                                    // onClick={() => handleFormEdit(item)}
                                  >
                                    <i className="fa fa-edit"></i>
                                  </a>{" "} */}
                                  <a
                                    href="javascript:void(0)"
                                    id="data.id"
                                    className="admin_remove btn btn-danger btn-sm"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={() => handleItemDelete(item)}
                                  >
                                    <i
                                      className="fa fa-trash"
                                      title="Remove Contact"
                                    ></i>
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
          {/* End Hero Table */}
        </div>
        {isLoading && <LoaderComponent isLoading={isLoading} />}
      </div>
    </>
  );
};

export default ContactUs;
