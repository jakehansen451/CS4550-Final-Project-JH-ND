package com.example.myapp.controllers;

import com.example.myapp.models.calendar.Event;
import com.example.myapp.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EventsController {

    @Autowired
    private EventService eventService;

    @DeleteMapping("/api/events/{eventId}")
    public int deleteEventById(@PathVariable("eventId") Long eventId) {
        eventService.deleteEventById(eventId);
        return 1;
    }

    @GetMapping("api/events")
    public List<Event> getEvents() {
        return eventService.getAllEvents();
    }

}
