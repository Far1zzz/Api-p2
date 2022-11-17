let listUSer = document.getElementById("list")

function getUser(){
    fetch("https://gorest.co.in/public/v2/users")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(show)
    })
    .catch(error => {
        console.log(error)
    });
    
}
getUser()

function show(value, index){
    listUSer.innerHTML += `<tr>
    <td>${value.email}</td>
    <td>${value.name}</td>
    <td>${value.gender}</td>
    <td>${value.status}</td>
    <td><button class="btn btn-sm btn-info" onclick="editUser(${value.id})">Edit</button></td>
    <td><button class="btn btn-sm btn-danger" onclick="deleteUser(${value.id})">Delete</button></td></tr>`

}

function deleteUser(id) {
    console.log("Hapus data id: " + id)
    fetch("https://gorest.co.in/public/v2/users/"+ id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer ad457a24ec4d5e2d5c6b8d9bb9bfd6b38910dbfa9640d606c06cea4cf083204f"

        }
    })
    .then(response =>{
        console.log(response)
        listUSer.innerHTML = "" //kosongkan tabel list User
        getUser()
    })
    .catch(error => {
        console.log(error)
    })


}