import styles from "./Navbar.module.css"
import { signIn, signOut, useSession } from "next-auth/react"

const Navbar = () => {
  const { data }: any = useSession();
  return (
    <div className={styles.navbar}>
      <h1>Navbar</h1>
      <div>
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