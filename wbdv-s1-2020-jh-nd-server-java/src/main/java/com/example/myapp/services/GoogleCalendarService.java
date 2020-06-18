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

    public List<TimePeriod> getFreeBusy(String accessToken, String refreshToken, Long userId) throws Exception {
        Calendar service = getCalendar(accessToken, refreshToken, userId);


        FreeBusyRequest request = new FreeBusyRequest();
        request.setTimeMin(new DateTime("2020-06-17T04:10:11.711Z"));
        request.setTimeMax(new DateTime("2020-06-24T04:10:11.711Z"));

        // Build request items
        List<FreeBusyRequestItem> requestItems = new ArrayList<>();
        FreeBusyRequestItem item = new FreeBusyRequestItem();
        item.setId("primary");
        requestItems.add(item);
        request.setItems(requestItems);

        FreeBusyResponse response = service.freebusy().query(request).execute();
        return response.getCalendars().get("primary").getBusy();


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
