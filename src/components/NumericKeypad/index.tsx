import React, { FC, useCallback, useMemo } from "react";

// assets
import { ReactComponent as Chevron } from "../../assets/icons/chevron.svg";

// components
import InterfaceButton, { Colors } from "../../components/InterfaceButton";

// style
import "./index.scss";

interface Props {
  inputValue: string;
  maxLengthValue: number;
  onChangeInputValue: (value: string) => any;
}

const NumericKeypad: FC<Props> = ({
  inputValue,
  maxLengthValue,
  onChangeInputValue
}) => {
  // handlers

  const handleOnBackKeyClick = useCallback(() => {
    const value = inputValue.slice(0, -1);
    onChangeInputValue(value);
  }, [onChangeInputValue, inputValue]);

  const handleOnNumericKeyClick = useCallback(
    (key: number) => {
      if (inputValue.length < maxLengthValue) {
        const value = inputValue + key.toString();
        onChangeInputValue(value);
      }
    },
    [onChangeInputValue, inputValue, maxLengthValue]
  );

  const numericKeypad = useMemo(() => {
    let numbersKey: any[] = [];

    for (let i = 1; i < 10; i++) {
      const numberKey = (
        <InterfaceButton
          onClick={() => handleOnNumericKeyClick(i)}
          key={i}
          color={Colors.yellow}
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
      <InterfaceButton color={Colors.yellow} />
      <InterfaceButton
        onClick={() => handleOnNumericKeyClick(0)}
        color={Colors.yellow}
        text={"0"}
      />
      <InterfaceButton onClick={handleOnBackKeyClick} color={Colors.yellow}>
        <span>
          <Chevron />
        </span>
      </InterfaceButton>
    </div>
  );
};

export default NumericKeypad;
