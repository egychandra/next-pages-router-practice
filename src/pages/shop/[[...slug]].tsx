import { useRouter } from "next/router"

const ShopPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <h1>Shop Page</h1>
      <h3>Shop: {slug?.[0]} - {slug?.[1]} - {slug?.[2]}</h3>
    </>
  )
}

export default ShopPage