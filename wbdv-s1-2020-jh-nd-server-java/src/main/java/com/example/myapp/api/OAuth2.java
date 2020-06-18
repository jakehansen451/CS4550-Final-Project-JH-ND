package com.example.myapp.api;

import com.google.api.client.auth.oauth2.BearerToken;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.CalendarScopes;

import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


/**
 * Connects to Google API
 */
@Component
public class OAuth2 {
    private static final String APPLICATION_NAME = "Google Calendar API Java Quickstart";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens/";

    /**
     * Global instance of the scopes required by this quickstart.
     * If modifying these scopes, delete your previously saved tokens/ folder.
     */
    private static final List<String> SCOPES = Collections.singletonList(CalendarScopes.CALENDAR_READONLY);
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";

    public static Credential getCredential(String accessToken) throws IOException {
        Credential credential = new Credential(BearerToken.authorizationHeaderAccessMethod()).setAccessToken(accessToken);
//        if (credential != null) {
//            System.out.println("request");
//            credential.setAccessToken(accessToken);
//            HttpResponse<String> response = Unirest.post("https://localhowst/oauth/token")
//                    .header("content-type", "application/x-www-form-urlencoded")
//                    .body("grant_type=authorization_code&client_id=46098970829-859lp0f58tvg2o77h1g8iclvgpflf17v.apps.googleusercontent.com&client_secret=" +
//                            "0sN5dhbDPgF7ePLlZFvNWBKL" +
//                            "&code=" +
//                            "YOUR_AUTHORIZATION_CODE" +
//                            "&redirect_uri=%24%7Baccount.callback%7D")
//                    .asString();
//
//        } else {
//            System.out.println("Credential is null");
//        }

        return credential;
    }

//    private static void saveToFile(String str, String filename) throws IOException {
//        Path path = Paths.get(TOKENS_DIRECTORY_PATH  + filename + ".txt");
//        byte[] strToBytes = str.getBytes();
//
//        Files.write(path, strToBytes);
//    }

    public static String getAuthorizationCodeInstance(String code, String userId) throws IOException, GeneralSecurityException {

        // Load client secrets.
        InputStream in = OAuth2.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();

        //(new GoogleAuthorizationCodeTokenRequest(this.getTransport(), this.getJsonFactory(), this.getTokenServerEncodedUrl(), "", "", authorizationCode, ""))
        //
        // .setClientAuthentication(this.getClientAuthentication()).setRequestInitializer(this.getRequestInitializer()).setScopes(this.getScopes());
        //    }

//        TokenResponse response = flow.newTokenRequest(code).setRedirectUri("http://localhost:3000/").execute();
////        System.out.println(flow.getClientAuthentication());
////        System.out.println(flow.getRequestInitializer());
////        System.out.println(flow.getScopes());
//
//        Credential credential = flow.createAndStoreCredential(response, userId);

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("https://oauth2.googleapis.com/token");

        List<NameValuePair> params = new ArrayList<NameValuePair>();
        params.add(new BasicNameValuePair("client_id", "46098970829-859lp0f58tvg2o77h1g8iclvgpflf17v.apps.googleusercontent.com"));
        params.add(new BasicNameValuePair("client_secret", "0sN5dhbDPgF7ePLlZFvNWBKL"));
        params.add(new BasicNameValuePair("grant_type", "refresh_token"));
        params.add(new BasicNameValuePair("refresh_token", code));
       // httpPost.setParams();
        httpPost.setHeader("Content-type", "application/x-www-form-urlencoded");

        CloseableHttpResponse response = client.execute(httpPost);
        System.out.println(response);
        client.close();
        return "s";
    }


}
