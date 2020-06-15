package com.example.myapp.models;

import java.util.ArrayList;
import java.util.List;

public class Admin extends User {
  private final ArrayList<Course> coursesTaught;
  private final ArrayList<Event> officeHours;

  public Admin(List<Course> coursesTaught, List<Event> officeHours) {
    this.coursesTaught = new ArrayList<>();
    this.coursesTaught.addAll(coursesTaught);
    this.officeHours = new ArrayList<>();
    this.officeHours.addAll(officeHours);
  }

  public List<Course> getCoursesTaught() {
    return coursesTaught;
  }

  public void setCoursesTaught(List<Course> coursesTaught) {
    this.coursesTaught.clear();
    this.coursesTaught.addAll(coursesTaught);
  }

  public List<Event> getOfficeHours() {
    return officeHours;
  }

  public void setOfficeHours(ArrayList<Event> officeHours) {
    this.officeHours.clear();
    this.officeHours.addAll(officeHours);
  }
}
