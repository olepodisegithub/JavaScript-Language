/* Lesson 2 */

/* VARIABLES */

// Step 1: declare and instantiate a variable to hold your name
const myname = "Oaitse Lepodise";

// Step 2: place the value of the name variable into the HTML file (hint: document.querySelector())
document.getElementById('name').innerText = myname

// Step 3: declare and instantiate a variable to hold the current year
const year = new Date().getFullYear()

// Step 4: place the value of the current year variable into the HTML file
document.getElementById('year').innerText = year

// Step 5: declare and instantiate a variable to hold the name of your picture
const picturename = 'images/IMG_20180830_144506.jpg'

// Step 6: copy your image into the "images" folder

// Step 7: place the value of the picture variable into the HTML file (hint: document.querySelector().setAttribute())
document.querySelector('img').setAttribute("src",picturename)


/* ARRAYS */

// Step 1: declare and instantiate an array variable to hold your favorite foods
const foods = ["Beans", "Chapati", "Pancakes"];

// Step 2: place the values of the favorite foods variable into the HTML file
document.getElementById('food').innerText = foods

// Step 3: declare and instantiate a variable to hold another favorite food
const food = "Rice and Chicken"

// Step 4: add the variable holding another favorite food to the favorite food array
foods.push(food)

// Step 5: repeat Step 2
document.getElementById('food').innerText = foods

// Step 6: remove the first element in the favorite foods array
foods.shift()

// Step 7: repeat Step 2
document.getElementById('food').innerText = foods

// Step 8: remove the last element in the favorite foods array
foods.pop()

// Step 7: repeat Step 2
document.getElementById('food').innerText = foods


