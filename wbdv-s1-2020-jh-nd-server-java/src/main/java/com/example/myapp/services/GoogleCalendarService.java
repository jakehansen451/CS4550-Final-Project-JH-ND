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

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoogleCalendarService {

    public List<Event> getEvents(String token) throws IOException, GeneralSecurityException {
        Calendar calendar = getCalendar(token);
        DateTime now = new DateTime(System.currentTimeMillis());

        return calendar
                .events()
                .list("jv3df56voifmh5loq939g81cog@group.calendar.google.com")
                .setTimeMin(now)
                .setOrderBy("startTime")
                .setSingleEvents(true)
                .execute()
                .getItems();
    }

    public List<TimePeriod> getFreeBusy(String token) throws IOException, GeneralSecurityException {
        Calendar service = getCalendar(token);


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

    private Calendar getCalendar(String token) throws GeneralSecurityException, IOException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        final String APPLICATION_NAME = "TutorMe";
        final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

        return new Calendar.Builder(
                HTTP_TRANSPORT,
                JSON_FACTORY,
                OAuth2.getCredential(token))
                .setApplicationName(APPLICATION_NAME)
                .build();
    }
}
