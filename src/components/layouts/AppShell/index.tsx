import { useRouter } from "next/router"
import { Roboto } from "next/font/google"
import dynamic from "next/dynamic"

const Navbar = dynamic(() => import("../Navbar"), { ssr: false });

const disabledNavbar = ["/auth/login", "/auth/register", "/404", "/500"];

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
})

type AppShellProps = {
  children: React.ReactNode
}

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <main className={roboto.className}>
      {!disabledNavbar.includes(pathname) && <Navbar />}
      {children}
    </main>
  )
}

export default AppShell