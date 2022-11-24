let listUser = document.getElementById("listUser")
let email = document.getElementById("email")
let name = document.getElementById("name")
let gender = document.getElementById("gender")
let status = document.getElementById("status")
let alert = document.getElementById("alert")
let btnCreate = document.getElementById("btnCreate")

getUser()

function getUser(){
    fetch("https://gorest.co.in/public/v2/users",{
        headers: {
                Authorization : "Bearer ad457a24ec4d5e2d5c6b8d9bb9bfd6b38910dbfa9640d606c06cea4cf083204f"
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(showUser)
    })
    .catch(error =>{
        console.log(error)
    });
}

function showUser (value, index) {
    listUser.innerHTML += `<tr>
    <td>${value.email}</td>
    <td>${value.name}</td>
    <td>${value.gender}</td>
    <td>${value.status}</td>
    <td>
    <button class="btn btn-info" onclick="editUser(${value.id})">Edit</button>
    <button class="btn btn-danger" onclick="deleteUser(${value.id})">Delete</button>
    </td>
    </tr>`
}

function deleteUser(id) {
    console.log("Delete Data Id" + id)
    fetch("https://gorest.co.id/public/v2/users/" + id, {
        method: "DELETE",
        headers: {
                Authorization : "Bearer ad457a24ec4d5e2d5c6b8d9bb9bfd6b38910dbfa9640d606c06cea4cf083204f"
        }
    })
    .then(response => {
        console.log(response)
        listUser.innerHTML =""
        getUser()
    })
    .catch(error => {
        console.log(error)
    })
}

function editUser(id){
    fetch("https://gorest.co.in/public/v2/users/" + id,{
        headers: {
                Authorization : "Bearer ad457a24ec4d5e2d5c6b8d9bb9bfd6b38910dbfa9640d606c06cea4cf083204f"
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)

            email.value = data.email
            name.value = data.name
            gender.value = data.gender
            status.value = data.status

            // ubah teks simpan menjadi ubah
            btnCreate.innerHTML = "ubah"
            // ubah onclick dengan menambahkan parameter 1

            // onclick="createUser(1)"
            btnCreate.setAttribute("onclick", "createUser(1, "+ id +")")
        })
        .catch(error => {
            console.log(error)
        })
    }

function showEdit(value, index){
    editt.innerHTML += `<tr>
    <td>${value.email}</td>
    <td>${value.name}</td>
    <td>${value.gender}</td>
    <td>${value.status}</td>
    <td>
    <button class="btn btn-info" onclick="editUser(${value.id})">Edit</button>
    <button class="btn btn-danger" onclick="deleteUser(${value.id})">Delete</button>
    </td>
    </tr>`
}

function createUser(statusSimpan = 0, id = 0) {
    if(statusSimpan = 0){
        // simpan Data
        console.log("Button simpan Ditekan")
        fetch("https://gorest.co.in/public/v2/users/", {
        method: "POST",
        headers: {
                'Content-Type': 'application/json',
                'Authorization' : "Bearer ad457a24ec4d5e2d5c6b8d9bb9bfd6b38910dbfa9640d606c06cea4cf083204f"
        },
        body: JSON.stringify({
            "email": email.value,
            "name": name.value,
            "gender": gender.value,
            "status": status.value
        })
    })
    .then(response => {
        response.json()
        console.log(response.status)
        if(response.status == 201){
            alert.innerHTML =  `<div class ="alert alert-success"> User Berhasil Di Simpan</div>`
        }else{
            alert.innerHTML =  `<div class ="alert alert-danger"> User GAGAL Di Simpan</div>`

        }

    })
    .then(result => {
        console.log(result)
    })      
    .catch(error => {
        console.log(error)
    })
    }else{
        // ubah data
        console.log("Button simpan Ditekan")
        fetch("https://gorest.co.in/public/v2/users/"+ id, {
        method: "PUT",
        headers: {
                'Content-Type': 'application/json',
                'Authorization' : "Bearer ad457a24ec4d5e2d5c6b8d9bb9bfd6b38910dbfa9640d606c06cea4cf083204f"
        },
        body: JSON.stringify({
            "email": email.value,
            "name": name.value,
            "gender": gender.value,
            "status": status.value
        })
    })
    .then(response => {
        response.json()
        console.log(response.status)
        if(response.status == 200){
            alert.innerHTML =  `<div class ="alert alert-success"> User Berhasil Di Simpan</div>`
        }else{
            alert.innerHTML =  `<div class ="alert alert-danger"> User GAGAL Di Simpan</div>`

        }
        listUser.innerHTML =""
        getUser()

    })
    .then(result => {
        console.log(result)
    })      
    .catch(error => {
        console.log(error)
    })
    }

    
}