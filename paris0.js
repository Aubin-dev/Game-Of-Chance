
/*
 * ----
 * LE JEU DU LOTO
 * ----
 */

let time = parseInt(localStorage.getItem('time')) || 30


let choix
let argent
let tri = []
let perte = ''
let gain = 0
let resultat = []
let numero_ticket = 0

let paris =[]
let pari = {}

let resultat_finaux


let entree = prompt("Entrer votre chiffre n°1")
// === Verifie si le premier caractère des entrée est un chiffre ou une lettre
if (isNaN(parseInt(entree[0]))) {
    alert('Vous n\'etes pas autorisé à entrer des lettres !!!!')
} else {
    choix = entree.split(' ')
    // === enregistre le numéro de ticket en local
    numero_ticket = Math.floor(Math.random()*100)

    pari.ticket = numero_ticket
    pari.pronos = choix

    // === enregistre les choix si tout est correct
    console.log(`Les nombres que vous avez choisi sont ${choix}`)
    argent = parseInt(prompt("Combien voulez-vous miser ?"))

    
    // === Verifie si la somme est supérieur à 200
    if (isNaN(argent)) {
        alert('Entrer la somme en chiffre !!!!')
    } else if (argent < 200) {
        alert('Vous ne pouvez miser une somme inférieur à 200')
    }else{
        // === enregistre la somme si elle est correct
        pari.mise = argent
    }
}

console.log(`\nPatientez pour les résultats finaux, votre numéro de ticket est le ${numero_ticket}`)


// === enregistre les paris en local si le timer n'est pas encore fini
if (time > 0) {

    if(localStorage.getItem('paris')){

        let tousLesParis = JSON.parse(localStorage.getItem('paris'))
    
        tousLesParis.push(pari)
    
        localStorage.setItem('paris' , JSON.stringify(tousLesParis))
    } else {
        // === enregistre les nouveaux paris si aucun paris n'a déjà été enregistré
        paris = [...paris, pari]
        localStorage.setItem('paris' , JSON.stringify(paris))
    }

} else {

    alert('Les paris sont finis pour aujourd\'hui !!')

}


let timer = setInterval(()=>{

    time--
    localStorage.setItem('time' , time)


    if(time === 0 ){

        clearInterval(timer)
        localStorage.removeItem('time')
        alert('TERMINÉ !!!')

        for (let i = 0; i <= 5; i++) {
            /* Transforme en chaine de caractère le nombre généré,
             tout en prenant la partie entière */
            let tri_1 = (Math.floor(Math.random()*99)).toString()
            tri.push(tri_1)
        }
        console.log(`\nLes nombres du tirages sont : ${tri}`)

        // === verifie que les choix sont inclus dans le tableau des triages
        // === et multiplie les gains en fonction des resultats
        choix.forEach(items => {
            if (tri.includes(items)) {
                resultat.push(items)
                if (resultat.length < 2) {
                    gain = argent
                    pari.gain = gain 
                } else if (resultat.length === 2) {
                    gain = argent + argent*2
                    pari.gain = gain 
                } else if (resultat.length > 2) {
                    gain = argent + argent*4
                    pari.gain = gain 
                } else {
                    gain = 0
                    pari.gain = gain 
                }
            }
        });

        resultat_finaux = JSON.parse(localStorage.getItem('paris'))
        console.log(`Les resultats sont disponible !!!`)

        for (let i = 0; i < resultat_finaux.length; i++) {
            let element = resultat_finaux[i];
            if (element.gain !== undefined) {
                console.log(`Ticket n°${element.ticket} vous gagnez la somme de ${element.gain}FRCFA`)
            } else {
                console.log(`Ticket n°${element.ticket} vous repartez les mains vide`)
            }
        }

    }
},1000)