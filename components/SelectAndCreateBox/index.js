import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const SelectAndCreateBox = (props) => {
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
  // const [value, setvalue] = useState(second)

  useEffect(() => {
    setDefualtOption(optionsList);
  }, [optionsList]);

  const createOption = (value) => ({
    label: value,
    value: value,
    id: "",
    categoryId: categoryId,
  });

  const handleCreate = (inputValue) => {
    console.group("Option created");
    console.log("Wait a moment...");
    setTimeout(() => {
      const newOption = createOption(inputValue);
      console.log(newOption);
      console.groupEnd();

      setDefualtOption([...defualtOption, newOption]);
      // this.setState({
      //   value: [...value, newOption],
      // });
    }, 200);
  };

  // console.log("defualtOption ::", defualtOption);

  return (
    <>
      <Form.Label>{label}</Form.Label>
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
              className="multiselect"
              classNamePrefix="evenimex-select"
              options={defualtOption}
              placeholder={placeholder}
              isMulti={name === "city" ? false : true}
              onChange={(options) => {
                if (name === "city") {
                  onChange(options.value);
                } else {
                  onChange(options?.map((option) => option));
                }
              }}
              onCreateOption={handleCreate}
              onBlur={onBlur}
              value={defualtOption.filter((option) => {
                // value?.includes(option);
                const doesExist = value?.some(function (ele) {
                  return ele.label == option.label;
                });
                return doesExist && option;
              })}
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
    </>
  );
};

export default SelectAndCreateBox;
