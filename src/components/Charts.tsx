"use client";

import React from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

export function DonutRisk({ value }: { value: number }) {
  const data = [
    { name: "Risk", value },
    { name: "Rest", value: Math.max(0, 100 - value) },
  ];

  const colors = ["#38BDF8", "#E2E8F0"]; // sky + slate-200

  return (
    <div className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={52}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, i) => <Cell key={i} fill={colors[i]} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="-mt-28 text-center">
        <div className="text-3xl font-extrabold text-slate-900">{value}%</div>
        <div className="text-xs font-semibold text-slate-600">Umumiy risk</div>
      </div>
    </div>
  );
}

export function RadarBlocks({
  points,
}: {
  points: { label: string; value: number }[];
}) {
  // value: 0..20
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={points}>
          <PolarGrid />
          <PolarAngleAxis dataKey="label" tick={{ fontSize: 12 }} />
          <Radar dataKey="value" stroke="#60A5FA" fill="#93C5FD" fillOpacity={0.45} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
