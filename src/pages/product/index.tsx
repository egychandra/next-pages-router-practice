import { useState, useEffect } from "react";
import { useRouter } from "next/router";

type productType = {
  id: number,
  name: string
}

const ProductPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [product, setProduct] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    if(isLogin) {
      push("/auth/login");
    }
  }, []);

  useEffect(() => {
    fetch("/api/products")
    .then((res) => res.json())
    .then((res) => {
      setProduct(res.data);
    })
  }, []);

  return (
    <>
      <h1>Product Page</h1>
      {product.map((item: productType) => (
        <ul key={item.id}>
          <li>{item.name}</li>
        </ul>
      ))}
    </>
  )
}

export default ProductPage