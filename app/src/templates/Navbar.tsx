"use client";

import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  Center,
  Button,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { logout } from "../features/user/userSlice";
import { useRouter } from "next/navigation";
import CustomButton from "../components/atoms/customButton";

export default function Nav() {
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.50", "gray.700")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <CustomButton
            label="Logout"
            onClick={handleLogout}
          />

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{username || "Usuário"}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
