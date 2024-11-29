import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { cn } from '@/lib/utils';
import type { TrainingMetrics } from '@/types/training';

// Use CSS variables for consistent theming
const COLORS = {
  high: 'hsl(var(--chart-1))',
  medium: 'hsl(var(--chart-2))',
  low: 'hsl(var(--chart-3))',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="font-medium">{label}</p>
        <p className="text-sm" style={{ color: payload[0].fill }}>
          Proficiency: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

type MetricCardProps = {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    label: string;
  };
};

function MetricCard({ title, value, description, trend }: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
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
      <div className="mt-2">
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </Card>
  );
}

type SkillBreakdownProps = {
  data: {
    skill: string;
    proficiency: number;
    level: 'high' | 'medium' | 'low';
  }[];
};

function SkillBreakdown({ data }: SkillBreakdownProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-6">Skill Proficiency Breakdown</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              className="stroke-border"
              horizontal={false}
            />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="skill"
              type="category"
              width={150}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="proficiency" 
              minPointSize={2}
              radius={[0, 4, 4, 0]}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.level]}
                  className="transition-opacity duration-200 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

type TrainingMetricsViewProps = {
  metrics: TrainingMetrics;
};

export default function TrainingMetricsView({ metrics }: TrainingMetricsViewProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Overall Proficiency"
          value={`${metrics.overallProficiency}%`}
          trend={{ value: 5.2, label: 'vs last month' }}
        />
        <MetricCard
          title="Training Hours"
          value={metrics.trainingHours}
          description="Total hours this month"
        />
        <MetricCard
          title="Certifications"
          value={metrics.certifications}
          description="Active certifications"
        />
        <MetricCard
          title="Success Rate"
          value={`${metrics.successRate}%`}
          description="Training completion rate"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SkillBreakdown data={metrics.skillBreakdown} />
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Recent Achievements</h3>
          <div className="space-y-4">
            {metrics.recentAchievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
              >
                <div>
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(achievement.date).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  variant={
                    achievement.type === 'certification'
                      ? 'default'
                      : achievement.type === 'skill'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {achievement.type}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}