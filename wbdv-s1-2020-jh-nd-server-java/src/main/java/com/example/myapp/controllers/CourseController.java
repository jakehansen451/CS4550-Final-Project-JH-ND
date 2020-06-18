package com.example.myapp.controllers;


import com.example.myapp.models.calendar.Event;
import com.example.myapp.models.course.Course;
import com.example.myapp.models.people.User;
import com.example.myapp.services.CourseService;
import com.example.myapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/api/courses/{courseId}/events")
    public List<Event> findEventsForCourse(@PathVariable("courseId") Long courseId) {
        return courseService.findEventsByCourseId(courseId);
    }

    @GetMapping("/api/courses/{courseId}")
    public Course findCourseById(@PathVariable("courseId") Long courseId) {
        return courseService.findCourseById(courseId);
    }

    @PostMapping("/api/courses")
    public Course createCourse(@RequestBody Course newCourse) {
        return courseService.createCourse(newCourse);
    }


    @PutMapping("/api/courses/{courseId}")
    public Course updateCourse(@PathVariable("courseId") Long courseId, @RequestBody Course updatedCourse) {
        return courseService.updateCourse(courseId, updatedCourse);
    }

    @DeleteMapping("/api/courses/{courseId}")
    public void deleteCourseById(@PathVariable("courseId") Long courseId) {
        courseService.deleteCourseById(courseId);
    }


    @PostMapping("/api/courses/{courseId}/students")
    public Course addStudent(@PathVariable("courseId") Long courseId, @RequestBody User user) {
        User student = userService.findUserById(user.getId());
        Course course = courseService.findCourseById(courseId);

        student.getStudentInCourses().add(course);
        userService.updateUser(user.getId(), student);

        return course;
    }

    @PostMapping("/api/courses/{courseId}/tutors")
    public Course addTutor(@PathVariable("courseId") Long courseId, @RequestBody User user) {
        User tutor = userService.findUserById(user.getId());
        Course course = courseService.findCourseById(courseId);

        tutor.getTutorInCourses().add(course);
        userService.updateUser(user.getId(), tutor);

        return course;
    }

    @PostMapping("/api/courses/{courseId}/events/")
    public Event addEventToCourse(
            @PathVariable("courseId") Long courseId,
            @RequestBody Event event) throws Exception {
        return courseService.addEventToCourse(courseId, event);
    }
}
