import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  trend?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: StatsCardProps) {
  return (
    <Card className="p-6 bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-slate-400 font-medium">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {description && (
            <p className="text-xs text-slate-500">{description}</p>
          )}
        </div>
        <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 pt-4 border-t border-slate-800">
          <p className="text-xs text-green-500">{trend}</p>
        </div>
      )}
    </Card>
  );
}
