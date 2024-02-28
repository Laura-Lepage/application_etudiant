//récupération des valeurs input et les mettre dans une liste d'objets
const sendButton = document.querySelector(".send")
let mots = [] //déclaré en dehors de l'event click et conserve son état entre les clicks = objets se rajoutent au même tableau
const testButton = document.querySelector(".test")


// fonction pour mettre à jour l'affichage du nombre de mots enregistrés
function updateTotalWords(){
    const totalWords = document.querySelector(".totalWords")
    totalWords.textContent = `Il y a ${mots.length} mot(s) enregistré(s)`;
}

sendButton.addEventListener('click', function(){
    const inputBoxes = document.querySelectorAll('.inputBox')
    
    inputBoxes.forEach(function(inputBox) {
        const original = inputBox.querySelector('#original')
        const traduction = inputBox.querySelector('#traduction')

        if (original.value.trim() !== '' && traduction.value.trim() !== '') {
            mots.push({ original: original.value, traduction: traduction.value })
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
})

//effacer la liste en cours
const clearButton = document.querySelector(".clearList")

clearButton.addEventListener('click', function(){
    mots = []
    updateTotalWords()
    testButton.style.display = 'none'
   
})
