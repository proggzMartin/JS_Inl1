/* 
Vad har jag gjort för att felsöka/undvika buggar?

* debugger  https://www.w3schools.com/js/js_debugging.asp
-I Chrome : F12 --> sources --> script.js --> markerar rad för debugging 
--> använder F5, F9, F10, F11 för att steppa igenom kod, kontrollera värden som tillskrivs.

-console.log 
- track:a ex. att input är string; om så konvertera till number
- analysera förväntade värden.
* ------------------

* use strict https://www.w3schools.com/js/js_strict.asp
- missar man deklarera variabel kastas ett error/exception.
* ------------------

*/



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


//function här är ett knep för att undvika att variabler utanför blir global;
//koden som definieras i filen hålls här. Se översta svaret:
//https://stackoverflow.com/questions/1841916/how-to-avoid-global-variables-in-javascript
(function() { 
  "use strict";

  try {
    x1 = 3.14; //kastar fel p.g.a. strict mode.
  } catch(e) {
    console.log("Ett fel uppstod pga. strict mot inte tillåter "+
                "icke-initialiserad variabler. Felmeddelande:\n\n"+e);
  }
  
  //Följande const-variabler; skeptisk till att ha 'const' här, föreläsningen sa const > let > var,
  //och det verkar fungera, dvs. tycks ändå kunna förändra variablerna fast att dem är "konstanta",
  //så jag låter det stå; kommentera gärna.


  //Hämtar ut element med angivet ID; här är det inputten som anger antal Blugs
  const inputBlugs = document.getElementById("inputBlugs"); 

  //Hämtar ut element med angivet ID; här är det divven som innehåller alla Blugs-inlägg
  const blugDisplayWindow = document.getElementById("blugDisplayWindow");

  if(inputBlugs == null)
   throw("Error, couldn't find the blugDisplayWindow");
  if(blugDisplayWindow == null)
   throw("Error, couldn't find the blugDisplayWindow");
  
  //När input:en får input, antingen skrivit av user eller man trycker upp/ned
  //körs funktionen.
  inputBlugs.oninput = function(e) {
    
    let inputValue = e.target.value; //Värdet som inputten har.
  
    //e.target.value tycks vara string i grunden även om jag inte kan skriva in bokstäver ; 
    //i sådant fall parse:as till
    if(typeof(inputValue) == 'string') {  
      inputValue = parseInt(inputValue);
    }
  
    //om input är ett number, då är vi klara.
    //Annars är något galet, då kastas ett fel.
    if(typeof(inputValue) == 'number') {

      if(inputValue < 0) { //kan inte ha negativt antal inlägg, då får 0 finnas istället.
        inputBlugs.value = 0; 
      }
      setNumberOfBlugs(inputValue); //inputValue anger hur många blugs som ska finnas.

    } else {
      throw "Unable to parse inputValue into a number-value.";
    }
  }

  function setNumberOfBlugs(targetCount) {
    
    let numOfBlugs = blugDisplayWindow.childElementCount; //Räknar antalet blugs.

    //om det finns en differens mellan förfrågade och existerade blugs,
    //så ska det åtgärdas.
    if(numOfBlugs !== targetCount) { 
      let numToShift = targetCount - numOfBlugs;

      //numToShift kan vara positivt eller negativt, därav abs(numToShift) ;
      //anger hur många som ska läggas till/tas bort.
      for (let i = 0; i < Math.abs(numToShift); i++) { 
        if(numToShift > 0) 
          blugDisplayWindow.appendChild(createBlug());
        else 
          blugDisplayWindow.removeChild(blugDisplayWindow.lastChild); //ta bort senaste.
      }
    }
  }

  function createBlug() {
    let blugCard = document.createElement("div");
    blugCard.setAttribute('class', 'blugCard');

    //create title of Blug-card.
    let title = document.createElement('div');
    title.setAttribute('class', 'blugCardTitle');
    title.innerText = 'Title';

    //om man klickar på titeln, ska denne ersättas med en textArea man kan ändra i.
    title.addEventListener('click', function() { 
      replaceWithTextArea(title, 0); 
    });

    let content = document.createElement('div');
    content.setAttribute('class', 'blugCardContent');
    content.innerText = loremIpsum;

    //om man klickar på innehållet, ska detta ersättas med en textArea man kan ändra i.
    content.addEventListener('click', function() {
      replaceWithTextArea(content, 7); 
    });

    blugCard.appendChild(title);
    blugCard.appendChild(content);

    return blugCard;
  }

  //Används för replace titel och content.
  function replaceWithTextArea(originElement, numOfRows) {
    //Testat med element.contentEditable = true ett tag utan framgång.

    let textArea = document.createElement('textarea');

    textArea.value = originElement.textContent;

    //säkerställer att numOfRows verkligen är rätt variabeltyp så man inte får exceptions.
    if(numOfRows !== null && numOfRows !== 'undefined' && typeof(numOfRows) === 'number' && numOfRows > 0)
      textArea.rows = numOfRows;

    //add same class + blugTextArea for placing it to the left.
    textArea.className = originElement.className +" blugTextArea";

    //När man för muspekaren utanför textarean, kan man inte längre editera.
    //Då sparas innehållet tillbaka till originElement.
    textArea.addEventListener('mouseout', function() {
      originElement.textContent = textArea.value;
      console.log("after clicking textarea, textarea content: "+textArea.textContent);

      console.log("after clicking textarea, originElement text now: "+originElement.textContent);
      textArea.replaceWith(originElement);
    });

    originElement.replaceWith(textArea);
  } 
})();
