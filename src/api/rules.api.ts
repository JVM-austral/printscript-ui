import apiClient from "./apiClient.ts";

export async function formatUniqueSnippet(snippetContent: string, snippetId: string): Promise<string> {
    const { data } = await apiClient.post("/snippet-manager/config/format-unique", {
        code: snippetContent,
        snippetId: snippetId
    });
    return data;
}