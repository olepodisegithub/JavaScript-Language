/* Lesson 3 */

/* FUNCTIONS */

// Step 1: Using function declaration, define a function named add that takes two arguments, number1 and number2

// Step 2: In the function, return the sum of the parameters number1 and number2

// Step 3: Step 3: Using function declaration, define another function named addNumbers that gets the values of two HTML form controls with IDs of addend1 and addend2. Pass them to the add function

// Step 4: Assign the return value to an HTML form element with an ID of sum

// Step 5: Add a "click" event listener to the HTML button with an ID of addNumbers that calls the addNumbers function

// Step 6: Using function expressions, repeat Steps 1-5 with new functions named subtract and subtractNumbers and HTML form controls with IDs of minuend, subtrahend, difference and subtractNumbers

// Step 7: Using arrow functions, repeat Steps 1-5 with new functions named multiply and mulitplyNumbers and HTML form controls with IDs of factor1, factor2, product and multiplyNumbers

// Step 8: Using any of the three function declaration types, repeat Steps 1-5 with new functions named divide and divideNumbers and HTML form controls with IDs of dividend, divisor, quotient and divideNumbers

// Step 9: Test all of the mathematical functionality of the task3.html page.

// adding number
function add(number1, number2)
{
	return (parseFloat(number1) + parseFloat(number2))
}

function addNumbers()
{
    let num1 = document.getElementById('addend1').value
    let num2 = document.getElementById('addend2').value
    let sumed = add(num1,num2)
    document.getElementById('sum').value = sumed
}

document.querySelector("#addNumbers").addEventListener("click", addNumbers)

// subtract numbers
function subtract(number1, number2)
{
	return (parseFloat(number1) - parseFloat(number2))
}

function subtractNumbers()
{
    let num1 = document.getElementById('minuend').value
    let num2 = document.getElementById('subtrahend').value
    let subtracted = subtract(num1,num2)
    document.getElementById('difference').value = subtracted
}

document.querySelector("#subtractNumbers").addEventListener("click", subtractNumbers)

// multiply numbers
function multiply(number1, number2)
{
	return (parseFloat(number1) * parseFloat(number2))
}

function mulitplyNumbers()
{
    let num1 = document.getElementById('factor1').value
    let num2 = document.getElementById('factor2').value
    let multiplied = multiply(num1,num2)
    document.getElementById('product').value = multiplied
}

document.querySelector("#multiplyNumbers").addEventListener("click", mulitplyNumbers)

// dividing numbers
function divide(number1, number2)
{
	return (parseFloat(number1) / parseFloat(number2))
}

function divideNumbers()
{
    let num1 = document.getElementById('dividend').value
    let num2 = document.getElementById('divisor').value
    let divided = divide(num1,num2)
    document.getElementById('quotient').value = divided
}

document.querySelector("#divideNumbers").addEventListener("click", divideNumbers)


/* BUILT-IN METHODS */

// Step 1: Declare and instantiate a variable of type Date to hold the current date
const currentdate = new Date()
// Step 2: Declare a variable to hold the current year
let currentyear = 0
// Step 3: Using the variable declared in Step 1, call the built-in getFullYear() method/function and assign it to the variable declared in Step 2
currentyear = currentdate.getFullYear()
// Step 4: Assign the current year variable to an HTML form element with an ID of year
document.getElementById('year').innerText = currentyear

/* ARRAY METHODS */

// Step 1: Declare and instantiate an array variable to hold the numbers 1 through 25
const numbers = []

for(var num = 1; num <= 25; num++) 
{
    numbers.push(num)
 }
// Step 2: Assign the value of the array variable to the HTML element with an ID of "array"
document.getElementById('array').innerText = numbers
// Step 3: Use the filter array method to find all of the odd numbers of the array variable and assign the reult to the HTML element with an ID of "odds" ( hint: % (modulus operartor) )
document.getElementById('odds').innerText = numbers.filter((number) => number % 2 === 1)
// Step 4: Use the filter array method to find all of the even numbers of the array variable and assign the result to the HTML element with an ID of "evens"
document.getElementById('evens').innerText = numbers.filter((number) => number % 2 === 0)
// Step 5: Use the reduce array method to sum the array variable elements and assign the result to the HTML element with an ID of "sumOfArray"
document.getElementById('sumOfArray').innerText = numbers.reduce((sumTotal, val) => sumTotal + val, 0)
// Step 6: Use the map array method to multiple each element in the array variable by 2 and assign the result to the HTML element with an ID of "multiplied"
let multipled = numbers.map(function(number){
    return number * 2
})
document.getElementById('multiplied').innerText = multipled
// Step 7: Use the map and reduce array methods to sum the array elements after multiplying each element by two.  Assign the result to the HTML element with an ID of "sumOfMultiplied"
let sumMultipled = multipled.reduce((sumTotal, val) => sumTotal + val, 0)
document.getElementById('sumOfMultiplied').innerText = sumMultipled