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

(function() { 
  "use strict";

  try {
    x1 = 3.14; //kastar fel p.g.a. strict mode.
  } catch(e) {
    console.log("Ett fel uppstod pga. strict mot inte tillåter "+
                "icke-initialiserad variabler. Felmeddelande:\n\n"+e);
  }
  
  
  const inputBlugs = document.getElementById("inputBlugs");
  
  inputBlugs.oninput = function(e) {
    
    let inputValue = e.target.value;
  
    if(typeof(inputValue) == 'string'){
      inputValue = parseInt(inputValue);
    }
  
    if(typeof(inputValue) == 'number') {

      if(inputValue < 0) {
        //set value to 0.
        inputBlugs.value = 0;
      }
    } else {
      throw "the inputValue was not parsed into a number-value.";
    }
  }
})();
