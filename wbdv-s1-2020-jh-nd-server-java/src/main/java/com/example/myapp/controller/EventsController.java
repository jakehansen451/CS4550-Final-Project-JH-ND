package com.example.myapp.controller;


import com.example.myapp.service.GoogleCalendarService;
import com.google.api.services.calendar.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;


@RestController
public class EventsController {
    @Autowired
    private GoogleCalendarService googleCalendarService;

    @GetMapping("/api/events")
    public List<Event> home() {
        List<Event> eventList = new ArrayList<>();
        try {
            eventList = googleCalendarService.getEvents();
        } catch (IOException | GeneralSecurityException e) {
            e.printStackTrace();
        }
        return eventList;
    }
}
