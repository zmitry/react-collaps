## React-collaps

React component for collapsing and expanding state.
Useable for developing component like accordions and similar stuff.

[demo preview](https://react-collaps.vercel.app/)

## how to use

```jsx
function Section({ children, title, id }) {
  const [state, setState] = useState(false);
  return (
    <div>
      <button
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
```
