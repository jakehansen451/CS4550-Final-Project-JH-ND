package com.example.myapp.services;

import com.example.myapp.api.OAuth2;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoogleCalendarService {

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
