import React, {useState} from "react";
import {AnimatePresence, MotionConfig,  AnimationFeature, m as motion} from "framer-motion";
import {Simple} from "./App";

export function App({children}) {
    return (
        <MotionConfig features={[AnimationFeature]}>
            {children}
        </MotionConfig>
    )
}

function Accordion(
    {
        children
    }
) {
    const [id] = useState(Math.random());
    return React.Children.map(children, (el) => {
        return React.cloneElement(el, {id});
    });
}

export function TestMotion() {
    const [state, setState] = useState(false);

    return <div>
        <button onClick={() => setState(v => !v)}>click</button>
        <AnimatePresence>
            {state && <motion.div
                key="content"
                animate={{
                    backgroundColor: '#0000ff',
                    x: 300,
                }}
                exit={{
                    backgroundColor: '#00ff00',
                    color: '#ffffff',
                    x: -300,
                }}
                initial={{
                    backgroundColor: '#ff0000',
                    color: '#000000',
                    x: 300,
                }}
                transition={{duration: 1}}
            >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias debitis ea earum ipsa, magni
                mollitia quibusdam, quidem tempora totam unde vel voluptate. Animi at aut doloremque, libero nesciunt
                quia!
            </motion.div>}
        </AnimatePresence>
    </div>
}

export function TestNative() {
    return <div
        onClick={e => {
            const element = e.target as HTMLDivElement
            // const f1 = element.animate({
            //     background: ['white', 'green']
            // }, {
            //     duration: 1000,
            //     fill: 'forwards'
            // });
            //
            // console.log( f1.effect.getComputedTiming())
            // const f2 = element.animate({
            //     background: ['white', 'red']
            // }, {
            //     delay: 500,
            //     duration: 1000,
            //     fill: 'forwards'
            // });

            let f1 = element.animate({
                transform: ['translateX(0)', 'translateX(300px)']
            }, 1000);

            setTimeout(() => {
                f1.reverse()
            }, 500)

        }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, harum magni. Ad, natus, voluptates? A
        dolorem dolorum ducimus error esse explicabo, ipsam magnam nesciunt, perferendis quibusdam repellat, sunt
        tenetur ullam.

    </div>
}

export function MotionSimple() {
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <Accordion>
            <SectionMotion title="hello">
                <img
                    width="500"
                    height="500"
                    src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                ></img>{" "}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                similique, repellendu as dfa sdf as dfa sf as fasds iure earum
                dolore, assumenda possimus, praesentium quod ut cumque beatae
                voluptate quidem officia debitis veniam laborum accusantium! Ipsam,
                aliquam!
            </SectionMotion>
            <SectionMotion title="hello2">
                idem officia debitis veniam laborum accusantium! Ipsam,
                aliquam!
            </SectionMotion>
            <SectionMotion title="hello2">
                <img
                    width="500"
                    height="500"
                    src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                ></img>{" "}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                similique, repellendu as dfa sdf as dfa sf as fasds iure earum
                dolore, assumenda possimus, praesentium quod ut cumque beatae
                voluptate quidem officia debitis veniam laborum accusantium! Ipsam,
                aliquam!
            </SectionMotion>
            <SectionMotion title="small content">
                dolore, assumenda possimus, praesentium quod ut cumque beatae
                voluptate quidem officia debitis veniam laborum accusantium! Ipsam,
                aliquam!
                <Simple/>
            </SectionMotion>
        </Accordion>
    </div>
}


function SectionMotion({children, title, id, keepMounted}: any) {
    const [state, setState] = useState(false);
    return (
        <>
            <button
                style={{width: 200}}
                onClick={(e) => {
                    setState((v) => !v);
                }}
            >
                <h4>{title}</h4>
            </button>
            <AnimatePresence initial={false}>
                {state && <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    style={{overflow: 'hidden'}}
                    variants={{
                        open: {opacity: 1, height: "auto"},
                        collapsed: {opacity: 0, height: 0}
                    }}
                    transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
                >
                    {children}
                </motion.div>}
            </AnimatePresence>
        </>
    );
}
