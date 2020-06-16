package com.example.myapp.model.course;


import com.example.myapp.model.people.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String abbreviation;
    private Integer number;


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
}
