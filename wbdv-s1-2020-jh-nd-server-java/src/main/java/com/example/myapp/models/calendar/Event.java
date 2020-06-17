package com.example.myapp.models.calendar;

import com.example.myapp.models.course.Course;
import com.example.myapp.models.people.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="events")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String startTime;
    private String endTime;

    @ManyToMany(mappedBy = "participantInEvents")
    @JsonIgnore
    @ToString.Exclude
    private Set<User> participants;

    @ManyToOne
    @JoinColumn(name="users_id", nullable=false)
    private User organizer;


    @ManyToOne
    @JoinColumn(name="courses_events", nullable=false)
    private Course course;
}