const myLibrary = [];
const form = document.getElementById('form')
const close = document.getElementById('close')
const main = document.querySelector('.cardContainer')

let index_count = 1

class Book{
   constructor(author,title,pages,read){
      this.id = index_count;
      this.author = author;
      this.title = title;
      this.pages = pages;
      this.hasBeenRead = read;
   }

}

// function Book(author,title,pages,read){
//    this.id = index_count;
//    this.author = author;
//    this.title = title;
//    this.pages = pages;
//    this.hasBeenRead = read;

// };

Book.prototype.changeRead = function() {
   this.hasBeenRead = !this.hasBeenRead;
};

function addBookToLibrary(author,title,pages,hasBeenRead) {
   const newBook = new Book(author,title,pages,hasBeenRead)
   myLibrary.push(newBook);
   index_count++ 
}

addBookToLibrary('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW','WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', 234, false)
addBookToLibrary('mattia','la storia di mattia', 543, true)


function displayBook(){
   main.innerHTML = '';
   myLibrary.forEach(element => {
      const div = document.createElement('div')
      div.innerHTML = `
      <div class="card">
         <h2>${element.title}</h2>
         <h3>${element.author}</h3>
         <p>number of pages:${element.pages}</p>
         <button onclick='changeRead(${element.id},this)' class='${element.hasBeenRead}'>Read</button>
         <button onclick='deleteBook(${element.id})'>Delete</button>
      </div>
      `;
      main.appendChild(div)
   });
}

displayBook()


function formValidator(val1,val2,val3){
   if(val1!='' && val2!='' && (val3.match(/^[0-9]+$/) != null)){
      return true
   }
   else{
      return false
   }
}
function openmodal(){
   document.querySelector('.modal').style.display = 'flex'
}

function changeRead(id, element){
   const index = myLibrary.findIndex(book => book.id === id);
   // myLibrary[index].hasBeenRead = !myLibrary[index].hasBeenRead
   myLibrary[index].changeRead();
      
   element.classList.add(myLibrary[index].hasBeenRead)
   element.classList.remove(!myLibrary[index].hasBeenRead)

}


function deleteBook(id){
   const index = myLibrary.findIndex(book => book.id === id);
   myLibrary.splice(index,1)
   displayBook()
}


form.addEventListener('submit',(e)=>{
   e.preventDefault()

   if(formValidator(e.target[0].value,e.target[1].value,e.target[2].value)){
      addBookToLibrary(e.target[0].value,e.target[1].value,e.target[2].value,e.target[3].checked)
      document.getElementById('errorBox').style.display = 'none'
      document.querySelector('.modal').style.display = 'none'
      displayBook()

      e.target[0].value = ''
      e.target[1].value = ''
      e.target[2].value = 1
      e.target[3].checked = false


   }
   else{
      document.getElementById('errorBox').style.display = 'block'
   }
})

close.addEventListener('click',()=>{
   document.querySelector('.modal').style.display = 'none'
})