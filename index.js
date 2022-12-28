//importing the objects data that contains cat images 
import { catsData } from '/data.js'

//reaching HTML elements 
const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')


//Event listeners and their functions
//Radio buttons changes 
emotionRadios.addEventListener('change', highlightCheckedOption)
//Hide the image box 
memeModalCloseBtn.addEventListener('click', closeModal)
//Call renderCat() => getSingleCatObject() => getMatchingCatsArray()
getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderCat(){
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML =  `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
    memeModal.style.display = 'flex'
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    //If we have only one cat data after filtering
    if(catsArray.length === 1){
        return catsArray[0]
    }
    //If we have more than one cat after filtering
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}
//
function getMatchingCatsArray(){
    //If any of the radio buttons is selected   
    if(document.querySelector('input[type="radio"]:checked')){
        //storing the selected emotion
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        //Storing the boolean data If the "animated GIFS only" checkbox is checked or not 
        const isGif = gifsOnlyOption.checked
        //filtering the data 
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}
//When creating an emotion array, each emotion is included only once.( not [moody,sad,moody])
function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

//Rendering the radio buttons of emotions
function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)




