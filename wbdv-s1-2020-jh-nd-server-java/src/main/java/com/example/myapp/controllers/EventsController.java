package com.example.myapp.controllers;

import com.example.myapp.models.calendar.Event;
import com.example.myapp.services.EventService;
import com.example.myapp.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class EventsController {

    @Autowired
    private EventService eventService;



    @DeleteMapping("/api/events/{eventId}")
    public void deleteEventById(@PathVariable("eventId") Long eventId) {
        eventService.deleteEventById(eventId);
    }

    @GetMapping("api/events")
    public List<Event> getEvents() {
        return eventService.getAllEvents();
    }

}
