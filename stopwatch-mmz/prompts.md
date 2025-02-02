# Chatbot used
ChatGPT 4-o

# Prompt used
Prompt 1

```
As a professional frontend developer, I want you to build a webpage with two main functionalities:
- A stopwatch
  - With its timer showing the countdown
  - With a start button to start the countdown
  - With a clear button to reset the countdown (without starting it again).
  - With a back button to go to the main page
- A countodwn
  - With a numerical keyboard to introduce the numbers
  - With a set button
  - With a clear button
  - After clicking on set it will show a start and a clear button with the same functionality as in the stopwatch.
- We will start in a home screen where you can select the stopwatch or the countodown.

Visual reference: https://www.online-stopwatch.com/

It should be done taking into account best practices using javascript and html. It should also be responsive.

Do you have any doubts?
```

Prompt 2
```
Print all the code for the needed files telling me their names.
```

Prompt 3
```
There are several problems, but lets face them one by one:
1- The stopwatch should mimic a stopwatch, meaning that it should start a timer when clicking on the start button.
2- The countdown should go 1 second by 1 second. Rigth now is doing the countdown 2 seconds by 2 seconds.

How do we solve point 1?
```

Prompt 4
```
Point 1 is fixed.

Now lets fix point 2.

I've seen the real problem. Right now if you press start several times it starts several countdowns, provoking the 2 seconds error I saw before.

To fix this, let's mimic the start/pause behaviour of the stopwatch in the countdown.

Also lets put the set and clear button in a column with a bit more horizontal spacing in the right and change their colors.
```

Prompt 5
```
In the countdown timer set screen I want the clear button to have a different color. Make sure that you print the whole styles.css and not only the last part as you did beforeIn the countdown timer set screen I want the clear button to have a different color. Make sure that you print the whole styles.css and not only the last part as you did before
```

Prompt 6
```
It should match the colors and style of this png
# (added stopwatch.png)
```

Prompt 7
```
Let's make another iteration where we use the styles from the png, but fulfil the following statements:
- Buttons have proper spacing between them and when possible are drawn in the same line
- Texts are horizontally and vertically separated.
- In the countdown, the page for setting the times and the page for showing the countdown are different ones, as in the beginning.

Do you have any doubts?
```

Prompt 8
```
Yes update the countdown setup page to have the same visual style.

Also be careful on texts not being clipped.
```

Prompt 9
```
Now print styles.css and script.js
```