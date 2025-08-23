import { formatIdr } from "@/utils/helpers/formater";

interface Props {
  price?: number;
}
export default function Rupiah({ price }: Props) {
  return (
    <div className="flex justify-between max-w-[150px]">
      <p>Rp</p>
      <p>{formatIdr(price)}</p>
    </div>
  );
}
