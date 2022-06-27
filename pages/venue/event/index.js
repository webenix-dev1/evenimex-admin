import React, { useEffect, useState } from "react";
import { Head } from "next/document";
import { useForm } from "react-hook-form";
import Header from "../../../components/Header";
import LoaderComponent from "../../../components/LoaderComponent";
import Sidebar from "../../../components/Sidebar";
import apiRouter from "../../../utils/apiRouter";
import { axiosGet, axiosPost } from "../../../utils/axiosHelper";

const VenueEvent = () => {
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
      const result = await axiosPost(apiRouter.VENUE_AMENITIES_LIST, {
        categoryId: 9,
      });
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
    const { name, description, id, isActive } = data;
    handleFormToggle(true);

    setIsEditId(id);
    setTimeout(() => {
      setValue("name", name);
      setValue("isActive", isActive);
    }, 300);
  };

  const handleFormSubmit = async (val) => {
    const { name, isActive } = val;
    const insertData = {
      name,
      isActive,
      categoryId: 9,
    };
    console.log("insertData ::", insertData, isActive);
    if (isEditId) {
      insertData.id = isEditId;
    }

    try {
      setIsLoading(true);
      const result = await axiosPost(apiRouter.ADD_VENUE_AMENITIES, insertData);
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

    const res = confirm(`Are you sure you want to remove this event`);

    if (res) {
      try {
        setIsLoading(true);

        const result = await axiosGet(
          apiRouter.VENUE_AMENITIES_REMOVE + "/" + id
        );
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
                        Venue Event <small>Create</small>
                      </h5>
                    </div>
                    <div className="ibox-content">
                      <div className="row">
                        <div className="col-sm-12">
                          <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Event
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  placeholder="Enter Event"
                                  ref={register({
                                    required: "Amenity name is required",
                                  })}
                                />
                              </div>
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
                                Is Active{" "}
                              </label>
                            </div>

                            <div className="hr-line-dashed"></div>
                            {errors?.name && <p>{errors?.name?.message}</p>}
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
                    <h5>Events</h5>
                    <div className="ibox-tools">
                      <a className="collapse-link">
                        <i className="fa fa-chevron-up"></i>
                      </a>
                      <a
                        href="javascript:void(0)"
                        onClick={() => {
                          handleFormToggle(true);
                        }}
                      >
                        <i className="fa fa-plus"></i>
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
                            <th>Event</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            {/* <!-- <th>Id</th> --> */}
                            <th>Event</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {venueEntityList?.map((item, index) => {
                            return (
                              <tr className="gradeX" key={index}>
                                <td>{item.name}</td>
                                <td>{item.isActive ? "active" : "disabled"}</td>
                                <td className="center">
                                  <a
                                    href="javascript:void(0)"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleFormEdit(item)}
                                  >
                                    <i className="fa fa-edit"></i>
                                  </a>{" "}
                                  <a
                                    href="javascript:void(0)"
                                    id="data.id"
                                    className="admin_remove btn btn-danger btn-sm"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
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
          {/* End Hero Table */}
        </div>
        {isLoading && <LoaderComponent isLoading={isLoading} />}
      </div>
    </>
  );
};

export default VenueEvent;
