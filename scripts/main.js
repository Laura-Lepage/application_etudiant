//récupération des valeurs input et les mettre dans une liste d'objets
const sendButton = document.querySelector(".send")
// la variable let mots est déclarée en dehors de l'event click et conserve son état entre les clicks = objets se rajoutent au même tableau
let mots = JSON.parse(localStorage.getItem('mots')) || [] //les deux barres renvoient un tableau vide comme valeur par défaut ce qui permettra au code de fonctionner correctement même si aucune donnée valide n'est trouvée dans le localStorage  
const testButton = document.querySelector(".test")
let hiddenPart = document.querySelector(".hiddenpart")
const backButton = document.querySelector(".back")
const compareButton = document.querySelector(".compare") 
let toTranslate = document.querySelector(".wordToTranslate")
let finalDiv = document.querySelector(".final")
let wordProposition = document.querySelector("#proposition")
let magicNumba
let correctAnswersCount = 0
let correctAnswersDiv = document.querySelector(".correctAnswers")

// fonction pour mettre à jour l'affichage du nombre de mots enregistrés
function updateTotalWords(){
    const totalWords = document.querySelector(".totalWords")
    totalWords.textContent = `Il y a ${mots.length} mot(s) enregistré(s)`;
}

function getRandom() {
    let randomIndex = Math.floor(Math.random() * mots.length)
    return randomIndex
}

function updateLocalStorage(){
    localStorage.setItem('mots', JSON.stringify(mots))
}

function loadWordsFromLocalStorage(){
    mots = JSON.parse(localStorage.getItem('mots')) || [];
    updateTotalWords();
    if (mots.length > 0) {
        testButton.style.display = 'block';
    } else {
        testButton.style.display = 'none';
    }
}

sendButton.addEventListener('click', function(){
    const inputBoxes = document.querySelectorAll('.inputBox')
    
    inputBoxes.forEach(function(inputBox) {
        const original = inputBox.querySelector('#original')
        const traduction = inputBox.querySelector('#traduction')

        if (original.value.trim() !== '' && traduction.value.trim() !== '') {
            mots.push({ original: original.value.toLowerCase(), traduction: traduction.value.toLowerCase() })
        }

        original.value = ''
        traduction.value = ''
    })

    console.log(mots);

    //affichage de la phrase avec le total de mot(s) enregistré(s)
    updateTotalWords()

    // Vérifie si le tableau contient au moins un objet pour afficher le bouton "test"
    if (mots.length > 0) {
        testButton.style.display = 'block';
    } else {
        testButton.style.display = 'none';
    }

    updateLocalStorage()
})


//effacer la liste en cours
const clearButton = document.querySelector(".clearList")

clearButton.addEventListener('click', function(){
    mots = []
    localStorage.removeItem('mots')
    updateTotalWords()
    testButton.style.display = 'none'
   
})

loadWordsFromLocalStorage()


console.log(mots);

testButton.addEventListener('click', function(){
    magicNumba = getRandom()
    hiddenPart.classList.add("slide")
    toTranslate.innerHTML = 
    `
    <h2>Traduis le mot <span>${mots[magicNumba].original}</span></h2> `

    
})

backButton.addEventListener('click', function(){
    hiddenPart.classList.remove("slide")
})

compareButton.addEventListener('click', function(){
    
    if (wordProposition.value == mots[magicNumba].traduction){ 
        finalDiv.textContent = `Good 😄!`
        correctAnswersCount++;
        magicNumba = getRandom()
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


