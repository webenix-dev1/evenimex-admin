import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const CitySelectAndCreateBox = (props) => {
  const { label, name, control, optionsList, placeholder, categoryId } = props;
  const brandColor = "#999999";
  const customStyles = {
    control: (base, state) => ({
      ...base,
      boxShadow: state.isFocused ? 0 : 0,
      borderColor: state.isFocused ? brandColor : base.borderColor,
      "&:hover": {
        borderColor: state.isFocused ? brandColor : base.borderColor,
      },
    }),
  };

  const [defualtOption, setDefualtOption] = useState(optionsList || []);

  useEffect(() => {
    setDefualtOption(optionsList);
  }, [optionsList]);

  const createOption = (value) => ({
    label: value,
    value: value,
  });

  const handleCreate = (inputValue) => {
    // console.group("Option created ::", inputValue);
    // console.log("Wait a moment...");
    // setTimeout(() => {
    const newOption = createOption(inputValue);
    // console.log(newOption);
    // console.groupEnd();
    props.setValue("city", inputValue);

    setDefualtOption([newOption, ...defualtOption]);

    // }, 200);
  };

  return (
    <>
      <label className="col-sm-2 col-form-label">{label}</label>
      <div className="col-sm-10">
        <Controller
          name={name}
          control={control}
          rules={{
            required: `${label} is required`,
          }}
          // defaultValue={options.filter((option) =>
          //   options?.includes(option.value)
          // )}
          // defaultValue=""
          render={({ value, onChange, onBlur }) => {
            return (
              <CreatableSelect
                // className="multiselect"
                classNamePrefix="form-control"
                options={defualtOption}
                placeholder={placeholder}
                isMulti={name === "city" ? false : true}
                onChange={(options) => {
                  // if (name === "city") {
                  onChange(options.value);
                  // } else {
                  //   onChange(options?.map((option) => option));
                  // }
                }}
                onCreateOption={handleCreate}
                onBlur={onBlur}
                value={defualtOption?.filter(
                  (option) =>
                    // value?.includes(option.value)
                    option.value == value
                )}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    neutral50: "transparent", // Placeholder color
                  },
                })}
                styles={customStyles}
              />
            );
          }}
        />
      </div>
    </>
  );
};

export default CitySelectAndCreateBox;
