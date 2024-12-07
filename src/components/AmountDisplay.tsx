import { formatCurrency } from "../utilities"

type AmauntDisplayProps = {
    label?: string
    amount: number
}

export default function AmountDisplay({label, amount} : AmauntDisplayProps) {
  return (
    <p className=" text-2xl text-blue-600 font-bold">
        {
          label && `${label}: `
        }
        <span className=" font-black text-black">
            {formatCurrency(amount)}
        </span>
    </p>
  )
}