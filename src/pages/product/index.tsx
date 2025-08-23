import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  getProduct,
  productAvgPrice,
} from "@/stores/features/products/actions";
import TableAction from "@/components/table-action";
import Rupiah from "@/components/rupiah";
import Carousel from "@/components/carousel";
import TextHeader from "@/components/text-header";

export default function ProductPage() {
  const { products } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  return (
    <Card>
      <CardHeader className="flex w-full justify-between items-center">
        <p>Daftar Product</p>
        <div>
          <Button as={Link} color="primary" to="/products/create">
            Create Product
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Table removeWrapper>
          <TableHeader>
            <TableColumn>Gambar</TableColumn>
            <TableColumn>Keterangan</TableColumn>
            <TableColumn>Harga</TableColumn>
            <TableColumn>Komisi</TableColumn>
          </TableHeader>
          <TableBody>
            {(products?.data || []).map((item) => (
              <TableRow key={item.id}>
                <TableCell className="max-w-[100px] max-h-[100px]">
                  <Carousel autoPlay={true}>
                    {item.images.map((img, i) => (
                      <Image
                        key={i}
                        alt="img"
                        className="object-cover"
                        src={img}
                      />
                    ))}
                  </Carousel>
                </TableCell>
                <TableCell>
                  <TextHeader title="Judul" val={item.listing_title} />
                  <TextHeader title="Cluster" val={item.cluster} />
                  <p>Type</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.variants.map((item) => (
                      <Chip
                        key={`variant-${item.id}`}
                        color="success"
                        size="sm"
                        variant="bordered"
                      >
                        {item.type}
                      </Chip>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <Rupiah price={productAvgPrice(item.variants)} />
                  <div className="my-2" />
                  <TextHeader title="Komisi" val={`${item.commission_fee} %`} />
                </TableCell>
                <TableCell>
                  <TableAction
                    onDelete={() => {}}
                    onEdit={() => {}}
                    onView={() => {}}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
