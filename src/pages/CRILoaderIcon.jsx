import React from "react";

/**
 * CRI  icon-only looping loader
 *
 * Same node coordinates traced from the source logo (crii_logo.png).
 * Loops continuously: edges and nodes light up in sequence, then the
 * whole sequence fades and restarts  no text, no progress bar, no
 * container chrome. Drop this anywhere a spinner would normally go.
 */

const NODES = [
  { x: 19.3, y: 26.2 },
  { x: 45.3, y: 31.6 },
  { x: 45.2, y: 69.3 },
  { x: 24.2, y: 75.1 },
  { x: 14.5, y: 98.8 },
  { x: 5.0, y: 117.2 },
  { x: 12.8, y: 147.2 },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [3, 4],
  [4, 5],
  [5, 6],
];

const CYCLE = 2.2;

export default function CRILoaderIcon({
  className = "w-12 h-32",
  dark = false,
}) {
  return (
    <svg
      viewBox="0 0 60 160"
      className={className}
      fill="none"
      role="img"
      aria-label="Loading"
    >
      <style>
        {`
          @keyframes cri-draw { 0% { stroke-dashoffset: 1; } 35%, 100% { stroke-dashoffset: 0; } }
          @keyframes cri-node { 0%, 100% { fill: #E7E5DE; r: 5.2px; } 45%, 90% { fill: #1D5FFF; r: 6.4px; } }
          .cri-edge { stroke-dasharray: 1; pathLength: 1; animation: cri-draw ${CYCLE}s ease-in-out infinite; }
          .cri-node { animation: cri-node ${CYCLE}s ease-in-out infinite; }
        `}
      </style>

      {EDGES.map(([a, b], i) => {
        const n1 = NODES[a];
        const n2 = NODES[b];
        const delay = (i / EDGES.length) * CYCLE * 0.7;
        return (
          <line
            key={i}
            className="cri-edge"
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke={dark ? "#E7E5DE" : "#14213D"}
            strokeWidth="3.2"
            strokeLinecap="round"
            pathLength="1"
            style={{ animationDelay: `${delay}s` }}
          />
        );
      })}

      {NODES.map((n, i) => {
        const delay = (i / NODES.length) * CYCLE * 0.7;
        return (
          <circle
            key={i}
            className="cri-node"
            cx={n.x}
            cy={n.y}
            r="5.2"
            style={{ animationDelay: `${delay}s` }}
          />
        );
      })}
    </svg>
  );
}
