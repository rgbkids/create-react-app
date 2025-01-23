import { Suspense } from "react";
import Message from "./message";
import { fetchMessage } from "./lib";

export default function Page() {
  const messagePromise = fetchMessage();
  return (
    <>
      <a href='/lesson/'>back</a>
      <Suspense fallback={<p>waiting for message...</p>}>
        <Message messagePromise={messagePromise} />
      </Suspense>
    </>
  );
}
