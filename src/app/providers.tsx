"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { checkAuth } from "@/store/actions/authActions";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(checkAuth());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
