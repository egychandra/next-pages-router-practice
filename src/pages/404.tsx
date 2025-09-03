import Image from "next/image"
import styles from "../styles/404.module.scss"

const NotFoundPage = () => {
  return(
    <div className={styles.error}>
      {/* <img src="/not_found.png" alt="Not Found" className={styles.image} /> */}
      <Image src={"/not_found.png"} alt="Not Found" width={500} height={500} className={styles.image}/>
      <h1 className={styles.title}>Halaman Tidak Ditemukan</h1>
    </div>
  )
}

export default NotFoundPage