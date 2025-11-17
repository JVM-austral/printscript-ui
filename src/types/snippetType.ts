import {Pagination} from "../utils/pagination.ts";

export type ComplianceEnum =
    'pending' |
    'failed' |
    'not-compliant' |
    'compliant'


export type CreateSnippet = {
  name: string;
  description: string;
  snippet: string;
  language: string;
  version: string;
}

export type CreateSnippetWithLang = CreateSnippet & { language: string }

export type UpdateSnippet = CreateSnippet & { snippetId: string }

export type SnippetType = CreateSnippet & {
  id: string
} & SnippetStatus

type SnippetStatus = {
  compliance: ComplianceEnum;
  author: string;
}
export type PaginatedSnippets = {
  pagination: Pagination
  snippets: SnippetType[]
}


export type ShareSnippet = {
    snippetId: string;
    targetUserId: string;
}

export type RunSnippet = {
  snippetId: string;
  varInputs?: string[];
}