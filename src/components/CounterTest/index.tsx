import React, { FC, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectors as CounterSelectors,
  actions as CounterActions
} from "../../redux/Counter";
import styles from "./CounterTest.module.css";
import { AppDispatch } from "../../redux/store";

interface CounterTestProps {}

const CounterTest: FC<CounterTestProps> = () => {
  // store

  const dispatch: AppDispatch = useDispatch();
  const count = useSelector(CounterSelectors.selectValue);

  // state

  const [incrementAmount, setIncrementAmount] = useState(2);

  // handlers

  const handleOnClickDecrement = useCallback(() => {
    dispatch(CounterActions.decrement());
  }, [dispatch]);

  const handleOnClickIncrement = useCallback(() => {
    dispatch(CounterActions.increment());
  }, [dispatch]);

  const handleOnChangeIncrementAmount = useCallback(e => {
    setIncrementAmount(Number(e.target.value));
  }, []);

  const handleOnClickIncrementAmount = useCallback(
    e => {
      dispatch(
        CounterActions.incrementByAmount({
          amount: Number(incrementAmount) || 0
        })
      );
    },
    [dispatch, incrementAmount]
  );

  // return

  return (
    <>
      <div className={styles.row}>
        <button className={styles.button} onClick={handleOnClickDecrement}>
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button className={styles.button} onClick={handleOnClickIncrement}>
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          value={incrementAmount}
          onChange={handleOnChangeIncrementAmount}
        />
        <button
          className={styles.button}
          onClick={handleOnClickIncrementAmount}
        >
          Add Amount
        </button>
      </div>
    </>
  );
};

export default CounterTest;
