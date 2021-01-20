//initialize the firebase app
var firebaseConfig = {
    apiKey: "AIzaSyCPIvgDaRe09zqtNC5e-c3mHQVsjXwG_24",
    authDomain: "login-authentication-dfaaa.firebaseapp.com",
    projectId: "login-authentication-dfaaa",
    storageBucket: "login-authentication-dfaaa.appspot.com",
    messagingSenderId: "449318353551",
    appId: "1:449318353551:web:bb0f7422cefe7407ec0efa",
    measurementId: "G-20HPQDZ6SL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//create firebase references
var Auth = firebase.auth();
//Register

// Defining a function to display error message
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

// Sign-Up
document.getElementById('formSignUpBtn').addEventListener('click', function submitForm(e) {
    e.preventDefault();

    var userData = {
        email: document.getElementById('emailInput').value,
        password: document.getElementById('passwordInput').value,
    }
    if (userData.email != '' && userData.password != '') {
        //create the user
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
            .then((user) => {
                if (user != null) {
                    var user = firebase.auth().currentUser;
                    console.log("Successfully created user account with uid:", user.uid);
                }
            })
            .catch((error) => {
                console.log("Error creating user:", error);
                alert(error.message);
            });
    }

    // Defining error variables with a default value
    var emailErr = passwordErr = true;

    // Validate email address
    if (userData.email == "") {
        printError("emailErr", "*This field is required");
    } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(userData.email) === false) {
            printError("emailErr", "*Please enter a valid email address");
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
            printError("passwordErr", "*Please enter a valid password");
        } if (userData.password.length < 7) {
            printError("passwordErr", "*password is too short");
        }
        else {
            printError("passwordErr", "");
            passwordErr = false;
        }
    }
});

// Sign-In
document.getElementById('formSignInBtn').addEventListener('click', function signIn(e) {
    e.preventDefault();

});

// toggle password visibility
const togglePassword = () => {
    var passwordInput = document.getElementById('passwordInput');
    (passwordInput.type === "password") ? passwordInput.type = "text" : passwordInput.type = "password";
}

