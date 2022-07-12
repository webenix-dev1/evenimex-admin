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
import SelectAndCreateBox from "../../components/SelectAndCreateBox";
import MyStatefulEditor from "../../components/Editor";
import convert from "htmr";
import draftToHtml from "draftjs-to-html";
import Link from "next/link";
import MCEEditor from "../../components/Editor2";
import toaster from "../../utils/toaster";

const VenuePlaceList = ({ venueid }) => {
  console.log("venueid ::", venueid);
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
  const [venuePlaceImages, setVenuePlaceImages] = useState([]);
  const [venueImages, setVenueImages] = useState({
    coverImage1: "",
    coverImage2: "",
    coverImage3: "",
    coverImage4: "",
    coverImage5: "",
  });

  const [venueBeverageList, setVenueBeverageList] = useState([]);
  const [venueDisabledFacilitiesList, setVenueDisabledFacilitiesList] =
    useState([]);
  const [venueEquipmentList, setVenueEquipmentList] = useState([]);
  const [venueEventsList, setVenueEventsList] = useState([]);
  const [venueFacilitiesList, setVenueFacilitiesList] = useState([]);
  const [venueLocationList, setVenueLocationList] = useState([]);
  const [venueLocationCityList, setVenueLocationCityList] = useState([]);
  const [venueLocationTypeList, setVenueLocationTypeList] = useState([]);
  const [venueMenuList, setVenueMenuList] = useState([]);
  const [venueServiceList, setVenueServiceList] = useState([]);

  const [venueDescription, setVenueDescription] = useState("");
  const [venuePlaceDetails, setVenuePlaceDetails] = useState("");

  // Effects
  useEffect(() => {
    // const { venueId } = Router.query;
    const venueId = venueid || "";
    console.log("Venue Place Page::", venueId);

    if (venueId) {
      setIsVenueId(venueId);
      fetchVenueEntityList(venueId);
      fetchVenueAmenities();
    } else {
      // return Router.push(router.VENUE_LIST);
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

  // console.log("errors ::", errors);

  // Method

  const fetchVenueEntityList = async (venueId) => {
    try {
      setIsLoading(true);
      const result = await axiosGet(apiRouter.VENUE_PLACE_LIST + "/" + venueId);
      console.log("VENUE_PLACE_LIST ::", result);
      if (result.status) {
        setVenueEntityList(result?.data?.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVenueAmenities = async (venuePlaceId) => {
    try {
      setIsLoading(true);
      const result = await axiosGet(apiRouter.VENUE_AMENITIES);
      console.log("VENUE_AMENITIES ::", result);
      if (result.status) {
        const data = result.data?.data;

        const venueMenuListTemp = [];
        const venueBeverageListTemp = [];
        const venueLocationListTemp = [];
        const venueLocationTypeListTemp = [];
        const venueEquipmentListTemp = [];
        const venueServiceListTemp = [];
        const venueDisabledFacilitiesListTemp = [];
        const venueFacilitiesListTemp = [];
        const venueEventsListTemp = [];

        data.map((item) => {
          const option = {
            label: item?.name,
            value: item?.id,
            id: item?.id,
            categoryId: item?.categoryId,
          };
          switch (item.categoryId) {
            case 1:
              venueFacilitiesListTemp.push(option);
              break;
            case 2:
              venueLocationTypeListTemp.push(option);
              break;
            case 3:
              venueEquipmentListTemp.push(option);
              break;
            case 4:
              venueServiceListTemp.push(option);
              break;
            case 5:
              venueDisabledFacilitiesListTemp.push(option);
              break;
            case 6:
              venueMenuListTemp.push(option);
              break;
            case 7:
              venueBeverageListTemp.push(option);
              break;
            case 8:
              venueLocationListTemp.push(option);
              break;
            case 9:
              venueEventsListTemp.push(option);
              break;
            default:
              break;
          }
        });
        setVenueMenuList(venueMenuListTemp);
        setVenueBeverageList(venueBeverageListTemp);
        setVenueEquipmentList(venueEquipmentListTemp);
        setVenueFacilitiesList(venueFacilitiesListTemp);
        setVenueLocationList(venueLocationListTemp);
        setVenueLocationTypeList(venueLocationTypeListTemp);
        setVenueDisabledFacilitiesList(venueDisabledFacilitiesListTemp);
        setVenueServiceList(venueServiceListTemp);
        setVenueEventsList(venueEventsListTemp);
      }
    } catch (error) {
      console.log("error ::", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVenueDetail = async (venuePlaceId) => {
    try {
      setIsLoading(true);
      const result = await axiosGet(
        apiRouter.VENUE_PLACE_DETAIL + "/" + venuePlaceId
      );
      console.log("VENUE_PLACE_DETAIL ::", result);

      return result?.data?.data || "";
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

    const result = await fetchVenueDetail(id);

    setVenuePlaceDetails(result);

    console.log("result ::", result);

    handleFormToggle(true);

    setIsEditId(id);
    const images = [];
    data?.venueImages.map((item) => {
      images.push({
        ...item,
        url: item.image,
        isUpload: false,
      });
    });
    setVenuePlaceImages(images);

    const venueMenuListTemp = [];
    const venueBeverageListTemp = [];
    const venueLocationListTemp = [];
    const venueLocationTypeListTemp = [];
    const venueEquipmentListTemp = [];
    const venueServiceListTemp = [];
    const venueDisabledFacilitiesListTemp = [];
    const venueFacilitiesListTemp = [];
    const venueEventsListTemp = [];

    result?.amenities?.map(({ amenity }) => {
      const option = {
        label: amenity?.name,
        value: amenity?.id,
        id: amenity?.id,
        categoryId: amenity?.categoryId,
        isAdded: true,
      };
      switch (amenity.categoryId) {
        case 1:
          venueFacilitiesListTemp.push(option);
          break;
        case 2:
          venueLocationTypeListTemp.push(option);
          break;
        case 3:
          venueEquipmentListTemp.push(option);
          break;
        case 4:
          venueServiceListTemp.push(option);
          break;
        case 5:
          venueDisabledFacilitiesListTemp.push(option);
          break;
        case 6:
          venueMenuListTemp.push(option);
          break;
        case 7:
          venueBeverageListTemp.push(option);
          break;
        case 8:
          venueLocationListTemp.push(option);
          break;
        case 9:
          venueEventsListTemp.push(option);
          break;
        default:
          break;
      }
    });

    setTimeout(() => {
      setValue("name", data?.name);
      let des = "";
      try {
        des = data?.discription;
        // des = JSON.parse(data?.discription);
      } catch (e) {
        des = "";
      }
      setVenueDescription(des);
      setValue("price", data?.price);
      setValue("seats", data?.seats);
      setValue("days", data?.days);
      setValue("standing", data?.standing);
      setValue("publishDate", data?.publishDate);
      setValue("menu", venueMenuListTemp);
      setValue("beverage", venueBeverageListTemp);
      setValue("location", venueLocationListTemp);
      setValue("locationType", venueLocationTypeListTemp);
      setValue("equipment", venueEquipmentListTemp);
      setValue("service", venueServiceListTemp);
      setValue("disabledFacilities", venueDisabledFacilitiesListTemp);
      setValue("facilities", venueFacilitiesListTemp);
      setValue("events", venueEventsListTemp);

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
    setVenuePlaceImages([]);
    reset();
  };

  const optionFormatMake = (entity) => {
    const option = [];
    entity?.map((item) => {
      option.push({
        categoryId: item?.categoryId,
        id: item?.id || "",
        label: item.label,
        isUpload: item.id ? false : true,
      });
    });
    return option;
  };
  const handleFormSubmit = async (val) => {
    setIsLoading(true);

    setErrorMsg("");
    const insertData = {
      seats: val.seats,
      standing: val.standing,
      days: val.days,
      name: val.name,
      price: val.price,
      discription: venueDescription,
      isActive: val.isActive,
      isApprove: val.isApprove,

      // discription: JSON.stringify(venueDescription),
      images: [],
    };

    if (val.isActive === true) {
      insertData.isActive = true;
    } else if (val.isActive.length > 0) {
      insertData.isActive = true;
    } else {
      insertData.isActive = false;
    }

    if (val.isApprove === true) {
      insertData.isApprove = true;
    } else if (val.isApprove.length > 0) {
      insertData.isApprove = true;
    } else {
      insertData.isApprove = false;
    }

    let amenities = [
      ...optionFormatMake(val?.location || []),
      ...optionFormatMake(val?.locationType || []),
      ...optionFormatMake(val?.beverage || []),
      ...optionFormatMake(val?.events || []),
      ...optionFormatMake(val?.equipment || []),
      ...optionFormatMake(val?.menu || []),
      ...optionFormatMake(val?.service || []),
      ...optionFormatMake(val?.disabledFacilities || []),
      ...optionFormatMake(val?.facilities || []),
    ];

    insertData.amenities = amenities;

    if (isEditId) {
      insertData.venueSpaceId = isEditId;

      const removeAmenities = [];
      venuePlaceDetails?.amenities?.map(({ amenity }) => {
        const doesExist = insertData.amenities?.some(function (ele) {
          return ele.id === amenity.id;
        });
        if (!doesExist) {
          removeAmenities.push(amenity);
        }
      });
      insertData.removeAmenities = removeAmenities;
    } else {
      insertData.venueMainId = isVenueId;
    }

    // console.log("venueImages ::", venueImages);

    // for (const iterator of Object.keys(venueImages)) {
    //   if (venueImages[iterator]) {
    //     if (venueImages[iterator]?.isUpload) {
    //       const imageUrl = await uploadImage(
    //         venueImages[iterator]?.image,
    //         S3Bucket.venueImages
    //       );
    //       if (imageUrl.status) {
    //         insertData[iterator] = imageUrl.url;
    //       }
    //     }
    //   }
    // }

    try {
      for (const item of venuePlaceImages) {
        if (item) {
          if (item?.isUpload) {
            const imageUrl = await uploadImage(
              item?.image,
              S3Bucket.venueImages
            );
            if (imageUrl.status) {
              insertData.images.push(imageUrl.url);
            }
          }
        }
      }

      console.log("insertData ::", insertData);

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
    console.log("Image ::", name, e.target.files);
    const files = e.target.files;

    const tempImage = [...venuePlaceImages];
    for (const img of files) {
      const data = {
        image: img,
        url: URL.createObjectURL(img),
        isUpload: true,
      };
      tempImage.push(data);
    }
    console.log("Temp image: ", tempImage);
    setVenuePlaceImages(tempImage);

    // console.log("Image ::", name, e.target.files[0]);
    // const image = e.target.files[0];

    // if (image) {
    //   const url = URL.createObjectURL(image);
    //   const coverImage = {
    //     image,
    //     url,
    //     isUpload: true,
    //   };

    //   setVenueImages({
    //     ...venueImages,
    //     [name]: coverImage,
    //   });
    // }
  };

  const removeImage = (image, index) => {
    if (image.id) {
      const res = confirm(`Are you sure you want to remove the venue Image`);
      if (res) {
        const result = axiosGet(
          apiRouter.VENUE_PLACE_IMAGE_REMOVE + "/" + image.id
        );
        if (result.status) {
          const tempImage = [...venuePlaceImages];
          tempImage.splice(index, 1);
          setVenuePlaceImages(tempImage);
          toaster("success", "Venue Image Successfully Removed");
        }
      }
    } else {
      const res = confirm(`Are you sure you want to remove the venue Image`);
      if (res) {
        const tempImage = [...venuePlaceImages];
        tempImage.splice(index, 1);
        setVenuePlaceImages(tempImage);
      }
    }
  };

  const handleRedirect = (item, path) => {
    console.log("Item ::", item);
    Router?.push(
      {
        pathname: path,
        query: { venueSpaceId: item?.id },
      },
      path
    );
  };

  // Render

  return (
    <>
      <div id="wrapper">
        <Sidebar cloaseForm={() => handleFormToggle(false)} />

        <div id="page-wrapper" className="gray-bg dashbard-1">
          {/* Header */}
          {/* End Header */}

          {/* Banner Form */}
          {isFormOpen && (
            <div className="wrapper wrapper-content animated fadeInRight">
              <div className="row">
                <div className="col-lg-12">
                  <div className="ibox ">
                    <div className="ibox-title">
                      <h5>
                        Venue Place <small>Create</small>
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
                                Place Price
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="price"
                                  placeholder="Enter Place Price"
                                  ref={register({
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Description*
                              </label>
                              <div className="col-sm-10">
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
                                Place Seats*
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="seats"
                                  placeholder="Enter Seats"
                                  ref={register({
                                    required: "Seats is required",
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Place Standing
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="standing"
                                  placeholder="Enter Place Standing"
                                  ref={register({
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Publish*
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="date"
                                  className="form-control"
                                  name="publishDate"
                                  placeholder="Enter Publish"
                                  ref={register({
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <SelectAndCreateBox
                                name={"events"}
                                placeholder={"Event"}
                                control={control}
                                optionsList={venueEventsList}
                                label="Event*"
                                categoryId={9}
                                isRequired
                              />
                            </div>
                            <div className="form-group row">
                              <SelectAndCreateBox
                                name={"location"}
                                placeholder={"Location"}
                                control={control}
                                optionsList={venueLocationList}
                                label="Location*"
                                isRequired
                                categoryId={8}
                              />
                            </div>
                            <div className="form-group row">
                              <SelectAndCreateBox
                                name={"locationType"}
                                placeholder={"Location Type"}
                                control={control}
                                optionsList={venueLocationTypeList}
                                label="Location Type*"
                                isRequired
                                categoryId={2}
                              />
                            </div>
                            <div className="form-group row">
                              <SelectAndCreateBox
                                name={"beverage"}
                                placeholder={"Beverage"}
                                control={control}
                                optionsList={venueBeverageList}
                                label="Beverage*"
                                isRequired
                                categoryId={7}
                              />
                            </div>

                            <div className="form-group row">
                              <SelectAndCreateBox
                                name={"equipment"}
                                placeholder={"Equipment"}
                                control={control}
                                optionsList={venueEquipmentList}
                                label="Equipment*"
                                isRequired
                                categoryId={3}
                              />
                            </div>
                            <div className="form-group row">
                              <SelectAndCreateBox
                                name={"menu"}
                                placeholder={"Menus"}
                                control={control}
                                optionsList={venueMenuList}
                                label="Menus*"
                                isRequired
                                categoryId={6}
                              />
                            </div>
                            <div className="form-group row">
                              <SelectAndCreateBox
                                name={"service"}
                                placeholder={"Service"}
                                control={control}
                                optionsList={venueServiceList}
                                label="Service"
                                categoryId={4}
                              />
                            </div>
                            <div className="form-group row">
                              <SelectAndCreateBox
                                name={"disabledFacilities"}
                                placeholder={"Disable Abilities"}
                                control={control}
                                optionsList={venueDisabledFacilitiesList}
                                label="Disable Abilities"
                                categoryId={5}
                              />
                            </div>
                            <div className="form-group row">
                              <SelectAndCreateBox
                                name={"facilities"}
                                placeholder={"Facilities"}
                                control={control}
                                optionsList={venueFacilitiesList}
                                label="Facilities"
                                categoryId={1}
                              />
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
                            <div className="form-group row">
                              <div className="profilePicMain">
                                <input
                                  type="file"
                                  multiple
                                  name="coverImage1"
                                  ref={register({
                                    required:
                                      venuePlaceImages?.length > 0
                                        ? false
                                        : "Image is required",
                                  })}
                                  onChange={(e) =>
                                    handleImages(e, "coverImage1")
                                  }
                                />
                                <i className="fa fa-plus"></i>
                              </div>
                            </div>

                            <div className="form-group row">
                              <div className="row">
                                {venuePlaceImages?.map((item, index) => {
                                  return (
                                    <div className="col-md-4">
                                      <div className="profilePicMain">
                                        <img src={item?.url} />
                                        <div
                                          className="venuimgdelete"
                                          onClick={() =>
                                            removeImage(item, index)
                                          }
                                        >
                                          <i className="fa fa-trash"></i>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
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
                    <h5>VenuePlace List</h5>
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
                            <th>Venue ID</th>
                            <th>Publish Date</th>
                            <th>Addition Date</th>
                            <th>First Page</th>
                            <th>Status</th>
                            <th>Approved</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            {/* <!-- <th>Id</th> --> */}
                            <th>Name</th>
                            <th>Venue ID</th>
                            <th>Publish Date</th>
                            <th>Addition Date</th>
                            <th>First Page</th>
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
                                <td>{item.venueMainId}</td>
                                <td>{item.publishDate}</td>
                                <td>{item.addDate}</td>
                                <td>{item.firstPage ? "Yes" : "No"}</td>
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
                                      title="Edit VenueSpace"
                                    ></i>
                                  </a>{" "}
                                  <Link
                                    href={{
                                      pathname: router.EVENT_BOOK,
                                      query: {
                                        venueId: item?.id,
                                      },
                                    }}
                                    as={router.EVENT_BOOK}
                                  >
                                    <a
                                      href="javascript:void(0)"
                                      id="data.id"
                                      className="admin_remove btn btn-warning btn-sm"
                                      data-toggle="modal"
                                      data-target="#exampleModal"
                                      // onClick={() => handleItemDelete(item)}
                                    >
                                      <i
                                        className="fa fa-list-alt"
                                        title="Event Book"
                                      ></i>
                                    </a>
                                  </Link>{" "}
                                  <a
                                    href="javascript:void(0)"
                                    className="btn btn-primary btn-sm"
                                    onClick={() =>
                                      handleRedirect(item, router.ENQUIRY)
                                    }
                                  >
                                    <i
                                      className="fa fa-envelope-o"
                                      title="Venue Enquiry"
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
                                      title="Remove VenueSpace"
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

export const getServerSideProps = async ({ params, req }) => {
  const { venueid } = params;

  return {
    props: {
      venueid: venueid,
    },
  };
};

export default VenuePlaceList;
