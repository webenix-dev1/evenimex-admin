import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import SelectBox from "../SelectBox";

const VenderFilter = ({ venderList, venderId, handleVenderFilter }) => {
  const { control, register, setValue, handleSubmit, watch, errors, reset } =
    useForm();

  useEffect(() => {
    setValue("venderId", venderId);
  }, [venderId]);

  const handleFormSubmit = async (val) => {
    const { venderId } = val;
    console.log("insertData ::", val);
    handleVenderFilter(venderId);
  };
  return (
    <div>
      {/* Banner Form */}
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox ">
              <div className="ibox-title">
                <h5>
                  Venue <small>Filter</small>
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
                          optionsList={[
                            {
                              value: "all",
                              label: "All Venue",
                            },
                            ...venderList,
                          ]}
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
    </div>
  );
};

export default VenderFilter;
