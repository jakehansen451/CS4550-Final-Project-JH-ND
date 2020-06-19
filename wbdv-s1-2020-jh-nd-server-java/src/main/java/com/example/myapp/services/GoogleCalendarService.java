package com.example.myapp.services;

import com.example.myapp.api.OAuth2;
import com.example.myapp.models.people.User;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoogleCalendarService {

    @Autowired
    UserService userService;

    public List<Event> getEvents(String accessToken, String refreshToken, Long userId) throws Exception {
        Calendar calendar = getCalendar(accessToken, refreshToken, userId);
        DateTime now = new DateTime(System.currentTimeMillis());

        return calendar
                .events()
                .list("primary")
                .setTimeMin(now)
                .setMaxResults(10)
                .setOrderBy("startTime")
                .setSingleEvents(true)
                .execute()
                .getItems();
    }



    public Event addEvent(String title, String start, String end, List<Long> attendeesIds, Long organizerId) {
        Event event = createEventFrom(title, start, end, attendeesIds);
        User organizer = userService.findUserById(organizerId);
        try {
            Calendar calendar = getCalendar(organizer.getAccessToken(), organizer.getRefreshToken(), organizerId);
            return calendar.events().insert("primary", event).execute();
        } catch (Exception e) {
            return createEventFrom(e.getMessage(), java.util.Calendar.getInstance().getTime().toString(), java.util.Calendar.getInstance().getTime().toString(), new ArrayList<>());
        }

    }

    private Event createEventFrom(String title, String start, String end, List<Long> attendeesIds) {
        Event event = new Event();
        event.setSummary(title);
        DateTime startDateTime = new DateTime(start);
        EventDateTime eventStart = new EventDateTime().setDateTime(startDateTime);
        event.setStart(eventStart);

        DateTime endDateTime = new DateTime(end);
        EventDateTime eventEnd = new EventDateTime().setDateTime(endDateTime);
        event.setEnd(eventEnd);

        event.setAttendees(
                attendeesIds.stream()
                        .map(id -> new EventAttendee().setEmail(userService.findUserById(id).getEmail())).collect(Collectors.toList()));
        return event;
    }


    public List<com.example.myapp.models.calendar.TimePeriod> getFreeBusy(String accessToken, String refreshToken, Long userId, String start, String end) {
        try {
            Calendar service = getCalendar(accessToken, refreshToken, userId);
            FreeBusyRequest request = new FreeBusyRequest();
            java.util.Calendar calendar = java.util.Calendar.getInstance();
            DateTime now = new DateTime(calendar.getTime());
            DateTime startDateTime = new DateTime(start);
            if (startDateTime.getValue() < now.getValue()) {
                startDateTime = now;
            }
            request.setTimeMin(startDateTime);
            request.setTimeMax(new DateTime(end));

            // Build request items
            List<FreeBusyRequestItem> requestItems = new ArrayList<>();
            FreeBusyRequestItem item = new FreeBusyRequestItem();
            item.setId("primary");
            requestItems.add(item);
            request.setItems(requestItems);

            FreeBusyResponse response = service.freebusy().query(request).execute();
            return response.getCalendars().get("primary").getBusy().stream().map(timePeriod -> {
                String startString = timePeriod.getStart().toString();
                String endSting = timePeriod.getEnd().toString();
                Long startLong = timePeriod.getStart().getValue();
                Long endLong = timePeriod.getEnd().getValue();

                return new com.example.myapp.models.calendar.TimePeriod(startString, endSting, startLong, endLong);
            }).collect(Collectors.toList());

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ArrayList<>();
    }

    private Calendar getCalendar(String accessToken, String refreshToken, Long userId) throws Exception {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        final String APPLICATION_NAME = "TutorMe";
        final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

        return new Calendar.Builder(
                HTTP_TRANSPORT,
                JSON_FACTORY,
                OAuth2.authorize(accessToken, refreshToken, userId, HTTP_TRANSPORT, JSON_FACTORY))
                .setApplicationName(APPLICATION_NAME)
                .build();
    }


}
