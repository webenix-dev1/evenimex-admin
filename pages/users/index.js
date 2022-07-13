import React, { useEffect, useRef, useState } from "react";
import { Head } from "next/document";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import LoaderComponent from "../../components/LoaderComponent";
import Sidebar from "../../components/Sidebar";
import apiRouter from "../../utils/apiRouter";
import { axiosGet, axiosPost } from "../../utils/axiosHelper";
import toaster from "../../utils/toaster";

const Users = () => {
  // Const
  const { register, setValue, handleSubmit, watch, errors, reset } = useForm();
  // State
  const [venueEntityList, setVenueEntityList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditId, setIsEditId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const password = useRef({});
  password.current = watch("password", "");

  // Effects
  useEffect(() => {
    fetchVenueEntityList();
  }, []);

  useEffect(() => {
    for (const error of Object.keys(errors)) {
      const msg = errors[error]?.message;
      if (msg) {
        return setErrorMsg(msg || "");
      }
    }
  }, [errors]);

  // Method
  const fetchVenueEntityList = async () => {
    try {
      setIsLoading(true);
      const result = await axiosPost(apiRouter.ALL_USERS);
      console.log("result ::", result);
      if (result.status) {
        setVenueEntityList(result?.data?.data?.dataList);
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
      setErrorMsg("");
    }
    setIsFormOpen(val);
  };

  const handleFormEdit = async (data) => {
    const { fname, lname, email, id, enabled, mobile } = data;
    handleFormToggle(true);

    console.log("EDIT DATA ::", data);

    setIsEditId(id);
    setTimeout(() => {
      setValue("fname", fname);
      setValue("lname", lname);
      setValue("email", email);
      setValue("mobile", mobile);
      setValue("enabled", enabled);
    }, 300);
  };

  const handleFormSubmit = async (val) => {
    setErrorMsg("");
    console.log("val ::", val);
    const { fname, lname, email, mobile, password, enabled } = val;
    const insertData = {
      fname,
      lname,
      email,
      mobile,
      enabled,
    };

    if (val.enabled === true) {
      insertData.enabled = true;
    } else if (val.enabled.length > 0) {
      insertData.enabled = true;
    } else {
      insertData.enabled = false;
    }

    if (password) {
      insertData.password = password;
      insertData.isUser = true;
      insertData.loginType = "email";
    }
    if (isEditId) {
      insertData.userId = isEditId;
    }
    console.log("insertData ::", insertData, enabled);

    try {
      setIsLoading(true);
      const result = await axiosPost(
        isEditId ? apiRouter.USER_UPDATE : apiRouter.SIGNUP,
        insertData
      );
      console.log("Result ::", result);
      if (result.status) {
        setIsEditId("");
        handleFormToggle(false);
        fetchVenueEntityList();
        toaster(
          "success",
          isEditId ? "User Update Successfully" : "User Create Successfully"
        );
      } else {
        toaster("error", result.message);
      }
    } catch (error) {
      console.log("Error ::", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemDelete = async (val) => {
    const { id } = val;

    console.log("ID ::", id);

    const res = confirm(`Are you sure you want to remove this user`);
    if (res) {
      try {
        setIsLoading(true);

        const result = await axiosPost(
          apiRouter.USER_REMOVE_BY_ADMIN + "/" + id
        );

        console.log("Result ::", result);
        if (result.status) {
          fetchVenueEntityList();
          handleFormToggle(false);
          toaster("success", "User Remove Successfully");
        } else {
          toaster("error", result.message || "User not removed");
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
                        Users <small>Create</small>
                      </h5>
                    </div>
                    <div className="ibox-content">
                      <div className="row">
                        <div className="col-sm-12">
                          <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                First Name*
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="fname"
                                  placeholder="Enter First Name"
                                  ref={register({
                                    required: "Name is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Last Name*
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="lname"
                                  placeholder="Enter Last Name"
                                  ref={register({
                                    required: "Last name is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Email*
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  placeholder="Enter email"
                                  ref={register({
                                    required: "Email is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Mobile
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="number"
                                  className="form-control user-number"
                                  name="mobile"
                                  placeholder="Enter mobile"
                                  title="Please enter valid phone number"
                                  ref={register({
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>
                            {!isEditId && (
                              <>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">
                                    Password*
                                  </label>
                                  <div className="col-sm-10">
                                    <input
                                      type="password"
                                      className="form-control"
                                      name="password"
                                      placeholder="Enter Password"
                                      ref={register({
                                        required: "Password is required",
                                      })}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">
                                    Confirm Password*
                                  </label>
                                  <div className="col-sm-10">
                                    <input
                                      type="password"
                                      className="form-control"
                                      name="cpassword"
                                      placeholder="Enter Confirm Password"
                                      ref={register({
                                        required:
                                          "Confirm password is required",
                                        validate: (value) => {
                                          return (
                                            value === password?.current ||
                                            "Confirm Password not matched"
                                          );
                                        },
                                      })}
                                    />
                                  </div>
                                </div>
                              </>
                            )}

                            <div>
                              <label>
                                {" "}
                                <input
                                  type="checkbox"
                                  name="enabled"
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
                            {errorMsg && <p>{errorMsg}</p>}
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
                    <h5>Users</h5>
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
                        <i className="fa fa-plus" title="Add User"></i>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            {/* <!-- <th>Id</th> --> */}
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
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
                                <td>{item.email}</td>

                                <td>{item.enabled ? "Active" : "De-Active"}</td>

                                <td className="center">
                                  <a
                                    href="javascript:void(0)"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleFormEdit(item)}
                                  >
                                    <i
                                      className="fa fa-edit"
                                      title="Edit User"
                                    ></i>
                                  </a>{" "}
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
                                      title="Remove User"
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

export default Users;
