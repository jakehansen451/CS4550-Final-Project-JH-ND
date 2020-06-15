package com.example.myapp.models;

public class Event {
  private User host;
  private TimeBlock time;
  private String link;

  public Event(User host, TimeBlock time, Course course) {
    this.host = host;
    this.time = time;
    this.course = course;
  }

  private Course course;

  public User getHost() {
    return host;
  }

  public void setHost(User host) {
    this.host = host;
  }

  public TimeBlock getTime() {
    return time;
  }

  public void setTime(TimeBlock time) {
    this.time = time;
  }

  public Course getCourse() {
    return course;
  }

  public void setCourse(Course course) {
    this.course = course;
  }

  public String getLink() {
    return link;
  }

  public void setLink(String link) {
    this.link = link;
  }
}
