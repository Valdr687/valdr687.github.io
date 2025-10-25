//Variables textuelles
var MonAge ;
var NbrTelechargementPMC = 4_233;
var NbrVuesPMC = "22 732";
var ScorePIX = 768;

// API 

$(document).ready(function() {
  $.ajax({
    url: "https://api.modrinth.com/v2/project/LBcosBrl",
    type: "GET",
    dataType: "json",
    success: function(result) {
      var data = result;
      console.log("Nombre de téléchargements Modrinth" + data.downloads )
      $("#res").text(textString);
    },
    error: function(error) {
      console.log(error);
    }
  });
});


//Calcul de l'age

var dob = new Date("12/11/2005");  //Format américain ! : MM/JJ/AAAA
var month_diff = Date.now() - dob.getTime();  
var age_dt = new Date(month_diff); 
var year = age_dt.getUTCFullYear(); 

var MonAge = Math.abs(year - 1970);  



