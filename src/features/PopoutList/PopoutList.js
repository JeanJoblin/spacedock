import React from "react";
import { getFittingObj } from "../../app/resources/genFunctions";
import { hulls, weapons, defenses, fittings } from '../../app/resources/tables'
import './PopoutListStyles.css';


export const PopoutList = (props) => {
  const displayProps = props.props;

  console.log(displayProps)
  const fittingList = (obj) => {
    return (
      <div className="cardHolder">
        {Object.keys(obj).map((fitting) => {
          const fitObj = getFittingObj(fitting);
          return(
            <button className={fitObj.type + 'Card'}>
              {fitObj.name}
            </button>
      )
    })}
      </div>
    )
  };

  return (
    <div className='PopOut'>
      <div className='Hider'>
        <div className='Pointy'/>
        {fittingList(displayProps)}
      </div>
    </div>

  )
}