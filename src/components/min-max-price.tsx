import { formatCompactIdr } from "@/stores/features/products/actions";

interface Props {
  data: {
    min: number;
    max: number;
  };
}
export default function MinMaxPrice({ data }: Props) {
  return (
    <div className="flex gap-2">
      <p>Rp. {formatCompactIdr(data.min)}</p>
      {data.min !== data.max && (
        <>
          <p>-</p>
          <p>Rp. {formatCompactIdr(data.max)}</p>
        </>
      )}
    </div>
  );
}
