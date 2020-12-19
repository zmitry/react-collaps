import React, {
    useState,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
} from "react";
import {Collapse} from "../src/index";
import {motion, AnimatePresence} from 'framer-motion'

const Section = React.forwardRef(function Section(
    {children, title, id, keepMounted}: any,
    ref
) {
    const [state, setState] = useState(false);
    return (
        <div ref={ref as any}>
            <button
                style={{width: 200}}
                onClick={(e) => {
                    setState((v) => !v);
                }}
            >
                <h4>{title}</h4>
            </button>
            <Collapse keepMounted={keepMounted} in={state}>
                <div>{children}</div>
            </Collapse>
        </div>
    );
});

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

export function MotionSimple() {
    return <div style={{display: 'flex', flexDirection:'column'}}>
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
                <Simple />
            </SectionMotion>
        </Accordion>
    </div>
}

export function Simple() {
    return <Accordion>
        <Section title="hello">
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
        </Section>
    </Accordion>
}

export function SimpleKeepMounted() {
    return <Accordion>
        <Section title="hello" keepMounted>
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
        </Section>
        <Section title="hello" keepMounted>
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
        </Section>
    </Accordion>
}

export function Complex() {
    const [state, setState] = useState(false);
    return (
        <div
            className="App"
            onClick={(e) => {
                setState(Math.random());
            }}
        >
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <Accordion>
                <Section title="hello">
                    <img
                        width="500"
                        height="500"
                        src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                    ></img>{" "}
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                    similique, repellendu as dfa sdf as dfa sf as fasds {state}iure earum
                    dolore, assumenda possimus, praesentium quod ut cumque beatae
                    voluptate quidem officia debitis veniam laborum accusantium! Ipsam,
                    aliquam!
                </Section>
                <Section title="hello">
                    nested content
                    <div style={{background: "red"}}>
                        <Accordion>
                            <Section title="hello">
                                <img
                                    width="500"
                                    height="500"
                                    src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                                ></img>{" "}
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                                similique, repellendus iure earum dolore, assumenda possimus,
                                praesentium quod ut cumque beatae voluptate quidem officia
                                debitis veniam laborum accusantium! Ipsam, aliquam!
                            </Section>
                            <Section title="hello">
                                <img
                                    width="300"
                                    height="300"
                                    src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                                ></img>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                                similique, repellendus iure earum dolore, assumenda possimus,
                                praesentium quod ut cumque beatae voluptate quidem officia
                                debitis veniam laborum accusantium! Ipsam, aliquam!
                            </Section>
                            <Section title="hello">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                                similique, repellendus iure earum dolore, assumenda possimus,
                                praesentium quod ut cumque beatae voluptate quidem officia
                                debitis veniam laborum accusantium! Ipsam, aliquam!
                            </Section>
                        </Accordion>
                    </div>
                </Section>
                <Section title="hello">
                    <img
                        width="300"
                        height="300"
                        src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                    ></img>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                    similique, repellendus iure earum dolore, assumenda possimus,
                    praesentium quod ut cumque beatae voluptate quidem officia debitis
                    veniam laborum accusantium! Ipsam, aliquam!
                </Section>
            </Accordion>
        </div>
    );
}
