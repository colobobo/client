import React, { FC, useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import { getStore } from "../../redux/store";
import { actions } from "../../redux";

interface StoreWrapperProps {}

const StoreWrapper: FC<StoreWrapperProps> = ({ children }) => {
  const urlParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, []);

  const isAdmin = useMemo(() => {
    return urlParams.has("admin");
  }, [urlParams]);

  const adminDeviceIndex = useMemo(() => {
    return urlParams.get("admin");
  }, [urlParams]);

  const store = useMemo(() => {
    return getStore(adminDeviceIndex ? adminDeviceIndex : "app");
  }, [adminDeviceIndex]);

  // effect

  useEffect(() => {
    if (store && isAdmin) {
      store.dispatch(actions.admin.activate());
    }
  }, [isAdmin, store]);

  // return

  return <Provider store={store}>{children}</Provider>;
};

export default StoreWrapper;
