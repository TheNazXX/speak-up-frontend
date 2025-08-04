"use cient";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Loader from "../loader/Loader";

export default function GlobalLoader() {
  const isMutating = useIsMutating();
  const isFetching = useIsFetching();

  return isFetching || isMutating ? (
    <div className="fixed top-layout right-layout z-50">
      <Loader />
    </div>
  ) : null;
}
