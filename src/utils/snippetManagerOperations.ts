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
import {formatUniqueSnippet, getFormatRules, getLintingRules} from "../api/rules.api.ts";
import {FakeSnippetStore} from "./mock/fakeSnippetStore.ts";
import {LintingRulesRecord} from "../api/responses/rules.responses.ts";


export class SnippetManagerOperations implements SnippetOperations {
  private readonly fakeStore = new FakeSnippetStore()

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
  formatSnippet(content: string, snippetId: string): Promise<string> {
    return formatUniqueSnippet(content, snippetId);
  }
  //TODO
  async getFormatRules(): Promise<Rule[]> {
    return await getFormatRules().then((resp: LintingRulesRecord) =>
        Object.entries(resp).map(([name, value]) => ({name, value})));

  }

  async getLintingRules(): Promise<Rule[]> {
    return await getLintingRules().then((resp: LintingRulesRecord) =>
        Object.entries(resp).map(([name, value]) => ({name, value})));
  }

  //TODO-Mocked
  getFileTypes(): Promise<FileType[]> {
    return new Promise(resolve => {resolve(this.fakeStore.getFileTypes())
    })
  }

  getVersion() : Promise<string[]> {
    return new Promise(resolve => {resolve(this.fakeStore.getVersions())})
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
      count: 1,
    };
    return Promise.resolve(user);
  }

  shareSnippet(snippetId: string, targetUserId: string): Promise<SnippetType> {
    return shareSnippet({ snippetId, targetUserId });
  }
}