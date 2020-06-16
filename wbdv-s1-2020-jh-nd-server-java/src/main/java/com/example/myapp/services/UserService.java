package com.example.myapp.services;

import com.example.myapp.models.people.User;
import com.example.myapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Autowired
  UserRepository repository;
  public User createUser(User user) {
    return repository.save(user);
  }

  public User findUserById(Long id) {
    return repository.findUserById(id);
  }

  public User findUserByCredentials(String username, String password) {
    return repository.findUserByCredentials(username, password);
  }
}