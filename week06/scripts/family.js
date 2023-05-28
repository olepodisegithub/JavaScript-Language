
let listoffamilies = []
let mothername = ""
let fathername = ""
let spousename = ""
let indid = 0
let motherid = 0
let fatherid = 0
let spouseid = 0

function displayElement(families,displayelement)
{
    families.map(createIndividualElement)

    function createIndividualElement(item) 
    {
        if(displayelement === "individual")
        {
          indid = item.IndividualID
          motherid = item.MotherID
          fatherid = item.FatherID
          spouseid = item.HusbandWifeID
        }
        const art = document.createElement("article")
        const name = document.createElement("h5")
        name.innerText = item.Name + ", (" + item.Gender + ")"

        const mother = document.createElement("h6")
        mothername = getIndividualNameByID(item.MotherID)
        mother.innerText = mothername + ", (Mother)"

        const father = document.createElement("h6")
        fathername = getIndividualNameByID(item.FatherID)
        father.innerText = fathername + ", (Father)"

        const spouse = document.createElement("h6")
        spousename = getIndividualNameByID(item.HusbandWifeID)
        spouse.innerText = spousename + ", (Spouse)"

        const imag = document.createElement("img")
        imag.setAttribute("src",item.Photo)
        imag.setAttribute("alt",item.Name)

        name.addEventListener("click", function(e) {
          displayFamilyDetails(e.target.innerText);
         })
        mother.addEventListener("click", function(e) {
          displayFamilyDetails(e.target.innerText);
         })
        father.addEventListener("click", function(e) {
          displayFamilyDetails(e.target.innerText);
         })
         spouse.addEventListener("click", function(e) {
          displayFamilyDetails(e.target.innerText);
         })

        art.appendChild(name)
        art.appendChild(mother)
        art.appendChild(father)
        art.appendChild(spouse)
        art.appendChild(imag)
        document.getElementById(displayelement).appendChild(art)
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
    reset("families")
    displayElement(listoffamilies,"families")
  })
  .catch(function(error) 
  {
    console.error('Error:', error);
});

function reset(element)
{
  let parent = document.getElementById(element); 
  parent.replaceChildren(); 
}

function filterBy()
{
  reset("families")
  reset("individual")
  reset("children")
  reset("parents")
  reset("siblings")
  reset("mmemogolo")
  reset("rremogolo")
  reset("mmangwane")
  reset("rrangwane")
  reset("malome")
  reset("rakgadi")
  reset("setlogolo")
  reset("ntsalae")
  reset("nkukuntatemogolo")
  reset("mogolwagolwane")
  reset("banababana")
  reset("dikokomane")

  var inputText = document.getElementById("filterText").value
  displayElement(listoffamilies.filter(family => String(family.Name.toLocaleLowerCase()).includes(inputText.toLocaleLowerCase())),"families")
}

document.getElementById("filterButton").addEventListener("click", filterBy)
document.getElementById("filterText").addEventListener("input", filterBy)

function displayFamilyDetails(nameandmore)
{
  let names = nameandmore.split(",")
  
  document.getElementById("filterText").value = names[0]
  
  reset("families")

  //individual
  filterIndividual(names[0])

  //his or her children
  filterChildren(indid,"children")

  //parents
  filterParents(motherid,fatherid,"parents")

  //siblings
  filterSiblings(motherid,fatherid,indid)

  //mmemogolo
  filterMmemogolo(motherid)
  
  //rremogolo
  filterRremogolo(fatherid)

  //mmangwane
  filterMmangwane(motherid)

  //rrangwane
  filterRrangwane(fatherid)

  //malome
  filterMalome(getMotherID(motherid),getFatherID(motherid),motherid)

  //rakgadi
  filterRakgadi(getMotherID(fatherid),getFatherID(fatherid),fatherid)
  
  //setlogolo
  filterSetlogolo(motherid,fatherid,indid)

  //ntsalae
  filterNtsalae(motherid,fatherid,indid)
  
  //nkukuntatemogolo
  reset("nkukuntatemogolo")
  filterNkukuNtateMogolo(getMotherID(motherid),getFatherID(motherid),"nkukuntatemogolo")
  filterNkukuNtateMogolo(getMotherID(fatherid),getFatherID(fatherid),"nkukuntatemogolo")
  
  //mogolwagolwane
  
  //banababana
  filterBanaBaBana(indid,"banababana")

  //dikokomane
  filterDikokomane(indid,"dikokomane")
}

function filterDikokomane(id,element)
{
  reset(element)
  let child = listoffamilies.filter(family => family.MotherID === id || family.FatherID === id)
  child.map(fam => listoffamilies.filter(family => family.MotherID === fam.IndividualID || family.FatherID === fam.IndividualID).map(ch => displayElement(listoffamilies.filter(family => family.MotherID === ch.IndividualID || family.FatherID === ch.IndividualID),element)))
}

function filterBanaBaBana(id,element)
{
  reset(element)
  let child = listoffamilies.filter(family => family.MotherID === id || family.FatherID === id)
  child.map(fam => displayElement(listoffamilies.filter(family => family.MotherID === fam.IndividualID || family.FatherID === fam.IndividualID),element))
}

function filterNkukuNtateMogolo(mid,fid,element)
{
  if (mid > 0 && fid > 0)
  {
    let parents = listoffamilies.filter(family => family.IndividualID === mid || family.IndividualID === fid)
    displayElement(parents,element)
  }
  else if (mid > 0)
  {
    let parents = listoffamilies.filter(family => family.IndividualID === mid)
    displayElement(parents,element)
  }
  else if (fid > 0)
  {
    let parents = listoffamilies.filter(family => family.IndividualID === fid)
    displayElement(parents,element)
  }
}

function filterNtsalae(mid,fid,myid)
{
  let divelement = "ntsalae"
  reset(divelement)

  if(mid > 0 && fid > 0)
  {
    let siblings = listoffamilies.filter(family => family.MotherID === mid || family.FatherID === fid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Male")
    siblings.map(fam => displayElement(listoffamilies.filter(family => family.MotherID === fam.IndividualID || family.FatherID === fam.IndividualID),divelement))
    //displayElement(listoffamilies.filter(family => family.MotherID === mid || family.FatherID === fid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Female"),divelement)
  }
  else if(mid > 0)
  {
    let siblings = listoffamilies.filter(family => family.MotherID === mid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Male")
    siblings.map(fam => displayElement(listoffamilies.filter(family => family.MotherID === fam.IndividualID || family.FatherID === fam.IndividualID),divelement))
    //displayElement(listoffamilies.filter(family => family.MotherID === mid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Female"),divelement)
  }
  else if(fid > 0)
  {
    let siblings = listoffamilies.filter(family => family.FatherID === fid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Male")
    siblings.map(fam => displayElement(listoffamilies.filter(family => family.MotherID === fam.IndividualID || family.FatherID === fam.IndividualID),divelement))
    //displayElement(listoffamilies.filter(family => family.FatherID === fid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Female"),divelement)
  }
}

function filterSetlogolo(mid,fid,myid)
{
  let divelement = "setlogolo"
  reset(divelement)

  if(mid > 0 && fid > 0)
  {
    let siblings = listoffamilies.filter(family => family.MotherID === mid || family.FatherID === fid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Female")
    siblings.map(fam => displayElement(listoffamilies.filter(family => family.MotherID === fam.IndividualID || family.FatherID === fam.IndividualID),divelement))
    //displayElement(listoffamilies.filter(family => family.MotherID === mid || family.FatherID === fid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Female"),divelement)
  }
  else if(mid > 0)
  {
    let siblings = listoffamilies.filter(family => family.MotherID === mid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Female")
    siblings.map(fam => displayElement(listoffamilies.filter(family => family.MotherID === fam.IndividualID || family.FatherID === fam.IndividualID),divelement))
    //displayElement(listoffamilies.filter(family => family.MotherID === mid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Female"),divelement)
  }
  else if(fid > 0)
  {
    let siblings = listoffamilies.filter(family => family.FatherID === fid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Female")
    siblings.map(fam => displayElement(listoffamilies.filter(family => family.MotherID === fam.IndividualID || family.FatherID === fam.IndividualID),divelement))
    //displayElement(listoffamilies.filter(family => family.FatherID === fid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Female"),divelement)
  }
}

function filterRakgadi(mid,fid,myid)
{
  let divelement = "rakgadi"
  reset(divelement)

  if(mid > 0 && fid > 0)
  {
    displayElement(listoffamilies.filter(family => family.MotherID === mid || family.FatherID === fid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Female"),divelement)
  }
  else if(mid > 0)
  {
    displayElement(listoffamilies.filter(family => family.MotherID === mid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Female"),divelement)
  }
  else if(fid > 0)
  {
    displayElement(listoffamilies.filter(family => family.FatherID === fid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Female"),divelement)
  }
}

function filterMalome(mid,fid,myid)
{
  let divelement = "malome"
  reset(divelement)

  if(mid > 0 && fid > 0)
  {
    displayElement(listoffamilies.filter(family => family.MotherID === mid || family.FatherID === fid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Male"),divelement)
  }
  else if(mid > 0)
  {
    displayElement(listoffamilies.filter(family => family.MotherID === mid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Male"),divelement)
  }
  else if(fid > 0)
  {
    displayElement(listoffamilies.filter(family => family.FatherID === fid).filter(family => family.IndividualID !== myid).filter(family => family.Gender === "Male"),divelement)
  }
}

function filterRrangwane(fid)
{
  let divelement = "rrangwane"
  reset(divelement)

  let fathermotherid = getMotherID(fid)
  let fatherfatherid = getFatherID(fid)

  if(fid > 0)
  {
    if(fathermotherid > 0 && fatherfatherid > 0)
    {
      displayElement(listoffamilies.filter(family => family.MotherID === getMotherID(fid) || family.FatherID === getFatherID(fid)).filter(family => family.IndividualID !== fid).filter(family => family.Gender === "Male").filter(family => family.FamilyOrder > getFamilyOrder(fid)),divelement)
    }
    else if(fathermotherid > 0)
    {
      displayElement(listoffamilies.filter(family => family.MotherID === getMotherID(fid)).filter(family => family.IndividualID !== fid).filter(family => family.Gender === "Male").filter(family => family.FamilyOrder > getFamilyOrder(fid)),divelement)
    }
    else if(fatherfatherid > 0)
    {
      displayElement(listoffamilies.filter(family => family.FatherID === getFatherID(fid)).filter(family => family.IndividualID !== fid).filter(family => family.Gender === "Male").filter(family => family.FamilyOrder > getFamilyOrder(fid)),divelement)
    }
  }
}

function filterMmangwane(mid)
{
  let divelement = "mmangwane"
  reset(divelement)

  let fathermotherid = getMotherID(mid)
  let fatherfatherid = getFatherID(mid)

  if(mid > 0)
  {
    if(fathermotherid > 0 && fatherfatherid > 0)
    {
      displayElement(listoffamilies.filter(family => family.MotherID === getMotherID(mid) || family.FatherID === getFatherID(mid)).filter(family => family.IndividualID !== mid).filter(family => family.Gender === "Female").filter(family => family.FamilyOrder > getFamilyOrder(mid)),divelement)
    }
    else if(fathermotherid > 0)
    {
      displayElement(listoffamilies.filter(family => family.MotherID === getMotherID(mid)).filter(family => family.IndividualID !== mid).filter(family => family.Gender === "Female").filter(family => family.FamilyOrder > getFamilyOrder(mid)),divelement)
    }
    else if(fatherfatherid > 0)
    {
      displayElement(listoffamilies.filter(family => family.FatherID === getFatherID(mid)).filter(family => family.IndividualID !== mid).filter(family => family.Gender === "Female").filter(family => family.FamilyOrder > getFamilyOrder(mid)),divelement)
    }
  }
}

function filterRremogolo(fid)
{
  let divelement = "rremogolo"
  reset(divelement)

  let fathermotherid = getMotherID(fid)
  let fatherfatherid = getFatherID(fid)

  if(fid > 0)
  {
    if(fathermotherid > 0 && fatherfatherid > 0)
    {
      displayElement(listoffamilies.filter(family => family.MotherID === getMotherID(fid) || family.FatherID === getFatherID(fid)).filter(family => family.IndividualID !== fid).filter(family => family.Gender === "Male").filter(family => family.FamilyOrder < getFamilyOrder(fid)),divelement)
    }
    else if(fathermotherid > 0)
    {
      displayElement(listoffamilies.filter(family => family.MotherID === getMotherID(fid)).filter(family => family.IndividualID !== fid).filter(family => family.Gender === "Male").filter(family => family.FamilyOrder < getFamilyOrder(fid)),divelement)
    }
    else if(fatherfatherid > 0)
    {
      displayElement(listoffamilies.filter(family => family.FatherID === getFatherID(fid)).filter(family => family.IndividualID !== fid).filter(family => family.Gender === "Male").filter(family => family.FamilyOrder < getFamilyOrder(fid)),divelement)
    }
  }
}

function filterMmemogolo(mid)
{
  let divelement = "mmemogolo"
  reset(divelement)

  let fathermotherid = getMotherID(mid)
  let fatherfatherid = getFatherID(mid)

  if(mid > 0)
  {
    if(fathermotherid > 0 && fatherfatherid > 0)
    {
      displayElement(listoffamilies.filter(family => family.MotherID === getMotherID(mid) || family.FatherID === getFatherID(mid)).filter(family => family.IndividualID !== mid).filter(family => family.Gender === "Female").filter(family => family.FamilyOrder < getFamilyOrder(mid)),divelement)
    }
    else if(fathermotherid > 0)
    {
      displayElement(listoffamilies.filter(family => family.MotherID === getMotherID(mid)).filter(family => family.IndividualID !== mid).filter(family => family.Gender === "Female").filter(family => family.FamilyOrder < getFamilyOrder(mid)),divelement)
    }
    else if(fatherfatherid > 0)
    {
      displayElement(listoffamilies.filter(family => family.FatherID === getFatherID(mid)).filter(family => family.IndividualID !== mid).filter(family => family.Gender === "Female").filter(family => family.FamilyOrder < getFamilyOrder(mid)),divelement)
    }
  }
}

function filterSiblings(mid,fid,myid)
{
  let divelement = "siblings"
  reset(divelement)

  if(mid > 0 && fid > 0)
  {
    displayElement(listoffamilies.filter(family => family.MotherID === mid || family.FatherID === fid).filter(family => family.IndividualID !== myid),divelement)
  }
  else if(mid > 0)
  {
    displayElement(listoffamilies.filter(family => family.MotherID === mid).filter(family => family.IndividualID !== myid),divelement)
  }
  else if(fid > 0)
  {
    displayElement(listoffamilies.filter(family => family.FatherID === fid).filter(family => family.IndividualID !== myid),divelement)
  }
}

function filterParents(mid,fid,element)
{
  let divelement = element
  reset(divelement)
  if (mid > 0 && fid > 0)
  {
    displayElement(listoffamilies.filter(family => family.IndividualID === mid || family.IndividualID === fid),divelement)
  }
  else if (mid > 0)
  {
    displayElement(listoffamilies.filter(family => family.IndividualID === mid),divelement)
  }
  else if (fid > 0)
  {
    displayElement(listoffamilies.filter(family => family.IndividualID === fid),divelement)
  }
}

function filterIndividual(namesearch)
{
  reset("individual")

  displayElement(listoffamilies.filter(family => String(family.Name.toLocaleLowerCase()).includes(namesearch.toLocaleLowerCase())),"individual")
}

function getIndividualNameByID(id)
{

  let name = ""
  let motherresult = listoffamilies.filter(family => family.IndividualID === id)
  if (motherresult.length > 0)
  {
    name = motherresult[0].Name
  }
  return name
}

function filterChildren(id,element)
{
  reset(element)
  console.log(id)
  displayElement(listoffamilies.filter(family => family.MotherID === id || family.FatherID === id),element)
}

function getFatherID(id)
{
  return listoffamilies.filter(family => family.IndividualID === id)[0].FatherID
}

function getMotherID(id)
{
  return listoffamilies.filter(family => family.IndividualID === id)[0].MotherID
}

function getFamilyOrder(id)
{
  return listoffamilies.filter(family => family.IndividualID === id)[0].FamilyOrder
}