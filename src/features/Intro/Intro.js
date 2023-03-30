import React, { useEffect } from "react";
import './Intro.css';

export function Intro() {

  
  let intro;
  let closer = () => {
    intro.setAttribute('hidden', '');
  };

  useEffect(() => {
    intro = document.querySelector(".Yorkshire");
    console.log('Intro: ', intro);
  }, []);

  return (
    <div className="Yorkshire" >
      <h2>Welcome!</h2>
      <p className="Left">This webpage is for building and generating spaceships for the table top role playing game Stars Without Number.</p>
      <p className="Right"> The first box is a custom ship builder. Choose a name, crew size, hull type, add some fittings, and you're done! Fittings will be automatically filtered, so everything is applicable for the hull you have chosen. Mass, power and hardpoint requirements will also be displayed based on the fittings and hull type chosen.</p>
      <p>The second box is a semi-random ship generator. Pick a role you want a generated ship to fulfill, hull type for the ship, amount of crew, and what spike drive it should have. All these parameters are optional, so just check the box next to the ones you require!</p>
      <p>All ships, custom built or randomly generated will appear in the hanger at the bottom of the page. Have fun!</p>
      <button onClick={closer}>Close</button>
    </div>
  )
}