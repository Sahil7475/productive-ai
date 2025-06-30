import { NextRequest, NextResponse } from "next/server"
import { subDays, formatISO } from 'date-fns'

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql"
const GITHUB_REST_SEARCH_URL = "https://api.github.com/search/code"
const GITHUB_API = 'https://api.github.com'

function getGithubToken() {
  return process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN
}

async function fetchGraphQLRepos(keywords: string[]): Promise<any[]> {
  const query = `
    query ($queryString: String!, $first: Int!, $after: String) {
      search(type: REPOSITORY, query: $queryString, first: $first, after: $after) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            owner { login }
            createdAt
            pushedAt
            isArchived  
            repositoryTopics(first: 10) {
              nodes { topic { name } }
            }
            defaultBranchRef {
              target {
                ... on Commit {
                  committedDate
                }
              }
            }
            object(expression: "HEAD:README.md") {
              ... on Blob {
                text
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `
  const queryString = keywords.join(" ")
  
  let allRepos: any[] = []
  let hasNextPage = true
  let after = null
  const pageSize = 50 // Increased from 5 to 50
  
  while (hasNextPage && allRepos.length < 100) { // Limit to 100 repos max
    const res: Response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getGithubToken()}`,
      },
      body: JSON.stringify({ 
        query, 
        variables: { 
          queryString,
          first: pageSize,
          after
        } 
      }),
    })
    const data: any = await res.json()

    console.log("GraphQL Response:", data);
    
    if (data.data?.search?.nodes) {
      allRepos = allRepos.concat(data.data.search.nodes)
      hasNextPage = data.data.search.pageInfo.hasNextPage
      after = data.data.search.pageInfo.endCursor
    } else {
      hasNextPage = false
    }
  }
  
  return allRepos
}

async function fetchCodeMatches(keywords: string[]): Promise<any[]> {
  const q = keywords.join(" ")
  let allMatches: any[] = []
  let page = 1
  const perPage = 50 // Increased from 5 to 50
  
  while (page <= 3 && allMatches.length < 150) { // Limit to 3 pages max
    const url = `${GITHUB_REST_SEARCH_URL}?q=${encodeURIComponent(q)}&per_page=${perPage}&page=${page}`
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3.text-match+json",
        Authorization: `Bearer ${getGithubToken()}`,
      },
    })
    const data = await res.json()
    console.log(`REST Response Page ${page}:`, data);
    
    if (data.items && data.items.length > 0) {
      allMatches = allMatches.concat(data.items)
      page++
    } else {
      break
    }
  }
  
  return allMatches
}



function mergeResults(repos: any[], codeMatches: any[]): any[] {
    // 1️⃣ Make a map for quick lookup by "owner/name"
    const repoMap: Record<string, any> = {}
  
    // Add GraphQL repos first
    for (const repo of repos) {
      const fullName = `${repo.owner.login}/${repo.name}`
      repoMap[fullName] = {
        repo_name: repo.name,
        owner: repo.owner.login,
        repo_url: repo.url,
        repo_description: repo.description,
        stars: repo.stargazerCount,
        forks: repo.forkCount || null,
        topics: repo.repositoryTopics.nodes.map((n: any) => n.topic.name),
        readme_content: repo.object?.text || "",
        createdAt: repo.createdAt,
        pushed_at: repo.pushedAt,
        archived: repo.isArchived,
        code_matches: [],
      }
    }
  
    // 2️⃣ Add code matches, merging or creating new
    for (const match of codeMatches) {
      const fullName = match.repository.full_name
      const codeItem = {
        file_name: match.name,
        file_url: match.html_url,
        snippet: match.text_matches?.map((m: any) => m.fragment).join("\n") || "",
      }
  
      if (repoMap[fullName]) {
        // If repo exists → push code match
        repoMap[fullName].code_matches.push(codeItem)
      } else {
        // If repo NOT in GraphQL → create new entry (code-only)
        repoMap[fullName] = {
          repo_name: match.repository.name,
          owner: match.repository.owner.login,
          repo_url: match.repository.html_url,
          repo_description: match.repository.description || "",
          forks: match.repository.forkCount || null,
          stars: match.repository.stargazerCount || null,
          topics: match.repository.topics || [],
          readme_content: match.repository.readme_content || "",
          createdAt: match.repository.createdAt || null,
          pushed_at: match.repository.pushedAt || null,
          archived:false,
          code_matches: [codeItem],
        }
      }
    }
  
    // 3️⃣ Return combined as an array
    return Object.values(repoMap)
  }
  

async function fetchContributorsCount(owner: string, repo: string): Promise<number> {
  const url = `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1&anon=true`
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Bearer ${getGithubToken()}`,
    },
  })
  // GitHub paginates contributors, so check the Link header for the last page
  const link = res.headers.get('link')
  if (link) {
    const match = link.match(/&page=(\d+)>; rel="last"/)
    if (match) {
      return parseInt(match[1], 10)
    }
  }
  // If no Link header, just count the returned contributors
  const data = await res.json()
  return Array.isArray(data) ? data.length : 0
}

export async function fetchGrowthStats(owner: string, repo: string) {
  const headers = {
    Authorization: `Bearer ${getGithubToken()}`,
    Accept: 'application/vnd.github+json',
  }

  const sinceDate = formatISO(subDays(new Date(), 180))

  const [commitsRes, issuesRes, contributorsRes, starsRes] = await Promise.all([
    fetch(`${GITHUB_API}/repos/${owner}/${repo}/commits?since=${sinceDate}`, { headers }),
    fetch(`${GITHUB_API}/repos/${owner}/${repo}/issues?since=${sinceDate}&state=closed`, { headers }),
    fetch(`${GITHUB_API}/repos/${owner}/${repo}/contributors`, { headers }),
    fetch(`${GITHUB_API}/repos/${owner}/${repo}/stargazers`, { headers }),
  ])

  const commits = await commitsRes.json()
  const issues = await issuesRes.json()
  const contributors = await contributorsRes.json()
  const stars = await starsRes.json()

  const newContributors = contributors.filter((c: any) => new Date(c.created_at) > new Date(sinceDate))

  const growthScore =
    commits.length * 0.3 +
    newContributors.length * 1.0 +
    issues.length * 0.5 +
    stars.length * 0.2

  return {
    commits_last_month: commits.length,
    new_contributors_last_month: newContributors.length,
    issues_closed_last_month: issues.length,
    stars_gained_last_month: stars.length,
    growth_score: Math.round(growthScore * 10) / 10,
  }
}

export async function POST(req: NextRequest) {
  const { productName, description, features } = await req.json()
  // Only use features as keywords, not productName
  const keywords = features || [];

  console.log("Keywords:", keywords);

  // Fetch from GitHub APIs
  const [repos, codeMatches] = await Promise.all([
    fetchGraphQLRepos(keywords),
    fetchCodeMatches(keywords),
  ])

  // Merge results
  let merged = mergeResults(repos, codeMatches)

  // Fetch contributors count for each repo (limit to first 20 for performance)
  const withContributors = await Promise.all(
    merged.slice(0, 20).map(async (repo) => {
      try {
        const contributors = await fetchContributorsCount(repo.owner, repo.repo_name)
        return { ...repo, contributors }
      } catch (e) {
        return { ...repo, contributors: null }
      }
    })
  )
  // For the rest, just pass through
  if (merged.length > 20) {
    withContributors.push(...merged.slice(20))
  }

  return NextResponse.json({ repositories: withContributors })
} 