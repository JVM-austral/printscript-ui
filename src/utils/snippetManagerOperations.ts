import { SnippetOperations } from "./snippetOperations.ts";
import { CreateSnippet, PaginatedSnippets, SnippetType, UpdateSnippet } from "../types/snippetType.ts";
import { FileType } from "../types/FileType.ts";
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
import {
  createSnippetTest,
  deleteSnippetTest,
  getAllSnippetsTests,
  runSnippetTest,
  updateSnippetTest
} from "../api/tests.api.ts";
import {
  formatUniqueSnippet,
  getFormatRules,
  getLintingRules,
  saveFormatRules,
  saveLintingRules
} from "../api/rules.api.ts";
import {FakeSnippetStore} from "./mock/fakeSnippetStore.ts";
import {FormatRulesRecord, LintingRulesRecord} from "../api/responses/rules.responses.ts";
import {AxiosError} from "axios";


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

  getFormatRules(): Promise<FormatRulesRecord> {
    return getFormatRules();
  }

  getLintingRules(): Promise<LintingRulesRecord> {
    return getLintingRules()
  }

  //TODO-Mocked
  getFileTypes(): Promise<FileType[]> {
    return new Promise(resolve => {resolve(this.fakeStore.getFileTypes())
    })
  }

  getVersion() : Promise<string[]> {
    return new Promise(resolve => {resolve(this.fakeStore.getVersions())})
  }


  async modifyFormatRule(newRules: FormatRulesRecord): Promise<void> {
    try {
      await saveFormatRules(newRules);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error(err.message, err.response?.data);
        throw  err;
      }
      throw err;
    }
  }

  modifyLintingRule(newRules: LintingRulesRecord): Promise<void> {
    return saveLintingRules(newRules);
  }

  // Tests
  getTestCases(snippetId: string): Promise<TestCase[]> {
    return getAllSnippetsTests(snippetId)
  }

  createTestCase(testCase: CreateSnippetTestCase & {testId?: string}): Promise<TestCase> {
    if (testCase.testId != null) {
      return updateSnippetTest(testCase as CreateSnippetTestCase & { testId: string });
    }
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