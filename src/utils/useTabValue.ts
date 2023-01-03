import { useCallback } from "react";

export const useSyncTabUrl = (baseUrl: string) =>
  useCallback(
    (value: string) =>
      window.history.replaceState(
        window.history.state,
        "",
        `${baseUrl}${value}`
      ),
    []
  );
