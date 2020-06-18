package com.example.myapp.services;


import com.example.myapp.models.calendar.Event;
import com.example.myapp.models.course.Course;
import com.example.myapp.models.people.User;
import com.example.myapp.repositories.CourseRepository;
import com.example.myapp.repositories.EventRepository;
import com.example.myapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;


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


    public Course addStudentToCourse(Long courseId, Long studentId) throws Exception {
        Course course = courseRepository.findCourse(courseId);
        User student = userRepository.findUserById(studentId);

        if (course == null || student == null) {
            throw new Exception();
        }

        course.getStudents().add(student);
        student.getStudentInCourses().add(course);

        return course;

    }

    public Course addTutorToCourse(Long courseId, Long tutorId) throws Exception {
        Course course = courseRepository.findById(courseId).orElse(null);
        User tutor = userRepository.findUserById(tutorId);

        if (course == null || tutor == null) {
            throw new Exception();
        }


        return course;

    }

    public Event addEventToCourse(Long courseId, Event event) throws Exception {
        Course course = courseRepository.findById(courseId).orElse(null);

        if (course == null || event == null) {
            throw new Exception();
        }

        event.setCourse(course);
        eventRepository.save(event);

        return event;

    }

    public List<User> getStudentsInCourse(Long courseId) throws Exception {
        Course course = courseRepository.findById(courseId).orElse(null);

        if (course == null) {
            throw new Exception();
        }

        return courseRepository.findStudentsByCourseId(courseId);
    }

    public Set<User> getTutorsInCourse(Long courseId) throws Exception {
        Course course = courseRepository.findById(courseId).orElse(null);


        if (course == null) {
            throw new Exception();
        }

        return course.getTutors();
    }

    public List<Course> findCoursesTaughtByUser(Long userId) {
        return courseRepository.findCoursesTaughtByUser(userId);
    }

    public List<Course> findCoursesTutoredByUser(Long userId) {
        return userRepository.findCoursesTutoredByUser(userId);
    }

    public List<Course> findCoursesEnrolledByUser(Long userId) {
        return userRepository.findCoursesEnrolledByUser(userId);

    }
}
