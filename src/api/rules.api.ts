import apiClient from "./apiClient.ts";
import {FormatRulesRecord, LintingRulesRecord} from "./responses/rules.responses.ts";

export async function formatUniqueSnippet(snippetContent: string, snippetId: string): Promise<string> {
    const { data } = await apiClient.post("/snippet-manager/config/format-unique", {
        code: snippetContent,
        snippetId: snippetId
    });
    return data;
}

export async function getFormatRules(): Promise<FormatRulesRecord> {
    const { data } = await apiClient.get("/snippet-manager/config/format");
    return data;
}

export async function getLintingRules(): Promise<LintingRulesRecord> {
    const { data } = await apiClient.get("/snippet-manager/config/linting");
    return data;
}


