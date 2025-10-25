//Variables & fonctions
const NbrTelechargementPMC = 5_035;
Download = []
DownloadThreshold = {"4000": "four thousands","5000": "five thousands","6000": "six thousands",
"7000": "seven thousands","8000": "eight thousands","9000": "eight thousands","10000": "ten thousands",
"15000": "fifteen thousands","20000": "twenty thousands"}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function getKey(number) {
  number = Math.floor(number/1000)*1000;
  if (number <= 10_000) {
    return number.toString() ;
  }
  else if ( number >= 15_000 && number <= 20_000 ) {
    return "15000";
  }
  else if ( number >= 20_000) {
    return "20000";
  }
}

// API 

function getData(id) {
  console.log("https://api.modrinth.com/v2/project/"+id)
  $.ajax({
      type: "GET",
      async: false,
      url: "https://api.modrinth.com/v2/project/"+id,
      dataType: "json",
      success: function(response) {
        Download.push(response.downloads) ;
      },
      error: function(error) {
        console.log(error);
      }
  });
}

//Insertion des variables

$(document).ready(function () {
  //Vervada
  getData('4Dg1DEy1');
  getData('maQkz5tH');
  getData('CG0q8SZ2');
  
  var totalDownloads = NbrTelechargementPMC;
  for (let i in Download) {
    totalDownloads += Download[i];
  }
  var texte = DownloadThreshold[getKey(totalDownloads)];
  $("#downloads").text(texte);
});












