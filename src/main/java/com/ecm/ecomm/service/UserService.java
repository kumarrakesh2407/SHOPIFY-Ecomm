package com.ecm.ecomm.service;

import com.ecm.ecomm.model.User;
import com.ecm.ecomm.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        User newUser = userRepository.save(user);
        System.out.println("User Added");
        return newUser;
    }

    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        if(user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }
}
