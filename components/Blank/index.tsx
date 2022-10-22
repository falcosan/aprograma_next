import React from "react";
import { IProps } from "./props";

export const Blank = (props: IProps) => {
  return (
    <div className="blank-space" style={{ height: props.blok.height }}>
      {props.blok.add_line && <hr />}
    </div>
  );
};
