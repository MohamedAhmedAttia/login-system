//an array to save all users info
var allUsers=[];
if (localStorage.getItem('allUsers')) {
    allUsers = JSON.parse(localStorage.getItem('allUsers'));
}

//registration page variables
var registerName= document.getElementById('userName');
var registerEmail=document.getElementById('userEmail');
var registerPassword=document.getElementById('userPassword');
var loginMessage=document.getElementById('loginMessage');
var signUpButton=document.getElementById('signUpButton')


//login page variables
var loginEmail=document.getElementById('loginEmail');
var loginPassword=document.getElementById('loginPassword');
var registerMessage=document.getElementById('message');
var loginButton=document.getElementById('loginButton');

//home page variables
var nameVar = document.getElementById('nameVar');


function registration(){
    var user ={
        userName: registerName.value,
        userEmail: registerEmail.value,
        userPassword: registerPassword.value
    }

    //condition to check if the values of inputs are null
    if (user.userName == "" ||  user.userEmail == "" || user.userPassword == ""){
        registerMessage.classList.add('text-warning')
        registerMessage.innerHTML="All Inputs Is Required!!"
        return;
    }
    
    //loop to check if this email already registerd or not 
    for (var i =0; i<allUsers.length;i++){
         if (user.userEmail==allUsers[i].userEmail){
            registerMessage.classList.add('text-warning')
            registerMessage.innerHTML="Email Already Exists!!"
            return;
         }
    }
    
    //condition to print a message if the mail is not valid
    if (user.userName !="" &&  !validation(registerEmail) && validation(registerPassword)){
        registerMessage.classList.add('text-warning')
        registerMessage.innerHTML="Email is not valid !!"
        return;
    }

    //condition to print a message if the passowrd is not valid
    else if(user.userName !="" && validation(registerEmail) && !validation(registerPassword)){
        registerMessage.classList.add('text-warning')
        registerMessage.innerHTML="Passowrd length Should be from 8 to 12 charecters, have 1 capital letter, 1 small letter and 1 special charecter"
        return;
    }
    
    //success scenario 
    if (user.userName !="" &&  validation(registerEmail) && validation(registerPassword)){

        allUsers.push(user);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        registerMessage.classList.remove('text-warning')
        registerMessage.classList.add('text-success');
        registerMessage.innerHTML="Success";
        document.location='../index.html';
    }
    
}

//validation function to check of passord and email
function validation(element) {
    var regex = {
        userEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/, //email must contain @ and . then 3letters at least
        //passowrd should be at least 8 charecters and max 12 charecters, have at least 1 upper case, one small case, one number and one specialcharecter
        userPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[!@#$%^&*(),.?":{}|<>_]).{8,12}$/ 
    };

    if (regex[element.id] && regex[element.id].test(element.value)) {
        return true;
    } else {
        return false;
    }
}

function login() {
    var email = loginEmail.value;
    var password = loginPassword.value;
    var Isvalid = false;

    //loop to check if the values enter are matched with database or not
    for (var i = 0; i < allUsers.length; i++) {

        //condition in case we found a match
        if (allUsers[i].userEmail == email && allUsers[i].userPassword == password) {
            Isvalid = true;
            localStorage.setItem('userName', allUsers[i].userName);   //to save user name in local storage to use it in home page
             window.location = './Home.html'; 
            break;
        }
    }
    //condition to show a message if the mail or passowrd is wrong 
    if (!Isvalid) {
        loginMessage.classList.add('text-warning');
        loginMessage.innerHTML = "Incorrect email or password";
    }
}

    //to get the user name from local storage an put it in home.html
    var userName = localStorage.getItem('userName');

    if (userName) {
        nameVar.innerHTML = userName; 
    }
