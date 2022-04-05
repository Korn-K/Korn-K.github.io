function login(){
    var inputUsername = document.getElementById("username").value;
    var inputPassword = document.getElementById("password").value;
    localStorage.setItem("username",inputUsername);
    localStorage.setItem("password",inputPassword);
    alert("Login Successful");
}

function reset(){
    localStorage.removeItem("username");
    localStorage.removeItem("password");
}