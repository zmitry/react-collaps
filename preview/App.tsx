import React, {
    useState,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
} from "react";
import {Collapse, Slide} from "../src/index";

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

export function SlideDemo() {
    const [state, setState] = useState(true);

    return <div>
        <button onClick={e => setState((v) => !v)}>
            slide ${state ? 'on' : 'off'}
        </button>
        <div style={{width: 100, height: 100, marginLeft: 200, display: 'grid', grid: '1fr 1fr 1fr 1fr', gridGap: 5}}>
            <Slide in={state} direction="right">
                <div style={{background: 'red', overflow: 'hidden', height: 100}}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                    similique, repellendu as dfa sdf as dfa sf as fasds iure earum
                    dolore, assumenda possimus, praesentium quod ut cumque beatae
                    voluptate quidem officia debitis veniam laborum accusantium! Ipsam,
                    aliquam!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dolor esse facilis, porro quae
                    quaerat quidem vitae. Commodi debitis, eius expedita fugit minima molestias omnis. Cumque iste
                    libero
                    recusandae vitae.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores molestiae neque temporibus. A
                    adipisci, amet, corporis cumque ea eius eligendi error incidunt iure necessitatibus nostrum
                    quibusdam
                    quisquam quos sequi voluptas!

                </div>
            </Slide>
            <Slide in={state} direction="bottom">
                <div style={{background: 'red', overflow: 'hidden', height: 100}}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                    similique, repellendu as dfa sdf as dfa sf as fasds iure earum
                    dolore, assumenda possimus, praesentium quod ut cumque beatae
                    voluptate quidem officia debitis veniam laborum accusantium! Ipsam,
                    aliquam!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dolor esse facilis, porro quae
                    quaerat quidem vitae. Commodi debitis, eius expedita fugit minima molestias omnis. Cumque iste
                    libero
                    recusandae vitae.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores molestiae neque temporibus. A
                    adipisci, amet, corporis cumque ea eius eligendi error incidunt iure necessitatibus nostrum
                    quibusdam
                    quisquam quos sequi voluptas!

                </div>
            </Slide>

            <Slide in={state} direction="top">
                <div style={{background: 'red', overflow: 'hidden', height: 100}}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                    similique, repellendu as dfa sdf as dfa sf as fasds iure earum
                    dolore, assumenda possimus, praesentium quod ut cumque beatae
                    voluptate quidem officia debitis veniam laborum accusantium! Ipsam,
                    aliquam!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dolor esse facilis, porro quae
                    quaerat quidem vitae. Commodi debitis, eius expedita fugit minima molestias omnis. Cumque iste
                    libero
                    recusandae vitae.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores molestiae neque temporibus. A
                    adipisci, amet, corporis cumque ea eius eligendi error incidunt iure necessitatibus nostrum
                    quibusdam
                    quisquam quos sequi voluptas!

                </div>
            </Slide>
            <Slide in={state} direction="left">
                <div style={{background: 'red', overflow: 'hidden'}}>
                    <Complex />
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                    similique, repellendu as dfa sdf as dfa sf as fasds iure earum
                    dolore, assumenda possimus, praesentium quod ut cumque beatae
                    voluptate quidem officia debitis veniam laborum accusantium! Ipsam,
                    aliquam!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dolor esse facilis, porro quae
                    quaerat quidem vitae. Commodi debitis, eius expedita fugit minima molestias omnis. Cumque iste
                    libero
                    recusandae vitae.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores molestiae neque temporibus. A
                    adipisci, amet, corporis cumque ea eius eligendi error incidunt iure necessitatibus nostrum
                    quibusdam
                    quisquam quos sequi voluptas!

                </div>
            </Slide>

        </div>
    </div>
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
