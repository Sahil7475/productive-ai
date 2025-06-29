import { NextRequest, NextResponse } from "next/server";
import {
  buildProjectQuery,
  buildRepoContent,
  getQueryEmbedding,
  getDocumentEmbeddings,
  cosineSimilarity,
  normalizeScore
} from "@/lib/embedding";

export async function POST(req: NextRequest) {
  const { userInput, repositories } = await req.json();
   
  // 1️⃣ Build project query
  const projectText = buildProjectQuery(userInput.description, userInput.features);
  const queryEmbedding = await getQueryEmbedding(projectText);

  // 2️⃣ Build a single string for each repo (no chunking)
  const repoTexts = repositories.map((repo: any) =>
    buildRepoContent({
      readme: repo.readme_content,
      description: repo.repo_description,
      topics: repo.topics,
      codeSnippets: repo.code_matches?.map((c: any) => c.snippet).join("\n") || "",
      // Optionally add packageJson, requirementsTxt if available
    })
  );

  // 3️⃣ Batch all repo texts into arrays of up to 96 (Cohere's batch limit)
  function batchArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
  const BATCH_SIZE = 96;
  const repoTextBatches = batchArray<string>(repoTexts, BATCH_SIZE);
  let repoEmbeddings: number[][] = [];
  for (const batch of repoTextBatches) {
    const embeddings = await getDocumentEmbeddings(batch);
    repoEmbeddings = repoEmbeddings.concat(embeddings);
  }

  // 4️⃣ Compute similarity for each repo using a single embedding per repo
  const results = repositories.map((repo: any, idx: number) => {
    const score = cosineSimilarity(queryEmbedding, repoEmbeddings[idx]);
    return {
      ...repo,
      ai_similarity: normalizeScore(score) * 10, // 0-10 scale to 0-100
      ai_similarity_raw: score,
    };
  });

  // This logic is optimized for the Cohere free tier: batching all repos, no chunking, minimal API calls.
  return NextResponse.json({ results });
}
