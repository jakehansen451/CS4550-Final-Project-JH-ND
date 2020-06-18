package com.example.myapp.controllers;


import com.example.myapp.models.calendar.Event;
import com.example.myapp.models.people.User;
import com.example.myapp.services.EventService;
import com.example.myapp.services.GoogleCalendarService;
import com.example.myapp.services.UserService;
import com.google.api.services.calendar.model.TimePeriod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;
import java.util.List;


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
    public int deleteEventById(@PathVariable("eventId") Long eventId) {
        eventService.deleteEventById(eventId);
        return 1;
    }

    @GetMapping("api/events")
    public List<Event> getEvents() {
        return eventService.getAllEvents();
    }

    // These will be moved to Google Calendar Service once "tested"
    @GetMapping("api/test/{userId}")
    public List<TimePeriod> get(@PathVariable("userId") Long userId) {
        User user = userService.findUserById(userId);
        String accessToken = user.getAccessToken();
        String refreshToken = user.getRefreshToken();

        try {
            return googleCalendarService.getFreeBusy(accessToken, refreshToken, userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    // NOTE: this is a google events, not inner events!
    @GetMapping("/api/users/{userId}/events")
    public List<com.google.api.services.calendar.model.Event> getEvents(@PathVariable("userId") Long userId) {
        User user = userService.findUserById(userId);
        String accessToken = user.getAccessToken();
        String refreshToken = user.getRefreshToken();

        // TODO: check if token is null
        List<com.google.api.services.calendar.model.Event> eventList = new ArrayList<>();
        try {
            eventList = googleCalendarService.getEvents(accessToken, refreshToken, userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return eventList;
    }

}
