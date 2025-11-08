import { SnippetOperations } from "./snippetOperations.ts";
import { CreateSnippet, PaginatedSnippets, SnippetType, UpdateSnippet } from "../types/snippetType.ts";
import { FileType } from "../types/FileType.ts";
import { Rule } from "../types/Rule.ts";
import {CreateSnippetTestCase, TestCase} from "../types/TestCase.ts";
import { PaginatedUsers, User } from "./users.ts";
import { TestCaseResult } from "./queries.tsx";
import {
  createSnippet,
  updateSnippet,
  shareSnippet,
  getSnippetById,
  getAllSnippets,
  deleteSnippetById
} from "../api/snippet.api.ts";
import { CreateSnippetResponse } from "../api/responses/snippets.response.ts";
import {createSnippetTest, deleteSnippetTest, getAllSnippetsTests, runSnippetTest} from "../api/tests.api.ts";

export class SnippetManagerOperations implements SnippetOperations {
  // Snippets
  createSnippet(input: CreateSnippet): Promise<CreateSnippetResponse> {
    return createSnippet(input);
  }

  updateSnippetById(input: UpdateSnippet): Promise<CreateSnippetResponse> {
    return updateSnippet(input);
  }

  deleteSnippet(id: string): Promise<string> {
    return deleteSnippetById(id)
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
  //TODO
  getFormatRules(): Promise<Rule[]> {
    return Promise.resolve([]);
  }
  //TODO
  getLintingRules(): Promise<Rule[]> {
    return Promise.resolve([]);
  }
  //TODO
  getFileTypes(): Promise<FileType[]> {
    return Promise.resolve([]);
  }
  //TODO
  modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
    return Promise.resolve(newRules);
  }
  //TODO
  modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
    return Promise.resolve(newRules);
  }

  // Tests
  getTestCases(snippetId: string): Promise<TestCase[]> {
    return getAllSnippetsTests(snippetId)
  }

  createTestCase(testCase: CreateSnippetTestCase): Promise<TestCase> {
    return createSnippetTest(testCase)
  }

  removeTestCase(id: string): Promise<string> {
    return deleteSnippetTest(id)
  }

  async runTestCase(id: string): Promise<TestCaseResult> {
    const response = await runSnippetTest(id)
    const result: TestCaseResult = response === "Test passed successfully" ? "success" : "fail";
    return Promise.resolve(result);
  }

  // Users
  //TODO
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