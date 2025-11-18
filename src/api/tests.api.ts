import {CreateSnippetTestCase, TestCase} from "../types/TestCase.ts";
import apiClient from "./apiClient.ts";

export async function createSnippetTest(input : CreateSnippetTestCase): Promise<TestCase> {
    const { data } = await apiClient.post(`/snippet-manager/testing/save`, input);
    return data;
}

export async function runSnippetTest(testCaseId: string): Promise<string> {
    const { data } = await apiClient.post(`/snippet-manager/testing/run`, { testId: testCaseId });
    return data;
}

export async function deleteSnippetTest(testId: string): Promise<string> {
    const { data } = await apiClient.delete('/snippet-manager/testing', {
        data: { testId }
    });
    return data;
}

export async function updateSnippetTest(input : CreateSnippetTestCase & {testId: string}): Promise<TestCase> {
    const { data } = await apiClient.put(`/snippet-manager/testing/edit`, input);
    return data;
}

export async function getAllSnippetsTests(snippetId: string): Promise<TestCase[]> {
    const { data } = await apiClient.get(`/snippet-manager/testing/${snippetId}`);
    return data;
}