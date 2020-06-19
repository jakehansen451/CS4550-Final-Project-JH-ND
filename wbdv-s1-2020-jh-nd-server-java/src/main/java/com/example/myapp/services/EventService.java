package com.example.myapp.services;

import com.example.myapp.models.calendar.Event;
import com.example.myapp.models.people.User;
import com.example.myapp.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private GoogleCalendarService googleCalendarService;

    public void deleteEventById(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    public List<Event> getAllEvents() {
        return (List<Event>) eventRepository.findAll();
    }

    public Event createNewEvent(Event newEvent) throws Exception {
        Set<User> users = newEvent.getParticipants();
        if (users == null) {
            users = new HashSet<>();
        }

        com.google.api.services.calendar.model.Event googleEvent = googleCalendarService.addEvent(newEvent.getTitle(),
                newEvent.getStart(),
                newEvent.getEnd(),
                users.stream().map(User::getId).collect(Collectors.toList()),
                newEvent.getOrganizer().getId());

        newEvent.setGoogleEventId(googleEvent.getId());

        return eventRepository.save(newEvent);
    }

    public Event updateEvent(Long eventId, Event updatedEvent) throws Exception {
        Event event = eventRepository.findById(eventId).orElse(null);

        if (event == null) {
            throw new Exception("No event with given id exists so cannot update");
        }

        googleCalendarService.updateEvent(
                updatedEvent.getTitle(),
                updatedEvent.getStart(),
                updatedEvent.getEnd(),
                updatedEvent.getParticipants().stream().map(User::getId).collect(Collectors.toList()),
                updatedEvent.getOrganizer(),
                event.getGoogleEventId());

        event.setTitle(updatedEvent.getTitle());
        event.setOrganizer(updatedEvent.getOrganizer());
        event.setCourse(updatedEvent.getCourse());
        event.setStart(updatedEvent.getStart());
        event.setEnd(updatedEvent.getEnd());
        event.setParticipants(updatedEvent.getParticipants());

        return event;
    }
}
