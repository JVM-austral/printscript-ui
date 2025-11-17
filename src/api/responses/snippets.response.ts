export type CreateSnippetResponse = {
    id: string;
    errorMessage: string[];
}

export type RunSnippetResponse = {
    output: string[];
    errors: string[];
}

export type LanguagesResponse = {
    displayName: string;
    versions: string[];
    extension: string;
}

