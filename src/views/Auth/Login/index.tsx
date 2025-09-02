import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"
import styles from "./Login.module.scss"

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or Password is incorrect");
      }
    } catch (error: any) {
      setIsLoading(false);
      setError("Email or Password is incorrect");
    }

  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label
              htmlFor="email"
              className={styles.login__form__item__label}
            >
              Email
            </label>
            <input
              className={styles.login__form__item__input}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email..."
            />
          </div>
          <div className={styles.login__form__item}>
            <label
              htmlFor="password"
              className={styles.login__form__item__label}
            >
              Password
            </label>
            <input
              className={styles.login__form__item__input}
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password..."
            />
          </div>
          <button
            type="submit"
            className={styles.login__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <p className={styles.login__signup}>Haven't an account? Sign Up <Link href="/auth/register">here</Link></p>
    </div>
  )
};

export default LoginView;