import { formatIdr } from "@/utils/helpers/formater";

interface Props {
  price?: number | string;
}
export default function Rupiah({ price }: Props) {
  return (
    <div className="flex justify-between max-w-[150px]">
      <p>Rp</p>
      <p>{formatIdr(Number(price))}</p>
    </div>
  );
}
