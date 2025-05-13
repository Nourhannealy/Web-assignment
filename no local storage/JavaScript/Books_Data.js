// Scripts/books.js


if (!localStorage.getItem('books')) {

const books = [
  {
    id: 1,
    title: "The Magical Language of Others",
    author: "E. J. Koh",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1574328700i/46195204.jpg",
    shouldDisplay: true,
    available:true,
    borrowed:true,
    favourite:false,
    completed:true

  },

  {
    id: 2,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    image: "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg",
    shouldDisplay: true,
    available: false,
    borrowed:false,
    favourite:true,
    completed:true

  },

  {
    id: 3,
    title: "A Good Girl's Guide to Murder",
    author: "Holly Jackson",
    image: "https://m.media-amazon.com/images/I/81-+p+G9WDL._AC_SL1500_.jpg",
    shouldDisplay: true,
    available:true,
    borrowed:true,
    favourite:false,
    completed:false
  },

  {
    id: 4,
    title: "ما رواه البحر",
    author: "ساندرا سراج",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582434073i/50771500.jpg",
    shouldDisplay: true,
    available:true,
    borrowed:true,
    favourite:true,
    completed:true
  },

  {
    id: 5,
    title: "Things We Never Got Over",
    author: "Lucy Score",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXljbqv84f7BPUWLEuoyJ3jTU8tLdp2f91w&s",
    shouldDisplay: true,
    available: false,
    borrowed:true,
    favourite:false,
    completed:true
  },

  {
    id: 6,
    title: "It Ends with Us",
    author: "Colleen Hoover",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4EEPYbDupdhm2d_x7wTPWn8oNarNvC5fFw&s",
    shouldDisplay: true,
    available:true,
    borrowed:true,
    favourite:true,
    completed:true
  },

  {
    id: 7,
    title: "You've Reached Sam",
    author: "Dustin Thao",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1610730335i/53086843.jpg",
    shouldDisplay: true,
    available:false,
    borrowed:false,
    favourite:false,
    completed:false
  },

  {
    id:8,
    title: "Skyhunter",
    author: "Marie Lu",
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1590598478l/53174067.jpg",
    shouldDisplay: true,
    available:true,
    borrowed:false,
    favourite:true,
    completed:false
  }

];

  localStorage.setItem('books', JSON.stringify(books));
}
