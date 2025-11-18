import { SnippetOperations } from "./snippetOperations.ts";
import { CreateSnippet, PaginatedSnippets, SnippetType, UpdateSnippet } from "../types/snippetType.ts";
import {CreateSnippetTestCase, TestCase} from "../types/TestCase.ts";
import { PaginatedUsers} from "./users.ts";
import { TestCaseResult } from "./queries.tsx";
import {
  createSnippet,
  updateSnippet,
  getSnippetById,
  getAllSnippets,
  deleteSnippetById, getLanguages
} from "../api/snippet.api.ts";
import {CreateSnippetResponse, LanguagesResponse} from "../api/responses/snippets.response.ts";
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
import {FormatRulesRecord, LintingRulesRecord} from "../api/responses/rules.responses.ts";
import {AxiosError} from "axios";
import {getPaginatedUsers, shareSnippet} from "../api/users.api.ts";


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

  listSnippetDescriptors(page: number, pageSize: number, snippetName? : string): Promise<PaginatedSnippets> {
    if (snippetName){
      return getAllSnippets({ page, page_size: pageSize, filter: snippetName });

    }
    return getAllSnippets({ page, page_size: pageSize});
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

  getFileTypes(): Promise<LanguagesResponse[]> {
    return getLanguages()
  }

  async modifyFormatRule(newRules: FormatRulesRecord): Promise<void> {
    try {
      await saveFormatRules(newRules);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
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
  getUserFriends(name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> {
    return getPaginatedUsers({page: page ?? 1, page_size: pageSize ?? 10, filter: name});
  }

  shareSnippet(snippetId: string, targetUserId: string): Promise<SnippetType> {
    try {
      return shareSnippet({ snippetId, targetUserId });
    }
    catch (err) {
      if (err instanceof AxiosError) {
        throw  err;
      }
      throw err;
    }
  }
}