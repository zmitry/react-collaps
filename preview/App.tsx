import React, {
  useState,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { Collapse } from "../src/index";

const Section = React.forwardRef(function Section(
  { children, title, id }: any,
  ref
) {
  const [state, setState] = useState(false);
  return (
    <div ref={ref as any}>
      <button
        style={{ width: 200 }}
        onClick={(e) => {
          setState((v) => !v);
        }}
      >
        <h4>{title}</h4>
      </button>
      <Collapse in={state}>
        <div>{children}</div>
      </Collapse>
    </div>
  );
});

function Accordion({ children }) {
  const [id] = useState(Math.random());
  return React.Children.map(children, (el) => {
    return React.cloneElement(el, { id });
  });
}

export default function App() {
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
          <div style={{ background: "red" }}>
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
