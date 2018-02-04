'use strict'

var hwBase = {};
var themeNum=1;

// -----------------V---Find DIVs for insert theme details------V--------

var themeHoursDiv, themeDeadlineDiv, themeNumberDiv, themeTitleDiv, themeDescDiv, choseGroup, nextThemeBtn;
window.addEventListener('DOMContentLoaded', function(){
    if(document.querySelector('div.d-holderAdmin')) {
        findHwBlocks = findHwBlocksAdm;           // підміна тіла фунуції (адмін або студент)
        showThemDetails = showThemDetailsAdm;     // підміна тіла фунуції (адмін або студент)
        }
    findHwBlocks()
} );

function findHwBlocksAdm(){
    themeNumberDiv = document.querySelector('.d-hwThemeNum__input');
    themeNumberDiv.addEventListener('change', getThemeNum);
    themeHoursDiv = document.querySelector('.d-timeAvarage__input');
    themeDeadlineDiv = document.querySelector('.d-deadLine__input');
    themeTitleDiv = document.querySelector('.d-themeTitle__input');
    themeDescDiv = document.querySelector('.d-themeDesc__textArea');
    choseGroup = document.querySelector('.d-group__select'); // "Вибір групи (disabled)"
    }

function findHwBlocks(){
    themeHoursDiv = document.querySelector('.d-timeCounter__text--time');
    themeDeadlineDiv = document.querySelector('.d-timeCounter__text--deadline');
    themeNumberDiv = document.querySelector('.d-theme__number');
    themeTitleDiv = document.querySelector('.d-theme__title');
    themeDescDiv = document.querySelector('.d-theme__desc');
    nextThemeBtn = document.querySelector('.d-nav__right'); // "Следующая тема >"
    nextThemeBtn.href="javascript:showNextTheme()"; // "Следующая тема >"
}

// ---------------------------------------------------------------------------------

// -------------------------V--FETCH--V-----------------------------

var url = 'db/hw_db.json';
var status = function(response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
}
var json = function(response) {
    return response.json()
}
window.addEventListener('DOMContentLoaded', function() {
    fetch(url)
        .then(status)
        .then(json)
        .then(function(data) {
            console.log('GET data:', data);
            hwBase = data.themes;
            showThemDetails(hwBase[themeNum])
        })
        .catch(function(error) {
            console.log('error', error)
        })
})
// ---------------------------------------------------------------

// ---------V-----SHOW & TOGLE theme details-----V-------------------

function getThemeNum(){
    themeNum = themeNumberDiv.selectedIndex +1;
    showThemDetailsAdm(hwBase[themeNum]);
}

function showThemDetailsAdm(data) {
    for (let i = 0; i < Object.keys(hwBase).length; i++) {
      let option = document.createElement("option");
      option.text = "ТЕМА "+ (i+1)
      themeNumberDiv.add(option)
    }
    showThemDetailsAdm=showThemDetailsAdmNew;
    showThemDetailsAdm(data);
}

function showThemDetailsAdmNew(data) {
    themeHoursDiv.value = data.hours;
    themeDeadlineDiv.value = data.deadline;
    themeTitleDiv.value = data.title;
    themeDescDiv.value = data.text;
}

function showThemDetails(data) {
    themeHoursDiv.textContent = data.hours+' часов';
    themeDeadlineDiv.textContent = data.deadline;
    themeNumberDiv.textContent = 'ТЕМА '+themeNum;
    themeTitleDiv.textContent = data.title;
    themeDescDiv.innerHTML = data.text;
}

function showNextTheme () {
    themeNum++;
    if (themeNum>Object.keys(hwBase).length){themeNum=1};
    makeShirmaForSpecefect();  // зі спецефектом
    //showThemDetails(hwBase[themeNum])  // без спецефекту
};

// ------------------------------------------------------------------


// ---------V-----srecEFECT for TOGLE theme details-----V-------------------
var shirma = document.createElement("DIV");
shirma.className += "shirma";
shirma.style.cssText = "position:absolute;top:0;left:120vw;background-color:rgba(243,243,243,1);width:100vw;height:100%;transition:1s ease;box-shadow:rgba(0,0,0,0.5) 10vw 0 20vw;"
var mainDiv = document.querySelector('div.main');
mainDiv.style.overflow="hidden";
mainDiv.appendChild(shirma);

function specefect(){
    shirma.style.transition="1s";
    shirma.style.left="-120vw";
    setTimeout(function (){
        showThemDetails(hwBase[themeNum])
    }, 400);
    setTimeout(function (){
        shirma.style.transition="unset";
        shirma.style.left="120vw";
    }, 1000);
}

function makeShirmaForSpecefect() {
    showNextTheme = function(){  // підміна тіла функції
        themeNum++;
        if (themeNum>Object.keys(hwBase).length){themeNum=1};
        specefect();
    }
    specefect()
}
