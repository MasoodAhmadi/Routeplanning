package com.planner.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.planner.dto.LoginRequest;
import com.planner.exception.PasswordMismatchException;
import com.planner.exception.UserNotFoundException;
import com.planner.model.User;
import com.planner.repository.UserRepository;
import com.planner.utils.JwtUtil;

@Service
public class UserService extends UserServiceBase {

    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        super(userRepository);
        this.jwtUtil = jwtUtil;
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public String registerUser(User user) {
        validateUserForRegistration(user);
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        userRepository.save(user);
        return "User registered successfully";
    }

    /**
     * Authenticates the user and returns a JWT token.
     */
    public User loginUser(LoginRequest loginRequest) {
        // Find the user by username
        User user = userRepository.findByUsername(loginRequest.getUsername());

        // If the user is not found, throw an exception
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        // If the password does not match, throw an exception
        if (!BCrypt.checkpw(loginRequest.getPassword(), user.getPassword())) {
            throw new PasswordMismatchException("Invalid password");
        }

        // Return the entire user object after successful authentication
        return user;
    }

    public String deleteUser(Long userId) {
        userRepository.deleteById(userId);
        return "User deleted successfully";
    }

    public String modifyUserDetails(User user, Long userId) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        validateUser(user, existingUser);
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        existingUser.setEmail(user.getEmail());
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setMobile(user.getMobile());
        existingUser.setCountry(user.getCountry());
        existingUser.setCity(user.getCity());
        existingUser.setAddress(user.getAddress());
        existingUser.setPostalCode(user.getPostalCode());
        userRepository.save(existingUser);
        return "User details modified successfully";
    }

    public String changePassword(Long userId, String currentPassword, String newPassword) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        validatePasswordChange(currentPassword, newPassword, existingUser);
        existingUser.setPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt()));
        userRepository.save(existingUser);
        return "Password changed successfully";
    }
}
