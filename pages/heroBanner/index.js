import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import LoaderComponent from "../../components/LoaderComponent";
import Sidebar from "../../components/Sidebar";
import apiRouter from "../../utils/apiRouter";
import { axiosGet, axiosPost } from "../../utils/axiosHelper";

const HeroBanner = () => {
  // Const
  const { register, setValue, handleSubmit, watch, errors, reset } = useForm();
  // State
  const [heroSliderList, setHeroSliderList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditId, setIsEditId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [editData, setEditData] = useState({
  //   title: "",
  //   description: "",
  //   isActive: true,
  //   image: "",
  // });

  // Effects
  useEffect(() => {
    fetchHeroSliderList();
  }, []);

  // Method
  const fetchHeroSliderList = async () => {
    try {
      setIsLoading(true);
      const result = await axiosGet(apiRouter.HERO_SLIDER_LIST);
      if (result.status) {
        setHeroSliderList(result?.data?.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleFormToggle = (val) => {
    if (val === false) {
      reset();
    }
    setIsFormOpen(val);
  };

  const handleFormChange = (event) => {
    const { value, files, name } = event.target;
    if (files) {
      setEditData({
        ...editData,
        image: files[0],
      });
    } else {
      setEditData({
        ...editData,
        [name]: value,
      });
    }
  };

  const handleFormEdit = async (data) => {
    const { title, description, id, isActive } = data;
    handleFormToggle(true);

    setIsEditId(id);
    setTimeout(() => {
      setValue("title", title);
      setValue("description", description);
      setValue("isActive", isActive);
    }, 300);
  };

  const handleFormSubmit = async (val) => {
    const { title, description, isActive, image } = val;
    const insertData = {
      title,
      description,
      isActive,
      image: "/images/home-slide-01.jpg",
    };

    if (isEditId) {
      insertData.id = isEditId;
    }

    try {
      setIsLoading(true);
      const result = await axiosPost(
        apiRouter.ADD_UPDATE_HERO_SLIDER_LIST,
        insertData
      );
      if (result.status) {
        fetchHeroSliderList();
        handleFormToggle(false);
      }
    } catch (error) {
      console.log("Error ::", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemDelete = async (val) => {
    const { id } = val;

    try {
      setIsLoading(true);

      const result = await axiosGet(
        apiRouter.REMOVE_HERO_SLIDER_LIST + "/" + id
      );
      if (result.status) {
        fetchHeroSliderList();
        handleFormToggle(false);
      }
    } catch (error) {
      console.log("Error ::", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
                      Hero Banner <small>Create</small>
                    </h5>
                  </div>
                  <div className="ibox-content">
                    <div className="row">
                      <div className="col-sm-12">
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Title
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                name="title"
                                placeholder="Enter Title"
                                ref={register({
                                  required: false,
                                })}
                                // value={editData.title}
                                // onChange={handleFormChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Description
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                name="description"
                                placeholder="Enter Description"
                                ref={register({
                                  required: false,
                                })}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Image
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="file"
                                className="form-control"
                                name="image"
                                ref={register({
                                  required: "Image is required",
                                })}
                              />
                              {errors?.image && (
                                <p className="m-t text-danger">
                                  {errors?.image?.message}
                                </p>
                              )}
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
                  <h5>Hero Slider</h5>
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
                          <th>Image</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          {/* <!-- <th>Id</th> --> */}
                          <th>Image</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </tfoot>
                      <tbody>
                        {heroSliderList?.map((item, index) => {
                          return (
                            <tr className="gradeX" key={index}>
                              <td>{item.image}</td>
                              <td>{item.title}</td>
                              <td>{item.description}</td>
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
  );
};

export default HeroBanner;
