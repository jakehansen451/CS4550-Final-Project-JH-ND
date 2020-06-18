package com.example.myapp.controllers;


import com.example.myapp.api.OAuth2;
import com.example.myapp.models.calendar.Event;

import com.example.myapp.models.people.User;
import com.example.myapp.services.EventService;
import com.example.myapp.services.GoogleCalendarService;
import com.example.myapp.services.UserService;


import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.services.calendar.model.TimePeriod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "*")
public class EventsController {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @Autowired
    GoogleCalendarService googleCalendarService;



    @DeleteMapping("/api/events/{eventId}")
    public void deleteEventById(@PathVariable("eventId") Long eventId) {
        eventService.deleteEventById(eventId);
    }


    @GetMapping("api/events")
    public List<Event> getEvents() {
        return eventService.getAllEvents();
    }


    @GetMapping("api/test")
    public List<TimePeriod> get() {
        String token = userService.findUserById(1L).getAccessToken();
        try {
            return googleCalendarService.getFreeBusy(token);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    @PostMapping("/api/users/{userId}/token")
    public User foo(@RequestBody Map<String, String> body, @PathVariable("userId") Long userId)  {
        String token = body.get("refresh_token");
        User user = userService.findUserById(userId);
        user.setRefreshToken(token);
        userService.updateUser(userId, user);

        return user;
    }

}
