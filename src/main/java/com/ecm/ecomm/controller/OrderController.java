package com.ecm.ecomm.controller;

import com.ecm.ecomm.dto.OrderDTO;
import com.ecm.ecomm.model.OrderRequest;
import com.ecm.ecomm.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place/{userId}")
    public OrderDTO placeOrder(
            @PathVariable Long userId, 
            @RequestBody OrderRequest orderRequest) {
        return orderService.placeOrder(
            userId, 
            orderRequest.getProductQuantities(),
            orderRequest.getTotalAmount()
        );
    }

    @GetMapping
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/user/{userId}")
    public List<OrderDTO> getOrderByUser(@PathVariable Long userId) {
        return orderService.getOrderByUser(userId);
    }
}
