import apiClient from "./apiClient.ts";
import {PaginationParams} from "../utils/pagination.ts";
import {
    CreateSnippet,
    PaginatedSnippets,
    RunSnippet,
    ShareSnippet,
    SnippetType,
    UpdateSnippet
} from "../types/snippetType.ts";
import {CreateSnippetResponse, RunSnippetResponse} from "./responses/snippets.response.ts";


export async function getAllSnippets(pagination: PaginationParams): Promise<PaginatedSnippets> {
    const { data } = await apiClient.get("/snippet-manager/snippets", {
        params:pagination
    });
    console.log(data)
    return data;
}

export async function getSnippetById(id: string): Promise<SnippetType> {
    const { data } = await apiClient.get(`/snippet-manager/snippets/${id}`);
    return data;
}

export async function createSnippet(createSnippet: CreateSnippet ): Promise<CreateSnippetResponse> {
    const { data } = await apiClient.post("/snippet-manager/snippets", createSnippet);
    return data;
}
export async function updateSnippet(updateSnippet :UpdateSnippet): Promise<CreateSnippetResponse> {
    const { data } = await apiClient.put("/snippet-manager/snippets", updateSnippet);
    return data;
}

export async function shareSnippet(shareSnippet :ShareSnippet) {
    const { data } = await apiClient.post("/snippet-manager/snippets/share", shareSnippet);
    return data;
}

export async function runSnippet(runSnippet :RunSnippet):Promise<RunSnippetResponse> {
    const { data } = await apiClient.post("/snippet-manager/snippets/run", runSnippet);
    return data;
}