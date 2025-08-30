import { useRouter } from "next/router"
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import ProductDetailItem from "@/views/ProductDetailItem";
import { productType } from "@/types/product.type";

const ProductDetailPage = ({ product }: { product: productType }) => {
  // const { query: { id } } = useRouter();

  // Client-side data fetching
  // const { data, error, isLoading } = useSWR(`/api/product/${id}`, fetcher);

  return (
    <>
      {/* Client-side data fetching */}
      {/* <ProductDetailItem product={data?.data} /> */}

      {/* Server-side & Static-site data fetching */}
      <ProductDetailItem product={product} />
    </>
  )
}

export default ProductDetailPage;

// export async function getServerSideProps({ query: { id } }: { query: { id: string } }) {
//   // Fetch data
//   const response = await fetch(`http://localhost:3000/api/product/${id}`);
//   const data = await response.json();

//   return {
//     props: {
//       product: data?.data
//     }
//   }
// }

export async function getStaticPaths() {
  const fetching = await fetch("http://localhost:3000/api/product");
  const response = await fetching.json();
  const paths = response?.data.map((item: productType) => ({
    params: {
      id: item?.id
    },
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { id } }: { params: { id: string } }) {
  // Fetch data
  const response = await fetch(`http://localhost:3000/api/product/${id}`);
  const data = await response.json();

  return {
    props: {
      product: data?.data
    }
  }
}