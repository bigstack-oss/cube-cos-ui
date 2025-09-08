type CosPaginationAmountProps = {
  isMinimal: boolean
  totalItems: number
}

export const CosPaginationAmount = (props: CosPaginationAmountProps) => {
  const { isMinimal, totalItems } = props
  return (
    <div className="secondary-body4 p-[10px] text-functional-text">
      <span>{isMinimal ? 'Amt: ' : 'Amount: '}</span>
      {totalItems}
    </div>
  )
}
