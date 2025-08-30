import ProductView from "@/views/Product";
import { productType } from "@/types/product.type";

const StaticSiteProductPage = (props: { products: productType[] }) => {
  const { products } = props;
  return (
    <>
      <ProductView products={products} />
    </>
  )
}

export default StaticSiteProductPage;

export async function getStaticProps() {
  // Fetch data
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();

  return {
    props: {
      products: data.data
    }
  }
}