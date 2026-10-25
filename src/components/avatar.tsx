"use client";

import Image from "next/image";
import { useState } from "react";

export function Avatar({
  src,
  name,
  anonymous = false,
}: {
  src?: string;
  name: string;
  anonymous?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (src && !failed)
    return <Image src={src} alt="" width={64} height={64} unoptimized onError={() => setFailed(true)} />;
  return <span>{anonymous ? "♥︎" : name.replace(/^@/, "")[0]?.toUpperCase() || "?"}</span>;
}
