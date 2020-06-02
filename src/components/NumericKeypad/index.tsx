import React, { FC, useCallback, useMemo } from "react";

// assets
import { ReactComponent as Chevron } from "../../assets/icons/chevron.svg";

// components
import InterfaceButton from "../../components/InterfaceButton";

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
        <InterfaceButton
          actionOnClick={() => handleOnNumericKeyClick(i)}
          key={i}
          color="yellow"
          text={i.toString()}
        />
      );

      numbersKey.push(numberKey);
    }

    return numbersKey;
  }, [handleOnNumericKeyClick]);

  // return

  return (
    <div className="numeric-keypad">
      {numericKeypad}
      <InterfaceButton color="yellow" />
      <InterfaceButton
        actionOnClick={() => handleOnNumericKeyClick(0)}
        color="yellow"
        text={"0"}
      />
      <InterfaceButton actionOnClick={handleOnBackKeyClick} color="yellow">
        <span>
          <Chevron />
        </span>
      </InterfaceButton>
    </div>
  );
};

export default NumericKeypad;
