export type CreateSnippetResponse = {
    snippetId: string;
    errorMessage: string[];
}

export type RunSnippetResponse = {
    output: string[];
    errors: string[];
}

