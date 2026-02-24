import { SignupForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-16rem)] w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
      <SignupForm className="w-full max-w-sm" />
    </div>
  );
}
