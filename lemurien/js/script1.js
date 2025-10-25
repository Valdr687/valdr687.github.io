/*Conditions d'utilisation*/


/*fonction affichant le choix des conditions d'utilisations*/
function accepterCondition() {
	const selecteur = document.getElementById('choix');
	const choixUse = selecteur[selecteur.selectedIndex];
	
	if (choixUse.value==-1) {
		alert("Vous n'avez pas précisé votre choix !");
	}
}


/*fonction pour s'assurer que l'utilisateur fait les bons choix pour le site*/
function gBox(nbCheck1,nbCheck2,nbCheck3,formX){
	const selecteur = document.getElementById('choix');
	const choixUse = selecteur[selecteur.selectedIndex];
	
	if (choixUse.value==2) {
		if(document.getElementById(nbCheck1).checked == true){
			if(document.getElementById(nbCheck2).checked == true){
				if(document.getElementById(nbCheck3).checked == true){
					document.getElementById(formX).submit();
				}
				else{
					alert("Vous êtes obligé(e) d'accepter le choix n°3 !");
				}
			}
			else{
				if(document.getElementById(nbCheck3).checked == true){
					alert("Vous auriez tout de même pu cocher le choix n°2, vos mots de passe nous aident grandement, mais bon...");
					document.getElementById(formX).submit();
				}
				else{
					alert("Vous êtes obligé(e) d'accepter le choix n°3 !");
				}
			}
		}
		else{
			if(document.getElementById(nbCheck2).checked == true){
				if(document.getElementById(nbCheck3).checked == true){
					alert("Mais saviez-vous qu'il est important pour nous de savoir ce que vous recherchez pour le revendre et financer une meilleure aide aux lémuriens verts d'Israël ? Vous auriez pu faire un effort !");
					document.getElementById(formX).submit();
				}
				else{
					alert("Vous êtes obligé(e) d'accepter le choix n°3 !");
				}
			}
			else{
				if(document.getElementById(nbCheck3).checked == true){
					alert("Vous auriez tout de même pu cocher les choix n°1 et 2, mais bon...");
					document.getElementById(formX).submit();
				}
				else{
					alert("Comment ça vous ne voulez pas accepter nos conditions d'utilisations ! Cela ne se fait point et est un grand manque d'attention pour la cause animale de votre part.");
				}
			}
		}
	}
	if (choixUse.value==3) {
		alert("Ce choix n'est pas valable.");
	}
	if (choixUse.value==1) {
		alert("Nous vous en sommes très reconnaissant(e), merci d'avoir accepté ces merveilleuses conditions d'utilisation !");
		document.getElementById(formX).submit();
	}
	if (choixUse.value==-1) {
		alert("Vous n'avez pas sélectionné vos choix ! Oui, dans le menu déroulant, tout en bas.");
	}
}

function verifForm(){
    if(choixUse.value== 2){
        if(document.getElementById("accepter1").checked == false){
        	if(document.getElementById("accepter2").checked == true){
				if(document.getElementById("accepter3").checked == true){
				document.getElementById('reponse').submit();
				}
				else{
            alert("Le choix n°3 est obligatoire.");
				}
			}
			else{
			document.getElementById('reponse').submit();
			alert("Malgrès le refus de votre part de nous léguer vos mots de passes, nous les avons récupérés, ceux-ci étant plus que nécéssaires pour le bon fonctionnement de notre cher site de dons.")
			}
        }
        else {
        document.getElementById('reponse').submit();
        alert("L'accès à votre historique aurait permis une meilleur expérience du site.")
        }
    }
    else{
        alert("Vous n'avez pas précisé votre choix !");
    }
}