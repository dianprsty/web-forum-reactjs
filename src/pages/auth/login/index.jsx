
import AuthLayout from "@/layouts/AuthLayout";
import loginHero from "/images/login-hero.jpg";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <>
      <AuthLayout imageSrc={loginHero} imageAlt="Login Hero">
        <LoginForm />
      </AuthLayout>
    </>
  );
}
