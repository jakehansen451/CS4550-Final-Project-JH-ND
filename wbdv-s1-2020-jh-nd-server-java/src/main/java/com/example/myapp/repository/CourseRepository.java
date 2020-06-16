package com.example.myapp.repository;


import com.example.myapp.model.course.Course;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseRepository extends CrudRepository<Course, Long> {
    @Query("SELECT course FROM Course course")
    List<Course> findAllCourses();
}
