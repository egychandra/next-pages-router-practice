import Script from "next/script";
import styles from "./Navbar.module.css"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";

const Navbar = () => {
  const { data }: any = useSession();
  return (
    <div className={styles.navbar}>
      <h1 id="title" />
      <Script strategy="lazyOnload">
        {`document.getElementById("title").innerText = "Navbar"`}
      </Script>
      <div className={styles.profile}>
        {data?.user?.image ? (
          <Image
            className={styles.avatar}
            src={data?.user?.image}
            alt={data?.user?.fullname} 
            width={300}
            height={300}
          />
        ) : 
          null
        }
        {data?.user?.fullname}
        {data ? (
          <button className={styles.button} onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button className={styles.button} onClick={() => signIn()}>Sign In</button>
        )}
      </div>
    </div>
  )
}

export default Navbar