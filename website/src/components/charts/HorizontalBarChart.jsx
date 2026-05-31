import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell
} from 'recharts';
import { COLORS, tooltipStyle, axisStyle, gridStyle } from '../../data/chartConfigs';

/**
 * Horizontal bar chart for PSI and KS statistics.
 * Supports optional reference line (e.g., PSI severity threshold).
 * @param {{ data: Array, title: string, referenceLine: number, referenceLabel: string, height: number, colorByValue: boolean }} props
 */
export function HorizontalBarChart({ 
  data, 
  title, 
  referenceLine = null, 
  referenceLabel = '', 
  height = 250,
  colorByValue = false,
  barDataKey = 'value',
}) {
  const getBarColor = (entry) => {
    if (!colorByValue) return COLORS.kaggle;
    if (entry.severity === 'Severe') return COLORS.danger;
    if (entry.severity === 'Moderate') return COLORS.warning;
    return COLORS.success;
  };

  return (
    <div>
      {title && (
        <h4 className="text-sm font-semibold text-[#e8eaf0] mb-4 text-center">{title}</h4>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          barCategoryGap="30%"
        >
          <CartesianGrid {...gridStyle} horizontal={false} />
          <XAxis
            type="number"
            {...axisStyle}
            tickFormatter={(v) => v.toFixed(2)}
          />
          <YAxis
            type="category"
            dataKey="feature"
            {...axisStyle}
            tick={{ ...axisStyle.tick, fontSize: 11 }}
            width={100}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(value) => [value.toFixed(3)]}
          />
          {referenceLine !== null && (
            <ReferenceLine
              x={referenceLine}
              stroke={COLORS.danger}
              strokeDasharray="5 5"
              strokeWidth={1.5}
              label={{
                value: referenceLabel,
                position: 'top',
                fill: COLORS.danger,
                fontSize: 11,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            />
          )}
          <Bar dataKey={barDataKey} radius={[0, 4, 4, 0]} maxBarSize={32}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HorizontalBarChart;
