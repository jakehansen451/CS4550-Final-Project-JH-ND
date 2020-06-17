package com.example.myapp.controllers;


import com.example.myapp.models.calendar.Event;
import com.example.myapp.models.course.Course;
import com.example.myapp.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping("/api/courses")
    public List<Course> findAllCourses() {
        return courseService.findAllCourses();
    }

    @GetMapping("/api/courses/{courseId}/events")
    public List<Event> findEventsForCourse(@PathVariable("courseId") Long courseId) {
        return courseService.findEventsByCourseId(courseId);
    }

    @GetMapping("api/courses/{courseId}")
    public Course findCourseById(@PathVariable("courseId") Long courseId) {
        return courseService.findCourseById(courseId);
    }

    @PostMapping("api/courses")
    public Course createCourse(@RequestBody Course newCourse) {
        return courseService.createCourse(newCourse);
    }

    @PutMapping("api/courses/{courseId}")
    public Course updateCourse(@PathVariable("courseId") Long courseId, @RequestBody Course updatedCourse) {
        return courseService.updateCourse(courseId, updatedCourse);
    }

    @DeleteMapping("api/courses/{courseId}")
    public void deleteCourseById(@PathVariable("courseId") Long courseId) {
        courseService.deleteCourseById(courseId);
    }
}
