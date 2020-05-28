const REDIRECT_URI = 'https://google.com';
const SCOPE = 'https://www.googleapis.com/auth/calendar';
const CLIENT_ID = '46098970829-859lp0f58tvg2o77h1g8iclvgpflf17v.apps.googleusercontent.com';

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
const oauth2SignIn = () => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';


    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    let form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    let params = {'client_id': CLIENT_ID,
        'redirect_uri': REDIRECT_URI,
        'response_type': 'token',
        'scope': SCOPE,
        'include_granted_scopes': 'true',
        'state': 'pass-through value'};

    // Add form parameters as hidden input values.
    for (let p in params) {
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
};

export default {
    oauth2SignIn
}
