import ContentBlock from '@/components/content-block'
import H1 from "@/components/h1";

export default function page() {
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="flex h-[500px] flex-col items-center justify-center gap-3">
        <p>Logged in as ...
					{/* {session.user.email} */}
				</p>

        {/* <SignOutBtn /> */}
      </ContentBlock>
    </main>
  );
}
