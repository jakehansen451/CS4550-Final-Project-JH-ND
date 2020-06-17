package com.example.myapp.services;


import com.example.myapp.models.calendar.Event;
import com.example.myapp.models.course.Course;
import com.example.myapp.repositories.CourseRepository;
import com.example.myapp.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EventRepository eventRepository;


    public Course createCourse(Course newCourse) {
        return courseRepository.save(newCourse);
    }

    public Course findCourseById(Long courseId) {
        return courseRepository.findById(courseId).orElse(null);
    }

    public void deleteCourseById(Long courseId) {
        courseRepository.deleteById(courseId);
    }


    public List<Course> findAllCourses() {
        return courseRepository.findAllCourses();
    }

    public Course updateCourse(Long courseId, Course updatedCourse) {
        // TODO: check if this is the best way to update
        Course course = findCourseById(courseId);
        course.setTitle(updatedCourse.getTitle());
        courseRepository.save(course);

        return course;
    }

    public List<Event> findEventsByCourseId(Long courseId) {
        return eventRepository.findEventsByCourseId(courseId);
    }
}
