import React from "react";
import { getFittingObj } from "../../app/resources/genFunctions";
import "./BOM.css";
import {removeFromShoppingList} from "../DryDockConfig/dryDockSlice"
import { useDispatch } from "react-redux";

export default function BOM({ props }) {
  const {shoppingList, powerReq, massReq, hardReq, totalCost} = props;
  const newList = shoppingList.map((prop, id) => { 
    return {...getFittingObj(prop), id} });
  const weapons = newList.filter((item) => item.type === "weapon");
  const defenses = newList.filter((item) => item.type === 'defense')
  const fittings = newList.filter((item) => item.type === 'fitting')

  
const dispatch = useDispatch();

const deleteItem = (e) => {
  e.preventDefault();
  dispatch(removeFromShoppingList(e.target.value));
}

  return (
    <div className="BillOfMaterials">
      <div className="TextLeft">Type</div>
      <div>Name</div>
      <div>P</div>
      <div>M</div>
      <div>H</div>
      <div>$</div>
      <div></div>
      {[weapons, defenses, fittings].map(array => {
          return array.map(item => {
            return (
            <div className="SubGrid">
              <div>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</div>
              <div>{item.name}</div>
              <div>{item.power}</div>
              <div>{item.mass}</div>
              <div>{item.hardpoints || 0}</div>
              <div>{item.cost}</div>
              <button value={item.id} onClick={deleteItem}>X</button>
            </div>
            )
          })
      })}
      <div>Totals</div>
      <div></div>
      <div>{powerReq}</div>
      <div>{massReq}</div>
      <div>{hardReq}</div>
      <div>{totalCost}</div>
      <div></div>
    </div>
  );
}
