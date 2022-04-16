// alert("Hello! Welcome to Korn-K's website.")

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYbb2DcSlJPYi451HhQCV_B8D69b80LII",
  authDomain: "hw-1ebc2.firebaseapp.com",
  databaseURL: "https://hw-1ebc2-default-rtdb.firebaseio.com",
  projectId: "hw-1ebc2",
  storageBucket: "hw-1ebc2.appspot.com",
  messagingSenderId: "610590236999",
  appId: "1:610590236999:web:adb2d3e88582ad82beac62",
  measurementId: "G-13M98ZSKEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Import database functions 
import { getDatabase, ref, get, set, child, update, remove, onValue, onChildAdded, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
const db = getDatabase();

// References
var sid = document.getElementById("sid");
var name = document.getElementById("name");
var lastname = document.getElementById("lastname");

var btn_insert = document.getElementById("btn_insert");
var btn_select = document.getElementById("btn_select");
var btn_update = document.getElementById("btn_update");
var btn_delete = document.getElementById("btn_delete");
var btn_all = document.getElementById("btn_all");

let stdNo = 0;

// INSERT DATA
function insertData(){
  set(ref(db,"Student/"+sid.value),{
      "name": name.value,
      "lastname": lastname.value
  }).then(()=>{
      location.reload(); 
      alert("data stored successfully");
  }).catch((error)=>{
      alert("unsuccessful, error" + error);
  })
}

// UPDATE DATA 
function updateData(){
  update(ref(db,"Student/"+sid.value),{
    "name": name.value,
    "lastname": lastname.value
  }).then(()=>{
    alert("data update successfully");
    location.reload();
  }).catch((error)=>{
    alert("unsccessful, error" + error);
  })
}

//DELETE DATA
function deleteData(){
  remove(ref(db,"Student/"+sid.value)).then(()=>{
    alert("data delete successfully");
    location.reload();
  }).catch((error)=>{
    alert("unsuccessful, error" + error);
  })
}

// SELECT ALL
function selectAll(){
  const dbRef = ref(db, 'Student/');
  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;       
      let std_name = childSnapshot.val().name;
      let std_lastname = childSnapshot.val().lastname;
      addItemToList(childKey, std_name, std_lastname);
    });
  }, {
    onlyOnce: true
  });
}

// SELECT DATA
function selectData(){
  const dbref = ref(db);
  get(child(dbref, "Student/"+sid.value)).then((snapshot) => {
    if(snapshot.exists()){
      let snapshot_sid = sid.value;
      let snapshot_name = snapshot.val().name;
      let snapshot_lastname = snapshot.val().lastname;
      showIteminList(snapshot_sid, snapshot_name, snapshot_lastname);
    } else {
      alert("No data found");
    }
  }).catch((error) =>{
    alert("unsuccessful, error"+error);
  });
}

// ADD DATA TO LIST
function addItemToList(sid, name, lastname){
  var ul = document.getElementById('lists');
  var _header = document.createElement('h2');
  var _sid = document.createElement('li');
  var _name = document.createElement('li');
  var _lastname = document.createElement('li');
  
  _header.innerHTML = 'Student-'+(++stdNo);
  _sid.innerHTML = 'ID: '+sid;
  _name.innerHTML = 'Name: '+name;
  _lastname.innerHTML = 'LASTNAME: '+lastname;
 
  ul.appendChild(_header);
  ul.appendChild(_sid);
  ul.appendChild(_name);
  ul.appendChild(_name);
  ul.appendChild(_lastname);
}

// REMOVE ALL
function removeAll(){
  document.getElementById("lists").innerHTML = "";
}

// SINGLE ITEM IN LIST
function showIteminList(sid, name, lastname){
  removeAll()
  addItemToList(sid, name, lastname)
}



// create event listener
btn_insert.addEventListener('click',insertData);
btn_select.addEventListener('click',selectData);
btn_update.addEventListener('click',updateData);
btn_delete.addEventListener('click',deleteData);
btn_all.addEventListener('click',selectAll);