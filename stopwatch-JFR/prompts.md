ChatGPT
-------

As an expert software engineer, specialist in HTML, CSS and JavaScript, write a web application called "Timer and Countdown".

You can find an exact example to base on in the following URL: https://www.online-stopwatch.com/

** Description of the web page **
The web page must have two initial options and users must choose one: "Timer" and "Countdown". As seen in the provided website, those two options are represented by a green arrow on the left pointing up in the case of "Timer" and a red arrow on the right pointing down in the case of "Countdown"

When users click on "Timer", the initial two buttons will disappear and the "Timer" screen will be shown, as described right below:

- Timer
   - UI/UX requirements: a counter in format HH:MM:SS:mmm will appear from the left with a CSS transition. Below it there will be two buttons: "Start" (with green background) and "Clear" (with red background). Find in the PNG file attached how this screen will look like. Also, there will be a "Back" option below all that to allow users go back to the initial screen.
   - Functional requirements: 
       1 User presses on "Start"
           1.1 The button will immediately change to "Pause" (with the same green background) and
           1.2 The counter will start running
           1.3 If the user clicks on "Pause":
               1.3.1 The counter will hold and 
               1.3.2 The button will change to "Continue", with a vertical gradient blue background
               1.3.3 If the user clicks on "Continue":
                   1.3.3.1 The counter will resume and
                   1.3.3.1 The button will change to "Pause", as in point 1.1 in the above list
       2 User presses on "Clear"
           2.1 It will stop the counter and reset it to 0
           2.2 The other button will be set to "Start" again, without changing the color of the background
       3 User presses on "Back"
           3.1 The counter stops running and is reset to 0
           3.2 The button on the left changes to "Start" with the green background
           3.3 Users return to the initial screen


If users click on "Countdown" instead, the initial two buttons will disappear and the "Countdown" screen will be shown, as described right below:

- Countdown
   - UI/UX requirements: a counter in format HH:MM:SS:mmm will appear from the right with a CSS transition. Below it, there will be two rows of buttons. In the first row we'll be able to see numbers from 5 to 9 and then a "Set" button. In the second row, we'll have numbers raging from 0 to 4 and a "Clear" button. All the buttons with numbers and the "Set" button will have a green background. The "Clear" button will have a gray background. The "Set" and the "Clear" button must be twice as big as the buttons with the numbers. Also, there will be a "Back" option below all that to allow users go back to the initial screen. 
   - Functional requirements:
       1. User clicks on a number:
           1.1 The current counter will be multiplied by 10 and
           1.2 The number will be added to the counter in the seconds
           1.3 Two important caveats:
               1.3.1 Milliseconds will not count for this process, it will always start with seconds
               1.3.2 If a user has already provided 6 numbers, no additional numbers will be taken into consideration
       2. User clicks on the "Set" button
           2.1 The number of seconds set in the counter will be translated to HH:MM:SS
           2.2 The "Timer" on the above section will be shown and it will start counting down from the amount of time calculated on step 2.1. The behaviour will be exactly the same as the one described in the "Timer" section regarding the buttons, but in this case it will start counting down and every time the user clicks on "Clear" it will restart to the initial time of stop 2.1. When it reaches 0:
               * 2.2.1 Only the "Clear" button will be shown
               * 2.2.2 A sound of an alarm will be played
               * 2.2.3 The background of the counter will change to red and back to the original colour every half second
           2.3 If the "Set" button is pressed and the user has not provided any second, it will default to 10 seconds
       3. Users clicks on the "Clear" button:
           3.1 The counter will be reset to 0


** Code structure **
Using best practices, divide the web application in two files:
- index.html: this is where all the HTML components will be created. All the CSS styles will be included here too
- script.js: this is where all the logic will be placed