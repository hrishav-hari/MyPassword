//Function to mask paswords
function maskPassword(pass){
  str = ""
  for(let index=0; index<pass.length; index++){
    str += "*"
  }
  return str
}


// Function to copy text
function copyText(txt){
  navigator.clipboard.writeText(txt).then(
    ()=>{
      //alert("Copied to clipboard!")
      document.getElementById("alert").style.display = "inline"
      setTimeout(()=>{
        document.getElementById("alert").style.display = "none"
      }, 1000)
    },
    ()=>{
      alert("Copying failed!")
    },
  );
}


// Function to delete password
const deletePasswords = (website)=>{
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e)=>{
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    //alert(`Password Deleted of ${website}`)
    showPasswords()
}


// Logic to fill the table
const showPasswords = () => {
  let tb = document.querySelector("table")
  let data = localStorage.getItem("passwords")
  if (data == null || JSON.parse(data).length==0) {
    tb.innerHTML = "No data to show!"
  } 
  else {
    tb.innerHTML = `<tr>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th>Action</th>
  </tr>`
    let arr = JSON.parse(data);
    let str = ""
    for (let idx = 0; idx < arr.length; idx++) {
      const element = arr[idx];
      str += `<tr>
               <td>${element.website} <button class="copyButton" onclick="copyText('${element.website}')" alt="Copy Button">copy</button></td>
               <td>${element.username} <button class="copyButton" onclick="copyText('${element.username}')" alt="Copy Button">copy</button></td>
               <td>${maskPassword(element.password)} <button class="copyButton" onclick="copyText('${element.password}')" alt="Copy Button">copy</button></td>
               <td><button class="deleteButton" onclick="deletePasswords('${element.website}')"> Delete </button></td>
               </tr>`;
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  
  website.value = ""
  username.value = ""
  password.value = ""
};


console.log("Working");
showPasswords()

//Submit Button onclick Event
document.querySelector(".button").addEventListener("click", (e) => {
  console.log("clicked");
  e.preventDefault();
  console.log(website.value, username.value, password.value);

  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    //alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } 
  else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    //alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPasswords()
});


//Logic to activate the dropdown menu in small screens
document.querySelector('.menu-icon').addEventListener('click', function() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
});
