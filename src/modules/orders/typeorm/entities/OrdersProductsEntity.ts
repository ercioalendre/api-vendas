import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Product from "@ProductsEntities/ProductEntity";
import Order from "@OrdersEntities/OrderEntity";

@Entity("orders_products")
class OrdersProducts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  name: string;

  @Column("decimal")
  price: number;

  @Column("int")
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
