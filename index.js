document.addEventListener('DOMContentLoaded', () => {

/*---------------files-----------------*/
    let file = {
        logo:"",
        name:"",
        date:"",
        size:"",
        type:"",
        starred:false,
        archived:false,
    }
    let size={
        img:0,
        vid:0,
        doc:0
    } 

    let lastFileIndex = JSON.parse(localStorage.getItem("lastFileIndex"))
    if(!(lastFileIndex>1)){
        lastFileIndex = 1;
    }
    console.log(lastFileIndex)


    document.getElementById('uploadInput').addEventListener('change',function(event){
    let validFile = true;
    let newFile = event.target.files[0]
    if(newFile){
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
    else if(file.type == "text"){
        file.logo = "assets/files/file.svg"
    }
    else{
        validFile = false;
        alert("Invalid file please select a new one")
    }
    if(validFile){
    /* Size */
    file.size = newFile.size
    console.log(file.size)
    /* Date */
    let date = new Date()
    file.date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    /* Name */
    file.name = newFile.name
    /* save to local storage */
    let fileName = "file"+lastFileIndex
    lastFileIndex+=1

    file.archived=false
    file.starred=false
    
    localStorage.setItem(fileName, JSON.stringify(file));
    localStorage.setItem("lastFileIndex", JSON.stringify(lastFileIndex));

    location.reload()

    console.log(lastFileIndex-1)
    console.log(file)
   }
}
});


/*-------------page----------------*/
document.getElementById("home").addEventListener("click", function(){
    location.reload()
},false);

/* All files */
document.getElementById("allFiles").addEventListener("click", function(){
    loadAllFiles()
},false);

/* starred files number */
let nmbStarred = 0;
for (let i = 1; i < lastFileIndex; i++) {
    let fileName = "file"+i
    let oldData = JSON.parse(localStorage.getItem(fileName));
    if(oldData){
    file=oldData;
    if(file.starred){
        nmbStarred+=1;
    }}}
document.getElementById("nmbStarred").innerText=nmbStarred+" Starred files"

/* Starred table */
/* ----------listners---------- */
document.getElementById("starredView").addEventListener("click",function(){
    loadStarred()
},false)
document.getElementById("starred").addEventListener("click", function(){
    loadStarred()
},false);


/* archived files number */
let nmbArchived = 0;
for (let i = 1; i < lastFileIndex; i++) {
    let fileName = "file"+i
    let oldData = JSON.parse(localStorage.getItem(fileName));
    if(oldData){
    file=oldData;
    if(file.archived){
        nmbArchived+=1;
    }}}
document.getElementById("nmbArchived").innerText=nmbArchived+" Archived files"



/* Archived table*/
/* -----------------listners------------------- */
document.getElementById("archivedView").addEventListener("click",function(){
    loadArchive()
},false)
document.getElementById("archived").addEventListener("click",function(){
    loadArchive()
},false);



/* Recent table*/
let table=``
for (let i = lastFileIndex; i >= (lastFileIndex-5); i--) {
    let fileName = "file"+i
    let oldData = JSON.parse(localStorage.getItem(fileName));
    if(oldData){
    file=oldData;
    table += `
    <tr>
    <td>
    <div class="tdDiv">
    <img id="${file.type}" src="${file.logo}" alt="">
    <p>${file.name}</p>
    </div>
     </td>
     <td><p>${file.date}</p></td>
     <td><p>${niceBytes(file.size)}</p></td>
    </tr>
    `
    }
    
}
document.getElementById("recent").innerHTML=table
    
/* Progress bar */
/* note : All maxs in kb */
let maxImg = 100*1024
let maxVid = 1*1024*1024
let maxDoc = 20*1024
for (let i = 1; i < lastFileIndex; i++) {
    let fileName = "file"+i
    let oldData = JSON.parse(localStorage.getItem(fileName));
    if(oldData){
        file=oldData;
        if(file.type == "application" || file.type == "image"){
            size.img+=file.size
        }
        else if(file.type == "video"){
            size.vid+=file.size
        }
        else{
            size.doc+=file.size
        }
        /* img */
        document.getElementById("imgBar").style.width=(Math.floor((size.img/1024)/maxImg*100))+"%"
        document.getElementById("img%").innerText=(Math.floor((size.img/1024)/maxImg*100))+"%"
        document.getElementById("imgBarText").innerText=niceBytes(size.img)+" of "+niceBytes(maxImg*1024)+" used"
        
        /* doc */
        document.getElementById("docBar").style.width=(Math.floor((size.doc/1024)/maxDoc*100))+"%"
        document.getElementById("doc%").innerText=(Math.floor((size.doc/1024)/maxDoc*100))+"%"
        document.getElementById("docBarText").innerText=niceBytes(size.doc)+" of "+niceBytes(maxDoc*1024)+" used"
        
        /* vid */
        document.getElementById("vidBar").style.width=(Math.floor((size.vid/1024)/(maxVid)*100))+"%"
        document.getElementById("vid%").innerText=(Math.floor((size.vid/1024)/maxVid*100))+"%"
        document.getElementById("vidBarText").innerText=niceBytes(size.vid)+" of "+niceBytes(maxVid*1024)+" used"
    }

    /* Sort */
    document.getElementById("options").addEventListener("change", function(){
        console.log("click")
        sortFiles(document.getElementById("options").value), false
    }); 

}

    /* List */
    document.getElementById("listBtn").addEventListener("click", function(){
        let display = document.getElementById("list").style.display
        if(display == "none"){
            document.getElementById("list").style.display = "flex"
            document.getElementById("list").innerHTML =   document.getElementById("sideBar").innerHTML

        }
        else{
            document.getElementById("list").style.display = "none"
        }
    })

});






/* points */
    function upadetePoints(){
        let lastFileIndex = JSON.parse(localStorage.getItem("lastFileIndex"))
        if(!(lastFileIndex>1)){
            lastFileIndex = 1;
        }

        for (let i = 1; i < lastFileIndex; i++) {
            let fileName = "file"+i
            let oldData = JSON.parse(localStorage.getItem(fileName));
            if(oldData){
            file=oldData;
            if(file.archived && file.starred){
                document.getElementById("point_archived"+i).style.display = "block" 
                document.getElementById("point_starred"+i).style.display = "block"           
            }
            else if(file.archived){
                document.getElementById("point_archived"+i).style.display = "block"
                document.getElementById("point_starred"+i).style.display = "none"           
            }
            else if(file.starred){
                document.getElementById("point_archived"+i).style.display = "none"
                document.getElementById("point_starred"+i).style.display = "block"   
            }
            else{
                document.getElementById("point_archived"+i).style.display = "none"
                document.getElementById("point_starred"+i).style.display = "none"           
            }
        }}}   

/* converts from bytes to kn,mb... */
function niceBytes(a){let b=0,c=parseInt(a,10)||0;for(;1024<=c&&++b;)c/=1024;return c.toFixed(10>c&&0<b?1:0)+" "+["bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][b]}

/*-------------------------------- */
function flipStar(id,source){

    console.log("click")

    let oldData = JSON.parse(localStorage.getItem("file"+id));
    if(oldData){
        let file=oldData;
        file.starred = !(file.starred)
        localStorage.setItem("file"+id, JSON.stringify(file));
        
        if(source != "allTable"){
            loadStarred() 
        }
        else{
            upadetePoints()
        }


    }
}

/*------------------------------- */
function flipArchive(id,source){

    console.log("click")

    let oldData = JSON.parse(localStorage.getItem("file"+id));
    if(oldData){
        let file=oldData;
        file.archived = !(file.archived)
        localStorage.setItem("file"+id, JSON.stringify(file));

        if(source != "allTable"){
            loadArchive()
        }
        else{
            upadetePoints()
        }
        
    }
}

/* -------------loading archived------------- */
function loadArchive(){
    document.getElementById("tableName").innerText= "Archived Files"
    document.getElementById("tableBgImg").src ="assets/files/box.svg"
    document.getElementById("bg").style.backgroundColor="#e74c3c"
    document.getElementById("main").style.display = 'none';
    document.getElementById("mainTable").style.display = 'block';

    let lastFileIndex = JSON.parse(localStorage.getItem("lastFileIndex"))
    if(!(lastFileIndex>1)){
        lastFileIndex = 1;
    }

    /*loading table*/
    let table = ``
    for (let i = 1; i < lastFileIndex; i++) {
        let fileName = "file"+i
        let oldData = JSON.parse(localStorage.getItem(fileName));
        if(oldData){
            file=oldData;
        if(file.archived){
        table += `
        <tr>
        <td>
        <div class="tdDiv">
        <img  id="${file.type}" src="${file.logo}" alt="">
        <span class=""></span>
        <p>${file.name}</p>
        </div>
         </td>
         <td><p>${file.date}</p></td>
         <td><p>${niceBytes(file.size)}</p></td>
         <td>
         <label for="deleteArchive${i}">
         <div class="bgArchive">
              <img src="assets/files/delete.svg" alt="">
         </div>
         <input type="button" id="deleteArchive${i}" onclick="flipArchive(${i})">
      </td> 
     </tr>
        `}}}
    document.getElementById("tableBody").innerHTML=table
}

/* -------------loading starred------------- */
function loadStarred(){
    document.getElementById("tableName").innerText= "Starred Files"
    document.getElementById("tableBgImg").src ="assets/files/star.svg"
    document.getElementById("bg").style.backgroundColor="#f1c40f"
    document.getElementById("main").style.display = 'none';
    document.getElementById("mainTable").style.display = 'block';

    let lastFileIndex = JSON.parse(localStorage.getItem("lastFileIndex"))
    if(!(lastFileIndex>1)){
        lastFileIndex = 1;
    }

    let table = ``
    for (let i = 1; i < lastFileIndex; i++) {
        let fileName = "file"+i
        let oldData = JSON.parse(localStorage.getItem(fileName));
        if(oldData){
            file=oldData;
        if(file.starred){
        table += `
        <tr>
        <td>
        <div class="tdDiv">
        <img id="${file.type}" src="${file.logo}" alt="">
        <p>${file.name}</p>
        </div>
         </td>
         <td><p>${file.date}</p></td>
         <td><p>${niceBytes(file.size)}</p></td>
         <td>

         <label for="deleteStar${i}">
            <div class="bgArchive">
                 <img src="assets/files/delete.svg" alt="">
            </div>
            <input type="button" id="deleteStar${i}" onclick="flipStar(${i})">
      </td> 
     </tr>
        `}
      
    }}
    document.getElementById("tableBody").innerHTML=table
}
/* -------------loading all files----------------- */
function loadAllFiles(){
        /*loading UI*/
        document.getElementById("tableName").innerText= "All Files"
        document.getElementById("tableBgImg").src ="assets/nav/FileStructure.svg"
        document.getElementById("bg").style.backgroundColor="#005bd4"
        document.getElementById("main").style.display = 'none';
        document.getElementById("mainTable").style.display = 'block';
    
        let lastFileIndex = JSON.parse(localStorage.getItem("lastFileIndex"))
        if(!(lastFileIndex>1)){
            lastFileIndex = 1;
        }

        /*loading table*/
        let table=``
        for (let i = 1; i < lastFileIndex; i++) {
        let fileName = "file"+i
        let oldData = JSON.parse(localStorage.getItem(fileName));
        if(oldData){
            file=oldData;
            table += `
            <tr>
            <td>
            <div class="tdDiv">
            <img id="${file.type}" src="${file.logo}" alt="">
                <div class="points">
                <div class="point_starred" id="point_starred${i}"></div>
                <div class="point_archived" id="point_archived${i}"></div>
                </div>
            <p>${file.name}</p>
            </div>
             </td>
             <td><p>${file.date}</p></td>
             <td><p>${niceBytes(file.size)}</p></td>
             <td>
                <label for="addToStarred${i}">
                    <div class="bgStar">
                        <img src="assets/files/Star.svg" alt="">
                    </div>
                </label>
                <input type="button" id="addToStarred${i}" onclick="flipStar(${i},'allTable')">
                
                <label for="addToArchived${i}">
                <div class="bgArchive">
                    <img src="assets/files/box.svg" alt="">
                </div>
                <input type="button" id="addToArchived${i}" onclick="flipArchive(${i},'allTable')">
             </td> 
            </tr>
            `
            }
            
        }
        document.getElementById("tableBody").innerHTML=table
        upadetePoints()
    
}
/* sort files */
function sortFiles(index){

    let lastFileIndex = JSON.parse(localStorage.getItem("lastFileIndex"))
    if(!(lastFileIndex>1)){
        lastFileIndex = 1;
    }
    
    let files =[]
    for (let i = 1; i < lastFileIndex; i++) {
        let fileName = "file"+i
        let oldData = JSON.parse(localStorage.getItem(fileName));
        if(oldData){
            files.push(oldData);
    } 
}
        if(index == "name"){
            files.sort((a, b) => a.name.localeCompare(b.name))
        }
        else if(index == "date"){
            files.sort(function(a,b){return a.date - b.date});
        }
        else if(index == "size"){
            files = files.sort((a,b) => {return a.size-b.size})
        }

        let i=1
            files.forEach(function(file){
                let fileName = "file"+i
                console.log(fileName)
                localStorage.setItem(fileName, JSON.stringify(file));
                i++
                if(i>lastFileIndex){
                    files=[]
                }
            })
        loadAllFiles()}
    
