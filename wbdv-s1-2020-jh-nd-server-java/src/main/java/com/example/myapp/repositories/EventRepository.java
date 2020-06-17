package com.example.myapp.repositories;

import com.example.myapp.models.calendar.Event;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends CrudRepository<Event, Long> {
    //@Query("SELECT event FROM Event event WHERE event.courses_events=:courseId")
    //List<Event> findEventsByCourseId(@Param("course_id") Long courseId);
}
