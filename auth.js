// Defining a function to display error message
const printError = (elemId, hintMsg) => {
    return document.getElementById(elemId).innerHTML = hintMsg;
}

// Sign-Up
const signUp = (e) => {
    e.preventDefault();

    var userData = {
        email: document.getElementById('emailInput').value,
        password: document.getElementById('passwordInput').value,
    }
    if (userData.email != '' && userData.password != '') {
        //create the user
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
            .then((user) => {
                console.log(user);
                if (user != null) {
                    var user = firebase.auth().currentUser;
                    console.log("Successfully created user account with uid:", JSON.parse(JSON.stringify(user)));
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
        //create the user
        firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
            .then((user) => {
                if (user != null) {
                    var user = firebase.auth().currentUser;
                    console.log("Signed-in successfully with uid:", user.uid);
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
// Initializing event functions
document.getElementById('formSignUpBtn').addEventListener('click', signUp);
document.getElementById('formSignInBtn').addEventListener('click', signIn);

// toggle password visibility
const togglePassword = () => {
    var passwordInput = document.getElementById('passwordInput');
    (passwordInput.type === "password") ? passwordInput.type = "text" : passwordInput.type = "password";
}

