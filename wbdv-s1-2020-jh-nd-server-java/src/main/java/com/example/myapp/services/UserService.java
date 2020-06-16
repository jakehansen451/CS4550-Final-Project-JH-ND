package com.example.myapp.services;

import com.example.myapp.models.people.User;
import com.example.myapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

  public List<User> findAllUsers() {
    return repository.findAllUsers();
  }

  public User updateUser(Long userId, User updatedUser) {
    // TODO: check this
    updatedUser.setId(userId);
    repository.save(updatedUser);

    return updatedUser;
  }

  public void deleteUserById(Long userId) {
    repository.deleteById(userId);
  }
}