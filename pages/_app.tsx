import { Layout } from "../layouts";
import { uuidGenerator } from "../utils/number";
import React, { useRef, useMemo, useEffect } from "react";
import {
  useLocale,
  useAsyncHook,
  useSetSlugDetail,
  useRemovesNullClass,
} from "../hooks";
import "../services/storyblok";

import "../styles/globals.scss";

export default function App({ Component }) {
  const key = useRef("");
  const locale = useLocale();
  const result = useAsyncHook();
  const getLayout = useMemo(
    () => result.story.find(({ slug }) => slug === "layout"),
    [result.story]
  );
  const getStory = useMemo(() => {
    return result.story.filter(({ slug }) => {
      const pathname = location.pathname.toLowerCase();
      return (
        slug ===
        (pathname === "/"
          ? "home"
          : pathname.slice(pathname.lastIndexOf("/") + 1))
      );
    })[0];
  }, [result.story]);
  useEffect(() => {
    key.current = uuidGenerator();
  }, [locale]);
  useRemovesNullClass();
  return (
    <Layout key={key.current} story={getLayout}>
      <Component {...getStory} />;
    </Layout>
  );
}
