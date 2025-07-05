import { log } from "console";
import { useRouter } from "next/router"

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <h1>Product Detail Page</h1>
      <h3>Product: {id} </h3>
    </>
  )
}

export default ProductDetailPage