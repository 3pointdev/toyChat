import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/chat");
      }}
    >
      Do Chat!!
    </div>
  );
}
