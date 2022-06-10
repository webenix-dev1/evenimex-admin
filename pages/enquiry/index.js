import React, { useEffect, useState } from "react";
import { Head } from "next/document";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import LoaderComponent from "../../components/LoaderComponent";
import Sidebar from "../../components/Sidebar";
import apiRouter from "../../utils/apiRouter";
import { axiosGet, axiosPost } from "../../utils/axiosHelper";
import SelectBox from "../../components/SelectBox";
import moment from "moment";
import { useRouter } from "next/router";

const VenueEnquiry = () => {
  // Const
  const { control, register, setValue, handleSubmit, watch, errors, reset } =
    useForm();
  const Router = useRouter();
  const venderId = Router?.query?.venderId || "";

  // State
  const [venderList, setVenderList] = useState([]);
  const [venueEnquiryList, setVenueEnquiryList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditId, setIsEditId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [venderData, setVenderData] = useState(venderId || "");

  // Effects
  useEffect(() => {
    fetchVendersList();
  }, []);

  useEffect(() => {
    if (Router?.query?.venderId) {
      console.log("Router ::", Router);
      setValue("venderId", Router?.query?.venderId);
      fetchVenueEnquiryList(Router?.query?.venderId);
    }
  }, [Router]);

  // Method
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
            label: item?.fname + item?.lname,
          });
          if (venderId == item.id) {
            id = venderId;
          }
        });
        console.log("option ::", option);
        setVenderList(option);
        console.log("venderId ::", venderId);

        console.log("ID ::", id);
        if (id) {
          setValue("venderId", id);
          fetchVenueEnquiryList(id);
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const fetchVenueEnquiryList = async (userId) => {
    try {
      setIsLoading(true);
      const result = await axiosPost(apiRouter.VENUE_PLACE_ENQUIRY, {
        userId: userId,
      });
      if (result.status) {
        setVenueEnquiryList(result?.data?.data);
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
    const { venderId } = val;

    setVenderData(venderId);
    fetchVenueEnquiryList(venderId);
    console.log("insertData ::", val);
  };

  const handleItemDelete = async (val) => {
    const { id, fname } = val;
    const res = confirm(
      `Are you sure you want to remove the enquiry of ${fname}`
    );
    if (res) {
      try {
        setIsLoading(true);

        const result = await axiosGet(
          apiRouter.VENUE_ENQUIRY_REMOVE + "/" + id
        );
        if (result.status) {
          fetchVenueEnquiryList(venderData);
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
          <div className="wrapper wrapper-content animated fadeInRight">
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox ">
                  <div className="ibox-title">
                    <h5>
                      Venue Enquiry <small></small>
                    </h5>
                  </div>
                  <div className="ibox-content">
                    <div className="row">
                      <div className="col-sm-12">
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                          <div class="form-group row">
                            <SelectBox
                              name="venderId"
                              placeholder={"Vender"}
                              control={control}
                              optionsList={venderList}
                              label="Vender"
                            />
                          </div>

                          <div className="hr-line-dashed"></div>
                          {errors?.name && <p>{errors?.name?.message}</p>}
                          <div className="form-group row">
                            <div className="col-sm-4 col-sm-offset-2">
                              <button className="btn btn-primary btn-sm">
                                Search
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
          {/* End Banner Form */}

          {/* Hero Table */}
          <div className="wrapper wrapper-content animated fadeInRight">
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox">
                  <div className="ibox-title">
                    <h5>Admin</h5>
                    <div className="ibox-tools">
                      <a className="collapse-link">
                        <i className="fa fa-chevron-up"></i>
                      </a>
                      {/* <a
                        href="javascript:void(0)"
                        onClick={() => {
                          handleFormToggle(true);
                        }}
                      >
                        <i className="fa fa-plus"></i>
                      </a> */}
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
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Enquiry</th>
                            <th>Contact</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Enquiry</th>
                            <th>Contact</th>
                            <th>Action</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {venueEnquiryList?.map((item, index) => {
                            return (
                              <tr className="gradeX" key={index}>
                                <td>
                                  {item.fname} {item.lname}
                                </td>
                                <td>{item.message}</td>
                                <td>
                                  {moment(item.date).format("DD.MM.YYYY")}
                                </td>
                                <td>
                                  {moment(item``.endDate).format("DD.MM.YYYY")}
                                </td>
                                <td>{item.phone || item.email}</td>
                                <td className="center">
                                  {/* <a
                                    href="javascript:void(0)"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleFormEdit(item)}
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

export default VenueEnquiry;
