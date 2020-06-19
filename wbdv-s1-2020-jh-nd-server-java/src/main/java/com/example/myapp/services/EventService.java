package com.example.myapp.services;

import com.example.myapp.models.calendar.Event;
import com.example.myapp.models.people.User;
import com.example.myapp.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Event createNewEvent(Event newEvent) {

        googleCalendarService.addEvent(newEvent.getTitle(),
                newEvent.getStart(),
                newEvent.getEnd(),
                newEvent.getParticipants().stream().map(User::getId).collect(Collectors.toList()),
                newEvent.getOrganizer().getId());



        return eventRepository.save(newEvent);
    }

}
