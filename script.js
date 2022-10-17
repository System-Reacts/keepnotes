const button = document.querySelector('.mainButton')
// Set Data in Local-Storage
const updateLSData = () => {
    const textAreaData = document.querySelectorAll('.loose');
    const titleData = document.querySelectorAll('.hiddenTitle');
    const notes = [];
    const titles = [];
    textAreaData.forEach((element) => {
        return notes.push(element.value)
    })
    titleData.forEach((value) => {
        return titles.push(value.value)
    })
    console.log(titles);
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('titles', JSON.stringify(titles));
}

// Notes Generator
const addNote = (head = "", text = "") => {
    const note = document.createElement('main');
    note.className = "main  col-xl-3 col-lg-4 col-md-6 col-sm-8";
    const htmlData = `
    <div class="header">
    <div class="titleHead">
        <input type="text" class="hiddenTitle ${text ? "" : "hidden"}" maxlength="25px">
        <input type="text" class="titleInput ${text ? "hidden" : ""}" maxlength="25px">
    </div>
    <div class="icons"><i class='fa-solid fa-pen-to-square edit'></i>
        <i class='fa-solid fa-trash trash'></i>
    </div>
</div>
<div class="note">
<textarea class='save ${head ? "" : "hidden"}'></textarea>
<textarea class="loose ${head ? "hidden" : ""}"></textarea>
</div> `;
    note.insertAdjacentHTML('afterbegin', htmlData);
    document.querySelector(".notesContainer").appendChild(note);

    // getting the References
    const remove = note.querySelector('.trash');
    const edit = note.querySelector('.edit');
    const saveDiv = note.querySelector('.save');
    const textArea = note.querySelector('.loose');
    const hiddenTitle = note.querySelector('.hiddenTitle');
    const title = note.querySelector('.titleInput');
    // Title save
    
    // Delecting Node
    remove.addEventListener('click', () => {
        note.remove();
        updateLSData();

    });
    hiddenTitle.value = head;
    title.value = head;
    textArea.value = text;
    saveDiv.value = text;

    // Title toggle
    title.addEventListener('change', (event) => {
        const value = event.target.value;
        hiddenTitle.value = value;
        title.classList.toggle("hidden");
        hiddenTitle.classList.toggle("hidden");
        updateLSData();
    })

    // Editing Functionality ⏩ Toggle using Edit Button
    edit.addEventListener('click', () => {
        textArea.classList.toggle("hidden")
        saveDiv.classList.toggle("hidden")
    });
    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        saveDiv.value = value;
        textArea.classList.toggle("hidden")
        saveDiv.classList.toggle("hidden")
        updateLSData();
    });
};





// Getting data from local-Storage
const notes = JSON.parse(localStorage.getItem("notes"))
const titles = JSON.parse(localStorage.getItem("titles"))
if (titles) {
    titles.forEach((value) => {
        addNote(value, notes);
    })
}












button.addEventListener('click', () => {
    addNote();
})

// Search Functionality 🧐
const search = document.querySelector('.search')
const searchFunc = ()=>{
    document.querySelector(".notesContainer").innerHTML = "" ;
    const filterArray = titles.filter((value) =>{
    const searchUpper = search.value.toUpperCase();
        const valueLower = value.toUpperCase();
        const include = valueLower.includes(searchUpper);
        if(include == true){
            return true
        }else{
            return false
        }
    })
    filterArray.forEach((element) =>{
    addNote(element, notes);
    })
}
search.addEventListener('input', () =>{
    searchFunc()
})















// Search Functionality         
