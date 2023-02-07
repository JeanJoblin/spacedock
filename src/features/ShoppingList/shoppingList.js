import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import './shoppingList.css';
import { selectSixMonth, selectInstalled, selectMassReq, selectPowerReq, selectMaintCost, intakeArray } from "./shoppingListSlice";

import { tables } from '../../app/resources/tables';

const { hulls, weapons, defenses, fittings } = tables;

export function ShoppingList(props) {
  const { list } = props;
  const dispatch = useDispatch();
  const sixMonth = useSelector(selectSixMonth);
  const installed = useSelector(selectInstalled);
  const massReq = useSelector(selectMassReq);
  const powerReq = useSelector(selectPowerReq);
  const total = useSelector(selectMaintCost);

  useEffect(() => {
    console.log(list);
    dispatch(intakeArray(list))
  }, [list]);

  return (
    <div>
      <div className="Receipt">
        <span>Total Cost: {total}</span>
        <span>Mass Requirements: {massReq}</span>
        <span>Power Requirements: {powerReq}</span>
      </div>
    </div>
  )
}