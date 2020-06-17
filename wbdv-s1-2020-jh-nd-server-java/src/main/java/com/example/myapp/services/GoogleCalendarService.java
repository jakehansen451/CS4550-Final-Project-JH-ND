package com.example.myapp.services;

import com.example.myapp.api.OAuth2;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

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
