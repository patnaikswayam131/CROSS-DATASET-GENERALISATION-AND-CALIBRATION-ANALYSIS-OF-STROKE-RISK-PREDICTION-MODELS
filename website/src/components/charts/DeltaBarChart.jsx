import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';
import { COLORS, tooltipStyle, axisStyle, gridStyle } from '../../data/chartConfigs';

/**
 * Delta bar chart for concept shift values (all negative).
 * Bars extend left from zero line.
 * @param {{ data: Array, title: string, height: number }} props
 */
export function DeltaBarChart({ data, title, height = 250 }) {
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
            domain={[-0.25, 0.02]}
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
            formatter={(value) => [`δ = ${value.toFixed(3)}`, 'ROC-AUC Change']}
          />
          <ReferenceLine x={0} stroke={COLORS.textSecondary} strokeWidth={1} />
          <Bar dataKey="delta" radius={[4, 0, 0, 4]} maxBarSize={32}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={Math.abs(entry.delta) > 0.1 ? COLORS.danger : COLORS.warning}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DeltaBarChart;
