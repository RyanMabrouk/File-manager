document.addEventListener('DOMContentLoaded', () => {

/*---------------files-----------------*/
    let file = {
        logo:"",
        name:"",
        date:"",
        size:"",
        type:"",
        starred:false,
        archived:false
    }
    let files=[]
    let oldData = JSON.parse(localStorage.getItem("files"));
    if(oldData){
        files=oldData;
    }
    document.getElementById('uploadInput').addEventListener('change',function(event){
    let newFile = event.target.files[0]
    if(newFile){
    /* Size */
    let sizeUnit = " kb";
    file.size = newFile.size + sizeUnit
    /* Date */
    let date = new Date()
    file.date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    /* Name */
    file.name = newFile.name
    /* Type */
    file.type = newFile.type.substring(0,newFile.type.indexOf('/'))
    /* logo */
    if(file.type == "application" || file.type == "image"){
        file.logo = "assets/files/img.svg"
    }
    else if(file.type == "video"){
        console.log("clixked")
        file.logo = "assets/files/Vid.svg"
    }
    else{
        file.logo = "assets/files/file.svg"
    }
    /* save to local storage */
    files.push(file)
    localStorage.setItem("files", JSON.stringify(files));
    console.log(files)
   
}
});

/*-------------page----------------*/
document.getElementById("home").addEventListener("click", function(){
    document.getElementById("mainTable").style.display = 'none';
    document.getElementById("main").style.display = 'block';
},false);

document.getElementById("allFiles").addEventListener("click", function(){
    document.getElementById("tableName").innerText= "All Files"
    document.getElementById("tableBgImg").src ="assets/nav/FileStructure.svg"
    document.getElementById("bg").style.backgroundColor="#005bd4"
    document.getElementById("main").style.display = 'none';
    document.getElementById("mainTable").style.display = 'block';
    logo=""
    let table=``
    for (let i = 0; i < files.length; i++) {
        file = files[i]
        if(file){
        table += `
        <tr>
        <td>
        <div class="tdDiv">
        <img id="${file.type}" src="${file.logo}" alt="">
        <p>${file.name}</p>
        <div>
         </td>
         <td><p>${file.date}</p></td>
         <td><p>${file.size}</p></td>
         <td>
            <a id="starred${i}" href="#">
            <div class="bgStar">
                <img src="assets/files/Star.svg" alt="">
            </div>
            </a>
            <a id="archived${i}" href="#">
            <div class="bgArchive">
                <img src="assets/files/box.svg" alt="">
            </div>
            </a>
         </td> 
        </tr>
        `
      
    }
    document.getElementById("tableBody").innerHTML=table
}
},false);

/* Starred */
document.getElementById("starred").addEventListener("click", function(){
    document.getElementById("tableName").innerText= "Starred Files"
    document.getElementById("tableBgImg").src ="assets/files/star.svg"
    document.getElementById("bg").style.backgroundColor="#f1c40f"
    document.getElementById("main").style.display = 'none';
    document.getElementById("mainTable").style.display = 'block';

    if(file){
    let table = ``
    for (let i = 0; i < files.length; i++) {
        file = files[i]
        if(files.starred){
        table += `
        <tr>
        <td>
        <div class="tdDiv">
        <img src="${file.logo}" alt="">
        <p>${file.name}</p>
        <div>
         </td>
         <td><p>${file.date}</p></td>
         <td><p>${file.size}</p></td>
         <td>
         <a href="#">
         <div class="bgArchive">
             <img src="assets/files/delete.svg" alt="">
         </div>
         </a>
      </td> 
     </tr>
        `}
      
    }
    document.getElementById("tableBody").innerHTML=table}
},false);
/* Archived */
document.getElementById("archived").addEventListener("click",function(){
    document.getElementById("tableName").innerText= "Archived Files"
    document.getElementById("tableBgImg").src ="assets/files/box.svg"
    document.getElementById("bg").style.backgroundColor="#e74c3c"
    document.getElementById("main").style.display = 'none';
    document.getElementById("mainTable").style.display = 'block';

    let table = ``;
    for (let i = 0; i < files.length; i++) {
        file = files[i]
        if(file){
        if(files.archived){
        table += `
        <tr>
        <td>
        <div class="tdDiv">
             <img src="${file.logo}" alt="">
             <p>${file.name}</p>
        <div>
         </td>
         <td><p>${file.date}</p></td>
         <td><p>${file.size}</p></td>
         <td>
         <a  href="#">
         <div class="bgArchive">
             <img src="assets/files/delete.svg" alt="">
         </div>
         </a>
      </td> 
     </tr>
        `}
      
    }
    document.getElementById("tableBody").innerHTML=table;}
}
,false);


});