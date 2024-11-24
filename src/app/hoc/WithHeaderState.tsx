"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  changeHeaderState,
  HeaderPageState,
} from "../store/headerSlice/headerSlice";

export function WithHeaderState(
  Component: React.ComponentType<any>,
  header: HeaderPageState
) {
  return (props: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(changeHeaderState(header));

      return () => {
        dispatch(changeHeaderState("default"));
      };
    });

    return <Component {...props} />;
  };
}
