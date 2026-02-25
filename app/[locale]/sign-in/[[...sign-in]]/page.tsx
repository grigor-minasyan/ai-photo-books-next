import { SignIn } from "@clerk/nextjs";
import { setRequestLocale } from "next-intl/server";

type SignInPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SignInPage({ params }: SignInPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex justify-center px-4 py-10 sm:py-14">
      <SignIn />
    </div>
  );
}
