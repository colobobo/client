import React, { FC } from "react";
import { Provider } from "react-redux";
import { getStore } from "../../redux/store";

interface StoreWrapperProps {
  storeId: string;
}

const StoreWrapper: FC<StoreWrapperProps> = ({ children, storeId }) => {
  return <Provider store={getStore(storeId)}>{children}</Provider>;
};

export default StoreWrapper;
