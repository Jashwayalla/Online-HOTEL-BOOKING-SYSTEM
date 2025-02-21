package com.hotelbooking.service;

import java.util.Collections;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hotelbooking.entity.Role;
import com.hotelbooking.entity.User;
import com.hotelbooking.exception.UserAlreadyExistsException;
import com.hotelbooking.repository.RoleRepository;
import com.hotelbooking.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
	private static final Logger log = LoggerFactory.getLogger(UserService.class);
	
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    
    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            log.warn("Attempt to register an existing email: {}", user.getEmail());
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        log.debug("Encoded password: {}", user.getPassword());

        Role userRole = roleRepository.findByName("ROLE_CUSTOMER")
                       .orElseThrow(() -> new RuntimeException("Default role not found"));

        user.setRoles(Collections.singletonList(userRole));
        log.info("User registered successfully with email: {}", user.getEmail());
        return userRepository.save(user);
    }


    @Override
    public List<User> getUsers() {
        log.info("Fetching all users from the database");
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if (theUser != null) {
            log.info("Deleting user with email: {}", email);
            userRepository.deleteByEmail(email);
        }
    }
    
    @Override
    public User getUser(String email) {
        log.debug("Fetching user with email: {}", email);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("User not found for email: {}", email);
                    return new UsernameNotFoundException("User not found");
                });
    }
}