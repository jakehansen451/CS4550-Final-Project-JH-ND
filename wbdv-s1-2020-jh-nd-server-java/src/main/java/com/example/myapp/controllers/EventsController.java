package com.example.myapp.controllers;


import com.example.myapp.models.calendar.Event;
import com.example.myapp.models.calendar.TimePeriod;
import com.example.myapp.models.people.User;
import com.example.myapp.services.EventService;
import com.example.myapp.services.GoogleCalendarService;
import com.example.myapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "/api/busy/users/{ids}", method = RequestMethod.GET)
    public List<TimePeriod> getBusyForUsers(
            @PathVariable("ids") List<Long> ids,
            @RequestParam("start") String start,
            @RequestParam("end") String end) {
        List<TimePeriod> events = getBusyTimePeriods(ids, start, end);

        return TimePeriod.mergeOverlappingTimePeriods(events);
    }

    private List<TimePeriod> getBusyTimePeriods(List<Long> ids, String start, String end) {
        List<TimePeriod> events = new ArrayList<>();
        for (Long id : ids) {
            User user = userService.findUserById(id);
            String accessToken = user.getAccessToken();
            String refreshToken = user.getRefreshToken();

            List<TimePeriod> busyTime = googleCalendarService.getFreeBusy(accessToken, refreshToken, id, start, end);
            events.addAll(busyTime);
        }
        return events;
    }

    @RequestMapping(value = "/api/free/users/{ids}", method = RequestMethod.GET)
    public List<TimePeriod> getFreeForUsers(
            @PathVariable("ids") List<Long> ids,
            @RequestParam("start") String start,
            @RequestParam("end") String end) {
        List<TimePeriod> events = TimePeriod.mergeOverlappingTimePeriods(getBusyTimePeriods(ids, start, end));

        return TimePeriod.findFreeTimes(events, start, end);
    }

    @GetMapping("/api/events/users/{ids}")
    public List<List<com.google.api.services.calendar.model.Event>> getEventsForUsers(@PathVariable("ids") List<Long> ids) throws Exception {
        List<List<com.google.api.services.calendar.model.Event>> events = new ArrayList<>();
        for (Long id : ids) {
            User user = userService.findUserById(id);
            String accessToken = user.getAccessToken();
            String refreshToken = user.getRefreshToken();
            events.add(googleCalendarService.getEvents(accessToken, refreshToken, id));
        }

        return events;
    }
}
