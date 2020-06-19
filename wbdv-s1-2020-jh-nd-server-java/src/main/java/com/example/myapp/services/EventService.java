package com.example.myapp.services;

import com.example.myapp.models.calendar.Event;
import com.example.myapp.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public void deleteEventById(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    public List<Event> getAllEvents() {
        return (List<Event>) eventRepository.findAll();
    }

    public Event createNewEvent(Event newEvent) {
        return eventRepository.save(newEvent);
    }

    public Event updateEvent(Long eventId, Event updatedEvent) {
        updatedEvent.setId(eventId);
        return eventRepository.save(updatedEvent);
    }
}
