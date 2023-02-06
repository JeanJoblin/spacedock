import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import './dryDock.css';
import { hulls, fittings, weapons, defenses } from '../../app/resources/tables';
import { changeHull, } from './dryDockSlice';

export function DryDock() {

  const dispatch = useDispatch();
  const handleHullChange = (e) => {
    console.log(e);
    dispatch(changeHull(e.target.value));
    e.preventDefault();
  }
  const addWeapon = (e) => {
    e.preventDefault();
    alert('This is not finished yet');
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
            <button>Change Hull</button>
        </label>
      </form>
      <form>
        <label>
          Weapon:
          <select>
            {Object.keys(weapons).map((key) => {
              return (
                <option key={key}>
                  {weapons[key].name}
                </option>
              )
            })}
          </select>
          <button onClick={addWeapon}>
            Add Weapon
          </button>
        </label>
      </form>
      <form>
        <label>
          Defense:
          <select>
            {Object.keys(defenses).map((key) => {
              return (
                <option key={key}>
                  {defenses[key].name}
                </option>
              )
            })}
          </select>
          <button onClick={addWeapon}>
            Add Defense
          </button>
        </label>
      </form>
      <form>
        <label>
          Fitting:
          <select>
            {Object.keys(fittings).map((key) => {
              return (
                <option key={key}>
                  {fittings[key].name}
                </option>
              )
            })}
          </select>
          <button onClick={addWeapon}>
            Add Fitting
          </button>
        </label>
      </form>
    </div>


  )
}