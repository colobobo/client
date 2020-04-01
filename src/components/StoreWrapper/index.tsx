import React, { FC, useMemo } from "react";
import { Provider } from "react-redux";
import { getStore } from "../../redux/store";

interface StoreWrapperProps {
  storeId: string;
}

const StoreWrapper: FC<StoreWrapperProps> = ({ children, storeId }) => {
  const store = useMemo(() => {
    return getStore(storeId);
  }, [storeId]);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreWrapper;
