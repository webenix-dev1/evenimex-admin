import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";

const SelectBox = (props) => {
  const { label, name, control, optionsList, placeholder } = props;
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
          render={({ value, onChange, onBlur }) => {
            return (
              <Select
                // className="form-control"
                classNamePrefix="form-control"
                options={optionsList}
                placeholder={placeholder}
                isMulti={name === "city" || name === "venderId" ? false : true}
                onChange={(options) => {
                  if (name === "city" || name === "venderId") {
                    onChange(options.value);
                  } else {
                    onChange(options?.map((option) => option.value));
                  }
                }}
                onBlur={onBlur}
                value={optionsList.filter((option) =>
                  value?.includes(option.value)
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

export default SelectBox;
