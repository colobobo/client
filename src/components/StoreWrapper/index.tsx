import React, { FC, useMemo } from "react";
import { Provider } from "react-redux";
import { getStore } from "../../redux/store";

interface StoreWrapperProps {}

const StoreWrapper: FC<StoreWrapperProps> = ({ children }) => {
  const urlParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, []);

  const adminDeviceIndex = useMemo(() => {
    return urlParams.get("store_id");
  }, [urlParams]);

  const store = useMemo(() => {
    return getStore(adminDeviceIndex ? adminDeviceIndex : "app");
  }, [adminDeviceIndex]);

  // return

  return <Provider store={store}>{children}</Provider>;
};

export default StoreWrapper;
