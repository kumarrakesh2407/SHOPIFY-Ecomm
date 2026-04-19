package com.ecm.ecomm.repo;

import com.ecm.ecomm.model.Orders;
import com.ecm.ecomm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    @Query("SELECT o FROM Orders o JOIN FETCH o.user")
    List<Orders> findAllOrderWithUsers();

    List<Orders> findByUser(User user);
}
