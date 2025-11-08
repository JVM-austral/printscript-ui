export type TestCase = {
    id: string;
    snippetId: string
    name: string;
    input?: string[];
    output?: string[];
};

export type CreateSnippetTestCase = {
    snippetId: string;
    name?: string;
    input?: string[];
    output?: string[];
};