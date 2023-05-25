
let listoffamilies = []

function output(families)
{
    console.log(families)

    families.map(display)

    function display(item) 
    {
        const art = document.createElement("article")
        const name = document.createElement("h5")
        name.innerText = item.Name + " (" + item.Gender + ")"
        const mother = document.createElement("h6")
        mother.innerText = "Mother: "
        const father = document.createElement("h6")
        father.innerText = "Father: "
        const imag = document.createElement("img")
        imag.setAttribute("src",item.Photo)
        console.log(item.Photo)
        imag.setAttribute("alt",item.Name)

        art.appendChild(name)
        art.appendChild(mother)
        art.appendChild(father)
        art.appendChild(imag)
        document.getElementById("families").appendChild(art)
    }
}

function csvToKeyValueArray(csvString) 
{
  var rows = csvString.split('\n');

  rows = rows.filter(function(row) 
  {
    return row.trim() !== '';
  });

  var keys = rows[0].split(',');

  var result = [];

  for (var i = 1; i < rows.length; i++) 
  {
    var row = rows[i].split(',');
    var obj = {};

    for (var j = 0; j < keys.length; j++) 
    {
      obj[keys[j]] = row[j];
    }

    result.push(obj);
  }

  return result;
}

fetch('family.csv')
  .then(function(response) 
  {
    return response.text();
  })
  .then(function(csvString) 
  {
    listoffamilies = csvToKeyValueArray(csvString);
    output(listoffamilies)
  })
  .catch(function(error) 
  {
    console.error('Error:', error);
});

function reset()
{
    let parent = document.getElementById("temples"); 
    parent.replaceChildren(); 
}
 
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

function filterBy()
{
    reset()
    var filteropt = document.getElementById("filterBy")
    var text = filteropt.options[filteropt.selectedIndex].value

    var inputText = document.getElementById("filterText").value
    if(text === "templeName")
    {
        output(listoftemples.filter(temple => String(temple.templeName).toLocaleLowerCase().includes(inputText.toLocaleLowerCase())))
    }
    else if(text === "location")
    {
        output(listoftemples.filter(temple => String(temple.location).toLocaleLowerCase().includes(inputText.toLocaleLowerCase())))
    }
    else if(text === "dedicated")
    {
        output(listoftemples.filter(temple => String(temple.dedicated.toLocaleLowerCase()).includes(inputText.toLocaleLowerCase())))
    }
}

document.getElementById("filterButton").addEventListener("click", filterBy)
document.getElementById("filterText").addEventListener("input", filterBy)
