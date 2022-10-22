import { useAppDispatch } from "../store";
import { setterPosts } from "../store/posts";
import { setterProjects } from "../store/projects";
// import { manageLocalStorage } from '../utils/storage';
import { filterObjProperties } from "../utils/object";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from "react";
import { StoryData, StoriesParams, useStoryblokApi } from "@storyblok/react";

export const useMutationObserver = (
  node: string,
  callback: (_: MutationRecord[]) => void,
  options?: MutationObserverInit
) => {
  useEffect(() => {
    const targetNode = document.querySelector(node);
    const observer = new MutationObserver(callback);
    if (targetNode) observer.observe(targetNode, options);
    return () => observer.disconnect();
  }, [node, callback, options]);
};

export const useLocale = () => {
  // const { setLocalData, getLocalData } = manageLocalStorage();
  const setterUndefined = (value: string) => (value ? value : null);
  const [lang, setLang] = useState("en");
  const handler = useCallback((mutations: MutationRecord[]) => {
    mutations.forEach(({ type, attributeName }) => {
      if (type === "attributes" && attributeName === "lang") {
        setLang(document.documentElement.lang);
      }
    });
  }, []);

  useMutationObserver("html", handler, { attributes: true });
  return lang;
};

export const useRemovesNullClass = () => {
  const handler = useCallback(() => {
    const nodesNull = document.querySelectorAll(".null");
    if (nodesNull.length) {
      nodesNull.forEach((node) => {
        node.classList.remove("null");
      });
    }
  }, []);
  useMutationObserver("html", handler, { attributes: true, subtree: true });
};

export function useAsyncHook(
  slug = "",
  options?: Omit<StoriesParams, "language">
) {
  const locale = useLocale();
  const [result, setResult] = useState<{ story: StoryData[] }>({ story: [] });
  useEffect(() => {
    (async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const storyblok = useStoryblokApi();
      const { data } = await storyblok.get(`cdn/stories/${slug}`, {
        ...options,
        language: locale,
      });
      setResult(
        filterObjProperties(
          { story: data.story ?? data.stories, ...data },
          "stories",
          false
        )
      );
    })();
  }, [locale]);
  return result;
}

export function useSetSlugDetail(results: StoryData[]) {
  const dispatch = useAppDispatch();
  const filterDetails = (name: string) =>
    results.filter(({ full_slug }) => new RegExp(`${name}/\.`).test(full_slug));
  useLayoutEffect(() => {
    dispatch(setterPosts(filterDetails("blog")));
    dispatch(setterProjects(filterDetails("portfolio")));
  });
}

export function useGetWindowSize() {
  const getWindowSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const handleWindowResize = () => setWindowSize(getWindowSize());
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize, false);
    return () =>
      window.removeEventListener("resize", handleWindowResize, false);
  }, []);
  return windowSize;
}

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<ReturnType<typeof Function>>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) savedCallback.current();
    };
    if (delay != null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
