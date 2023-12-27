import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Stack, Button, useTheme } from "@chakra-ui/react";
import EmailField from "../molecules/emailField";
import PasswordField from "../molecules/passwordField";
import CustomButton from "../atoms/customButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userService } from "../../services/users";
import { login } from "../../features/user/userSlice";

yup.setLocale({
  mixed: {
    default: "Não é válido",
    required: "Campo obrigatório",
  },
  string: {
    email: "Email inválido",
  },
});

const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email obrigatório")
    .email("Email inválido")
    .matches(emailPattern, "Formato de e-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const defaultBg = theme.colors.blue[400];
  const defaultColor = theme.colors.white;
  const defaultHoverBg = theme.colors.blue[500];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { email, password } = data;
      const { token, informations } = await userService.login(email, password);
      dispatch(login({ token, informations }));
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <EmailField register={register} error={errors.email} />
        <PasswordField register={register} error={errors.password} />
        <CustomButton
          type="submit"
          label="Entrar"
          bg={defaultBg}
          color={defaultColor}
          _hover={{
            bg: defaultHoverBg,
          }}
        />
      </Stack>
    </form>
  );
};

export default LoginForm;
