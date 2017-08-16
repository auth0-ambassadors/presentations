window.addEventListener('load', function() {

  var apiUrl = 'http://localhost:3001/api';

  var webAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_CALLBACK_URL,
    audience: AUTH0_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile read:messages',
  });

  var loginBtn = document.getElementById('btn-login');
  var logoutBtn = document.getElementById('btn-logout');

  var pingToken = document.getElementById('btn-ping-token');
  var pingPublic = document.getElementById('btn-ping-public');
  var pingNuclear = document.getElementById('btn-ping-nuclear');

  var pingMessage = document.getElementById('ping-message');

  pingToken.addEventListener('click', function() {
    callAPI('/token', false);
  });

  pingPublic.addEventListener('click', function() {
    callAPI('/public', false);
  });

  pingNuclear.addEventListener('click', function(){
    callAPI('/nuclear-launch-code', true);
  })

  loginBtn.addEventListener('click', login);
  logoutBtn.addEventListener('click', logout);

  function login() {
    webAuth.authorize();
  }

   function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        loginBtn.style.display = 'none';
      } else if (err) {
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }
      displayButtons();
    });
  }

  function setSession(authResult) {
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    displayButtons();
  }

  function isAuthenticated() {
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function displayButtons() {
    var loginStatus = document.querySelector('.container h4');
    if (isAuthenticated()) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
    } else {
      loginBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
    }
  }

  handleAuthentication();

  function callAPI(endpoint, secured) {
    var url = apiUrl + endpoint;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    if (secured) {
      xhr.setRequestHeader(
        'Authorization',
        'Bearer ' + localStorage.getItem('access_token')
      );
    }
    xhr.onload = function() {
      if (xhr.status == 200) {
        // update message
        document.querySelector('#ping-message').innerHTML = JSON.parse(
          xhr.responseText
        ).message;


      } else {
        alert('Request failed: ' + xhr.statusText);
      }
    };
    xhr.send();
  }

  displayButtons();
});
