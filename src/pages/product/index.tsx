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
import { useEffect, useState } from "react";

import ProductDetail from "./detail";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  getProduct,
  productMinMaxPrice,
} from "@/stores/features/products/actions";
import TableAction from "@/components/table-action";
import Carousel from "@/components/carousel";
import TextHeader from "@/components/text-header";
import MinMaxPrice from "@/components/min-max-price";
import { IProduct } from "@/interface/Iproduct";

export default function ProductPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IProduct>();
  const { products } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  function handleDetail(item: IProduct) {
    setData(item);
    setOpen(true);
  }

  return (
    <>
      <ProductDetail open={open} product={data} setOpen={setOpen} />
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
              <TableColumn>aksi</TableColumn>
            </TableHeader>
            <TableBody>
              {(products?.data || []).map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-primary-50 cursor-pointer"
                  onClick={() => handleDetail(item)}
                >
                  <TableCell className="max-w-[100px] max-h-[100px]">
                    <Carousel autoPlay={false}>
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
                  <TableCell className="max-w-sm">
                    <TextHeader title="Judul" val={item.listing_title} />
                    <TextHeader title="Cluster" val={item.cluster} />
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <MinMaxPrice data={productMinMaxPrice(item.variants)} />
                    <div className="my-2" />
                    <TextHeader
                      title="Komisi"
                      val={`${item.commission_fee} %`}
                    />
                  </TableCell>
                  <TableCell>
                    <TableAction
                      onDelete={() => {}}
                      onEdit={() => {}}
                      onView={() => handleDetail(item)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
