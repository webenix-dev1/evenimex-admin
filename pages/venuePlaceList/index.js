import React, { useEffect, useState } from "react";
import { Head } from "next/document";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import LoaderComponent from "../../components/LoaderComponent";
import Sidebar from "../../components/Sidebar";
import apiRouter from "../../utils/apiRouter";
import { axiosGet, axiosPost } from "../../utils/axiosHelper";
import SelectBox from "../../components/SelectBox";
import { uploadImage } from "../../utils/s3";
import { S3Bucket } from "../../utils/constant";
import router from "../../utils/router";
import { useRouter } from "next/router";

const VenuePlaceList = () => {
  // Const
  const Router = useRouter();
  const { control, register, setValue, handleSubmit, watch, errors, reset } =
    useForm();
  // State
  const [venueEntityList, setVenueEntityList] = useState([]);
  const [venderList, setVenderList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditId, setIsEditId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");
  const [isVenueId, setIsVenueId] = useState("");
  const [venueImages, setVenueImages] = useState({
    coverImage1: "",
    coverImage2: "",
    coverImage3: "",
    coverImage4: "",
    coverImage5: "",
  });

  // Effects
  useEffect(() => {
    const { venueId } = Router.query;
    console.log("Venue Place Page::", venueId);

    if (venueId) {
      setIsVenueId(venueId);
      fetchVenueEntityList(venueId);
    } else {
      return Router.push(router.VENUE_LIST);
    }
  }, []);

  useEffect(() => {
    for (const error of Object.keys(errors)) {
      const msg = errors[error]?.message;
      if (msg) {
        return setErrorMsg(msg || "");
      }
    }
  }, [errors]);

  console.log("errors ::", errors);

  // Method

  const fetchVenueEntityList = async (venueId) => {
    try {
      setIsLoading(true);
      const result = await axiosGet(apiRouter.VENUE_PLACE_LIST + "/" + venueId);
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
      clearForm();
      setIsEditId(false);
    }
    setIsFormOpen(val);
  };

  const handleFormEdit = async (data) => {
    const { id, isActive, isApprove } = data;
    console.log("data ::", data);
    handleFormToggle(true);

    setIsEditId(id);
    setTimeout(() => {
      setVenueImages({
        ...venueImages,
        coverImage1: {
          url: data?.coverImage1 || "",
          isUpload: false,
          image: "",
        },
        coverImage2: {
          url: data?.coverImage2 || "",
          isUpload: false,
          image: "",
        },
        coverImage3: {
          url: data?.coverImage3 || "",
          isUpload: false,
          image: "",
        },
        coverImage4: {
          url: data?.coverImage4 || "",
          isUpload: false,
          image: "",
        },
        coverImage5: {
          url: data?.coverImage5 || "",
          isUpload: false,
          image: "",
        },
      });
      setValue("name", data?.name);
      setValue("discription", data?.discription);
      setValue("price", data?.price);
      setValue("capacity", data?.capacity);

      setValue("isApprove", isApprove);
      setValue("isActive", isActive);
    }, 300);
  };

  const clearForm = () => {
    setVenueImages({
      coverImage1: "",
      coverImage2: "",
      coverImage3: "",
      coverImage4: "",
      coverImage5: "",
    });
    setErrorMsg("");
    reset();
  };

  const handleFormSubmit = async (val) => {
    setErrorMsg("");
    const insertData = {
      capacity: val.capacity,
      name: val.name,
      price: val.price,
      discription: val.discription,
    };

    if (isEditId) {
      insertData.venuePlaceId = isEditId;
    } else {
      insertData.venueId = isVenueId;
    }

    console.log("venueImages ::", venueImages);

    for (const iterator of Object.keys(venueImages)) {
      if (venueImages[iterator]) {
        if (venueImages[iterator]?.isUpload) {
          const imageUrl = await uploadImage(
            venueImages[iterator]?.image,
            S3Bucket.venueImages
          );
          if (imageUrl.status) {
            insertData[iterator] = imageUrl.url;
          }
        }
      }
    }

    console.log("insertData ::", insertData);
    try {
      const result = await axiosPost(
        isEditId ? apiRouter.VENUE_PLACE_UPDATE : apiRouter.VENUE_PLACE_CREATE,
        insertData
      );
      console.log("result ::", result);
      if (result.status) {
        handleFormToggle(false);
        fetchVenueEntityList(isVenueId);
        toaster(
          "success",
          isEditId ? "Venue Successfully Updated!" : "Venue Successfully Added!"
        );
        setIsEditId("");
      } else {
        toaster("error", result.message);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemDelete = async (val) => {
    const { id, name } = val;

    const res = confirm(`Are you sure you want to remove the venue ${name}`);
    if (res) {
      try {
        setIsLoading(true);
        const result = await axiosGet(apiRouter.VENUE_PLACE_REMOVE + "/" + id);
        if (result.status) {
          fetchVenueEntityList(isVenueId);
          toaster("success", "Venue Delete Successfully");
        } else {
          toaster("error", "Venue not deleted");
        }
      } catch (error) {
        console.log("Error ::", error);
      } finally {
        setIsLoading(false);
      }
      console.log("Delete");
    }
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

      setVenueImages({
        ...venueImages,
        [name]: coverImage,
      });
    }
  };

  // Render

  return (
    <>
      <div id="wrapper">
        <Sidebar />

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
                        Venue Beverage <small>Create</small>
                      </h5>
                    </div>
                    <div className="ibox-content">
                      <div className="row">
                        <div className="col-sm-12">
                          <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Venue Name
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  placeholder="Enter Venue Name"
                                  ref={register({
                                    required: "Venue is required",
                                  })}
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
                                  name="discription"
                                  placeholder="Enter Description"
                                  ref={register({
                                    required: "Description is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Price
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="price"
                                  placeholder="Enter Price"
                                  ref={register({
                                    required: "Price is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Place Capacity
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="capacity"
                                  placeholder="Enter Place Capacity"
                                  ref={register({
                                    required: "Place Capacity is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div>
                              <label>
                                {" "}
                                <input
                                  type="checkbox"
                                  name="isApprove"
                                  defaultChecked={true}
                                  ref={register({
                                    required: false,
                                  })}
                                  className="i-checks"
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
                                  className="i-checks"
                                />{" "}
                                Venue Is Active{" "}
                              </label>
                            </div>

                            {/* Image */}
                            <div className="fieldCombine">
                              <div className="profilePicMain">
                                <input
                                  type="file"
                                  name="coverImage1"
                                  ref={register({
                                    required: venueImages?.coverImage1?.url
                                      ? false
                                      : "Image is required",
                                  })}
                                  onChange={(e) =>
                                    handleImages(e, "coverImage1")
                                  }
                                />
                                {venueImages?.coverImage1?.url ? (
                                  <img src={venueImages?.coverImage1?.url} />
                                ) : (
                                  <i className="fa fa-plus"></i>
                                )}
                              </div>
                              <div className="profilePicMain">
                                <input
                                  type="file"
                                  name="coverImage2"
                                  ref={register()}
                                  onChange={(e) =>
                                    handleImages(e, "coverImage2")
                                  }
                                />
                                {venueImages?.coverImage2?.url ? (
                                  <img src={venueImages?.coverImage2?.url} />
                                ) : (
                                  <i className="fa fa-plus"></i>
                                )}
                              </div>
                              <div className="profilePicMain">
                                <input
                                  type="file"
                                  name="coverImage3"
                                  ref={register()}
                                  onChange={(e) =>
                                    handleImages(e, "coverImage3")
                                  }
                                />
                                {venueImages?.coverImage3?.url ? (
                                  <img src={venueImages?.coverImage3?.url} />
                                ) : (
                                  <i className="fa fa-plus"></i>
                                )}
                              </div>
                              <div className="profilePicMain">
                                <input
                                  type="file"
                                  name="coverImage4"
                                  ref={register()}
                                  onChange={(e) =>
                                    handleImages(e, "coverImage4")
                                  }
                                />
                                {venueImages?.coverImage4?.url ? (
                                  <img src={venueImages?.coverImage4?.url} />
                                ) : (
                                  <i className="fa fa-plus"></i>
                                )}
                              </div>
                              <div className="profilePicMain">
                                <input
                                  type="file"
                                  name="coverImage5"
                                  ref={register()}
                                  onChange={(e) =>
                                    handleImages(e, "coverImage5")
                                  }
                                />
                                {venueImages?.coverImage5?.url ? (
                                  <img src={venueImages?.coverImage5?.url} />
                                ) : (
                                  <i className="fa fa-plus"></i>
                                )}
                              </div>
                            </div>

                            {/* End Image */}

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
                    <h5>Venue List</h5>
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
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Approved</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            {/* <!-- <th>Id</th> --> */}
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Approved</th>
                            <th>Action</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {venueEntityList?.map((item, index) => {
                            return (
                              <tr className="gradeX" key={index}>
                                <td>{item.name}</td>
                                <td>{item.discription}</td>
                                <td>{item.isActive ? "active" : "disabled"}</td>
                                <td>{item.isApprove ? "Yes" : "No"}</td>
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

export default VenuePlaceList;
