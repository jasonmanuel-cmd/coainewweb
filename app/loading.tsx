import Image from "next/image";

export default function Loading() {
  return (
    <div className="m-loading-page" role="status" aria-label="Loading">
      <Image className="m-loading-mark" src="/coai-mark.webp" alt="" width={72} height={72} priority />
    </div>
  );
}
