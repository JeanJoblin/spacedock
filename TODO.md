
# TODO LIST

## Hanger Section

> This component renders the ships that have been built.

* ~~Add functionality to delete ships from the list.~~ ``(DONE)``
* Add functionality to edit ships on this list.
  
## Drydock section

> This component is quite big, maybe split some of the HTML into separate components

* Add styling to the selectors, buttons, and displays
* Allow someone to pass in a name for a ship when they build it
* when a ship is built, remove items from the shopping list
* remove all button for the shopping list
* quantity adjustor for items on the list
* let user select qualifier for amount of crew

## Ship Section

* ~~Show remaining free power and mass for those stats~~ ``(DONE)``
* Use up remaining free mass and convert it to cargo space
* Display cargo space differently like in the swn rulebook
* Add a way to edit the name of the ship

## General Functions  

* Rework crew generator to use ratio of min to max rather than hard fractions (e.g. dif / 4)  

## Shipbuilder Section

> This component is sort of obsolete as it is now. Rework it to make the semirandom ship generator.

## New sections to be made

* A ship generator section (ShipBuilder should become this)
* A nav function to move between drydock/ship builder and ship generator (implement react router?)
> Maybe name the ship generator portion space port

<br>

***

# Future Functionality

* NPC genrator
* Mech builder and generator