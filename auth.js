// Defining a function to display error message
const printError = (elemId, hintMsg) => {
    return document.getElementById(elemId).innerHTML = hintMsg;
}

// Listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("User sign-in with uid:", JSON.parse(JSON.stringify(user)));
        // var userToken = user.getIdToken();
        const Http = new XMLHttpRequest();
        const url = 'https://quizpay.herokuapp.com/test';
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            if (Http.readyState == Http.DONE) {
                console.log(e.currentTarget.responseText);
            }
        }
    } else {
        console.log('User logged out');
    }
});

// Sign-Up
const signUp = (e) => {
    e.preventDefault();

    var userData = {
        email: document.getElementById('emailInput').value,
        password: document.getElementById('passwordInput').value,
    }
    if (userData.email != '' && userData.password != '') {
        //user sign-up
        auth.createUserWithEmailAndPassword(userData.email, userData.password)
            .then((user) => {
                console.log(user);
                if (user != null) {
                    var user = firebase.auth().currentUser;
                    console.log("User sign-up with uid:", JSON.parse(JSON.stringify(user.uid)));
                }
            })
            .catch((error) => {
                console.log("Error creating user:", error);
                document.getElementById('emailErr').innerHTML = error.message;
            });
    }

    //  EMAIL AND PASSWORD VALIDATION

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
};

// Sign-In
const signIn = (e) => {
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
};

// Log out
const logOut = (e) => {
    e.preventDefault();
    auth.signOut();
};
// Initializing event functions
document.getElementById('formSignUpBtn').addEventListener('click', signUp);
document.getElementById('formSignInBtn').addEventListener('click', signIn);
document.getElementById('formLogOutBtn').addEventListener('click', logOut);

// toggle password visibility
const togglePassword = () => {
    var passwordInput = document.getElementById('passwordInput');
    (passwordInput.type === "password") ? passwordInput.type = "text" : passwordInput.type = "password";
}

