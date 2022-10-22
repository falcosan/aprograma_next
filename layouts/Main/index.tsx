import { LayoutContext } from "../";
import React, { useMemo } from "react";
import { IProps, IState } from "./props";

export const Main = (props: IProps) => {
  const blok = React.useContext(LayoutContext).find(
    ({ component: c }) => c.toLowerCase() === "main"
  ) as IState;
  if (blok.body_color.color)
    document.body.style.backgroundColor = blok.body_color.color;

  const randomBackgroundColor = useMemo(() => {
    const index =
      ~~(Math.random() * (blok.background_color.color.split("; ").length - 0)) +
      0;
    return blok.background_color.color.split("; ")[index];
  }, []);

  return (
    <main className="main" style={{ backgroundColor: randomBackgroundColor }}>
      {props.content}
    </main>
  );
};
