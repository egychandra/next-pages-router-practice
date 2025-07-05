import Navbar from "../Navbar"

type AppShellProps = {
  children: React.ReactNode
}

const AppShell = (props: AppShellProps) => {
  const { children } = props;

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default AppShell