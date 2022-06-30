import React, { useEffect, useState } from "react";
import { Head } from "next/document";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import LoaderComponent from "../../components/LoaderComponent";
import Sidebar from "../../components/Sidebar";
import apiRouter from "../../utils/apiRouter";
import { axiosGet, axiosPost } from "../../utils/axiosHelper";
import SelectBox from "../../components/SelectBox";
import {
  getVenueLocationCityList,
  getVenueLocationList,
  getVenueLocationTypeList,
  getVenueMenuList,
  getVenueServiceList,
} from "../../utils/helper";
import { uploadImage } from "../../utils/s3";
import { S3Bucket } from "../../utils/constant";
import router from "../../utils/router";
import Link from "next/link";
import MyStatefulEditor from "../../components/Editor";
import Pagination from "react-responsive-pagination";
import { useRouter } from "next/router";
import VenderFilter from "../../components/VenderFilter";
import MCEEditor from "../../components/Editor2";
import { useRef } from "react";
import toaster from "../../utils/toaster";

const VenueList = () => {
  // Const
  const { control, register, setValue, handleSubmit, watch, errors, reset } =
    useForm();
  const Router = useRouter();
  const venderId = Router?.query?.venderId || "";
  const formEditRef = useRef(null);
  // State
  const [venueEntityList, setVenueEntityList] = useState([]);
  const [venderList, setVenderList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditId, setIsEditId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");
  const [venueLocationCityList, setVenueLocationCityList] = useState([]);
  const [venueImages, setVenueImages] = useState({
    coverImage1: "",
    coverImage2: "",
    coverImage3: "",
    coverImage4: "",
    coverImage5: "",
  });
  const [venueDescription, setVenueDescription] = useState("");
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
    totalPages: 0,
  });
  const [isReset, setIsReset] = useState("");
  const [filterData, setFilterData] = useState("");

  console.log("venueLocationCityList ::", venueLocationCityList);

  // Effects
  useEffect(() => {
    fetchVenueEntity();
    fetchVenueEntityList();
    fetchVendersList();
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
  const optionFormatMake = (entity) => {
    const option = [];
    entity?.map((item) => {
      option.push({
        label: item?.name,
        value: item?.name,
      });
    });
    return option;
  };
  const fetchVendersList = async () => {
    try {
      setIsLoading(true);
      const result = await axiosPost(apiRouter.VENDERS_SELECT_LIST);
      console.log("result ::", result);
      let id = "";
      if (result.status) {
        const option = [];
        result?.data?.data?.dataList?.map((item) => {
          option.push({
            ...item,
            value: item?.id,
            label: item?.fname + " " + item?.lname,
          });
          if (venderId == item.id) {
            id = venderId;
          }
        });
        setVenderList(option);
        if (id) {
          fetchVenueEntityList(1, { venderId: id });
          setFilterData({
            venderId: id,
            searchVenueName: "",
          });
          handleFormToggle(true);
          setTimeout(() => {
            executeScroll();
            setValue("venderId", venderId);
          }, 200);
        } else {
          fetchVenueEntityList(1, { venderId: null });
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const fetchVenueEntity = async () => {
    Promise.all([
      // getVenueBeverageList(),
      // getVenueDisabledFacilitiesList(),
      // getVenueEquipmentList(),
      // getVenueEventsList(),
      // getVenueFacilitiesList(),
      // getVenueLocationList(),
      getVenueLocationCityList(),
      // getVenueLocationTypeList(),
      // getVenueMenuList(),
      // getVenueServiceList(),
    ])
      .then((values) => {
        console.log("ALLL ::", values);
        setVenueLocationCityList(optionFormatMake(values[0]));

        // setVenueBeverageList(optionFormatMake(values[0]));
        // setVenueDisabledFacilitiesList(optionFormatMake(values[1]));
        // setVenueEquipmentList(optionFormatMake(values[2]));
        // setVenueEventsList(optionFormatMake(values[3]));
        // setVenueFacilitiesList(optionFormatMake(values[4]));
        // setVenueLocationList(optionFormatMake(values[5]));
        // setVenueLocationCityList(optionFormatMake(values[6]));
        // setVenueLocationTypeList(optionFormatMake(values[7]));
        // setVenueMenuList(optionFormatMake(values[8]));
        // setVenueServiceList(optionFormatMake(values[9]));

        if (Router.query?.venueId)
          setTimeout(() => {
            fetchVenueDetails(Router.query?.venueId);
          }, 300);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const fetchVenueEntityList = async (page = 1, venueFilter) => {
    try {
      setIsLoading(true);
      const { venderId, searchVenueName } = venueFilter;
      const filter = {
        page: page - 1,
        size: pagination.size,
      };
      if (venderId) {
        filter.venderId = venderId;
      }
      if (searchVenueName) {
        filter.searchVenueName = searchVenueName;
      }

      const result = await axiosPost(apiRouter.VENUE_LIST, filter);
      console.log("result ::", result);
      if (result.status) {
        setVenueEntityList(result?.data?.data?.dataList);
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
      clearForm();
      setIsEditId(false);
    }
    setIsFormOpen(val);
  };

  const executeScroll = (ref) => {
    if (ref?.current)
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFormEdit = async (data) => {
    const { id, isActive, isApprove } = data;
    console.log("Data::", data);
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
      let des = "";
      try {
        des = data?.discription;
        // des = JSON.parse(data?.discription);
      } catch (e) {
        des = "";
      }
      setVenueDescription(des);
      setValue("address", data?.address);
      setValue("participants", data?.participants);
      setValue("city", data?.city);
      setValue("streetNumber", data?.streetNumber);
      setValue("route", data?.route);
      setValue("locality", data?.locality);
      setValue("state", data?.state);
      setValue("country", data?.country);
      setValue("venderId", data?.userId);

      setValue("isApprove", isApprove);
      setValue("isActive", isActive);

      executeScroll(formEditRef);
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
    console.log("val ::", val);
    setErrorMsg("");
    const insertData = {
      name: val.name,
      discription: venueDescription,
      // discription: JSON.stringify(venueDescription),
      address: val.address,
      participants: val.participants,
      city: val.city,
      streetNumber: val.streetNumber,
      route: val.route,
      locality: val.locality,
      state: val.state,
      country: val.country,
      // Admin can change vender for current space
      userId: val.venderId,
      isActive: val.isActive,
    };

    if (val.isActive === true) {
      insertData.isActive = true;
    } else if (val.isActive.length > 0) {
      insertData.isActive = true;
    } else {
      insertData.isActive = false;
    }

    if (isEditId) {
      insertData.venueMainId = isEditId;
    } else {
      // insertData.userId = val.venderId;
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
        isEditId ? apiRouter.VENUE_UPDATE : apiRouter.VENUE_CREATE,
        insertData
      );
      console.log("result ::", result);
      if (result.status) {
        clearForm();
        handleFormToggle(false);
        handlePagination(pagination.page);
        toaster(
          "success",
          isEditId ? "Venue Successfully Updated!" : "Venue Successfully Added!"
        );
        await fetchVenueEntityList();
        setIsEditId("");
      } else {
        toaster("error", result.message);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemDelete = async (val) => {
    const { id } = val;

    const res = confirm(`Are you sure you want to remove the venue ${id}`);
    if (res) {
      try {
        setIsLoading(true);
        const result = await axiosGet(apiRouter.VENUE_REMOVE + "/" + id);
        if (result.status) {
          // await fetchVenueEntityList(1);
          handlePagination(pagination.page);

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

  const handlePagination = (event) => {
    const filter = filterData;
    fetchVenueEntityList(event, filter);
  };

  const handleVenderFilter = async (val) => {
    const filter = {
      venderId: val.venderId === "all" ? null : val.venderId,
      searchVenueName: val.name || "",
    };
    setFilterData(filter);
    fetchVenueEntityList(1, filter);
  };

  const handleReset = (val) => {
    if (val === false) {
      setFilterData("");
    }
    handleVenderFilter({ venderId: "all", name: "" });
    setIsReset(val);
  };
  // Render

  return (
    <>
      <div id="wrapper">
        <Sidebar
          cloaseForm={() => {
            handleFormToggle(false);
            handleReset(!isReset);
          }}
        />

        <div id="page-wrapper" className="gray-bg dashbard-1">
          {/* Header */}
          <Header />
          {/* End Header */}

          {/* Banner Form */}
          {isFormOpen && (
            <div
              className="wrapper wrapper-content animated fadeInRight"
              ref={formEditRef}
            >
              <div className="row">
                <div className="col-lg-12">
                  <div className="ibox ">
                    <div className="ibox-title">
                      <h5>
                        Venue <small>Create</small>
                      </h5>
                    </div>
                    <div className="ibox-content">
                      <div className="row">
                        <div className="col-sm-12">
                          <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Venue Name*
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
                                Description*
                              </label>
                              <div className="col-sm-10">
                                {/* <MyStatefulEditor
                                  value={venueDescription}
                                  onChange={(val) => {
                                    setVenueDescription(val);
                                    console.log("contentState ::", val);
                                  }}
                                /> */}
                                <MCEEditor
                                  value={venueDescription}
                                  onChange={(val) => {
                                    setVenueDescription(val);
                                    console.log("contentState ::", val);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Address
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="address"
                                  placeholder="Enter Address"
                                  ref={register({
                                    required: "Address is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Participants
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="participants"
                                  placeholder="Enter Participants"
                                  ref={register({
                                    required: "Participants is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Street Number*
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="streetNumber"
                                  placeholder="Enter Street Number"
                                  ref={register({
                                    required: "Street Number is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Route*
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="route"
                                  placeholder="Enter Route"
                                  ref={register({
                                    required: "Route is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Locality*
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="locality"
                                  placeholder="Enter Locality"
                                  ref={register({
                                    required: "Locality is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <SelectBox
                                name={"city"}
                                placeholder={"City"}
                                control={control}
                                optionsList={venueLocationCityList}
                                label="City*"
                              />
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                State*
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="state"
                                  placeholder="Enter State"
                                  ref={register({
                                    required: "State is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Country*
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="country"
                                  placeholder="Enter Country"
                                  ref={register({
                                    required: "Country is required",
                                  })}
                                />
                              </div>
                            </div>
                            {/* {!isEditId && ( */}
                            <div class="form-group row">
                              <SelectBox
                                name={"venderId"}
                                placeholder={"Vender"}
                                control={control}
                                optionsList={venderList}
                                label="Vender*"
                              />
                            </div>
                            {/* )} */}

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
                            {/* <div className="fieldCombine">
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
                            </div> */}

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

          {/* Filter */}
          {!venderId && (
            <VenderFilter
              venderList={venderList}
              handleVenderFilter={handleVenderFilter}
              venderId={venderId}
              isReset={isReset}
              isSearch={true}
            />
          )}
          {/* End Filter */}

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
                          if (venderId) {
                            setTimeout(() => {
                              setValue("venderId", venderId);
                            }, 200);
                          }
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
                            <th>Address</th>
                            <th>Status</th>
                            <th>Approved</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            {/* <!-- <th>Id</th> --> */}
                            <th>Name</th>
                            <th>Address</th>
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
                                <td>{item.address}</td>
                                <td>{item.isActive ? "active" : "disabled"}</td>
                                <td>{item.isApprove ? "Yes" : "No"}</td>
                                <td className="center">
                                  <a
                                    href="javascript:void(0)"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleFormEdit(item)}
                                  >
                                    <i
                                      className="fa fa-edit"
                                      title="Venue Edit"
                                    ></i>
                                  </a>{" "}
                                  {/* <Link
                                    href={{
                                      pathname: router.VENUE_PLACE_LIST,
                                      query: {
                                        venueId: item?.id,
                                      },
                                    }}
                                    // as={`${router.VENUE_PLACE_LIST}`}
                                    as={`${router.VENUE_PLACE_LIST}/${item?.id}`}
                                  > */}
                                  <a
                                    href="javascript:void(0)"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                      Router?.push({
                                        pathname: `${router.VENUE_PLACE_LIST}/${item?.id}`,
                                        // query: { venueid: item?.id },
                                      });
                                    }}
                                  >
                                    <i
                                      className="fa fa-list"
                                      title="VenueSpace List"
                                    ></i>
                                  </a>{" "}
                                  {/* </Link>{" "} */}
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
                                      title="Remove Venue"
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

export default VenueList;
