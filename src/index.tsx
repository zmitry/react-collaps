import React, {
    useRef,
    cloneElement,
    ReactElement,
    useLayoutEffect,
    useState,
} from "react";

interface CollapseProps {
    // show or hide element
    in: boolean;
    // max animation duration
    maxDuration?: number;
    // children element should be able to hold a ref on it
    children: ReactElement;
    // animate speed per content pixel
    // if content is too small it makes sense to show it faster than bigger content
    // this prop sets speed per content pixel
    speedPerPixel?: number;
    // you can replace underlying wrapper but it might break the collapse
    as?: any;
    // do not unmount component on hide
    keepMounted?: boolean
}

export function Collapse({
                             as: AS = "div",
                             children,
                             maxDuration = 500,
                             in: inProp,
                             speedPerPixel = 1,
                             keepMounted = false
                         }: CollapseProps) {
    const ref = useRef<HTMLElement>(null);
    const [state, setState] = useState<'hidden' | 'visible'>("hidden");
    const animationRef = useRef<Animation>();
    if (inProp && state === "hidden") {
        setState("visible");
    }
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) {
            return () => {
            };
        }
        const height = el.getBoundingClientRect().height;
        const prevAnimation = animationRef.current;
        const duration = Math.max(
            Math.min(height * speedPerPixel, maxDuration),
            200
        );
        el.style.setProperty("--height", height + "px");
        // if it's collapse
        if (prevAnimation && !inProp) {
            prevAnimation.effect.updateTiming({
                duration: duration * (2 / 3),
                easing: "ease",
            });
            prevAnimation.reverse();
            prevAnimation.onfinish = () => {
                setState("hidden");
            };
        } else if (inProp && el.animate) {
            prevAnimation?.cancel()
            const animation = el.animate(
                [
                    {height: 0, opacity: 0},
                    {height: "var(--height)", opacity: 1},
                ],
                {
                    // animate duration based on height, so smaller content will be shown faster
                    // and set max limit to duration so long content is shown not more than duration
                    duration,
                    easing: "ease-in-out",
                    fill: "none",
                }
            );

            animation!.play();

            animationRef.current = animation;
        }
        return () => {
            prevAnimation?.cancel();
        };
    }, [inProp, maxDuration, speedPerPixel]);
    if (state === "hidden" && !keepMounted) {
        return null;
    }
    return (
        <AS
            style={
                {
                    overflow: "hidden",
                    height: state === "hidden" ? "0px" : "auto",
                } as any
            }
        >
            {cloneElement(children, {ref})}
        </AS>
    );
}
