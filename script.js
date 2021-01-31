/* 
Vad har jag gjort för att felsöka/undvika buggar?

* 

* debugger  https://www.w3schools.com/js/js_debugging.asp
-I Chrome : F12 --> sources --> script.js --> markerar rad för debugging 
--> använder F5, F9, F10, F11 för att steppa igenom kod.

-console.log 
- track:a ex. att input är string; om så konvertera till number
- analysera förväntade värden.
* ------------------

* use strict https://www.w3schools.com/js/js_strict.asp
- missar man deklarera variabel kastas ett error/exception.
* ------------------


*/

//Knep för att undvika att variabler utanför blir global;
//koden som definieras i filen hålls här. Se översta svaret:
//https://stackoverflow.com/questions/1841916/how-to-avoid-global-variables-in-javascript

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing '+
                    'elit. Pellentesque id sodales eros. Sed quis nulla '+
                    'pretium, placerat metus eget, condimentum eros. '+
                    'Ut eu maximus neque. Pellentesque habitant morbi '+
                    'tristique senectus et netus et malesuada fames ac '+
                    'turpis egestas. Donec tincidunt gravida laoreet. '+
                    'In molestie maximus eleifend. Duis tempus erat nec '+
                    'mauris pretium, et ultrices odio pulvinar. Nulla '+
                    'feugiat elit nisi, pellentesque facilisis est '+
                    'tincidunt ac. Nam interdum auctor lacus, sit amet '+
                    'dignissim justo. Vivamus consectetur egestas maximus.';
(function() { 
  "use strict";

  try {
    x1 = 3.14; //kastar fel p.g.a. strict mode.
  } catch(e) {
    console.log("Ett fel uppstod pga. strict mot inte tillåter "+
                "icke-initialiserad variabler. Felmeddelande:\n\n"+e);
  }
  
  //Skeptisk kring att ha 'const' här, föreläsningen sa const > let > var,
  //och det verkar fungera, dvs. tycks ändå kunna förändra variablerna,
  //så jag låter det stå; kommentera gärna.
  const inputBlugs = document.getElementById("inputBlugs");
  const blugDisplayWindow = document.getElementById("blugDisplayWindow");
  
  inputBlugs.oninput = function(e) {
    
    let inputValue = e.target.value;
  
    if(typeof(inputValue) == 'string'){
      inputValue = parseInt(inputValue);
    }
  
    if(typeof(inputValue) == 'number') {

      if(inputValue < 0) { //input cannot have value < 0.
        inputBlugs.value = 0;
      }
      setNumberOfBlugs(inputValue);


    } else {
      throw "Unable to parse inputValue into a number-value.";
    }
  }

  function setNumberOfBlugs(count) {
    //kolla hur många som finns
    //lägg till/ta bort efter behov

    //men först, bara skriv ut ett gäng.
    for (let index = 0; index < count; index++) {
      let createdBlug = createBlug(index);

      blugDisplayWindow.appendChild(createdBlug);
    }
  }

  function createBlug(index) {
    let blugCard = document.createElement("div");
    blugCard.setAttribute('class', 'blugCard');
    blugCard.setAttribute('id', `blugCard${index}`);


    //create title of Blug-card.
    let title = document.createElement('div');
    title.setAttribute('class', 'blugCardTitle');
    title.innerText = 'Title';

    let content = document.createElement('div');
    content.setAttribute('class', 'blugCardContent');
    content.innerText = loremIpsum;

    blugCard.appendChild(content);

    return blugCard;
  }
})();
