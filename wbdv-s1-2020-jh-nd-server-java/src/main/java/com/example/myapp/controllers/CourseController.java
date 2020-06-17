package com.example.myapp.controllers;


import com.example.myapp.models.course.Course;
import com.example.myapp.models.people.User;
import com.example.myapp.services.CourseService;
import com.example.myapp.services.UserService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class CourseController {
    @Autowired
    private CourseService courseService;
    @Autowired
    private UserService userService;

    @GetMapping("/api/courses")
    public List<Course> findAllCourses() {
        return courseService.findAllCourses();
    }

    /*@GetMapping("/api/courses/{courseId}/events")
    public List<Course> findEventsForCourse(@PathVariable("courseId") Long courseId) {

        return courseService.findEventsByCourseId(courseId);
    }*/

    @GetMapping("api/courses/{courseId}")
    public Course findCourseById(@PathVariable("courseId") Long courseId) {
        return courseService.findCourseById(courseId);
    }

    @PostMapping("api/courses")
    public Course createCourse(@RequestBody Map<String, String> payload) {
        Course newCourse = new Course(payload.get("title"));
        User admin;
        try {
            admin = userService.findUserById(Long.parseLong(payload.get("adminId")));
        } catch (NumberFormatException nfe) {
            throw new IllegalArgumentException();
        }
        if (admin == null) {
            throw new NotFoundException();
        }
        newCourse.setAdmin(admin);
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

    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Not found")
    private class NotFoundException extends RuntimeException {}
}
