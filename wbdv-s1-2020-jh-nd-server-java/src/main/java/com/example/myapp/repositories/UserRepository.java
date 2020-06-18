package com.example.myapp.repositories;

import com.example.myapp.models.people.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository
        extends CrudRepository<User, Long> {
    @Query("SELECT user FROM User user WHERE user.id=:uid")
    User findUserById(@Param("uid") Long userId);

    @Query("SELECT user FROM User user WHERE user.username=:username AND user.password=:password")
    User findUserByCredentials(
            @Param("username") String username,
            @Param("password") String password);

    @Query("SELECT user FROM User user")
    List<User> findAllUsers();

}