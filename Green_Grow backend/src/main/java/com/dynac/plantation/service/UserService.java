package com.dynac.plantation.service;

import com.dynac.plantation.model.User;
import com.dynac.plantation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        user.setCreatedAt(Instant.now().toString());
        user.setProfileImage("https://images.unsplash.com/photo-1472396961693-142e6e269027");
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
