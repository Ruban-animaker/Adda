
(function(){

  var config = {
    apiKey: "AIzaSyD3ucfrdZAXNrMEF-sHRO0WX7JhqRivCZY",
    authDomain: "animaker-e60e2.firebaseapp.com",
    databaseURL: "https://animaker-e60e2.firebaseio.com",
    projectId: "animaker-e60e2",
    storageBucket: "animaker-e60e2.appspot.com",
    messagingSenderId: "951293181827"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//Create user

const signUp = document.getElementById('signUp');
const login = document.getElementById('login');
const user_email = document.getElementById('user_email');
const user_password = document.getElementById('user_password');
const googleSignIn = document.getElementById('googleSignIn');
const forgotPassword = document.getElementById('forgotPasswordBtn');
const forgotPasswordEmail = document.getElementById('forgotPasswordEmail')

  signUp.addEventListener('click', e => {

    const email = user_email.value;
    const password = user_password.value;

		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;

		console.log(errorMessage);
		// ...
		});
	})

//Login User

login.addEventListener('click', e => {


  const email = user_email.value;
  const password = user_password.value;

  if(email == "" && password == "")
  {
  var options = {
    style: 'error',
    title: 'Missing info!',
    message: 'Please fill in the e-mail and password',
    timeout: 3000,
    close_button: true
  };
  var n = new notify(options);
  n.show();
  }
  else if(email == "" && password != ""){
    var options = {
      style: 'error',
      title: 'Missing info!',
      message: 'Please fill in the e-mail address',
      timeout: 3000,
      close_button: true
    };
    var n = new notify(options);
    n.show();
  }
  else if(email != "" && password == ""){
    var options = {
      style: 'error',
      title: 'Missing info!',
      message: 'Please fill in the password',
      timeout: 3000,
      close_button: true
    };
    var n = new notify(options);
    n.show();
  }
  else{

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;

    console.log(errorMessage)

		if(errorMessage=="There is no user record corresponding to this identifier. The user may have been deleted."){
      var options = {
        style: 'error',
        title: 'Unable to locate user!',
        message: 'Please sign up if you are a new user',
        timeout: 3000,
        close_button: true
      };
      var n = new notify(options);
      n.show();
    }
    else if(errorMessage=="The password is invalid or the user does not have a password."){
      var options = {
        style: 'error',
        title: 'Password Incorrect!',
        message: 'Please type in the correct password or use forgot password option',
        timeout: 5000,
        close_button: true
      };
      var n = new notify(options);
      n.show();
    }
    else if(errorMessage=="The email address is badly formatted."){
      var options = {
        style: 'error',
        title: 'Incorrect email!',
        message: 'Please enter a valid e-mail address',
        timeout: 5000,
        close_button: true
      };
      var n = new notify(options);
      n.show();
    }

 });
}
});

//Auth State Change Listener

	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
		window.open("Adda.htm",'_self');
		console.log(user);
    // ...
  } else {
		console.log("Not logged in!")
    // ...
  }
});

googleSignIn.addEventListener('click', e => {
var provider = new firebase.auth.GoogleAuthProvider();
alert("Google");

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user);
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  console.log(errorMessage);
});
});

forgotPasswordBtn.addEventListener('click', e => {
  const email = forgotPasswordEmail.value;
  firebase.auth().sendPasswordResetEmail(email).then(function(){
    alert("Link sent!")
  }).catch(function(error){
    var errorMessage = error.message;
    console.log(errorMessage);
    if(errorMessage=="The email address is badly formatted."){
      var options = {
        style: 'error',
        title: 'Incorrect email!',
        message: 'Please enter a valid e-mail address',
        timeout: 5000,
        close_button: true
      };
      var n = new notify(options);
      n.show();
    }
    else if(errorMessage=="There is no user record corresponding to this identifier. The user may have been deleted."){
      var options = {
        style: 'error',
        title: 'Unable to locate user!',
        message: 'Please sign up if you are a new user',
        timeout: 3000,
        close_button: true
      };
      var n = new notify(options);
      n.show();
    }
  })
});


}());
