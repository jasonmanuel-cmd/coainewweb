import { NextResponse } from "next/server";

const INDEXNOW_KEY = "7c9e5b3a-1d4f-4a8e-9c2b-6f5d8e7a3b1c";

const validKeys = new Set([INDEXNOW_KEY]);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const key = slug.join("/").replace(/\.txt$/, "");
  if (validKeys.has(key)) {
    return new NextResponse(key, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  return new NextResponse("Not Found", { status: 404 });
}
