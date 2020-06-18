package com.example.myapp.models.course;


import com.example.myapp.models.calendar.Event;
import com.example.myapp.models.people.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String abbreviation;
    private Integer number;


    @ManyToMany(mappedBy = "studentInCourses", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<User> students = new HashSet<>();

    @ManyToMany(mappedBy = "tutorInCourses", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<User> tutors;

    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    @EqualsAndHashCode.Exclude
    private User admin;

    @OneToMany(mappedBy = "course")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Event> events;

    @PreRemove
    private void removeGroupsFromUsers() {
        for (User u : students) {
            u.getStudentInCourses().remove(this);
        }

        for (User u : tutors) {
            u.getTutorInCourses().remove(this);
        }

        admin.getAdminInCourses().remove(this);
    }


}
