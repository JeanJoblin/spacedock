
# TODO LIST

## Hanger Section

> This component renders the ships that have been built.

* ~~Add functionality to delete ships from the list.~~ ``(DONE) Feb 24 2023``
* Add functionality to edit ships on this list.
  
## Drydock section

> This component is quite big, maybe split some of the HTML into separate components

* ~~Allow someone to pass in a name for a ship when they build~~ it `(DONE) Feb 27 2023`
* ~~when a ship is built, remove items from the shopping list~~ ``(DONE) Feb 27 2023``
* ~~remove all button for the shopping list~~ ``(DONE) Feb 27 2023``
* ~~let user select qualifier for amount of crew~~ ``(DONE) Feb 27 2023``
* ~~Add styling to the selectors, buttons, and displays~~ ``(DONE) Feb 28``
* ~~Sort fitting options to have enabled come before disabled~~ `(DONE) Mar 24 2023`
* quantity adjustor for items on the list

## Ship Section

* ~~Show remaining free power and mass for those stats~~ ``(DONE) Feb 24 2023``
* ~~Use up remaining free mass and convert it to cargo space~~ ``(DONE) Feb 27 2023``
* ~~Display cargo space differently like in the swn rulebook~~ ``(DONE) Feb 27 2023``
* ~~Make sure any given ship has SOME kind of drive~~ `(DONE) Mar 23 2023`
* Add a way to edit each ship

## General Stuff

* Rework crew generator to use ratio of min to max rather than hard fractions (e.g. min / max rather than dif / 4)  
* Clean up CSS and make it more general. i.e. put selector css in a more general file and just use class names

## Shipbuilder Section

> This component is sort of obsolete as it is now. Rework it to make the semirandom ship generator.

## Ship Generator Logic

* ~~Make sure stations do not get a spike drive assigned to them~~ `(DONE) Mar 24 2023`
* ~~Fix some ships mounting more fittings than they can power~~ ``(DONE) Mar 20 2023``
* ~~Miss counter. Let a fitting to add be undefined x times before no longer trying~~ `(DONE) Mar 23 2023`
* Special role specific processes for generating things like psitech for a research vessel
* Hull specific fittings (eg, all Frigates have a chance to have atmospheric config)
* Planetary parameter, ensuring atmospheric config, amphibious, cargolighter, or a ship bay.
* Parameter for how many ships to generate

## Bugs to work out

* ~~Params not being passed properly~~ `(DONE) Mar 27 2023`
* Cargo space reading incorrectly
* Generator Params can force an invalid ship

## New sections to be made

* ~~A ship generator section (ShipBuilder should become this)~~ `(DONE) Mar 24 2023`
* A nav function to move between drydock/ship builder and ship generator (implement react router?)
> Maybe name the ship generator portion space port

<br>

***

# Future Functionality

* NPC genrator
* Mech builder and generator
* Lore/Flavour generator for ships. e.g. a ship's weapon has tic marks scractched into it for secuity, bounty hunter or military ships