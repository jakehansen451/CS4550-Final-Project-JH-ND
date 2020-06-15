package com.example.myapp.models;

import java.util.ArrayList;
import java.util.List;

public class Course {

  private final ArrayList<Event> officeHours;
  private final ArrayList<Admin> admin;
  private final ArrayList<Tutor> tutors;
  private final ArrayList<Student> students;

  public Course(List<Event> officeHours, List<Admin> admin, List<Tutor> tutors,
      List<Student> students) {
    this.officeHours = new ArrayList<>();
    this.officeHours.addAll(officeHours);
    this.admin = new ArrayList<>();
    this.admin.addAll(admin);
    this.tutors = new ArrayList<>();
    this.tutors.addAll(tutors);
    this.students = new ArrayList<>();
    this.students.addAll(students);
  }

  public ArrayList<Event> getOfficeHours() {
    return officeHours;
  }

  public ArrayList<Admin> getAdmin() {
    return admin;
  }

  public ArrayList<Tutor> getTutors() {
    return tutors;
  }

  public ArrayList<Student> getStudents() {
    return students;
  }
}
