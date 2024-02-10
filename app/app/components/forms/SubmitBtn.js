import React from "react";
import { useFormikContext } from "formik";

//import components
import * as Button from "../Button";
import colors from "../../config/colors";

const SubmitBtn = ({  title, disabled, ...otherProps }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button.BtnContain
      {...otherProps}
      label={title}
      color={disabled ? colors.lightgray : colors.red}
      labelcolor="white"
      disabled={disabled}
      onPress={handleSubmit}
    />
  );
};

export default SubmitBtn;
