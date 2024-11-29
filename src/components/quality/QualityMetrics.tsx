import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';
import type { QualityMetrics } from '@/types/quality';

type MetricsCardProps = {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    label: string;
  };
  icon: React.ReactNode;
};

function MetricsCard({ title, value, trend, icon }: MetricsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        {icon}
        {trend && (
          <span
            className={cn(
              'text-sm',
              trend.value > 0
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500'
            )}
          >
            {trend.value > 0 ? '+' : ''}
            {trend.value}% {trend.label}
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </Card>
  );
}

type TrendChartProps = {
  data: {
    date: string;
    value: number;
  }[];
  dataKey: string;
  title: string;
  valueFormatter?: (value: number) => string;
};

function TrendChart({ data, dataKey, title, valueFormatter }: TrendChartProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={valueFormatter}
            />
            <Tooltip
              formatter={valueFormatter}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

type QualityMetricsProps = {
  metrics: QualityMetrics;
  trends: {
    passRate: { date: string; value: number }[];
    defects: { date: string; value: number }[];
    satisfaction: { date: string; value: number }[];
  };
};

export default function QualityMetricsView({ metrics, trends }: QualityMetricsProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Pass Rate"
          value={`${metrics.passRate}%`}
          trend={{ value: 2.5, label: 'vs last period' }}
          icon={<div className="h-5 w-5 text-primary" />}
        />
        <MetricsCard
          title="Avg Defects"
          value={metrics.averageDefectsPerInstall.toFixed(1)}
          trend={{ value: -0.3, label: 'vs last period' }}
          icon={<div className="h-5 w-5 text-yellow-500" />}
        />
        <MetricsCard
          title="Warranty Claims"
          value={`${metrics.warrantyClaimRate}%`}
          trend={{ value: -0.5, label: 'vs last period' }}
          icon={<div className="h-5 w-5 text-blue-500" />}
        />
        <MetricsCard
          title="Customer Satisfaction"
          value={metrics.customerSatisfactionScore.toFixed(1)}
          trend={{ value: 0.2, label: 'vs last period' }}
          icon={<div className="h-5 w-5 text-green-500" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TrendChart
          data={trends.passRate}
          dataKey="value"
          title="Pass Rate Trend"
          valueFormatter={(value) => `${value}%`}
        />
        <TrendChart
          data={trends.defects}
          dataKey="value"
          title="Defects per Installation"
          valueFormatter={(value) => value.toFixed(1)}
        />
      </div>
    </div>
  );
}