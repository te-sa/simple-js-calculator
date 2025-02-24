# Simple JS Calculator

Implemented a simple JS calculator based on the following
video: [Build A Calculator With JavaScript Tutorial](https://www.youtube.com/watch?v=j59qQ7YWLxw)
I watched the first few seconds, and then tried to implement the calculator myself before watching the video.
State before watching
video: [Commit before watching videos](https://github.com/te-sa/simple-js-calculator/tree/a6d4cb1d27e261c79954d60d60c33c1461dacd68)

## Learnings:

* Needed <meta charset="UTF-8"> to be able to display ÷
* Can’t use non-string values in grid template areas
    * . to get empty space
* [Event Delegation](https://www.freecodecamp.org/news/event-delegation-javascript/)
* Putting the display inside the grid simplifies styling
* minmax() in grid template rows

## Comparing with video:

### Calculator pros:

* My calculator actually supports math with negative numbers, the one in the video did not
* Also, my comma separation is simpler
* And I am using event delegation
* Pre-pending 0s if user just enters operator

### Calculator cons:

* Might have been nice to build as class
* Would have been good to separate logic and display logic more
* Appending the operator using string interpolation was sleek, could have done that

### Improvements made:

* Fix calculator display field growing when number gets too large
* Fix heavy reliance on pixel values for sizing

### Further improvements to consider:

* Mobile responsiveness
