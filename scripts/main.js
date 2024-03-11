// =============
//   variables 
// =============
const original = document.querySelector('#original')
const traduction = document.querySelector('#traduction')
const sendButton = document.querySelector(".send")
const testButton = document.querySelector(".test")
let hiddenPart = document.querySelector(".hiddenpart")
const backButton = document.querySelector(".back")
const compareButton = document.querySelector(".compare") 
let toTranslate = document.querySelector(".wordToTranslate")
let finalDiv = document.querySelector(".final")
let wordProposition = document.querySelector("#proposition")
let correctAnswersDiv = document.querySelector(".correctAnswers")
let ulWordsList = document.querySelector(".ulwordslist")
let pWordsList = document.querySelector(".pwordslist")

// la variable let mots est déclarée en dehors de l'event click et conserve son état entre les clicks = objets se rajoutent au même tableau
let mots = []
let magicNumba
let correctAnswersCount = 0

// ===============
//    fonctions
// ===============

//mettre à jour l'affichage du nombre de mots enregistrés
function updateTotalWords(){
    const totalWords = document.querySelector(".totalWords")
    totalWords.textContent = `Il y a ${mots.length} mot(s) enregistré(s)`;
}

// va chercher un nombre aléatoire en fonction de la longueur du tableau 
function getRandom(table){
    return Math.floor(Math.random() * table.length)
}

//vérifie si localStorage est déjà plein ou pas
function loadWordsFromLocalStorage(){
    mots = JSON.parse(localStorage.getItem('mots')) || []
    updateTotalWords()
    if (mots.length > 0) {
        testButton.style.display = 'block';
    } else {
        testButton.style.display = 'none';
    }
}

function Checklist(){
    if (ulWordsList.childElementCount != 0){
        pWordsList.innerHTML = ``
    } else {
        pWordsList.innerHTML = `Vous n'avez pas enregistré de mot(s)` 
    }
}


// ============
//    events
// ============

//vérification au lancement de la page
loadWordsFromLocalStorage()



//Quand on clique pour Enregistrer un mot
sendButton.addEventListener('click', function(){
    if (original.value.trim() !== '' && traduction.value.trim() !== ''){
        mots.push(
            {
                "original" : original.value,
                "traduction" : traduction.value,
            }
        )
        //effacer la liste avant d'ajouter des nouveaux éléments
        ulWordsList.innerHTML = "" 

        for (let i = 0; i < mots.length; i++) {
            ulWordsList.innerHTML += `
                <li>${mots[i].original}: ${mots[i].traduction}<button class="cross">❌</button></li>
            `
        }
        
        let boutons = document.querySelectorAll(".cross")
        boutons.forEach(function(bouton){
            bouton.addEventListener('click', function(){
                // Récupérer l'index de l'élément à supprimer à partir de l'attribut data-index
                let index = parseInt(bouton.getAttribute('data-index'));
                // Supprimer l'élément du tableau mots
                mots.splice(index, 1)
                // Supprimer l'élément de la liste HTML
                bouton.parentElement.remove()
                
                // Mettre à jour la checklist
                Checklist()
                updateTotalWords()
                console.log(mots);
                
                
            })     
        })   
        Checklist()


    }
    original.value = ''
    traduction.value = ''
    localStorage.setItem('mots', JSON.stringify(mots))
    
    console.log(mots);

    //affichage de la phrase avec le total de mot(s) enregistré(s)
    updateTotalWords()

    // Vérifie si le tableau contient au moins un objet pour afficher le bouton "test"
    if (mots.length > 0) {
        testButton.style.display = 'block';
    } else {
        testButton.style.display = 'none';
    }

    

    
})




//Quand on clique sur le bouton Effacer = effacer la liste en cours
const clearButton = document.querySelector(".clearList")

clearButton.addEventListener('click', function(){
    mots = []
    localStorage.clear()
    updateTotalWords()
    testButton.style.display = 'none'

    ulWordsList.innerHTML = ""
    pWordsList.innerHTML = `Vous n'avez pas enregistré de mot(s)` 
   
})

console.log(mots);

testButton.addEventListener('click', function(){
    magicNumba = getRandom(mots)
    hiddenPart.classList.add("slide")
    toTranslate.innerHTML = 
    `
    <h2>Traduis le mot <span>${mots[magicNumba].original}</span></h2> `

    
})

backButton.addEventListener('click', function(){
    hiddenPart.classList.remove("slide")
    correctAnswersDiv.textContent = ""
    correctAnswersCount = 0
})

compareButton.addEventListener('click', function(){
    
    if (wordProposition.value == mots[magicNumba].traduction){ 
        finalDiv.textContent = `Good 😄!`
        correctAnswersCount++;
        magicNumba = getRandom(mots)
        toTranslate.innerHTML = 
        `
        <h2>Traduis le mot <span>${mots[magicNumba].original}</span></h2> `

        correctAnswersDiv.textContent = `Vous avez ${correctAnswersCount} bonne(s) réponse(s)`
    } else{
        finalDiv.textContent = `Ratay 😥!`
    }
    setTimeout(function(){
        finalDiv.textContent = "";
    }, 3000)
    wordProposition.value = ""
    
})


