package com.example.myapp.api;

import com.google.api.client.auth.oauth2.BearerToken;
import com.google.api.client.auth.oauth2.Credential;
import org.springframework.stereotype.Component;


/**
 * Connects to Google API
 */
@Component
public class OAuth2 {
    public static Credential getCredential(String accessToken) {
        return new Credential(BearerToken.authorizationHeaderAccessMethod()).setAccessToken(accessToken);
    }
}
