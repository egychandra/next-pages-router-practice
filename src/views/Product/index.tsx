import Link from "next/link";
import styles from "./Product.module.scss";
import { productType } from "@/types/product.type";
import Image from "next/image";

const ProductView = ({ products } : { products: productType[] }) => {
  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>Product</h1>
      <div className={styles.product__content}>
        {products.length > 0 ? (
          <>
            {products.map((item: productType) => (
              <Link href={`/product/${item.id}`} key={item.id} className={styles.product__content__item}>
                <div className={styles.product__content__item__image}>
                  {/* <img src={item.image} alt={item.name}/> */}
                  <Image src={item.image} alt={item.name} width={500} height={500} />
                </div>
                <h4 className={styles.product__content__item__name}>{item.name}</h4>
                <p className={styles.product__content__item__category}>{item.category}</p>
                <p className={styles.product__content__item__price}>
                  {item.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                </p>
              </Link>
            ))}
          </>
        ) : (
          <div className={styles.product__content__skeleton}>
            <div className={styles.product__content__skeleton__image} />
            <div className={styles.product__content__skeleton__name} />
            <div className={styles.product__content__skeleton__category} />
            <div className={styles.product__content__skeleton__price} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductView;