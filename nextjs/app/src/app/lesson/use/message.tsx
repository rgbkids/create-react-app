import { use } from "react";

export default function Message({ messagePromise }: { messagePromise: Promise<string> }) {
  const message = use(messagePromise);
  return <p>{message}</p>;
}
