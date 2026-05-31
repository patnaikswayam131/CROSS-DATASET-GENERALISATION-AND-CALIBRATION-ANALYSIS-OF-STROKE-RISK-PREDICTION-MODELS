import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { COLORS, tooltipStyle, axisStyle, gridStyle } from '../../data/chartConfigs';

/**
 * Grouped bar chart comparing Kaggle vs NHANES performance.
 * Used for ROC-AUC and PR-AUC comparisons.
 * @param {{ data: Array, title: string, yAxisLabel: string, yDomain: Array, height: number }} props
 */
export function BarChartComparison({ data, title, yAxisLabel = '', yDomain = [0, 1], height = 320 }) {
  return (
    <div>
      {title && (
        <h4 className="text-sm font-semibold text-[#e8eaf0] mb-4 text-center">{title}</h4>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          barCategoryGap="25%"
          barGap={4}
        >
          <CartesianGrid {...gridStyle} vertical={false} />
          <XAxis
            dataKey="model"
            {...axisStyle}
            tick={{ ...axisStyle.tick, fontSize: 11 }}
            interval={0}
            angle={0}
            textAnchor="middle"
          />
          <YAxis
            domain={yDomain}
            {...axisStyle}
            tick={{ ...axisStyle.tick }}
            tickFormatter={(v) => v.toFixed(2)}
            label={yAxisLabel ? {
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              offset: -5,
              style: { fill: '#8b90a4', fontSize: 12, fontFamily: 'Inter, system-ui, sans-serif' }
            } : undefined}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(value, name) => [value.toFixed(3), name === 'kaggle' ? 'Kaggle' : 'NHANES']}
          />
          <Legend
            wrapperStyle={{ fontSize: '0.8rem', color: '#8b90a4' }}
            formatter={(value) => value === 'kaggle' ? 'Kaggle (In-Domain)' : 'NHANES (Cross-Domain)'}
          />
          <Bar dataKey="kaggle" fill={COLORS.kaggle} radius={[4, 4, 0, 0]} maxBarSize={48} />
          <Bar dataKey="nhanes" fill={COLORS.nhanes} radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComparison;
