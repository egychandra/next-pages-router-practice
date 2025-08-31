import Navbar from "../Navbar"
import { useRouter } from "next/router"

const disabledNavbar = ["/auth/login", "/auth/register", "/404", "/500"];

type AppShellProps = {
  children: React.ReactNode
}

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <>
      {!disabledNavbar.includes(pathname) && <Navbar />}
      {children}
    </>
  )
}

export default AppShell