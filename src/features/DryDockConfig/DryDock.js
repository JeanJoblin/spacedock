import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DryDock.css';
import { hulls, fittings, weapons, defenses } from '../../app/resources/tables';
import { rehull } from '../Ships/shipSlice';
import { ShoppingList } from '../ShoppingList/shoppingList';
import { changeHull, changeSelectedItem, selectShoppingList, addSelectedToShoppingList, selectHull, selectMassReq, selectPowerReq, selectTotalCost, removeFromShoppingList } from './dryDockSlice';
import { getFittingObj } from '../Ships/shipSlice';

export function DryDock() {

  const dispatch = useDispatch();
  const massReq = useSelector(selectMassReq);
  const powerReq = useSelector(selectPowerReq);
  const totalCost = useSelector(selectTotalCost);
  const handleHullChange = (e) => {
    dispatch(changeHull(e.target.value));
  };
  const shoppingList = useSelector(selectShoppingList);
  const hull = useSelector(selectHull)

  const addAnyFitting = (e) => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    dispatch(changeSelectedItem(e.target.value));
  };
  const refitHull = (e) => {
    e.preventDefault();
    dispatch(rehull(e.target.value));
    alert('this is not finished yet');
  };
  const handleAddShopping = (e) => {
    e.preventDefault();
    dispatch(addSelectedToShoppingList(e.target.value));
  };
  const deleteItem = (e) => {
    e.preventDefault();
    dispatch(removeFromShoppingList(e.target.value));
  }

  return (
    <div>
      <form>
        <label>
          Hull:
            <select onInput={handleHullChange}>
              {Object.keys(hulls).map((key) => {
                return (
                  <option key={key} value={key}>
                    {hulls[key].name}
                  </option>
                )
              })}
            </select>
            <button onClick={refitHull} value={hull}>Change Hull</button>
        </label>
      </form>
      <form>
        <label>
          Weapon:
          <select onInput={addAnyFitting}>
            {Object.keys(weapons).map((key) => {
              return (
                <option value={key}>
                  {weapons[key].name}
                </option>
              )
            })}
          </select>
          <button onClick={handleAddShopping} value='weapon'>
            Add Weapon
          </button>
        </label>
      </form>
      <form>
        <label>
          Defense:
          <select onInput={addAnyFitting}>
            {Object.keys(defenses).map((key) => {
              return (
                <option value={key}>
                  {defenses[key].name}
                </option>
              )
            })}
          </select>
          <button onClick={handleAddShopping} value='defense'>
            Add Defense
          </button>
        </label>
      </form>
      <form>
        <label>
          Fitting:
          <select onInput={addAnyFitting}>
            {Object.keys(fittings).map((key) => {
              return (
                <option value={key}>
                  {fittings[key].name}
                </option>
              )
            })}
          </select>
          <button onClick={handleAddShopping} value='fitting'>
            Add Fitting
          </button>
        </label>
      </form>
      {shoppingList.length > 0 ?
        <div className='Shopping'>
          <div className='List'>
          {shoppingList.map((item, ind) => {
            return (
              <div key={item}>
                <span>{ind + 1 < shoppingList.length ? getFittingObj(item).name + ', ' : getFittingObj(item).name }
                  <button value={ind} onClick={deleteItem}>x</button>
                </span>
                <br/>
              </div>
              
            )
          })}
          </div>
          <div className="Receipt">
            <span>Total Cost: {totalCost}</span><br />
            <span>Mass Requirements: {massReq} </span><br />
            <span>Power Requirements: {powerReq} </span><br />
          </div>
        </div>
      : null}
    </div>


  )
}