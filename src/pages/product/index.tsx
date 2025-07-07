import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ProductPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if(!isLogin) {
      push("/auth/login");
    }
  }, []);

  return (
    <>
      <h1>Product Page</h1>
    </>
  )
}

export default ProductPage