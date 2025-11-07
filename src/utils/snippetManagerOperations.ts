import { SnippetOperations } from "./snippetOperations.ts";
import { CreateSnippet, PaginatedSnippets, SnippetType, UpdateSnippet } from "../types/snippetType.ts";
import { FileType } from "../types/FileType.ts";
import { Rule } from "../types/Rule.ts";
import { TestCase } from "../types/TestCase.ts";
import { PaginatedUsers, User } from "./users.ts";
import { TestCaseResult } from "./queries.tsx";
import { createSnippet, updateSnippet, shareSnippet, getSnippetById, getAllSnippets } from "../api/snippet.api.ts";
import { CreateSnippetResponse } from "../api/responses/snippets.response.ts";

export class SnippetManagerOperations implements SnippetOperations {
  // Snippets
  createSnippet(input: CreateSnippet): Promise<CreateSnippetResponse> {
    return createSnippet(input);
  }

  updateSnippetById(input: UpdateSnippet): Promise<CreateSnippetResponse> {
    return updateSnippet(input);
  }

  deleteSnippet(id: string): Promise<string> {
    return Promise.resolve(id);
  }

  getSnippetById(id: string): Promise<SnippetType | undefined> {
    return getSnippetById(id);
  }

  listSnippetDescriptors(page: number, pageSize: number): Promise<PaginatedSnippets> {
    return getAllSnippets({ page, page_size: pageSize });
  }

  // Format and Linting
  formatSnippet(snippet: string): Promise<string> {
    return Promise.resolve(`//Mocked format of snippet :) \n${snippet}`);
  }

  getFormatRules(): Promise<Rule[]> {
    return Promise.resolve([]);
  }

  getLintingRules(): Promise<Rule[]> {
    return Promise.resolve([]);
  }

  getFileTypes(): Promise<FileType[]> {
    return Promise.resolve([]);
  }

  modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
    return Promise.resolve(newRules);
  }

  modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
    return Promise.resolve(newRules);
  }

  // Tests
  getTestCases(): Promise<TestCase[]> {
    return Promise.resolve([]);
  }

  postTestCase(testCase: Partial<TestCase>): Promise<TestCase> {
    // @ts-ignore
      const id = (testCase as unknown)?. id ?? String(Date.now());
    const newTestCase = { ...testCase, id } as TestCase;
    return Promise.resolve(newTestCase);
  }

  removeTestCase(id: string): Promise<string> {
    return Promise.resolve(id);
  }

  testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
    void testCase;
    const result: TestCaseResult = Math.random() > 0.5 ? "success" : "fail";
    return Promise.resolve(result);
  }

  // Users
  getUserFriends(name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> {
    const friend: User = {
      id: "1",
      name: name || "Friend Name",
    };
    const user: PaginatedUsers = {
      users: [friend],
      page: page || 0,
      page_size: pageSize || 10,
      total: 1,
    };
    return Promise.resolve(user);
  }

  shareSnippet(snippetId: string, targetUserId: string): Promise<SnippetType> {
    return shareSnippet({ snippetId, targetUserId });
  }
}