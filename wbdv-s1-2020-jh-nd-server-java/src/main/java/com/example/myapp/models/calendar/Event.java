package com.example.myapp.models.calendar;

import com.example.myapp.models.course.Course;
import com.example.myapp.models.people.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "events")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("_id")
    private Long id;
    private String title;
    private String start;
    private String end;

    @ManyToMany(mappedBy = "participantInEvents")
    @JsonIgnore
    @ToString.Exclude
    private Set<User> participants;

    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    private User organizer;


    @ManyToOne
    @JoinColumn(name = "courses_events", nullable = false)
    private Course course;


    @PreRemove
    private void removeGroupsFromUsers() {
        for (User u : participants) {
            u.getParticipantInEvents().remove(this);
        }

        course.getEvents().remove(this);
        organizer.getOrganizerInEvents().remove(this);
    }


}
