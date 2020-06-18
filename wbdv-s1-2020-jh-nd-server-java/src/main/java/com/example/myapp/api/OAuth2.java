package com.example.myapp.api;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.CalendarScopes;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Collections;


/**
 * Connects to Google API
 */
@Component
public class OAuth2 {
    private static final String TOKENS_DIRECTORY_PATH = "tokens/";
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";


    public static Credential authorize(String accessToken,
                                       String refreshToken,
                                       Long userId,
                                       HttpTransport transport,
                                       JsonFactory jsonFactory) throws IOException {

        // load client secrets
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(jsonFactory,
                new InputStreamReader(OAuth2.class.getResourceAsStream(CREDENTIALS_FILE_PATH)));

        // set up authorization code flow
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                transport, jsonFactory, clientSecrets,
                Collections.singleton(CalendarScopes.CALENDAR))
                .setDataStoreFactory(new FileDataStoreFactory(new File(TOKENS_DIRECTORY_PATH)))
                .build();

        // convert tokens to what google needs to create credentials
        TokenResponse tokenResponse = new TokenResponse();
        tokenResponse.setAccessToken(accessToken);
        tokenResponse.setRefreshToken(refreshToken);
        tokenResponse.setExpiresInSeconds(59L);

        // authorize
        return flow.createAndStoreCredential(tokenResponse, userId.toString());
    }
}
