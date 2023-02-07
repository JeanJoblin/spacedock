import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import './dryDock.css';
import { hulls, fittings, weapons, defenses } from '../../app/resources/tables';
import { rehull } from '../Ships/shipSlice';
import { ShoppingList } from '../ShoppingList/shoppingList';
import { changeHull, changeSelectedItem, selectShoppingList, addSelectedToShoppingList, selectHull } from './dryDockSlice';

export function DryDock() {

  const dispatch = useDispatch();
  const handleHullChange = (e) => {
    dispatch(changeHull(e.target.value));
  };
  const shoppingList = useSelector(selectShoppingList);
  const hull = useSelector(selectHull)

  const addAnyFitting = (e) => {
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
                <option key={key}>
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
        <div>
          <div>
          {shoppingList.map((item, ind) => {
            return (
              <span key={item.name}>{ind + 1 < shoppingList.length ? item.name + ', ' : item.name }</span>
            )
          })}
          </div>
          <div className="Receipt">
            <span>Total Cost: </span>
            <span>Mass Requirements: </span>
            <span>Power Requirements: </span>
          </div>
        </div>
      : null}
    </div>


  )
}