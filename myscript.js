var username="asdasdasdadasd";
var password;

function login(){
    var username = document.getElementById("username").innerHTML;
    var password = document.getElementById("password").innerHTML;
    alert("Login Successful");
}

function getUsername(){
    return username;

}

function getPassword(){
    return password;
}