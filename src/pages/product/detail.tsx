import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Selection } from "@heroui/react";
import { useState } from "react";

import FormOrder from "./form-order";

import { IProduct } from "@/interface/Iproduct";
import Carousel from "@/components/carousel";
import { formatIdr } from "@/utils/helpers/formater";
import Rupiah from "@/components/rupiah";
interface Props {
  product?: IProduct;
  open: boolean;
  setOpen: CallableFunction;
}
export default function ProductDetail({ product, open, setOpen }: Props) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  console.log([...selectedKeys]);

  return (
    <Modal
      isOpen={open}
      scrollBehavior="outside"
      size="5xl"
      onOpenChange={() => setOpen(false)}
    >
      <ModalContent>
        <ModalHeader>{product?.listing_title}</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <Carousel>
                {product?.images.map((img, i) => (
                  <Image key={i} height={300} src={img} />
                ))}
              </Carousel>

              <p className="text-gray-500 text-lg font-bold py-5 text-center">
                {product?.listing_title}
              </p>
            </div>
            <div>
              <Table
                removeWrapper
                aria-label="detail"
                color="primary"
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                onSelectionChange={setSelectedKeys}
              >
                <TableHeader>
                  <TableColumn>Type</TableColumn>
                  <TableColumn>Harga</TableColumn>
                  <TableColumn>Komisi</TableColumn>
                </TableHeader>
                <TableBody>
                  {(product?.variants || []).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>
                        <Rupiah price={item.price} />
                      </TableCell>
                      <TableCell>{formatIdr(item.commission_fee)} %</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </ModalBody>
        {[...selectedKeys].length > 0 && (
          <>
            <ModalHeader>Order</ModalHeader>
            <ModalBody>
              <FormOrder variantId={[...selectedKeys] as string[]} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
