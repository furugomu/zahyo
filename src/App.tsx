import React, { useCallback, useState } from "react";
import { render } from "react-dom";

type RectProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  a: number;
};

const initialData: RectProps[] = [
  { x: 30, y: 10, w: 100, h: 20, a: 0 },
  { x: 10, y: 30, w: 20, h: 100, a: 0 },
  { x: 130, y: 30, w: 20, h: 100, a: 0 },
  { x: 30, y: 80, w: 50, h: 10, a: 0 },
  { x: 30, y: 130, w: 50, h: 10, a: 0 },

  { x: 100, y: 200, w: 80, h: 80, a: 45 },
  { x: 230, y: 200, w: 60, h: 60, a: 45 }
];

const App = () => {
  const [json, setJson] = useState(JSON.stringify(initialData, null, 2));
  const [data, setData] = useState<RectProps[]>(initialData);
  const parse = useCallback(() => {
    setData(JSON.parse(json));
  }, [json]);
  return (
    <div>
      <p>
        JSON を変更してボタンを押すと図が更新されます。
        <a href="https://github.com/furugomu/zahyo">github</a>
      </p>
      <div>
        <svg width={512} height={512} viewBox="0 0 512 512">
          <rect
            id="waku"
            x={0}
            y={0}
            width={512}
            height={512}
            stroke="black"
            fill="white"
            strokeWidth={1}
          />
          {data.map(({ x, y, w, h, a }) => (
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              transform={`rotate(${a}, ${x}, ${y})`}
              stroke="blue"
              fill="white"
              strokeWidth={1}
              key={`${x}-${y}`}
            />
          ))}
        </svg>
      </div>
      <div>
        <textarea
          value={json}
          onChange={e => setJson(e.target.value)}
          cols={80}
          rows={10}
        />
        <div>
          <button onClick={parse}>更新2</button>
        </div>
      </div>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  render(<App />, document.querySelector("#r"));
});
