import React, { FC, useCallback, useMemo } from "react";

// assets
import { ReactComponent as Chevron } from "../../assets/icons/chevron.svg";

// style
import "./index.scss";

interface Props {
  inputValue: string;
  maxLengthValue: number;
  handleChangeInputValue: (value: string) => any;
}

const NumericKeypad: FC<Props> = ({
  inputValue,
  maxLengthValue,
  handleChangeInputValue
}) => {
  // handlers

  const handleOnBackKeyClick = useCallback(() => {
    const value = inputValue.slice(0, -1);
    handleChangeInputValue(value);
  }, [handleChangeInputValue, inputValue]);

  const handleOnNumericKeyClick = useCallback(
    (key: number) => {
      if (inputValue.length < maxLengthValue) {
        const value = inputValue + key.toString();
        handleChangeInputValue(value);
      }
    },
    [handleChangeInputValue, inputValue, maxLengthValue]
  );

  const numericKeypad = useMemo(() => {
    let numbersKey: any[] = [];

    for (let i = 1; i < 10; i++) {
      const numberKey = (
        <div
          className="button button--yellow"
          key={i}
          onClick={() => handleOnNumericKeyClick(i)}
        >
          <span>{i}</span>
        </div>
      );

      numbersKey.push(numberKey);
    }

    return numbersKey;
  }, [handleOnNumericKeyClick]);

  // return

  return (
    <div className="numeric-keypad">
      {numericKeypad}
      <div className="button button--yellow" />
      <div
        className="button button--yellow"
        data-value="0"
        onClick={() => handleOnNumericKeyClick(0)}
      >
        <span>0</span>
      </div>
      <div className="button button--yellow" onClick={handleOnBackKeyClick}>
        <span>
          <Chevron />
        </span>
      </div>
    </div>
  );
};

export default NumericKeypad;
