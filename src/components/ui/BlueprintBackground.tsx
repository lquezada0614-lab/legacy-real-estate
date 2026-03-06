"use client";

export default function BlueprintBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="blueprint-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#C5A059"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="blueprint-detail"
            width="240"
            height="240"
            patternUnits="userSpaceOnUse"
          >
            <rect width="240" height="240" fill="url(#blueprint-grid)" />
            <circle
              cx="120"
              cy="120"
              r="80"
              fill="none"
              stroke="#C5A059"
              strokeWidth="0.3"
            />
            <line
              x1="0"
              y1="120"
              x2="240"
              y2="120"
              stroke="#C5A059"
              strokeWidth="0.3"
            />
            <line
              x1="120"
              y1="0"
              x2="120"
              y2="240"
              stroke="#C5A059"
              strokeWidth="0.3"
            />
            <circle
              cx="120"
              cy="120"
              r="40"
              fill="none"
              stroke="#C5A059"
              strokeWidth="0.2"
            />
            <line
              x1="40"
              y1="40"
              x2="200"
              y2="200"
              stroke="#C5A059"
              strokeWidth="0.15"
            />
            <line
              x1="200"
              y1="40"
              x2="40"
              y2="200"
              stroke="#C5A059"
              strokeWidth="0.15"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-detail)" />
      </svg>
    </div>
  );
}
