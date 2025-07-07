import Link from "next/link"

const RegisterPage = () => {
  return (
    <>
      <h1>Register Page</h1>
      <p>Sudah punya akun? login <Link href="/auth/login">Di sini</Link></p>
    </>
  )
}
export default RegisterPage