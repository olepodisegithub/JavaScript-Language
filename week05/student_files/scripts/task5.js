/* Lesson 5 */

/* IF/ELSE IF */

// Step 1: Declare and initialize a new variable to hold the current date
const currentdate = new Date()
// Step 2: Declare another variable to hold the day of the week
let dayoftheweek = 0
// Step 3: Using the variable declared in Step 1, assign the value of the variable declared in Step 2 to the day of the week ( hint: getDay() )
dayoftheweek = currentdate.getDay()
// Step 4: Declare a variable to hold a message that will be displayed
let message = ""
// Step 5: Using an if statement, if the day of the week is a weekday (i.e. Monday - Friday), set the message variable to the string 'Hang in there!'
if(dayoftheweek >= 1 && dayoftheweek <= 5)
{
    message = "Hang in there!"
}
else
{
    message = "Woohoo!  It is the weekend!" // Step 6: Using an else statement, set the message variable to 'Woohoo!  It is the weekend!'
}

/* SWITCH, CASE, BREAK */

// Step 1: Declare a new variable to hold another message
let anothermessage = ""
// Step 2: Use switch, case and break to set the message variable to the day of the week as a string (e.g. Sunday, Monday, etc.) using the day of week variable declared in Step 2 above
switch (dayoftheweek) 
{
    case 0:
        anothermessage = "Sunday";
        break;
    case 1:
        anothermessage = "Monday";
        break;
    case 2:
        anothermessage = "Tuesday";
        break;
    case 3:
        anothermessage = "Wednesday";
        break;
    case 4:
        anothermessage = "Thursday";
        break;
    case 5:
        anothermessage = "Friday";
        break;
    case 6:
        anothermessage = "Saturday";
}

/* OUTPUT */

// Step 1: Assign the value of the first message variable to the HTML element with an ID of message1
document.getElementById('message1').innerText = message
// Step 2: Assign the value of the second message variable to the HTML element with an ID of message2
document.getElementById('message2').innerText = anothermessage
/* FETCH */
// Step 1: Declare a global empty array variable to store a list of temples
let listoftemples = []
// Step 2: Declare a function named output that accepts a list of temples as an array argument and does the following for each temple:
// - Creates an HTML <article> element
// - Creates an HTML <h3> element and add the temple's templeName property to it
// - Creates an HTML <h4> element and add the temple's location property to it
// - Creates an HTML <h4> element and add the temple's dedicated property to it
// - Creates an HTML <img> element and add the temple's imageUrl property to the src attribute and the temple's templeName property to the alt attribute
// - Appends the <h3> element, the two <h4> elements, and the <img> element to the <article> element as children
// - Appends the <article> element to the HTML element with an ID of temples
function output(temples)
{
    console.log(temples)

    temples.map(display)

    function display(item) 
    {
        const art = document.createElement("article")
        const h3 = document.createElement("h3")
        h3.innerText = item.templeName
        const h41 = document.createElement("h4")
        h41.innerText = item.location
        const h42 = document.createElement("h4")
        h42.innerText = item.dedicated
        const imag = document.createElement("img")
        imag.setAttribute("src",item.imageUrl)
        imag.setAttribute("alt",item.templeName)

        art.appendChild(h3)
        art.appendChild(h41)
        art.appendChild(h42)
        art.appendChild(imag)
        document.getElementById("temples").appendChild(art)
    }
}
// Step 3: Create another function called getTemples. Make it an async function.
// Step 4: In the function, using the built-in fetch method, call this absolute URL: 'https://byui-cse.github.io/cse121b-course/week05/temples.json'. Create a variable to hold the response from your fetch. You should have the program wait on this line until it finishes.
// Step 5: Convert your fetch response into a Javascript object ( hint: .json() ). Store this in the templeList variable you declared earlier (Step 1). Make sure the the execution of the code waits here as well until it finishes.
// Step 6: Finally, call the output function and pass it the list of temples. Execute your getTemples function to make sure it works correctly.
async function getTemples() 
{
    const response = await fetch("https://byui-cse.github.io/cse121b-course/week05/temples.json");
    if (response.ok) 
    {
        listoftemples = await response.json()
        output(listoftemples)
    }
}

getTemples()

// Step 7: Declare a function named reset that clears all of the <article> elements from the HTML element with an ID of temples
function reset()
{
    let parent = document.getElementById("temples"); 
    parent.replaceChildren(); 
}
 
// Step 8: Declare a function named sortBy that does the following:
// - Calls the reset function
// - Sorts the global temple list by the currently selected value of the HTML element with an ID of sortBy
// - Calls the output function passing in the sorted list of temples
function sortBy()
{
    reset()
    var sorttext = document.getElementById("sortBy")
    var text = sorttext.options[sorttext.selectedIndex].value
    if(text === "templeNameAscending")
    {
        output(listoftemples.sort((a, b) => a.templeName.localeCompare(b.templeName)))
    }
    else if(text === "templeNameDescending")
    {
        output(listoftemples.sort((a, b) => b.templeName.localeCompare(a.templeName)))
    }
}
// Step 9: Add a change event listener to the HTML element with an ID of sortBy that calls the sortBy function
document.getElementById("sortBy").addEventListener("change", sortBy)

/* STRETCH */

// Consider adding a "Filter by" feature that allows users to filter the list of temples
// This will require changes to both the HTML and the JavaScript files
function filterBy()
{
    reset()
    var filteropt = document.getElementById("filterBy")
    var text = filteropt.options[filteropt.selectedIndex].value

    var inputText = document.getElementById("filterText").value
    if(text === "templeName")
    {
        output(listoftemples.filter(temple => String(temple.templeName).includes(inputText)))
    }
    else if(text === "location")
    {
        output(listoftemples.filter(temple => String(temple.location).includes(inputText)))
    }
    else if(text === "dedicated")
    {
        output(listoftemples.filter(temple => String(temple.dedicated).includes(inputText)))
    }
}

document.getElementById("filterButton").addEventListener("click", filterBy)
