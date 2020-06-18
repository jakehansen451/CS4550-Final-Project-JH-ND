package com.example.myapp.controllers;

import com.example.myapp.models.people.User;
import com.example.myapp.services.GoogleCalendarService;
import com.example.myapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(
        origins = "http://localhost:3000",
        allowCredentials = "true")
public class UserController {
    @Autowired
    private GoogleCalendarService googleCalendarService;

    @Autowired
    UserService service;

    @PostMapping("/api/register")
    public User register(@RequestBody User user, HttpSession session) {
        User currentUser = service.createUser(user);
        session.setAttribute("currentUser", currentUser);
        return currentUser;
    }

    @PostMapping("/api/login")
    public User login(@RequestBody User user, HttpSession session) {
        User currentUser = service.findUserByCredentials(user.getUsername(), user.getPassword());
        if (currentUser == null) {
            throw new NotFoundException();
        }
        session.setAttribute("currentUser", currentUser);
        return currentUser;
    }

    @PostMapping("/api/profile")
    public User profile(HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        if (currentUser == null) {
            throw new NotFoundException();
        }
        return currentUser;
    }

    @PostMapping("/api/logout")
    public int logout(HttpSession session) {
        session.invalidate();
        return 1;
    }

    @GetMapping("/api/users/tutors/{courseId}")
    public List<User> findTutorsByCourseId(@PathVariable("courseId") Long courseId) {
        return service.findTutorsByCourseId(courseId);
    }

    @GetMapping("/api/users/students/{courseId}")
    public List<User> findStudentsByCourseId(@PathVariable("courseId") Long courseId) {
        return service.findStudentsByCourseId(courseId);
    }

    @GetMapping("/api/users")
    public List<User> findAllUsers() {
        return service.findAllUsers();
    }

    @GetMapping("/api/users/{userId}")
    public User findUserById(@PathVariable("userId") String userId) {
        Long userIdLong;
        try {
            userIdLong = Long.parseLong(userId);
        } catch (NumberFormatException nfe) {
            throw new NotFoundException();
        }
        User user = service.findUserById(userIdLong);
        if (user == null) {
            throw new NotFoundException();
        }
        return user;
    }

    @PostMapping("/api/users")
    public User createUser(@RequestBody User newUser) {
        return service.createUser(newUser);
    }

    @PutMapping("/api/users/{userId}")
    public User updateUser(@PathVariable("userId") Long userId, @RequestBody User updatedUser) {
        return service.updateUser(userId, updatedUser);
    }

    @DeleteMapping("/api/users/{userId}")
    public void deleteUserById(@PathVariable("userId") Long userId) {
        service.deleteUserById(userId);
    }

    @PostMapping("/api/users/{userId}/tokens")
    public User addAuthorizationTokensToUser(@RequestBody Map<String, String> body, @PathVariable("userId") Long userId) {
        return service.addTokensToUser(body, userId);
    }

    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Not found")
    private class NotFoundException extends RuntimeException {
    }
}
