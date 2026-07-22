import { ResponsiveContainer, AreaChart, Area } from "recharts";

// Subtle sparkline for KPI cards (spec §12).
export function Sparkline({
  data,
  color = "#22D3EE",
  height = 34,
}: {
  data: number[];
  color?: string;
  height?: number;
}) {
  const d = data.map((value, i) => ({ i, value }));
  const id = `spark-${color.replace("#", "")}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={d} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#${id})`}
          isAnimationActive={false}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
