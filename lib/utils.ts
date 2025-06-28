import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { subDays, formatISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const GITHUB_API = 'https://api.github.com'

function getToken() {
  return process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN || ''
}

export async function fetchGrowthStats(owner: string, repo: string) {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
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
