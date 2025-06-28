import { NextRequest, NextResponse } from "next/server";
import { fetchGrowthStats } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { repos } = await req.json(); // repos: Array<{ owner: string, repo_name: string }>
  if (!Array.isArray(repos)) {
    return NextResponse.json({ error: "Missing or invalid 'repos' array" }, { status: 400 });
  }

  const results = await Promise.all(
    repos.map(async ({ owner, repo_name }) => {
      try {
        const growth = await fetchGrowthStats(owner, repo_name);
        return { owner, repo_name, growth };
      } catch (e) {
        const errorMsg = typeof e === 'object' && e && 'message' in e ? (e as any).message : String(e);
        return { owner, repo_name, growth: null, error: errorMsg || "Failed to fetch growth stats" };
      }
    })
  );

  return NextResponse.json({ results });
} 