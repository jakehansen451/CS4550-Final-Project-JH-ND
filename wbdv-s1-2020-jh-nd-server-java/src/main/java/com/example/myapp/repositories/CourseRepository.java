package com.example.myapp.repositories;


import com.example.myapp.models.course.Course;
import com.example.myapp.models.people.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends CrudRepository<Course, Long> {
    @Query("SELECT course FROM Course course")
    List<Course> findAllCourses();

    @Query("SELECT course FROM Course course  WHERE course.id=:course_id")
    Course findCourse(@Param("course_id") Long courseId);


    @Query("SELECT course.tutors FROM Course course WHERE course.id=:course_id")
    List<User> findTutorsByCourseId(@Param("course_id") Long courseId);

    @Query("SELECT course.students FROM Course course WHERE course.id=:course_id")
    List<User> findStudentsByCourseId(@Param("course_id") Long courseId);

    @Query("SELECT course from Course course where course.admin.id=:user_id")
    List<Course> findCoursesTaughtByUser(@Param("user_id")Long userId);

}
