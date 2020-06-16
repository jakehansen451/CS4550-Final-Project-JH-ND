package com.example.myapp.models.people;

import com.example.myapp.models.calendar.Event;
import com.example.myapp.models.course.Course;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("_id")
    private Long id;
    @Column(unique = true)
    private String username;
    private String firstName;
    private String lastName;
    private String password;
    private String email;

    @Enumerated(EnumType.ORDINAL)
    private Role role;

    @ManyToMany
    @JsonIgnore
    @ToString.Exclude
    @JoinTable(
            name = "course_tutors",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "courses_id"))
    private Set<Course> tutorInCourses;

    @ManyToMany
    @JsonIgnore
    @ToString.Exclude
    @JoinTable(
            name = "course_students",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "courses_id"))
    private Set<Course> studentInCourses;

    @OneToMany(mappedBy="admin")
    @JsonIgnore
    @ToString.Exclude
    private Set<Course> adminInCourses;

    @ManyToMany
    @JsonIgnore
    @ToString.Exclude
    @JoinTable(
            name = "event_participants",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "events_id"))
    private Set<Event> participantInEvents;

    @OneToMany(mappedBy="organizer")
    @JsonIgnore
    @ToString.Exclude
    private Set<Event> organizerInEvents;
}
