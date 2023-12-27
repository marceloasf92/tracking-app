"use client";

import React, { useEffect } from "react";
import { Flex, Box, Stack, Heading, useTheme } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import LoginForm from "../components/organisms/loginForm";

export default function Login() {
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        router.push("/dashboard");
      }
    }
  }, [router]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={theme?.colors?.gray ? theme.colors.gray[50] : '#F7FAFC'}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Tracking APP</Heading>
        </Stack>
        <Box rounded={"lg"} bg={theme?.colors?.white} boxShadow={"lg"} p={8}>
          <LoginForm />
        </Box>
      </Stack>
    </Flex>
  );
}
