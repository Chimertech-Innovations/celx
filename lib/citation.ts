import { Article, ArticleAuthor } from '@prisma/client'

type ArticleWithAuthors = Article & {
  authors: ArticleAuthor[]
  journal?: { title: string; abbreviation?: string | null }
  volume?: { number: number; year: number } | null
  issue?: { number: number } | null
}

function formatAuthorsAPA(authors: ArticleAuthor[]): string {
  if (!authors || authors.length === 0) return 'Unknown Author'
  if (authors.length === 1) {
    const a = authors[0]
    const parts = a.name.split(' ')
    const lastName = parts[parts.length - 1]
    const initials = parts.slice(0, -1).map(p => p[0] + '.').join(' ')
    return `${lastName}, ${initials}`
  }
  const formatted = authors.slice(0, 6).map(a => {
    const parts = a.name.split(' ')
    const lastName = parts[parts.length - 1]
    const initials = parts.slice(0, -1).map(p => p[0] + '.').join(' ')
    return `${lastName}, ${initials}`
  })
  if (authors.length > 6) formatted.push('et al.')
  return formatted.join(', ')
}

function formatAuthorsMLA(authors: ArticleAuthor[]): string {
  if (!authors || authors.length === 0) return 'Unknown Author'
  if (authors.length === 1) return authors[0].name
  if (authors.length === 2) return `${authors[0].name}, and ${authors[1].name}`
  return `${authors[0].name}, et al.`
}

function formatAuthorsVancouver(authors: ArticleAuthor[]): string {
  if (!authors || authors.length === 0) return 'Unknown Author'
  const formatted = authors.slice(0, 6).map(a => {
    const parts = a.name.split(' ')
    const lastName = parts[parts.length - 1]
    const initials = parts.slice(0, -1).map(p => p[0]).join('')
    return `${lastName} ${initials}`
  })
  if (authors.length > 6) formatted.push('et al')
  return formatted.join(', ')
}

export function generateAPA(article: ArticleWithAuthors): string {
  const authors = formatAuthorsAPA(article.authors)
  const year = article.publishedDate
    ? new Date(article.publishedDate).getFullYear()
    : new Date().getFullYear()
  const journal = article.journal?.title || 'Unknown Journal'
  const volume = article.volume?.number ? `, ${article.volume.number}` : ''
  const issue = article.issue?.number ? `(${article.issue.number})` : ''
  const doi = article.doi ? ` https://doi.org/${article.doi}` : ''

  return `${authors} (${year}). ${article.title}. *${journal}*${volume}${issue}.${doi}`
}

export function generateMLA(article: ArticleWithAuthors): string {
  const authors = formatAuthorsMLA(article.authors)
  const year = article.publishedDate
    ? new Date(article.publishedDate).getFullYear()
    : new Date().getFullYear()
  const journal = article.journal?.title || 'Unknown Journal'
  const volume = article.volume?.number || ''
  const issue = article.issue?.number ? `.${article.issue.number}` : ''
  const doi = article.doi ? ` https://doi.org/${article.doi}` : ''

  return `${authors}. "${article.title}." *${journal}*, vol. ${volume}${issue}, ${year}.${doi}`
}

export function generateVancouver(article: ArticleWithAuthors): string {
  const authors = formatAuthorsVancouver(article.authors)
  const year = article.publishedDate
    ? new Date(article.publishedDate).getFullYear()
    : new Date().getFullYear()
  const abbreviation = article.journal?.abbreviation || article.journal?.title || 'Unknown J'
  const volume = article.volume?.number || ''
  const issue = article.issue?.number ? `(${article.issue.number})` : ''
  const doi = article.doi ? ` doi: ${article.doi}` : ''

  return `${authors}. ${article.title}. ${abbreviation}. ${year};${volume}${issue}.${doi}`
}

export function generateBibTeX(article: ArticleWithAuthors): string {
  const key = article.slug?.split('-').slice(0, 3).join('') || 'article2024'
  const authors = article.authors?.map(a => a.name).join(' and ') || 'Unknown Author'
  const year = article.publishedDate
    ? new Date(article.publishedDate).getFullYear()
    : new Date().getFullYear()
  const journal = article.journal?.title || 'Unknown Journal'
  const volume = article.volume?.number || ''
  const doi = article.doi || ''

  return `@article{${key},
  author    = {${authors}},
  title     = {${article.title}},
  journal   = {${journal}},
  year      = {${year}},
  volume    = {${volume}},
  doi       = {${doi}},
  url       = {https://doi.org/${doi}}
}`
}

export function generateRIS(article: ArticleWithAuthors): string {
  const year = article.publishedDate
    ? new Date(article.publishedDate).getFullYear()
    : new Date().getFullYear()
  const journal = article.journal?.title || 'Unknown Journal'
  const doi = article.doi || ''

  const authorLines = (article.authors || []).map(a => `AU  - ${a.name}`).join('\n')

  return `TY  - JOUR
TI  - ${article.title}
${authorLines}
JO  - ${journal}
PY  - ${year}
DO  - ${doi}
UR  - https://doi.org/${doi}
AB  - ${article.abstract}
KW  - ${(typeof article.keywords === 'string' ? article.keywords.split(',').map(k => k.trim()) : []).join('\nKW  - ')}
ER  -`
}

export function generateAllCitations(article: ArticleWithAuthors) {
  return {
    apa: generateAPA(article),
    mla: generateMLA(article),
    vancouver: generateVancouver(article),
    bibtex: generateBibTeX(article),
    ris: generateRIS(article),
  }
}
