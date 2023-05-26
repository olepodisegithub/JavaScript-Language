
let listoffamilies = []

function output(families)
{
    console.log(families)

    reset()

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
        console.log(item.Photo)
        imag.setAttribute("src",item.Photo)
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
    let parent = document.getElementById("families"); 
    parent.replaceChildren(); 
}

function filterBy()
{
  var inputText = document.getElementById("filterText").value
  output(listoffamilies.filter(family => String(family.Name.toLocaleLowerCase()).includes(inputText.toLocaleLowerCase())))
}

document.getElementById("filterButton").addEventListener("click", filterBy)
document.getElementById("filterText").addEventListener("input", filterBy)
