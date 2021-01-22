(function () {
    'use strict';
    var dialogButton = document.querySelector('.dialog-button');
    var dialog = document.querySelector('#dialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialogButton.addEventListener('click', function () {
        dialog.showModal();
    });
}());

// GOOGLE LOGIN
var googleAuth = new firebase.auth.GoogleAuthProvider();
const googleSignIn = (e) => {
    firebase.auth()
        .signInWithPopup(googleAuth)
        .then((user) => {
            if (user != null) {
                var user = firebase.auth().currentUser;
                console.log("User sign-in with uid:", JSON.parse(JSON.stringify(user.uid)));
            }

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    // firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
    //     .then((user) => {
    //         if (user != null) {
    //             var user = firebase.auth().currentUser;
    //             console.log("User sign-in with uid:", JSON.parse(JSON.stringify(user.uid)));
    //         }
    //     })
    //     .catch((error) => {
    //         console.log("Error sign-in user:", error);
    //         if (error.code === "auth/user-not-found") {
    //             document.getElementById('emailErr').innerHTML = error.message;
    //         }
    //         if (error.code === "auth/wrong-password") {
    //             document.getElementById('passwordErr').innerHTML = error.message;
    //         }
    //     });
};


document.getElementById('googleSignIn').addEventListener('click', googleSignIn);