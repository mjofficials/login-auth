

// Listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        window.location = 'login-page-content.html';
        var usrObj = JSON.parse(JSON.stringify(user));
        console.log("User sign-in with uid:", usrObj);
        var userToken = usrObj.stsTokenManager.accessToken;
        console.log(userToken);

        // Create a request variable and assign a new XMLHttpRequest object to it.
        const request = new XMLHttpRequest();
        let url = "http://quizpay.herokuapp.com/header";
        // Open a new connection, using the GET request on the URL endpoint
        request.open("GET", url);
        request.setRequestHeader('Authorization', 'Bearer ' + userToken);
        request.setRequestHeader('Content-type', 'application/json');
        request.onreadystatechange = (e) => {
            if (request.readyState == request.DONE) {
                // console.log(e.currentTarget.responseText);
                console.log("check", request.responseText);
            }
            // Begin accessing JSON data here

        }
        // Send request
        request.send();
    } else {
        console.log('User logged out');
    }
});


// GOOGLE LOGIN
var googleAuth = new firebase.auth.GoogleAuthProvider();
const googleSignIn = () => {
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


// FACEBOOK LOGIN
var facebookAuth = new firebase.auth.FacebookAuthProvider();

const facebookSignIn = () => {
    firebase
        .auth()
        .signInWithPopup(facebookAuth)
        .then((result) => {
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            // ...
        });

};

// EMAIL SIGN-IN

// Defining a function to display error message
const printError = (elemId, hintMsg) => {
    return document.getElementById(elemId).innerHTML = hintMsg;
}

const emailSignIn = (e) => {
    e.preventDefault();

    var userData = {
        email: document.getElementById('emailInput').value,
        password: document.getElementById('passwordInput').value,
    }
    if (userData.email != '' && userData.password != '') {
        //user sign-in
        firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
            .then((user) => {
                if (user != null) {
                    var user = firebase.auth().currentUser;
                    console.log("User sign-in with uid:", JSON.parse(JSON.stringify(user.uid)));
                }
            })
            .catch((error) => {
                console.log("Error sign-in user:", error);
                if (error.code === "auth/user-not-found") {
                    document.getElementById('emailErr').innerHTML = error.message;
                }
                if (error.code === "auth/wrong-password") {
                    document.getElementById('passwordErr').innerHTML = error.message;
                }
            });
    }

    //  EMAIL AND PASSWORD VALIDATION

    // Defining error variables with a default value
    var emailErr = passwordErr = mobileOtpErr = true;

    // Validate email address
    if (userData.email == "") {
        printError("emailErr", "*This field is required");
    } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(userData.email) === false) {
            printError("emailErr", "*Enter valid email address");
        } else {
            printError("emailErr", "");
            emailErr = false;
        }
    }

    // Validate password
    if (userData.password == "") {
        printError("passwordErr", "*This field is required");
    } else {
        // Regular expression for basic password validation
        var regex = /^[A-Za-z]\w{7,14}$/;
        if (regex.test(userData.password) === false) {
            printError("passwordErr", "*Enter a valid password");
        } if (userData.password.length < 7) {
            printError("passwordErr", "*Password is too short");
        }
        else {
            printError("passwordErr", "");
            passwordErr = false;
        }
    }
};

// MOBILE NUMBER OTP AUTHENTICATION
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptchaContainer",
    {
        size: "invisible",
        callback: function (response) {
            submitPhoneNumberAuth();
        }
    }
);

function submitPhoneNumberAuth() {
    var phoneNumber = document.getElementById("phoneNumberInput").value;
    var appVerifier = window.recaptchaVerifier;
    firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
        })
        .catch(function (error) {
            console.log(error.message);
        });

}

// This function runs when the 'confirm-code' button is clicked
// Takes the value from the 'code' input and submits the code to verify the phone number
// Return a user object if the authentication was successful, and auth is complete
function submitPhoneNumberAuthCode() {
    var code = document.getElementById("verificationCodeInput").value;
    confirmationResult
        .confirm(code)
        .then(function (result) {
            var user = result.user;
            console.log(user);
        })
        .catch(function (error) {
            console.log(error);
        });
}

//validation for mobile number input field

const requestBtn = () => {
    var mobileNumber = document.getElementById("phoneNumberInput").value;
    if (mobileNumber == "") {
        printError("mobileOtpErr", "This field is required");
    } else {
        var regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
        if (regex.test(mobileNumber) === false) {
            printError("mobileOtpErr", "Enter a valid mobile number");
        } else {
            printError("mobileOtpErr", "");
            phoneErr = false;
        }
        submitPhoneNumberAuth();
    }
};

const confirmCode = () => {
    var verificationCodeInput = document.getElementById('verificationCodeInput').value;
    if (verificationCodeInput == "") {
        printError("verficationCodeErr", "This field is required");
    } else {
        submitPhoneNumberAuthCode();
    }
};
// toggle password visibility
const togglePassword = () => {
    var passwordInput = document.getElementById('passwordInput');
    (passwordInput.type === "password") ? passwordInput.type = "text" : passwordInput.type = "password";
}

document.getElementById('googleSignIn').addEventListener('click', googleSignIn);
document.getElementById('facebookSignIn').addEventListener('click', facebookSignIn);
document.getElementById('formSignInBtn').addEventListener('click', emailSignIn);
document.getElementById('requestBtn').addEventListener('click', requestBtn);
document.getElementById('confirm-code').addEventListener('click', confirmCode);

// Function for dialog button to open and close
(function () {
    'use strict';
    var dialogButton = document.querySelector('.dialog-button');
    var dialog = document.querySelector('#dialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialogButton.addEventListener('click', function () {
        dialog.showModal();
        dialog.addEventListener('click', function (event) {
            var rect = dialog.getBoundingClientRect();
            var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
                && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                dialog.close();
            }
        });
    });
}());

// toggle function for email content
var emailSignInBtn = document.getElementById('emailSignIn');
var emailContentBox = document.getElementById('emailContentBox');
var mobileContentBox = document.getElementById('mobileContentBox');
var emailContentBoxCloseBtn = document.getElementById('emailContentBoxCloseBtn');

//open email form 
emailSignInBtn.addEventListener('click', (e) => {
    emailContentBox.style.display = "block";
    mobileContentBox.style.display = "none";
});

//close email form 
emailContentBoxCloseBtn.addEventListener('click', (e) => {
    emailContentBox.style.display = "none";
    mobileContentBox.style.display = "block";
});
