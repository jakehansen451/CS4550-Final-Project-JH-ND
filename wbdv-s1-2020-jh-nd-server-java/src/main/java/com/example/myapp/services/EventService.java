package com.example.myapp.services;

import com.example.myapp.models.calendar.Event;
import com.example.myapp.models.people.User;
import com.example.myapp.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private GoogleCalendarService googleCalendarService;


    public int deleteEventById(Long eventId) {
        Optional<Event> maybeEvent = eventRepository.findById(eventId);

        if (maybeEvent.isPresent()) {
            Event event = maybeEvent.get();

            int deletingAtGoogleStatus = googleCalendarService.deleteEvent(event.getOrganizer(), event.getGoogleEventId());

            if (deletingAtGoogleStatus == 1) {
                eventRepository.deleteById(eventId);
                return 1;
            } else {
                return 0;
            }
        }

        return 0;
    }


    public List<Event> getAllEvents() {
        return (List<Event>) eventRepository.findAll();
    }

    public Event createNewEvent(Event newEvent) {

        com.google.api.services.calendar.model.Event googleEvent = googleCalendarService.addEvent(newEvent.getTitle(),
                newEvent.getStart(),
                newEvent.getEnd(),
                newEvent.getParticipants().stream().map(User::getId).collect(Collectors.toList()),
                newEvent.getOrganizer().getId());

        newEvent.setGoogleEventId(googleEvent.getId());

        return eventRepository.save(newEvent);
    }

    public Event findEventById(Long eventId) {
        return eventRepository.findById(eventId).orElse(null);
    }
}
