// UPDATE DATA 
function updateData(){
    update(ref(db,"Student/"+sid.value),{
        name: name.value,
        lastname: lastanme.value,
    })
    .then(()=>{
        // alert("data update successfully");
        location.reload();
        
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
}


//DELETE
function deleteData(){
    remove(ref(db,"Student/"+sid.value))
    .then(()=>{
        alert("data delete successfully");
        location.reload();
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
}

function selectAll(){
    
    const dbRef = ref(db, 'Student/');
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;       
            let std_name = childSnapshot.val().name;
            let std_lastname = childSnapshot.val().lastname;

            addItemToList(childKey, std_name, std_lastname);
            // window.addEventListener('load',FetchAllData)
        });
    }, {
    onlyOnce: true
    });
}