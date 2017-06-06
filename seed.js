const Promise = require('bluebird');
const models = require('./server/db');
const db = models.db;
const Item = models.Item;
const User = models.User;
const Inventory = models.Inventory;
const Category = models.Category;

const users = [
    { name: 'Steven Universe', email: 'Steven.Universe@gmail.com', password: 'hello', isAdmin: false },
    { name: 'Garnet', email: 'Garnet@gmail.com', password: 'password', isAdmin: false },
    { name: 'Kate Bush', email: 'Kate.Bush@gmail.com', password: 'testpw', isAdmin: false },
    { name: 'Steve', email: 'peter.griffin.the2nd@gmail.com', password: 'hello', isAdmin: false },
    { name: 'SNARF', email: 'SNARF.SNARF.the2nd@gmail.com', password: 'password', isAdmin: false },
    { name: 'LIONO', email: 'LIONO.LIONO.thundercats@gmail.com', password: 'testpw', isAdmin: false },
    { name: 'Panthar', email: 'Panthar.Panthar.the2nd@gmail.com', password: 'hello', isAdmin: false },
    { name: 'MUFASA', email: 'MUFASA.griffin.the2nd@gmail.com', password: 'testpw', isAdmin: false },
    { name: 'Grant', email: 'grant@fullstack.com', password: 'deadoralive', isAdmin: true },
    { name: 'Candice', email: 'candice@fullstack.com', password: 'deadoralive', isAdmin: true }
]

const items = [
    { name: 'J.K. Rowling', description: 'Have lunch with J.K. Rowling! She is a really interesting dining companion.', price: 10000, imageUrl: 'https://hulshofschmidt.files.wordpress.com/2011/12/jk-rowling-harry-potter.jpg', inventoryId: 1, categoryId: 2 },
    { name: 'Barack Obama', description: 'Im pretty sure theres a lot more to life than being really, really, ridiculously good looking. And I plan on finding out what that is.', price: 700000, imageUrl: 'http://thehill.com/sites/default/files/obama%20waving.jpg', inventoryId: 2, categoryId: 2 },
    { name: 'Derek Zoolander', description: 'Im pretty sure theres a lot more to life than being really, really, ridiculously good looking. And I plan on finding out what that is.', price: 7000, imageUrl: 'https://pbs.twimg.com/profile_images/616002132/dz.jpg', inventoryId: 3, categoryId: 1 },
    { name: 'Martin Luther King Jr.', description: 'A once in a lifetime opportunity to be in the presence of MLK Jr! Truly priceless but available here for a low low price of ...', price: 1000000, imageUrl: 'http://www.americaslibrary.gov/assets/aa/king/aa_king_subj_e.jpg', inventoryId: 4, categoryId: 1 },
    { name: 'Francis Underwood', description: 'Im pretty sure theres a lot more to life than being really, really, ridiculously good looking. And I plan on finding out what that is.', price: 9999, imageUrl: 'http://sm.askmen.com/t/askmen_me/gallery/f/frank-underwood-quotes/frank-underwood-quotes_j7z8.640.jpg', inventoryId: 5, categoryId: 2 },
    { name: 'Sean Spicer', description: 'No one will have lunch with me! Unless you will?', price: 99, imageUrl: 'http://www.trbimg.com/img-5898dbc4/turbine/la-et-sean-spicer-20170206', inventoryId: 6, categoryId: 1 },
    { name: 'Geoff Bass', description: 'Im pretty sure theres a lot more to life than being really, really, ridiculously good looking. And I plan on finding out what that is.', price: 10100, imageUrl: 'https://cloud.fullstackacademy.com/geoff.jpg?mtime=20170205092855', inventoryId: 7, categoryId: 2 },
    { name: 'Jasiu Leja', description: 'Im pretty sure theres a lot more to life than being really, really, ridiculously good looking. And I plan on finding out what that is.', price: 10100, imageUrl: 'https://ca.slack-edge.com/T024FPYBQ-U5080RTHT-19ddf8ffeabc-1024', inventoryId: 8, categoryId: 2 },
    { name: 'Hildegard Von Bingen', description: 'Im pretty sure theres a lot more to life than being really, really, ridiculously good looking. And I plan on finding out what that is.', price: 7900, imageUrl: 'http://thecatholiccatalogue.com/wp-content/uploads/2015/09/maxresdefault-1.jpg', inventoryId: 9, categoryId: 1 },
    { name: 'William Shakespeare', description: 'Im pretty sure theres a lot more to life than being really, really, ridiculously good looking. And I plan on finding out what that is.', price: 50000, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/William_Shakespeare_1609.jpg', inventoryId: 10, categoryId: 1 }
]

const inventories = [
    { quantity: 10 },
    { quantity: 5 },
    { quantity: 40 },
    { quantity: 1 },
    { quantity: 3 },
    { quantity: 1000 },
    { quantity: 4 },
    { quantity: 2 },
    { quantity: 5 },
    { quantity: 1 }
]

const categories = [
    { name: 'dead' },
    { name: 'alive' }
]

function createUsers() {
    return Promise.map(users, function(user) {
        return User.create(user);
    })
}

function createItems() {
    return Promise.map(items, function(item) {
        return Item.create(item);
    })
}

function createInventory() {
    return Promise.map(inventories, function(inventory) {
        return Inventory.create(inventory);
    })
}

function createCategories() {
    return Promise.map(categories, function(category) {
        return Category.create(category);
    })
}

function seed() {
    console.log('...creating users...');
    return createUsers()
        .then(function() {
            console.log('...creating inventory...');
            return createInventory();
        })
        .then(function() {
            console.log('...creating categories...');
            return createCategories();
        })
        .then(function() {
            console.log('...creating items...');
            return createItems()
        })
        .catch(console.error)
}

console.log('Syncing database');

db.sync({ force: true })
    .then(function() {
        console.log('Dropped old data, now seeding');
        return seed();
    })
    .then(function() {
        console.log('Seeding successful');
    }, function(err) {
        console.error('Error while seeding');
        console.error(err.stack);
    })
    .finally(function() {
        db.close();
        return null;
    });


/*
var db = require('./db');
var Student = require('./db/models/Student');
var Campus = require('./db/models/Campuses');


var Promise = require('bluebird');


const data = {
  campuses: [
    {name: 'Mars', imageURL:  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1200px-OSIRIS_Mars_true_color.jpg', content: 'I like to JS' },
    {name: 'Saturn', imageURL:  'http://space-facts.com/wp-content/uploads/mars.jpg'},
    {name: 'Pluto', imageURL:  'https://upload.wikimedia.org/wikipedia/commons/a/a7/Pluto-01_Stern_03_Pluto_Color_TXT.jpg'},
    {name: 'Europa', imageURL:  'https://www.google.com/search?q=mars&source=lnms&tbm=isch&sa=X&ved=0ahUKEwip84Sh-43UAhXEXBoKHSk3A84Q_AUIDCgD&biw=1216&bih=612&dpr=2#tbm=isch&q=europa+moon&imgrc=x3mwBGBkn_-J5M:'},
    {name: 'Venu', imageURL:  'https://upload.wikimedia.org/wikipedia/commons/8/85/Venus_globe.jpg'}

  ],
  students: [
    {name: 'Steven Universe', email: 'Steven.Universe@gmail.com', campusId: 2}, 
    {name: 'Garnet', email: 'Garnet@gmail.com', campusId: 2}, 
    {name: 'Kate Bush', email: 'Kate.Bush@gmail.com', campusId: 1},
    {name: 'Steve', email: 'peter.griffin.the2nd@gmail.com', campusId: 3}, 
    {name: 'SNARF', email: 'SNARF.SNARF.the2nd@gmail.com', campusId: 1}, 
    {name: 'LIONO', email: 'LIONO.LIONO.thundercats@gmail.com', campusId: 3},
    {name: 'Panthar', email: 'Panthar.Panthar.the2nd@gmail.com', campusId: 4},
    {name: 'LIONO', email: 'meg.griffin.the2nd@gmail.com', campusId: 4},
    {name: 'MUFASA', email: 'MUFASA.griffin.the2nd@gmail.com', campusId: 5}
  ]
}


db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  const addingCampus = Promise.map(data.campuses, function (campus) {
    return Campus.create(campus);
  });

  return  addingCampus;

})
.then(function () {
  console.log('Finished inserting data');
  const addingStudent = Promise.map(data.students, function (student) {
    return Student.create(student);
  })
  return addingStudent;

})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});
*/