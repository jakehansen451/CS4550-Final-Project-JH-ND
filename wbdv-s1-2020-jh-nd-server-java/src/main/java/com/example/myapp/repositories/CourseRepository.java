package com.example.myapp.repositories;


import com.example.myapp.models.course.Course;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseRepository extends CrudRepository<Course, Long> {
    @Query("SELECT course FROM Course course")
    List<Course> findAllCourses();
}
