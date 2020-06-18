package com.example.myapp.controllers;


import com.example.myapp.services.GoogleCalendarService;
import com.example.myapp.services.UserService;
import com.google.api.services.calendar.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EventsController {
    @Autowired
    private GoogleCalendarService googleCalendarService;

    @Autowired
    private UserService userService;

    @GetMapping("/api/users/{userId}/events")
    public List<Event> getEvents(@PathVariable("userId") Long userId) {
        String token = userService.findUserById(userId).getAccessToken();
        // TODO: check if token is null
        List<Event> eventList = new ArrayList<>();
        try {
            eventList = googleCalendarService.getEvents(token);
        } catch (IOException | GeneralSecurityException e) {
            e.printStackTrace();
        }
        return eventList;
    }
}
