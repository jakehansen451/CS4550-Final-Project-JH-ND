package com.example.myapp.models;

import java.util.ArrayList;
import java.util.List;

public class Student extends User {
  private final ArrayList<Course> coursesEnrolled;

  public Student(List<Course> coursesEnrolled) {
    this.coursesEnrolled = new ArrayList<>();
    this.coursesEnrolled.addAll(coursesEnrolled);
  }

  public List<Course> getCoursesEnrolled() {
    return coursesEnrolled;
  }

  public void setCoursesEnrolled(List<Course> coursesEnrolled) {
    this.coursesEnrolled.clear();
    this.coursesEnrolled.addAll(coursesEnrolled);
  }
}
