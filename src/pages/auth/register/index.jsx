import AuthLayout from "@/layouts/AuthLayout";
import RegisterForm from "@/components/RegisterForm";
import registerHero from "/images/register-hero.jpg";
export default function Register() {
  return (
    <>
      <AuthLayout imageSrc={registerHero} imageAlt="Register Hero">
        <RegisterForm />
      </AuthLayout>
    </>
  );
}
