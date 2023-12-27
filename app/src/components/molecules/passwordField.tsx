import React, { useState } from "react";
import { Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import CustomInput from "../atoms/customInput"; 
import { FieldError } from "react-hook-form"; 

interface PasswordFieldProps {
  register: any; 
  error?: FieldError; 
}

const PasswordField = ({ register, error }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <CustomInput
      label="Senha"
      name="password"
      type={showPassword ? "text" : "password"}
      register={register}
      error={error}
    >
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={handlePasswordVisibility}
          variant="ghost"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
        >
          {showPassword ? <ViewOffIcon boxSize="18px" /> : <ViewIcon boxSize="18px" />}
        </Button>
      </InputRightElement>
    </CustomInput>
  );
};

export default PasswordField;
