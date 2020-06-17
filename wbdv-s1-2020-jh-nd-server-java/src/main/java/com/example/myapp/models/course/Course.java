package com.example.myapp.models.course;


import com.example.myapp.models.calendar.Event;
import com.example.myapp.models.people.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("_id")
    private Long id;

    private String title;
    private String abbreviation;
    private Integer number;

    public Course(String title) {
        this.title = title;
    }


    @ManyToMany(mappedBy = "studentInCourses")
    @JsonIgnore
    @ToString.Exclude
    private Set<User> students;

    @ManyToMany(mappedBy = "tutorInCourses")
    @JsonIgnore
    @ToString.Exclude
    private Set<User> tutors;

    @ManyToOne
    @JoinColumn(name="users_id", nullable=false)
    private User admin;

    @OneToMany(mappedBy="course")
    @JsonIgnore
    @ToString.Exclude
    private List<Event> events;
}
