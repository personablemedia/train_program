$(document).ready(function() {
// Initialize Firebase and change the values of the config values with your own Firebase config values.
//replace with mine
var config = {
  apiKey: "AIzaSyCav4a5vNdz4TxHbbV9ltaMi1kK52t6rqk",
    authDomain: "trainproject-6bcec.firebaseapp.com",
    databaseURL: "https://trainproject-6bcec.firebaseio.com",
    projectId: "trainproject-6bcec",
    storageBucket: "",
    messagingSenderId: "774147755941"
};

    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Variables (SET the first set IN FIREBASE FIRST)
    // Note remember to create these same variables in Firebase!
 // Click Button changes what is stored in firebase
    $("#submit-button").on("click", function(event) {
      // Prevent the page from refreshing
      event.preventDefault();

      // Get inputs-
      name = $("#trainName").val().trim();
      destination = $("#trainDestination").val().trim();
      frequency = $("#trainFrequency").val().trim();
      nextArrival = $("#trainTime").val().trim();

      // Change what is saved in firebase
      database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        next_arrival: nextArrival,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("child_added", function(childSnapshot) {
      // Print the initial data to the console.
      console.log(childSnapshot.val());
      // Log the value of the various properties
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().next_arrival);

      // Change the HTML
      $("#fullTrainSchedule").append("<div class='col-md-3 train-name'>" + childSnapshot.val().name +
        "</div><div class='col-md-3 destination'>" + childSnapshot.val().destination +
        "</div><div class='col-md-3 frequency'>" + childSnapshot.val().frequency +
        "</div><div class='col-md-3 next-arrival'>" + childSnapshot.val().next_arrival + "</div>");


      // If any errors are experienced, log them to console.
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

});
