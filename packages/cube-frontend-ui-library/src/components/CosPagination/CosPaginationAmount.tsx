type CosPaginationAmountProps = {
  totalItems: number
}

export const CosPaginationAmount = (props: CosPaginationAmountProps) => {
  const { totalItems } = props
  return (
    <div className="secondary-body4 p-[10px] text-functional-text">
      Amount: {totalItems}
    </div>
  )
}
