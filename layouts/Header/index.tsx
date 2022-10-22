import { IState } from "./props";
import { LayoutContext } from "../";
import React, { useMemo } from "react";
import { Logo } from "../../components/Logo";
import { useGetWindowSize } from "../../hooks";
import { isDesktop } from "react-device-detect";
import { filterComponent } from "../../utils/components";
import { IProps as LogoProps } from "../../components/Logo/props";
import { StoryblokComponent as Component } from "@storyblok/react";

export const Header = () => {
  const { width } = useGetWindowSize();

  const blok = React.useContext(LayoutContext).find(
    ({ component: c }) => c.toLowerCase() === "header"
  ) as IState;

  const backgroundColor = useMemo(() => {
    const colors = blok.background_color.color.split("; ");
    if (colors.length > 1) {
      if (width >= 768 && isDesktop) {
        return colors[0];
      } else {
        return colors.length > 1 ? colors[1] : colors[0];
      }
    } else {
      return blok.background_color.color;
    }
  }, [blok.background_color.color, width]);

  const colorsLogo = useMemo(() => {
    const colors = blok.logo_colors.color.split("; ");
    if (colors.length > 1) return colors;
    else return [blok.logo_colors.color, blok.logo_colors.color];
  }, [blok.logo_colors]);

  return (
    <header className="header" style={{ backgroundColor }}>
      {filterComponent(blok.body, "Logo", true).map((logo) => (
        <Logo
          key={logo._uid}
          blok={logo as unknown as LogoProps["blok"]}
          internal={{
            link: true,
            colorA: colorsLogo[0],
            colorP: colorsLogo[1],
            size: "70",
          }}
        />
      ))}
      <div className="header-links">
        {filterComponent(blok.body, "Link", true).map((component) => (
          <Component key={component._uid} blok={component} />
        ))}
      </div>
      <div className="header-translate">
        {filterComponent(blok.body, "Translate", true).map((component) => (
          <Component key={component._uid} blok={component} />
        ))}
      </div>
    </header>
  );
};
