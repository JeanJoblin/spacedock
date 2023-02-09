import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DryDock.css';
import { hulls, fittings, weapons, defenses } from '../../app/resources/tables';
import { rehull } from '../Ships/shipSlice';
import { ShoppingList } from '../ShoppingList/shoppingList';
import { changeHull, changeSelectedItem, selectShoppingList, addSelectedToShoppingList, selectHull, selectMassReq, selectPowerReq, selectTotalCost, removeFromShoppingList, selectMountableDefenses, selectMountableFittings, selectMountableWeapons } from './dryDockSlice';
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
  const hull = useSelector(selectHull);
  const mountableWeapons = useSelector(selectMountableWeapons);
  const mountableDefenses = useSelector(selectMountableDefenses);
  const mountableFittings = useSelector(selectMountableFittings);

  const addAnyFitting = (e) => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    dispatch(changeSelectedItem(e.target.value));
  };
  const refitHull = (e) => {
    e.preventDefault();
    dispatch(rehull(e.target.value));
    alert('This currently changes the ship card displayed below.');
  };
  const handleAddShopping = (e) => {
    e.preventDefault();
    dispatch(addSelectedToShoppingList(e.target.value));
  };
  const deleteItem = (e) => {
    e.preventDefault();
    console.log('event', e);
    console.log('event.target', e.target);
    console.log('event.target.key', e.target.value);
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
            {Object.keys(weapons).map((key, ind) => {
              return (
                <option key={key+ind} value={key} disabled={mountableWeapons[ind] ? null : 'true'} >
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
            {Object.keys(defenses).map((key, ind) => {
              return (
                <option key={key} value={key} disabled={mountableDefenses[ind] ? null : 'true'}>
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
            {Object.keys(fittings).map((key, ind) => {
              return (
                <option key={key} value={key} disabled={mountableFittings[ind] ? null : 'true'}>
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
              <div key={item+ind}>
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