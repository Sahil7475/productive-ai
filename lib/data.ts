export interface Product {
  id: string;
  name: string;
  logo: string;
  description: string;
  similarity: number;
  features: {
    overlapping: string[];
    missing: string[];
  };
  github: string;
  stars?: number;
  forks?: number;
  contributors?: number;
  topics?: string[];
  owner?: string;
  repo_url?: string;
  code_matches?: any[];
  growth?: {
    commits_last_month: number;
    new_contributors_last_month: number;
    issues_closed_last_month: number;
    stars_gained_last_month: number;
    growth_score: number;
  };
  createdAt?: string;
}

// GitHub API response interface
export interface GitHubRepository {
  repo_name: string;
  owner: string;
  repo_url: string;
  repo_description: string;
  stars: number;
  forks: number;
  contributors?: number;
  topics: string[];
  readme_content: string;
  code_matches: any[];
  ai_similarity:number;
  createdAt?: string;
}

// ✅ Transform GitHub repo → Product format
/* export function transformGitHubToProduct(
  repo: GitHubRepository,
  userFeatures: string[]
): Product {
  const repoText = `${repo.repo_description} ${repo.readme_content} ${repo.topics.join(' ')}`.toLowerCase();
  const userFeaturesLower = userFeatures.map(f => f.toLowerCase());

  const overlappingFeatures = userFeaturesLower.filter(feature =>
    repoText.includes(feature)
  );

  const missingFeatures = userFeaturesLower.filter(feature =>
    !repoText.includes(feature)
  );

  const similarity = Math.min(
    10,
    (overlappingFeatures.length / userFeatures.length) * 10 + 2
  );

  const avatarUrl = repo.owner
    ? `https://github.com/${repo.owner}.png`
    : "/placeholder.svg";

  return {
    id: `${repo.owner}/${repo.repo_name}`,
    name: repo.repo_name,
    logo: avatarUrl,
    description: repo.repo_description || "No description available",
    similarity: Math.round(similarity * 10) / 10,
    features: {
      overlapping: overlappingFeatures,
      missing: missingFeatures,
    },
    github: repo.repo_url,
    stars: repo.stars,
    forks: repo.forks,
    contributors: repo.contributors,
    topics: repo.topics,
    owner: repo.owner,
    repo_url: repo.repo_url,
    code_matches: repo.code_matches,
  };
} */


  export function transformGitHubToProduct(
    repo: GitHubRepository,
    userFeatures: string[],
    similarityOverride?: number // ✅ optional override
  ): Product {
    const repoText = `${repo.repo_description} ${repo.readme_content} ${repo.topics.join(" ")}`.toLowerCase();
    const userFeaturesLower = userFeatures.map(f => f.toLowerCase());
  
    const overlappingFeatures = userFeaturesLower.filter(feature => repoText.includes(feature));
    const missingFeatures = userFeaturesLower.filter(feature => !repoText.includes(feature));
  
    // ✅ Use AI score if provided, fallback to basic calc
    const similarity = similarityOverride !== undefined
      ? similarityOverride / 10 // your AI returns 0–1000 scale → 0–100 → so divide by 10
      : Math.min(10, (overlappingFeatures.length / userFeatures.length) * 10 + 2);
  
    const avatarUrl = repo.owner ? `https://github.com/${repo.owner}.png` : "/placeholder.svg";
  
    return {
      id: `${repo.owner}/${repo.repo_name}`,
      name: repo.repo_name,
      logo: avatarUrl,
      description: repo.repo_description || "No description available",
      similarity: Math.round(similarity * 10) / 10,
      features: {
        overlapping: overlappingFeatures,
        missing: missingFeatures,
      },
      github: repo.repo_url,
      stars: repo.stars,
      forks: repo.forks,
      contributors: repo.contributors,
      topics: repo.topics,
      owner: repo.owner,
      repo_url: repo.repo_url,
      code_matches: repo.code_matches,
      createdAt: repo.createdAt,
    };
  }
  