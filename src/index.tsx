import React, {
    useRef,
    cloneElement,
    ReactElement,
    useLayoutEffect,
    useState,
    useMemo,
} from "react";
import {useReducer} from "react";

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
    duration?: number | 'auto';
    // children element should be able to hold a ref on it
    children: ReactElement;
    // you can replace underlying wrapper but it might break the collapse
    as?: any;
    // do not unmount component on hide
    keepMounted?: boolean
}

const makeReducer = ({stateRef, effect, dispatch, onStateChange}) => (state, event) => {
    if (event === state.status) {
        return state;
    }
    console.log(`transition from ${state.status}=>${event}`)
    switch (event) {
        case "appear" : {
            return {status: event}
        }
        case  "entering": {
            onStateChange(event)
            let animation = state.animation
            if (state.animation) {
                state.animation.playbackRate = 1;
            } else {
                animation = new Animation(effect(event))
                animation.play()
            }
            animation.onfinish = () => {
                if (stateRef.current.status === "exited") {
                    return;
                }
                onStateChange("entered")
                dispatch("entered")
            }
            return {animation, status: event}
        }
        case  "entered": {
            return {...state, status: event}
        }
        case "exiting": {
            onStateChange(event)
            let animation = state.animation
            if (animation) {
                animation.playbackRate = -1;
            } else {
                animation = new Animation(effect(event))
                animation.play()
            }

            animation.onfinish = () => {
                onStateChange("exited")
                dispatch("exited")
            }
            return {animation, status: event}
        }
        case  "exited": {
            onStateChange(event)
            return {status: event}
        }
    }
    throw new Error(`unknown event "${event}"`)
}

function useAnimation(inProp, effect: (state) => AnimationEffect, onStateChange = (v) => {
}) {
    const stateRef = useRef()
    const dispatchRef = useRef(null)

    const [state, dispatch] = useReducer(useMemo(() => makeReducer({
        stateRef,
        dispatch: (...args) => dispatchRef!.current(...args),
        onStateChange,
        effect
    }), []), {status: inProp ? "entered" : "exited"}, (d) => d)
    stateRef.current = state;
    dispatchRef.current = dispatch
    useLayoutEffect(() => {
        const status = stateRef.current.status;
        if (status === "appear") {
            onStateChange("beforeenter")
            dispatch("entering");
        } else if (inProp && (status === "exited" || state.status === "exiting") && status !== "entering") {
            if (status !== "exiting") {
                onStateChange("beforeenter")
            }
            dispatch("entering")
        } else if (!inProp && (status === "entering" || status === "entered") && status !== "exiting") {
            if (status !== "entering") {
                onStateChange("beforeexit")
            }
            dispatch("exiting")
        }
    }, [inProp])
    return [state, dispatch]
}

export function Collapse({
                             as: AS = "div",
                             children,
                             duration = 'auto',
                             in: inProp,
                             keepMounted = false
                         }: CollapseProps) {
    const ref = useRef<HTMLElement>(null);
    const [{status}, dispatch] = useAnimation(inProp, () => {
        const el = ref.current;
        const height = el.clientHeight
        let key = [
            {height: '0', opacity: 0},
            {height: 'var(--height)', opacity: 1}
        ]
        return new KeyframeEffect(
            ref.current, // element to animate
            key, {
                duration: duration === 'auto' ? getAutoTimeout(height) : duration,
                fill: 'none',
                easing: "ease-in-out"
            }
        );
    }, (status) => {
        if (status === "beforeexit" || status === "beforeenter") {
            const el = ref.current;
            if (!el) {
                return;
            }
            const height = el.clientHeight
            ref.current.style.setProperty('--height', height + 'px')
        }
    })
    if (!ref.current && inProp && status === "exited") {
        dispatch("appear");
    }

    if (status === "exited" && !keepMounted) {
        return null;
    }
    return (
        <AS
            style={{
                overflow: "hidden",
                height: status === "exited" ? "0px" : "auto",
            } as any}
        >
            <div ref={ref} style={status === "appear" ? {position: 'absolute', visibility: 'hidden'} : {}}>
                {children}
            </div>
        </AS>
    );
}
