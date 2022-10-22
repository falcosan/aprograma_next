import { Icon } from "../Icon";
import { IProps } from "./props";
import { isDesktop } from "react-device-detect";
import { rangeItems } from "../../utils/number";
import { useGetWindowSize, useInterval } from "../../hooks";
import { StoryblokComponent as Component } from "@storyblok/react";
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";

export const Container = (props: IProps) => {
  const { width } = useGetWindowSize();

  const spaceFix = 20;
  const max = +props.blok.max_slides;
  const timer = props.blok.slider_time ?? 5000;
  const columnSet = +props.blok.column_container;
  const dynamicModes =
    props.internal?.carouselMode || props.internal?.sliderMode;
  const allModes =
    props.internal?.carouselMode ||
    props.internal?.sliderMode ||
    props.internal?.containerMode;

  const sliderBoxWidth = useRef(0);
  const containerCoverWidth = useRef(0);

  const [fullWidth, setFullWidth] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [focusDisable, setFocusDisable] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [transitionEnter, setTransitionEnter] = useState("");
  const [transitionLeave, setTransitionLeave] = useState("");
  const [autoPlay, setAutoplay] = useState<number | null>(timer);

  const refContainerCover = useCallback(
    (node: HTMLDivElement) => {
      if (node) containerCoverWidth.current = node.clientWidth;
    },
    [width]
  );

  const refSliderBox = useCallback(
    (node: HTMLDivElement) => {
      if (node) sliderBoxWidth.current = node.clientWidth;
    },
    [width]
  );

  const sliderControlChecker = useMemo(() => {
    return (
      (props.blok.slider_mode === "slider" ||
        width < 640 ||
        !isDesktop ||
        dynamicModes ||
        props.blok.row_container) &&
      !props.blok.hide_controllers
    );
  }, [width, isDesktop]);

  const carouseControlChecker = useMemo(() => {
    return (
      props.blok.slider_mode === "carousel" &&
      !dynamicModes &&
      !props.blok.row_container &&
      !props.blok.hide_controllers
    );
  }, []);

  const elements = useMemo(() => {
    if (
      props.blok.slider_mode === "slider" ||
      props.blok.slider_mode === "carousel"
    ) {
      return props.blok.body;
    } else {
      return props.blok.body.filter((component) =>
        component.resolution_show &&
        typeof component.resolution_show === "string"
          ? fullWidth >= Number(component.resolution_show.split("; ")[0])
          : component
      );
    }
  }, [fullWidth]);

  const rowComponent = useMemo(
    () => elements.filter((item) => item.row_container),
    [elements.length]
  );

  const defaultMax = useMemo(() => {
    if (fullWidth >= 1239) {
      return rangeItems(elements.length - 1, 5);
    } else if (fullWidth >= 983) {
      return rangeItems(elements.length - 1, 4);
    } else if (fullWidth >= 727) {
      return rangeItems(elements.length - 1, 3);
    }
    return fullWidth >= 535 ? rangeItems(elements.length - 1, 2) : 1;
  }, [elements.length, fullWidth]);

  const maxElements = useMemo(() => {
    if (
      (props.blok.slider_mode === "slider" ||
        props.blok.slider_mode === "carousel") &&
      elements.length > 1
    ) {
      if (max && max <= defaultMax) {
        if (fullWidth >= 1239) {
          return rangeItems(max, 5);
        } else if (fullWidth >= 983) {
          return rangeItems(max, 4);
        } else if (fullWidth >= 727) {
          return rangeItems(max, 3);
        }
        return fullWidth >= 535 ? rangeItems(max, 2) : 1;
      } else {
        if (fullWidth >= 1239) {
          return rangeItems(defaultMax, 5);
        } else if (fullWidth >= 983) {
          return rangeItems(defaultMax, 4);
        } else if (fullWidth >= 727) {
          return rangeItems(defaultMax, 3);
        }
        return fullWidth >= 535 ? rangeItems(defaultMax, 2) : 1;
      }
    } else if (columnSet && elements.length > 1) {
      if (fullWidth + spaceFix * rangeItems(defaultMax, 3) >= 1239) {
        return rangeItems(columnSet, 3);
      }
      return fullWidth + spaceFix * rangeItems(defaultMax, 3) >= 535
        ? rangeItems(columnSet, 2)
        : 1;
    } else {
      if (fullWidth >= 983) {
        return rangeItems(rowComponent.length, 3);
      }
      return fullWidth >= 535 ? rangeItems(rowComponent.length, 2) : 1;
    }
  }, [elements.length, rowComponent.length, fullWidth, defaultMax]);

  const setAlignContent = useMemo(() => {
    switch (props.blok.align_content) {
      case "start":
        return "self-start";
      case "center":
        return "self-center";
      case "end":
        return "self-end";
    }
    return null;
  }, [props.blok.align_content]);

  const setPrevious = () => {
    if (props.blok.slider_mode === "slider") {
      if (-((containerWidth + spaceFix) * sliderIndex) + containerWidth <= 1) {
        setSliderIndex((prevSliderIndex) => --prevSliderIndex);
      } else {
        setSliderIndex(elements.length - maxElements);
      }
    } else if (props.blok.slider_mode === "carousel") {
      if (currentSlide > 0) {
        setCurrentSlide((prevCurrentSlide) => --prevCurrentSlide);
      } else {
        setCurrentSlide(elements.length - 1);
      }
      setTransitionEnter("enter-right");
      setTransitionLeave("leave-right");
    }
  };

  const setNext = () => {
    if (props.blok.slider_mode === "slider") {
      if (
        -((containerWidth + spaceFix) * sliderIndex) - sliderBoxWidth.current >=
        -((containerWidth + spaceFix) * (elements.length - 1))
      ) {
        setSliderIndex((prevSliderIndex) => ++prevSliderIndex);
      } else {
        setSliderIndex(0);
      }
    } else if (props.blok.slider_mode === "carousel") {
      if (elements.length - 1 > currentSlide) {
        setCurrentSlide((prevCurrentSlide) => ++prevCurrentSlide);
      } else {
        setCurrentSlide(0);
      }
      setTransitionEnter("enter-left");
      setTransitionLeave("leave-left");
    }
  };

  const next = (forced = false) => {
    if (props.blok.auto_play) {
      if (forced) {
        setAutoplay(null);
        Promise.resolve().then(() => setAutoplay(timer));
        setNext();
      } else {
        setNext();
      }
    }
  };

  const previous = (forced = false) => {
    if (props.blok.auto_play) {
      if (forced) {
        setAutoplay(null);
        Promise.resolve().then(() => setAutoplay(timer));
        setPrevious();
      } else {
        setNext();
      }
    }
  };

  const changeDot = (dot: number) => {
    if (props.blok.auto_play) {
      setAutoplay(null);
      Promise.resolve().then(() => setAutoplay(timer));
    }
    setCurrentSlide(dot);
    setTransitionEnter("");
    setTransitionLeave("");
  };

  const focusContainer = (element: HTMLElement) => {
    if (!focusDisable) element.focus({ preventScroll: true });
  };

  const getContainerWidth = () => {
    const containerSelect =
      props.blok.body.length > 1 &&
      (props.blok.slider_mode === "slider" ||
        props.blok.slider_mode === "carousel")
        ? sliderBoxWidth.current
        : containerCoverWidth.current;
    setFullWidth(containerSelect);
    setContainerWidth(
      containerSelect / maxElements -
        (spaceFix / maxElements) * (maxElements - 1)
    );
  };

  const clearAll = () => {
    setSliderIndex(0);
    setFocusDisable(true);
    setTransitionEnter("");
    setTransitionLeave("");
  };

  useLayoutEffect(() => {
    getContainerWidth();
    return () => clearAll();
  }, [width, maxElements]);

  if (
    (props.blok.slider_mode === "slider" ||
      props.blok.slider_mode === "carousel") &&
    props.blok.auto_play
  ) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useInterval(next, autoPlay);
  }

  return (
    <div
      ref={refContainerCover}
      className={`container-cover ${allModes ? "child-cover" : "parent-cover"}`}
    >
      {props.blok.title && (
        <span
          className={`container-title ${
            allModes
              ? props.blok.remove_space
                ? "container-title_spaceless"
                : "container-title_spaceful"
              : "container-title_modeless"
          }`}
          style={{ color: props.blok.title_color.color }}
        >
          {props.blok.title}
        </span>
      )}
      <div
        className={`container-content ${
          props.blok.slider_mode === "slider"
            ? "container-content_slider"
            : !props.blok.slider_mode
            ? "container-content_container"
            : null
        }`}
        style={{ backgroundColor: props.blok.background_color_container.color }}
      >
        {props.blok.body.length > 1 &&
        (props.blok.slider_mode === "slider" ||
          props.blok.slider_mode === "carousel") ? (
          <div
            className={`slider-wrapper ${
              dynamicModes ? "slider-wrapper_dynamicMode" : null
            } ${
              !props.blok.remove_space
                ? !props.blok.background_color_container.color &&
                  props.blok.title
                  ? "slider-wrapper_spaceless"
                  : "slider-wrapper_spaceful"
                : null
            }`}
          >
            {sliderControlChecker && (
              <Icon
                internal={{ title: "FaChevronLeft", size: 25 }}
                className={`previous-control slider-control ${
                  props.internal?.sliderMode
                    ? fullWidth > 295
                      ? "slider-control_sliderMode-left--small"
                      : "slider-control_sliderMode-left--big"
                    : "slider-control_containerMode-left"
                } ${
                  props.blok.slider_mode === "slider"
                    ? "slider-control_slider"
                    : dynamicModes
                    ? !props.blok.hide_dots
                      ? "slider-control_dynamicMode-dots--show"
                      : "slider-control_dynamicMode-dots--hide"
                    : !props.blok.hide_dots
                    ? "slider-control_containerMode-dots--show"
                    : "slider-control_containerMode-dots--show"
                }`}
                onClick={() => previous(true)}
              />
            )}
            {carouseControlChecker && (
              <div className="previous-control carousel-control" />
            )}
            {sliderControlChecker && (
              <Icon
                internal={{ title: "FaChevronRight", size: 25 }}
                className={`next-control slider-control ${
                  props.internal?.sliderMode
                    ? fullWidth > 295
                      ? "slider-control_sliderMode-right--small"
                      : "slider-control_sliderMode-right--big"
                    : "slider-control_containerMode-right"
                } ${
                  props.blok.slider_mode === "slider"
                    ? "slider-control_slider"
                    : dynamicModes
                    ? !props.blok.hide_dots
                      ? "slider-control_dynamicMode-dots--show"
                      : "slider-control_dynamicMode-dots--hide"
                    : !props.blok.hide_dots
                    ? "slider-control_containerMode-dots--show"
                    : "slider-control_containerMode-dots--show"
                }`}
                onClick={() => next(true)}
              />
            )}
            {carouseControlChecker && (
              <div className="next-control carousel-control" />
            )}
            <div
              ref={refSliderBox}
              className={`slider-box ${
                props.blok.slider_mode ? "slider-box_dynamic" : null
              }`}
            >
              {props.blok.slider_mode === "slider" && (
                <div className="slider-container">
                  <ul
                    style={{
                      minHeight: props.blok.height,
                      transform: `translateX(${-(
                        (containerWidth + spaceFix) *
                        sliderIndex
                      )}px)`,
                      gap: `${spaceFix}px`,
                    }}
                    className="slider-list"
                  >
                    {elements.map((component) => (
                      <li
                        key={component._uid}
                        tabIndex={!props.blok.hide_controllers ? 0 : undefined}
                        style={{
                          width: `${containerWidth}px`,
                          backgroundColor:
                            props.blok.background_color_component.color,
                        }}
                        className={`slider-slide ${setAlignContent} ${
                          allModes ? null : "parent-slide"
                        }`}
                        onMouseEnter={(e) => focusContainer(e.currentTarget)}
                      >
                        <Component
                          blok={component}
                          internal={{ sliderMode: true, containerWidth }}
                          className={`${String(
                            component.name
                          ).toLowerCase()}-component`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {props.blok.slider_mode === "carousel" && (
                <div className="carousel-container">
                  <ul
                    className="carousel-list"
                    style={{ minHeight: props.blok.height }}
                  >
                    {elements.map((component, index) => (
                      <li
                        key={component._uid}
                        tabIndex={!props.blok.hide_controllers ? 0 : undefined}
                        style={{
                          backgroundColor:
                            props.blok.background_color_component.color,
                        }}
                        className={`carousel-slide ${
                          index === currentSlide
                            ? `active-slide ${transitionEnter}`
                            : `inactive-slide ${transitionLeave}`
                        } ${setAlignContent} ${
                          allModes ? null : "parent-slide"
                        }`}
                        onMouseEnter={(e) => focusContainer(e.currentTarget)}
                      >
                        <Component
                          blok={component}
                          internal={{
                            carouselMode: true,
                            containerWidth: fullWidth,
                          }}
                          className={`${String(
                            component.name
                          ).toLowerCase()}-component`}
                        />
                      </li>
                    ))}
                  </ul>
                  {!props.blok.hide_dots && (
                    <div className="dot-container">
                      {elements.map((_, dot) => (
                        <span
                          key={dot}
                          className={`dot-number  ${
                            !isDesktop ? null : "dot-desktop"
                          } ${
                            dot === currentSlide
                              ? "dot-number_active"
                              : "dot-number_inactive"
                          }`}
                          onClick={() => changeDot(dot)}
                        >
                          {isDesktop && (
                            <span className="dot-text ">{dot + 1}</span>
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="container-wrapper">
            <div
              className={`container-box ${
                !props.blok.remove_space
                  ? !props.blok.background_color_container.color &&
                    props.blok.title
                    ? "container-box_spaceful"
                    : "container-box_spaceless"
                  : null
              }`}
              style={{
                minHeight: props.blok.height,
              }}
            >
              {elements.map((component) => (
                <div
                  key={component._uid}
                  style={{
                    flex: component.row_container
                      ? `1 ${
                          (100 - (maxElements > 1 ? spaceFix : 0)) / maxElements
                        }%`
                      : "100%",
                    backgroundColor:
                      component.component.toLowerCase() === "blank"
                        ? undefined
                        : props.blok.background_color_component.color,
                  }}
                  className={`container-component ${
                    allModes ? null : "parent-container"
                  } ${
                    component.component.toLowerCase() === "blank"
                      ? null
                      : `component_spaced ${setAlignContent}`
                  }`}
                >
                  <Component
                    blok={component}
                    internal={{ carouselMode: true, containerWidth: fullWidth }}
                    className={`${String(
                      component.name
                    ).toLowerCase()}-component`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
