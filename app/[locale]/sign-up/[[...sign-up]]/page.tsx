import { SignUp } from "@clerk/nextjs";
import { setRequestLocale } from "next-intl/server";

type SignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SignUpPage({ params }: SignUpPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex justify-center px-4 py-10 sm:py-14">
      <SignUp />
    </div>
  );
}
