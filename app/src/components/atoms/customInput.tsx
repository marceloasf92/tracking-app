import React from "react";
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FieldValues, UseFormRegister, FieldError } from "react-hook-form";

interface CustomInputProps {
  label?: string;
  error?: FieldError;
  register: UseFormRegister<FieldValues>;
  name: string;
  type?: string;
  children?: React.ReactNode;
}

const CustomInput = ({
  label,
  error,
  register,
  name,
  type = "text",
  children,
  ...rest
}: CustomInputProps) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        <ChakraInput id={name} type={type} {...register(name)} {...rest} />
        {children && (
          <InputRightElement width="4.5rem">{children}</InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
