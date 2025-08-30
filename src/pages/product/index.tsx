import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductView from "@/views/Product";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";

const ProductPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  // const [product, setProduct] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    if(isLogin) {
      push("/auth/login");
    }
  }, []);

  const { data, error, isLoading } = useSWR("/api/products", fetcher);

  // useEffect(() => {
  //   fetch("/api/products")
  //   .then((res) => res.json())
  //   .then((res) => {
  //     setProduct(res.data);
  //   })
  // }, []);

  return (
    <>
      <ProductView products={!isLoading && data.data}/>
    </>
  )
}

export default ProductPage