/**
 * CalloutBox — highlighted finding card with coloured left border.
 * @param {{ children: React.ReactNode, variant: 'danger'|'primary'|'warning', className: string }} props
 */
export function CalloutBox({ children, variant = 'danger', className = '' }) {
  const borderColors = {
    danger: 'border-l-[#e05c5c]',
    primary: 'border-l-[#4f8ef7]',
    warning: 'border-l-[#e8a838]',
    success: 'border-l-[#4caf82]',
  };

  return (
    <div
      className={`
        bg-[#1a1d27] border border-[#2e3248] border-l-4 
        ${borderColors[variant] || borderColors.danger}
        rounded-r-lg p-5
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default CalloutBox;
