import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartPoint } from '@/types';
import { CATEGORY_COLORS } from '@/data/mock';

const tooltipStyle = {
  borderRadius: 16,
  border: 'none',
  boxShadow: '0 10px 40px -12px rgba(0,0,0,0.25)',
  background: 'rgba(255,255,255,0.95)',
  fontSize: 12,
};

export function TrendChart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ left: -20, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} stroke="#94a3b8" />
        <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#94a3b8" />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fill="url(#trendFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CategoryPie({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="label" innerRadius={55} outerRadius={90} paddingAngle={4} stroke="none">
          {data.map((_, i) => (
            <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ImpactBars({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ left: -20, right: 8, top: 8 }}>
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} stroke="#94a3b8" />
        <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#94a3b8" />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(16,185,129,0.06)' }} />
        <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} maxBarSize={28} />
        <Bar dataKey="secondary" fill="#fb923c" radius={[8, 8, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}
