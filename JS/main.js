var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var closeBtn = document.getElementById("closeBtn");
var alert = document.getElementById("box")

var allBookmarks = [];

if (localStorage.getItem("website") != null) {
    allBookmarks = JSON.parse(localStorage.getItem("website"));
    displayBookmark(allBookmarks);
}
function addBookmark() {

    var website = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    }

    if (validateSiteName(siteNameInput.value) == true && validateUrl(siteUrlInput.value) == true) {
        allBookmarks.push(website);
        localStorage.setItem("website", JSON.stringify(allBookmarks));
        displayBookmark(allBookmarks);
        clearForm();

    }

    else {
        alert.classList.replace('d-none', 'd-flex');
    }
}

closeBtn.addEventListener("click", closeAlert);

function closeAlert() {
    alert.classList.replace('d-flex', 'd-none');
}


function displayBookmark(arr) {
    var cartona = ``;

    for (var i = 0; i < arr.length; i++) {

        cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${arr[i].name}</td>
        <td>
        <a href="https://${arr[i].url}">
        <button class="btn btn-success ">
            <i class="fa-solid fa-eye pe-1"></i>
            Visit
            </button>
            </a>
            </td>
        <td><button onclick = "deleteBookmark(${i})" class="btn btn-danger ">
            <i class="fa-solid fa-trash-can pe-1" ></i>
            Delete</button></td>
    </tr> `

    }

    document.getElementById("tBody").innerHTML = cartona;
}


function clearForm() {
    siteNameInput.value = " ";
    siteUrlInput.value = " ";
}


function deleteBookmark(websiteIndex) {
    allBookmarks.splice(websiteIndex, 1);
    localStorage.setItem("website", JSON.stringify(allBookmarks));
    displayBookmark(allBookmarks);

}

// function searchName(term){
//     console.log(term);
//     var matchedName = [];
//     for (var i = 0 ; i <allBookmarks.length ; i++){
//         if (allBookmarks[i].name.toLowerCase().includes(term.toLowerCase)== true){
//               matchedName.push (allBookmarks[i]);

//         }

//     }
//     displayBookmark(matchedName);
// }

function validateSiteName() {
    var nameRegex = /^[A-Za-z]{3,}$/;
    if (nameRegex.test(siteNameInput.value) == true) {
        siteNameInput.style = "border:3px solid green";
        return true;
    } else {
        siteNameInput.style = "border:3px solid red";
        return false;
    }
}

function validateUrl() {
    var urlRegex =
        /^[(https?:\/\/)?(w{3}\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=])*$/;

    if (urlRegex.test(siteUrlInput.value) == true) {
        siteUrlInput.style = "border:3px solid green";
        return true;
    } else {
        siteUrlInput.style = "border:3px solid red";
        return false;
    }
}