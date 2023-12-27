"use client";

import React, { useEffect, useCallback } from "react";
import {
  Box,
  Text,
  VStack,
  Heading,
  useColorModeValue,
  Container,
  useTheme,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "@/features/order/orderSlice";
import { RootState } from "../store";
import { orderService } from "@/services/orders";
import CustomButton from "@/components/atoms/customButton";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.order.orders);
  const { colors } = useTheme();
  const bgColor = useColorModeValue(colors.gray[50], colors.gray[700]);
  const router = useRouter();

  const fetchOrders = useCallback(
    async (token: string) => {
      try {
        if (typeof window !== "undefined") {
          const storedData = localStorage.getItem("informations");
          if (!storedData) {
            console.error("No user information found in local storage");
            return;
          }
          const { id: userId } = JSON.parse(storedData);
          const fetchedOrders = await orderService.fetchOrders(userId, token);
          dispatch(setOrders(fetchedOrders));
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/");
      } else {
        fetchOrders(token);
      }
    }
  }, [fetchOrders, router]);

  const updateOrderStatus = async (orderId: number) => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found in local storage");
          return;
        }

        await orderService.updateOrderStatus(orderId, "Entregue", token);
        fetchOrders(token);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };
  
  return (
    <Container maxW="container.xl" p={5}>
      <VStack spacing={5} align="stretch">
        {orders.length === 0 ? (
          <Box p={5} shadow="md" borderWidth="1px" bg={bgColor}>
            <Heading fontSize="xl" textAlign="center">
              Você ainda não tem pedidos!
            </Heading>
            <Text mt={4} textAlign="center">
              Seus pedidos aparecerão aqui quando você fizer um.
            </Text>
          </Box>
        ) : (
          orders.map((order) => (
            <Box
              key={order.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              bg={bgColor}
            >
              <Heading fontSize="xl">{order.customerName}</Heading>
              <Text mt={4}>Pedido: {order.id}</Text>
              <Text mt={4}>Endereço: {order.deliveryAddress}</Text>
              <Text>Status: {order.status}</Text>
              <Text>Data: {formatDate(order.createdAt)}</Text>
              <CustomButton
                label="Marcar como Entregue"
                colorScheme="blue"
                mt={3}
                onClick={() => updateOrderStatus(order.id)}
                isDisabled={order.status === "Entregue"}
              />
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default OrdersPage;
