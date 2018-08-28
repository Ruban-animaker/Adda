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
var uid;

const HiUsername = document.getElementById('HiUsername');
const growthTask = document.getElementById('growthTask');
const growthComments = document.getElementById('growthComments');
const saveGrowth = document.getElementById('saveGrowth');

document.addEventListener('DOMContentLoaded', e =>{
setTimeout(function(){
var user = firebase.auth().currentUser;

if (user != null) {

  uid=firebase.auth().currentUser.uid;



  database.ref('/users/' +uid+'/profile').on('value',function(snapshot) {
  var displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
  console.log(displayName)
  if(displayName=="Anonymous"){
    var email = user.email;
    email = email.substring(0, email.indexOf('@'))
    HiUsername.innerHTML= "Hi," + " " + email;
  }
  else{
    HiUsername.innerHTML = "Hi," + " " + displayName;
  }
});
}
},2000)
})

saveGrowth.addEventListener('click', e => {
  var task = growthTask.value;
  var comments = growthComments.value;
  var todayDate = moment(new Date()).format("DD-MM-YYYY")
  database.ref('users/'+uid+'/attendance/'+todayDate).update({
    Task: task,
    Comments: comments
  },function(error){
    if (error) {
      var options = {
        style: 'error',
        title: 'Error!',
        message: 'Something went wrong. Please try again',
        timeout: 3000,
        close_button: true
      };
      var n = new notify(options);
      n.show();
  }else{
    var options = {
      style: 'success',
      title: 'Success!',
      message: 'Entries Saved',
      timeout: 3000,
      close_button: true
    };
    var n = new notify(options);
    n.show();
    growthTask.value="";
    growthComments.value=""
  }
})
});

var query = firebase.database().ref(uid+'/attendace').orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
  });
});
