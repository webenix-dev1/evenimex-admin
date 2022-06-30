import React, { useEffect, useState } from "react";
import { Head } from "next/document";
import { useForm } from "react-hook-form";
import Pagination from "react-responsive-pagination";
import Header from "../../../components/Header";
import LoaderComponent from "../../../components/LoaderComponent";
import Sidebar from "../../../components/Sidebar";
import apiRouter from "../../../utils/apiRouter";
import { axiosGet, axiosPost } from "../../../utils/axiosHelper";
import { uploadImage } from "../../../utils/s3";
import { S3Bucket } from "../../../utils/constant";
import toaster from "../../../utils/toaster";

const VenueCity = () => {
  // Const
  const { register, setValue, handleSubmit, watch, errors, reset } = useForm();
  // State
  const [heroSliderList, setHeroSliderList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditId, setIsEditId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bannerData, setBannerData] = useState({});
  const [pagination, setPagination] = useState({
    page: 0,
    size: 50,
    totalPages: 0,
  });

  // Effects
  useEffect(() => {
    fetchVenueEntityList();
  }, []);

  // Method
  const fetchVenueEntityList = async (page = 1) => {
    try {
      setIsLoading(true);
      const result = await axiosPost(apiRouter.VENUE_CITY_LIST_BY_PAGE, {
        page: page - 1,
        size: pagination.size,
      });
      if (result.status) {
        setHeroSliderList(result?.data?.data?.dataList);
        setPagination({
          ...pagination,
          page: page,
          totalPages: result.data?.data?.totalPages,
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleFormToggle = (val) => {
    if (val === false) {
      reset();
      setBannerData({});
    }
    setIsFormOpen(val);
  };

  const handleImages = async (e, name) => {
    console.log("Image ::", name, e.target.files[0]);
    const image = e.target.files[0];

    if (image) {
      const url = URL.createObjectURL(image);
      const coverImage = {
        image,
        url,
        isUpload: true,
      };

      setBannerData({
        ...bannerData,
        image: coverImage,
      });
    }
  };

  const handleFormEdit = async (data) => {
    const { name, description, id, isActive, image, first_page } = data;
    handleFormToggle(true);

    setBannerData({
      ...data,
      image: {
        url: image || "",
        isUpload: false,
        image: "",
      },
    });

    setIsEditId(id);
    setTimeout(() => {
      setValue("name", name);
      setValue("isActive", isActive);
      setValue("first_page", first_page);
    }, 300);
  };

  const handleFormSubmit = async (val) => {
    const { name, isActive, image, first_page } = val;
    const insertData = {
      name,
      isActive,
      first_page,
    };

    if (val.isActive === true) {
      insertData.isActive = true;
    } else if (val.isActive.length > 0) {
      insertData.isActive = true;
    } else {
      insertData.isActive = false;
    }

    if (val.first_page === true) {
      insertData.first_page = true;
    } else if (val.first_page.length > 0) {
      insertData.first_page = true;
    } else {
      insertData.first_page = false;
    }

    if (isEditId) {
      insertData.id = isEditId;
    }

    try {
      setIsLoading(true);

      if (bannerData.image?.isUpload) {
        const imageUrl = await uploadImage(
          bannerData?.image.image,
          S3Bucket.HOME_SLIDER
        );
        if (imageUrl.status) {
          insertData.image = imageUrl.url;
        }
      }

      const result = await axiosPost(apiRouter.ADD_VENUE_CITY, insertData);
      if (result.status) {
        fetchVenueEntityList();
        handleFormToggle(false);
        toaster(
          "success",
          isEditId ? "City Successfully Updated!" : "City Successfully Added!"
        );
      }
    } catch (error) {
      console.log("Error ::", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    const res = confirm(`Are you sure you want to remove the Banner Image`);
    if (res) {
      setBannerData({
        ...bannerData,
        image: "",
      });
    }
  };

  const handleItemDelete = async (val) => {
    const { id } = val;

    const res = confirm(`Are you sure you want to remove this location city`);
    if (res) {
      try {
        setIsLoading(true);

        const result = await axiosGet(apiRouter.REMOVE_VENUE_CITY + "/" + id);
        if (result.status) {
          fetchVenueEntityList();
          handleFormToggle(false);
          toaster("success", "City Remove Successfully");
        }
      } catch (error) {
        console.log("Error ::", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePagination = (event) => {
    fetchVenueEntityList(event);
  };

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
                        Venue City <small>Create</small>
                      </h5>
                    </div>
                    <div className="ibox-content">
                      <div className="row">
                        <div className="col-sm-12">
                          <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                City
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  placeholder="Enter City"
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
                              <div className="col-md-4">
                                <div className="profilePicMain">
                                  {bannerData?.image?.url ? (
                                    <>
                                      <div
                                        className="venuimgdelete"
                                        onClick={() => removeImage()}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </div>
                                      <img src={bannerData?.image?.url} />
                                    </>
                                  ) : (
                                    <>
                                      <input
                                        type="file"
                                        name="image"
                                        ref={register({
                                          required: false,
                                        })}
                                        onChange={(e) =>
                                          handleImages(e, "image")
                                        }
                                      />
                                      <i className="fa fa-plus"></i>
                                    </>
                                  )}
                                </div>
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
                            <div>
                              <label>
                                {" "}
                                <input
                                  type="checkbox"
                                  name="first_page"
                                  defaultChecked={true}
                                  ref={register({
                                    required: bannerData.first_page
                                      ? "Image is required"
                                      : false,
                                  })}
                                  class="i-checks"
                                />{" "}
                                First Page{" "}
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
                    <h5>Location City</h5>
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
                        <i className="fa fa-plus" title="Add City"></i>
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
                            <th>City</th>
                            <th>Status</th>
                            <th>First Page</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            {/* <!-- <th>Id</th> --> */}
                            <th>Image</th>
                            <th>City</th>
                            <th>Status</th>
                            <th>First Page</th>
                            <th>Action</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {heroSliderList?.map((item, index) => {
                            return (
                              <tr className="gradeX" key={index}>
                                <td>{item.image}</td>
                                <td>{item.name}</td>
                                <td>{item.isActive ? "active" : "disabled"}</td>
                                <td>{item.first_page ? "Yes" : "No"}</td>
                                <td className="center">
                                  <a
                                    href="javascript:void(0)"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleFormEdit(item)}
                                  >
                                    <i
                                      className="fa fa-edit"
                                      title="Edit City"
                                    ></i>
                                  </a>{" "}
                                  <a
                                    href="javascript:void(0)"
                                    id="data.id"
                                    className="admin_remove btn btn-danger btn-sm"
                                    onClick={() => handleItemDelete(item)}
                                  >
                                    <i
                                      className="fa fa-trash"
                                      title="Remove City"
                                    ></i>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <Pagination
                        current={pagination.page}
                        total={pagination.totalPages}
                        onPageChange={handlePagination}
                      />
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

export default VenueCity;
