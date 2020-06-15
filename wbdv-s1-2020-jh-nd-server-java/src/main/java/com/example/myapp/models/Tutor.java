package com.example.myapp.models;

import java.util.ArrayList;
import java.util.List;

public class Tutor extends User {
  private ArrayList<Course> coursesTutor;
  private ArrayList<Course> coursesStudent;
  private ArrayList<Event> officeHours;

  public Tutor(List<Course> coursesTutor,
      List<Course> coursesStudent, List<Event> officeHours) {
    this.coursesTutor = new ArrayList<>();
    this.coursesTutor.addAll(coursesTutor);
    this.coursesStudent = new ArrayList<>();
    this.coursesStudent.addAll(coursesStudent);
    this.officeHours = new ArrayList<>();
    this.officeHours.addAll(officeHours);
  }

  public List<Course> getCoursesTutor() {
    return coursesTutor;
  }

  public void setCoursesTutor(List<Course> coursesTutor) {
    this.coursesTutor.clear();
    this.coursesTutor.addAll(coursesTutor);
  }

  public List<Course> getCoursesStudent() {
    return coursesStudent;
  }

  public void setCoursesStudent(List<Course> coursesStudent) {
    this.coursesStudent.clear();
    this.coursesStudent.addAll(coursesStudent);
  }

  public List<Event> getOfficeHours() {
    return officeHours;
  }

  public void setOfficeHours(List<Event> officeHours) {
    this.officeHours.clear();
    this.officeHours.addAll(officeHours);
  }
}
