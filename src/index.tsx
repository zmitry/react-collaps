import React, { useRef, cloneElement, ReactElement, useLayoutEffect, useState, useMemo } from "react";
import { useReducer } from "react";

export function getAutoTimeout(size) {
  if (!size) {
    return 0;
  }

  const constant = size / 36;

  // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

interface CollapseProps {
  // show or hide element
  in: boolean;
  // max animation duration
  duration?: number | "auto";
  // children element should be able to hold a ref on it
  children: ReactElement;
  // you can replace underlying wrapper but it might break the collapse
  as?: any;
  // do not unmount component on hide
  keepMounted?: boolean;
}

const makeReducer = ({ stateRef, effect, dispatch, onStateChange }) => (state, event) => {
  if (event === state.status) {
    return state;
  }
  console.log(`transition from ${state.status}=>${event}`);
  if (!state.animation && (event === "entering" || event === "exiting")) {
    state = { ...state, animation: effect(event) };
  }
  onStateChange(event);
  switch (event) {
    case "appear": {
      return { status: event };
    }
    case "entering": {
      state.animation.run(() => {
        dispatch("entered");
      }, 1);
      return { ...state, status: event };
    }
    case "entered": {
      return { ...state, status: event };
    }
    case "exiting": {
      state.animation.run(() => {
        dispatch("exited");
      }, -1);
      return { ...state, status: event };
    }
    case "exited": {
      return { status: event };
    }
  }
  throw new Error(`unknown event "${event}"`);
};

function useAnimation(inProp, effect: (state) => { run }, onStateChange = (v) => {}) {
  const stateRef = useRef();
  const dispatchRef = useRef(null);

  const [state, dispatch] = useReducer(
    useMemo(
      () =>
        makeReducer({
          stateRef,
          dispatch: (...args) => dispatchRef!.current(...args),
          onStateChange,
          effect,
        }),
      []
    ),
    { status: inProp ? "entered" : "exited" },
    (d) => d
  );
  stateRef.current = state;
  dispatchRef.current = dispatch;
  useLayoutEffect(() => {
    const status = stateRef.current.status;
    if (status === "appear") {
      onStateChange("beforeenter");
      dispatch("entering");
    } else if (inProp && (status === "exited" || state.status === "exiting") && status !== "entering") {
      if (status !== "exiting") {
        onStateChange("beforeenter");
      }
      dispatch("entering");
    } else if (!inProp && (status === "entering" || status === "entered") && status !== "exiting") {
      if (status !== "entering") {
        onStateChange("beforeexit");
      }
      dispatch("exiting");
    }
  }, [inProp]);
  return [state, dispatch];
}

export function Collapse({
  as: AS = "div",
  children,
  duration = "auto",
  in: inProp,
  keepMounted = false,
}: CollapseProps) {
  const ref = useRef<HTMLElement>(null);
  const [{ status }, dispatch] = useAnimation(
    inProp,
    () => {
      const el = ref.current;
      const height = el.clientHeight;
      const anim = ref.current.animate(
        {
          height: ["0", "var(--height)"],
          opacity: [0, 1],
        },
        {
          duration: duration === "auto" ? getAutoTimeout(height) : duration,
          fill: "none",
          easing: "ease-in-out",
        }
      );
      anim.pause();
      return {
        run(done, dir) {
          anim.playbackRate = dir;
          anim.play();
          anim.onfinish = done;
        },
      };
    },
    (status) => {
      if (status === "beforeexit" || status === "beforeenter") {
        const el = ref.current;
        if (!el) {
          return;
        }
        ref.current.style.setProperty("--height", el.clientHeight + "px");
      }
    }
  );
  if (!ref.current && inProp && status === "exited") {
    dispatch("appear");
  }

  if (status === "exited" && !keepMounted) {
    return null;
  }
  return (
    <AS
      style={
        {
          overflow: "hidden",
          height: status === "exited" ? "0px" : "auto",
        } as any
      }
    >
      <div ref={ref}>{children}</div>
    </AS>
  );
}

interface SlideProps {
  // show or hide element
  in: boolean;
  // max animation duration
  duration?: number | "auto";
  direction: string;
  // children element should be able to hold a ref on it
  children: ReactElement;
  axis: string;
  // you can replace underlying wrapper but it might break the collapse
  as?: any;
  // do not unmount component on hide
  keepMounted?: boolean;
}

export function Slide({
  as: AS = "div",
  children,
  duration = 500,
  direction = "left",
  in: inProp = false,
  keepMounted = true,
}: SlideProps) {
  const ref = useRef<HTMLElement>(null);
  const [{ status }, dispatch] = useAnimation(
    inProp,
    () => {
      const el = ref.current;
      const height = el.clientHeight;

      let key = [
        {
          transform: `var(--offset)`,
          opacity: 1,
        },
        {
          transform: `translate(0, 0)`,
          opacity: 1,
        },
      ];
      if (direction === "right") {
        // key.reverse()
      }
      const anim = ref.current.animate(key, {
        duration: duration,
        fill: "both",
        easing: "ease-in-out",
      });
      anim.pause();
      return {
        run(done, dir) {
          anim.playbackRate = dir;
          anim.play();
          anim.onfinish = done;
        },
      };
    },
    (status) => {
      const el = ref.current;
      if (!el) {
        return;
      }
      const isFirstEnter = !ref.current.style.getPropertyValue("--offset") && status === "beforeenter";
      if (status === "beforeexit" || isFirstEnter) {
        const rect = el.getBoundingClientRect();
        let offset;
        if (direction === "left") {
          offset = `${window.innerWidth - rect.left}px`;
        } else if (direction === "right") {
          offset = -(rect.left + rect.width) + "px";
        } else if (direction === "top") {
          offset = window.innerHeight - rect.top + "px";
        } else if (direction === "bottom") {
          offset = -rect.bottom + "px";
        }
        let axis = direction === "left" || direction === "right" ? "x" : "y";
        const transofrmProp = (v) => `translate(${axis === "x" ? v + "," + 0 : 0 + "," + v})`;
        ref.current.style.setProperty("--offset", `${transofrmProp(offset)}`);
      }
    }
  );
  if (!ref.current && inProp && status === "exited") {
    dispatch("appear");
  }

  if (status === "exited" && !keepMounted) {
    return null;
  }
  return (
    <AS
      style={
        {
          height: status === "exited" ? "0px" : "auto",
          visibility: status === "exited" ? "hidden" : "visible",
        } as any
      }
    >
      <div ref={ref}>{children}</div>
    </AS>
  );
}
