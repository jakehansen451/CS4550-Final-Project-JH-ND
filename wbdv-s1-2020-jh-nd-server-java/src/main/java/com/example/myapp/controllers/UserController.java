package com.example.myapp.controllers;

import com.example.myapp.models.people.User;
import com.example.myapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(
    origins = "http://localhost:3000",
    allowCredentials = "true")
public class UserController {
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
    session.setAttribute("currentUser", currentUser);
    return user;
  }

  @PostMapping("/api/profile")
  public User profile(HttpSession session) {
    User currentUser = (User)session.getAttribute("currentUser");
    return currentUser;
  }

  @PostMapping("/api/logout")
  public void logout(HttpSession session) {
    session.invalidate();
  }
}
