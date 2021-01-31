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
  if(inputBlugs == null)
   throw("Error, couldn't find the blugDisplayWindow");
  if(blugDisplayWindow == null)
   throw("Error, couldn't find the blugDisplayWindow");
  
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

  function setNumberOfBlugs(targetCount) {
    
    let numOfBlugs = blugDisplayWindow.childElementCount;
    console.log(numOfBlugs);

    if(numOfBlugs !== targetCount) {
      let numToShift = targetCount - numOfBlugs;

      //numToShift kan vara positivt eller negativt, därav abs(numToShift) ;
      //anger hur många som ska läggas till/tas bort.
      for (let i = 0; i < Math.abs(numToShift); i++) { 
        if(numToShift > 0) 
          blugDisplayWindow.appendChild(createBlug());
        else 
          blugDisplayWindow.removeChild(blugDisplayWindow.lastChild);
      }
    }

    
    //else do nothing.
    // for (let index = 0; index < count; index++) {
    //   let createdBlug = createBlug(index);

    //   blugDisplayWindow.appendChild(createdBlug);
    // }
  }

  function createBlug() {
    let blugCard = document.createElement("div");
    blugCard.setAttribute('class', 'blugCard');


    //create title of Blug-card.
    let title = document.createElement('div');
    title.setAttribute('class', 'blugCardTitle');
    title.innerText = 'Title';

    title.addEventListener('click', function() {
      replaceWithTextArea(title); 
      //detta verkar vara så man gör. Problemet var att makeEditable åberopades direkt, 
      //inte vid eventet.
    });

    let content = document.createElement('div');
    content.setAttribute('class', 'blugCardContent');
    content.innerText = loremIpsum;

    blugCard.appendChild(title);
    blugCard.appendChild(content);

    return blugCard;
  }

  function replaceWithTextArea(element) {
    //Testat med element.contentEditable = true ett tag utan framgång.
    // let parent = element.parentElement;

    let textArea = createTextArea(element);
    element.replaceWith(textArea);
    console.log(parent);
  } 

  function createTextArea(originElement) {

    //replace originElement with a textarea that is editable.
    let textArea = document.createElement('textarea');
    textArea.value = originElement.textContent;

    textArea.className = originElement.className +" blugTextArea";

    //when editing is done and textArea is pressed, the originElement
    //shall be put back with the new text from textarea.
    textArea.addEventListener('mouseout', function() {
      originElement.textContent = textArea.value;
      console.log("after clicking textarea, textarea content: "+textArea.textContent);

      console.log("after clicking textarea, originElement text now: "+originElement.textContent);
      textArea.replaceWith(originElement);
    });

    // textArea.addEventListener('input', function() {
    //   console.log(textArea.textContent);
    //   console.log(textArea.value);

    // });

    return textArea;
  }
})();
