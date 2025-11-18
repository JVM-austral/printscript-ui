import apiClient from "./apiClient.ts";
import {PaginationParams} from "../utils/pagination.ts";
import {PaginatedUsers} from "../utils/users.ts";
import {ShareSnippet, SnippetType} from "../types/snippetType.ts";


export async function getPaginatedUsers(pagination : PaginationParams): Promise<PaginatedUsers> {
    const { data } = await apiClient.get("/authorization/users/paginated", {
        params:pagination
    });
    return data;
}


export async function shareSnippet(shareSnippet :ShareSnippet) : Promise<SnippetType> {
    const { data } = await apiClient.post("/snippet-manager/snippets/share", shareSnippet);
    return data;
}