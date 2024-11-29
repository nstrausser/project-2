import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Enhanced mock data with more realistic values
const stockMovementData = {
  all: [
    { name: 'Jan', value: 1200, revenue: 45000 },
    { name: 'Feb', value: 1900, revenue: 72000 },
    { name: 'Mar', value: 1500, revenue: 58000 },
    { name: 'Apr', value: 2100, revenue: 82000 },
    { name: 'May', value: 2400, revenue: 95000 },
    { name: 'Jun', value: 1800, revenue: 70000 },
  ],
  'john-smith': [
    { name: 'Jan', value: 800, revenue: 30000 },
    { name: 'Feb', value: 1200, revenue: 45000 },
    { name: 'Mar', value: 900, revenue: 35000 },
    { name: 'Apr', value: 1300, revenue: 50000 },
    { name: 'May', value: 1500, revenue: 58000 },
    { name: 'Jun', value: 1100, revenue: 42000 },
  ],
  'sarah-johnson': [
    { name: 'Jan', value: 400, revenue: 15000 },
    { name: 'Feb', value: 700, revenue: 27000 },
    { name: 'Mar', value: 600, revenue: 23000 },
    { name: 'Apr', value: 800, revenue: 32000 },
    { name: 'May', value: 900, revenue: 37000 },
    { name: 'Jun', value: 700, revenue: 28000 },
  ],
};

const filmUsageByType = [
  { name: 'Clear PPF', value: 2500 },
  { name: 'Matte PPF', value: 1200 },
  { name: 'Colored PPF', value: 800 },
  { name: 'Other', value: 300 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const installers = [
  { id: 'all', name: 'All Installers' },
  { id: 'john-smith', name: 'John Smith' },
  { id: 'sarah-johnson', name: 'Sarah Johnson' },
];

const timeRanges = [
  { id: '7d', name: 'Last 7 Days' },
  { id: '30d', name: 'Last 30 Days' },
  { id: '90d', name: 'Last 90 Days' },
  { id: '1y', name: 'Last Year' },
];

const efficiencyData = [
  { name: 'Mon', efficiency: 95, installations: 3 },
  { name: 'Tue', efficiency: 88, installations: 4 },
  { name: 'Wed', efficiency: 92, installations: 3 },
  { name: 'Thu', efficiency: 85, installations: 5 },
  { name: 'Fri', efficiency: 90, installations: 4 },
];

type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
            {entry.name.includes('Revenue') ? '$' : entry.name.includes('Efficiency') ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

type CustomPieLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
};

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: CustomPieLabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="hsl(var(--foreground))"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export default function Analytics() {
  const [selectedInstaller, setSelectedInstaller] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');

  const chartConfig = {
    cartesianGrid: {
      strokeDasharray: '3 3',
      className: 'stroke-border',
    },
    xAxis: {
      stroke: 'hsl(var(--muted-foreground))',
      fontSize: 12,
      tickLine: false,
      axisLine: false,
    },
    yAxis: {
      stroke: 'hsl(var(--muted-foreground))',
      fontSize: 12,
      tickLine: false,
      axisLine: false,
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track performance metrics and business insights.
          </p>
        </div>
        <div className="flex space-x-4">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.id} value={range.id}>
                  {range.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedInstaller} onValueChange={setSelectedInstaller}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select installer" />
            </SelectTrigger>
            <SelectContent>
              {installers.map((installer) => (
                <SelectItem key={installer.id} value={installer.id}>
                  {installer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Revenue Over Time</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockMovementData[selectedInstaller as keyof typeof stockMovementData]}>
                <CartesianGrid {...chartConfig.cartesianGrid} />
                <XAxis {...chartConfig.xAxis} dataKey="name" />
                <YAxis
                  {...chartConfig.yAxis}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-1))', r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Film Usage by Type</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filmUsageByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={CustomPieLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="hsl(var(--background))"
                >
                  {filmUsageByType.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Installation Efficiency</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efficiencyData} barGap={0}>
                <CartesianGrid {...chartConfig.cartesianGrid} />
                <XAxis {...chartConfig.xAxis} dataKey="name" />
                <YAxis
                  {...chartConfig.yAxis}
                  yAxisId="left"
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis
                  {...chartConfig.yAxis}
                  yAxisId="right"
                  orientation="right"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  yAxisId="left"
                  dataKey="efficiency"
                  name="Efficiency"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  yAxisId="right"
                  dataKey="installations"
                  name="Installations"
                  fill="hsl(var(--chart-3))"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Stock Movement</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockMovementData[selectedInstaller as keyof typeof stockMovementData]}>
                <CartesianGrid {...chartConfig.cartesianGrid} />
                <XAxis {...chartConfig.xAxis} dataKey="name" />
                <YAxis
                  {...chartConfig.yAxis}
                  tickFormatter={(value) => `${value} ft²`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Square Feet"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-4))', r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}