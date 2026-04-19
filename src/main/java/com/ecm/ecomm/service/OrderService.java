package com.ecm.ecomm.service;

import com.ecm.ecomm.dto.OrderDTO;
import com.ecm.ecomm.dto.OrderItemDTO;
import com.ecm.ecomm.model.*;
import com.ecm.ecomm.repo.OrderRepository;
import com.ecm.ecomm.repo.ProductRepository;
import com.ecm.ecomm.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public OrderDTO placeOrder(Long userId, Map<Long, Integer> productQuantities, double totalAmount) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Orders order = new Orders();
        order.setUser(user);
        order.setTotalAmount(totalAmount);
        order.setOrderDate(new Date());
        order.setStatus("Pending");

        List<OrderItem> orderItems = new ArrayList<>();
        List<OrderItemDTO> orderItemDTOs = new ArrayList<>();

        for(Map.Entry<Long,Integer> entry : productQuantities.entrySet())
        {
            Product product = productRepository.findById(entry.getKey())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(entry.getValue());
            orderItem.setOrder(order);
            orderItems.add(orderItem);
            orderItemDTOs.add(new OrderItemDTO(product.getName(), entry.getValue(), product.getPrice()));

        }

        order.setOrderItems(orderItems);
        Orders saveOrder = orderRepository.save(order);
        return new OrderDTO(
            saveOrder.getId(),
            saveOrder.getTotalAmount(),
            saveOrder.getStatus(),
            saveOrder.getOrderDate(),
            saveOrder.getUser() != null ? saveOrder.getUser().getName() : "Unknown",
            orderItemDTOs
        );

    }

    public List<OrderDTO> getAllOrders() {
        List<Orders> orders = orderRepository.findAllOrderWithUsers();
        return orders.stream().map(this::convertToDTO).collect(Collectors.toList());
    }


    private OrderDTO convertToDTO(Orders order) {
        List<OrderItemDTO> orderItemDTOs = order.getOrderItems().stream()
            .map(orderItem -> new OrderItemDTO(
                orderItem.getProduct().getName(),
                orderItem.getQuantity(),
                orderItem.getProduct().getPrice()
            ))
            .collect(Collectors.toList());
            
        return new OrderDTO(
            order.getId(),
            order.getTotalAmount(),
            order.getStatus(),
            order.getOrderDate(),
            order.getUser() != null ? order.getUser().getName() : "Unknown",
            orderItemDTOs
        );
    }

    public List<OrderDTO> getOrderByUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        return orderRepository.findByUser(user).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
}


