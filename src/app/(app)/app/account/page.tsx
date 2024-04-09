import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutBtn from "@/components/sign-out-btn";
import { auth } from "@/lib/auth-no-edge";

export default async function page() {
  const session = await auth();
  if (!session?.user) return { redirect: "/login" };

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="flex h-[500px] flex-col items-center justify-center gap-3">
        <p>
          Logged in as <span className="font-medium">{session.user.email}</span>
        </p>

        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
