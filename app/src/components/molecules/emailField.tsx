import React from "react";
import CustomInput from "../atoms/customInput"; 
import { FieldError } from "react-hook-form"; 

interface EmailFieldProps {
  register: any; 
  error?: FieldError; 
}

const EmailField = ({ register, error }: EmailFieldProps) => {
  return (
    <CustomInput
      label="Email"
      name="email"
      type="email"
      register={register}
      error={error}
    />
  );
};

export default EmailField;
