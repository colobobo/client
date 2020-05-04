import React, { FC, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "../../redux";
import styles from "./CounterTest.module.css";

interface CounterTestProps {}

const CounterTest: FC<CounterTestProps> = () => {
  // store

  const dispatch = useDispatch();
  const count = useSelector(selectors.counter.selectValue);

  // state

  const [incrementAmount, setIncrementAmount] = useState(2);

  // handlers

  const handleOnClickDecrement = useCallback(() => {
    dispatch(actions.counter.decrement());
  }, [dispatch]);

  const handleOnClickIncrement = useCallback(() => {
    dispatch(actions.counter.increment());
  }, [dispatch]);

  const handleOnChangeIncrementAmount = useCallback(e => {
    setIncrementAmount(Number(e.target.value));
  }, []);

  const handleOnClickIncrementAmount = useCallback(
    e => {
      dispatch(
        actions.counter.incrementByAmount({
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
