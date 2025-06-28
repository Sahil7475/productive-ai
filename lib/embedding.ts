import OpenAI from "openai";
import { CohereClient } from "cohere-ai";

/* const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Get embeddings for a list of strings
export async function getEmbeddings(texts: string[]) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: texts,
  });
  return response.data.map((item) => item.embedding);
} */

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || "",
});

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await cohere.embed({
    texts,
    model: "embed-english-v3.0", // or "embed-multilingual-v3.0"
    inputType: "search_document", // or "classification" or "search_query"
  });
  // Ensure we always return number[][]
  if (Array.isArray(response.embeddings)) {
    return response.embeddings as number[][];
  } else if (Array.isArray((response as any).body?.embeddings)) {
    return (response as any).body.embeddings as number[][];
  } else {
    throw new Error("Unexpected response format from Cohere embed API");
  }
}

// Calculate cosine similarity between two embeddings
export function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (normA * normB);
}

// --- New Modular Embedding & Ranking Pipeline ---

/**
 * Combine user description and features into a single string for embedding.
 */
export function buildProjectQuery(description: string, features: string[]): string {
  return `Project Description: ${description}\nKey Features: ${features.join(", ")}`;
}

/**
 * Combine relevant repo fields for embedding (readme, description, topics, code snippets, etc.)
 */
export function buildRepoContent(repo: {
  readme?: string,
  description?: string,
  topics?: string[],
  codeSnippets?: string,
  packageJson?: string,
  requirementsTxt?: string,
}): string {
  return [
    repo.readme,
    repo.description,
    repo.topics?.join(' '),
    repo.codeSnippets,
    repo.packageJson,
    repo.requirementsTxt,
  ].filter(Boolean).join('\n\n');
}

/**
 * Chunk text only if longer than maxChars (default 1000)
 */
export function chunkText(text: string, maxChars = 1000): string[] {
  if (text.length <= maxChars) return [text];
  const chunks = [];
  for (let i = 0; i < text.length; i += maxChars) {
    chunks.push(text.slice(i, i + maxChars));
  }
  return chunks;
}

/**
 * Get embedding for a query (search_query type)
 */
export async function getQueryEmbedding(text: string): Promise<number[]> {
  const response = await cohere.embed({
    texts: [text],
    model: "embed-english-v3.0",
    inputType: "search_query",
  });
  if (Array.isArray(response.embeddings)) {
    return response.embeddings[0];
  } else if (Array.isArray((response as any).body?.embeddings)) {
    return (response as any).body.embeddings[0];
  } else {
    throw new Error("Unexpected response format from Cohere embed API");
  }
}

/**
 * Get embeddings for repo chunks (search_document type)
 */
export async function getDocumentEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await cohere.embed({
    texts,
    model: "embed-english-v3.0",
    inputType: "search_document",
  });
  if (Array.isArray(response.embeddings)) {
    return response.embeddings;
  } else if (Array.isArray((response as any).body?.embeddings)) {
    return (response as any).body.embeddings;
  } else {
    throw new Error("Unexpected response format from Cohere embed API");
  }
}

/**
 * Normalize cosine similarity to 0-10 scale
 */
export function normalizeScore(cosSim: number): number {
  return Math.round(((cosSim + 1) / 2) * 10); // -1..1 => 0..10
}

/**
 * Full ranking pipeline: ranks repos by similarity to project query
 * Includes debugging info (max/avg similarity, top snippet)
 */
export async function rankRepos(
  projectText: string,
  repoTexts: { repoId: string, content: string }[]
) {
  const queryEmbedding = await getQueryEmbedding(projectText);
  const results = [];
  for (const repo of repoTexts) {
    const chunks = chunkText(repo.content);
    const embeddings = await getDocumentEmbeddings(chunks);
    const similarities = embeddings.map(docVec => cosineSimilarity(queryEmbedding, docVec));
    const maxSim = Math.max(...similarities);
    const avgSim = similarities.reduce((a, b) => a + b, 0) / similarities.length;
    const normalized = normalizeScore(maxSim);
    results.push({
      repoId: repo.repoId,
      score: normalized,
      maxSim,
      avgSim,
      topSnippet: chunks[similarities.indexOf(maxSim)]?.slice(0, 200) || '',
    });
  }
  results.sort((a, b) => b.score - a.score);
  // Optionally log top results for debugging
  // console.log('Top results:', results.slice(0, 5));
  return results;
}
