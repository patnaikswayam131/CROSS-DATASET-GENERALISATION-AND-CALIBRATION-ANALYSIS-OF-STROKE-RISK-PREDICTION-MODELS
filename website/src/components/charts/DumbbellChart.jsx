import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { COLORS, tooltipStyle, axisStyle, gridStyle } from '../../data/chartConfigs';

/**
 * Grouped bar chart for ablation study — Kaggle vs NHANES AUC per configuration.
 * Full model is highlighted differently from ablated versions.
 * @param {{ data: Array, title: string, height: number }} props
 */
export function DumbbellChart({ data, title, height = 320 }) {
  return (
    <div>
      {title && (
        <h4 className="text-sm font-semibold text-[#e8eaf0] mb-4 text-center">{title}</h4>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          barCategoryGap="20%"
          barGap={2}
        >
          <CartesianGrid {...gridStyle} vertical={false} />
          <XAxis
            dataKey="config"
            {...axisStyle}
            tick={{ ...axisStyle.tick, fontSize: 10 }}
            interval={0}
          />
          <YAxis
            domain={[0.4, 0.9]}
            {...axisStyle}
            tickFormatter={(v) => v.toFixed(2)}
            label={{
              value: 'ROC-AUC',
              angle: -90,
              position: 'insideLeft',
              offset: -5,
              style: { fill: '#8b90a4', fontSize: 12, fontFamily: 'Inter, system-ui, sans-serif' }
            }}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(value, name) => [
              value.toFixed(3),
              name === 'kaggle' ? 'Kaggle' : 'NHANES'
            ]}
          />
          <Legend
            wrapperStyle={{ fontSize: '0.8rem', color: '#8b90a4' }}
            formatter={(value) => value === 'kaggle' ? 'Kaggle' : 'NHANES'}
          />
          <Bar dataKey="kaggle" radius={[4, 4, 0, 0]} maxBarSize={36}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.isFullModel ? COLORS.kaggle : COLORS.kaggle + '99'}
                stroke={entry.isFullModel ? COLORS.kaggle : 'none'}
                strokeWidth={entry.isFullModel ? 2 : 0}
              />
            ))}
          </Bar>
          <Bar dataKey="nhanes" radius={[4, 4, 0, 0]} maxBarSize={36}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.isFullModel ? COLORS.nhanes : COLORS.nhanes + '99'}
                stroke={entry.isFullModel ? COLORS.nhanes : 'none'}
                strokeWidth={entry.isFullModel ? 2 : 0}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DumbbellChart;
