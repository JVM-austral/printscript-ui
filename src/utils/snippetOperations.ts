import {CreateSnippet, PaginatedSnippets, SnippetType, UpdateSnippet} from '../types/snippetType.ts'
import {PaginatedUsers} from "./users.ts";
import {CreateSnippetTestCase, TestCase} from "../types/TestCase.ts";
import {TestCaseResult} from "./queries.tsx";
import {FileType} from "../types/FileType.ts";
import {CreateSnippetResponse} from "../api/responses/snippets.response.ts";
import {FormatRulesRecord, LintingRulesRecord} from "../api/responses/rules.responses.ts";

export interface SnippetOperations {
  listSnippetDescriptors(page: number,pageSize: number,sippetName?: string): Promise<PaginatedSnippets>

  createSnippet(createSnippet: CreateSnippet): Promise<CreateSnippetResponse>

  getSnippetById(id: string): Promise<SnippetType | undefined>

  updateSnippetById(updateSnippet: UpdateSnippet): Promise<CreateSnippetResponse>

  getUserFriends(name?: string,page?: number,pageSize?: number): Promise<PaginatedUsers>

  shareSnippet(snippetId: string,userId: string): Promise<SnippetType>

  getFormatRules(): Promise<FormatRulesRecord>

  getLintingRules(): Promise<LintingRulesRecord>

  getTestCases(snippetId: string): Promise<TestCase[]>

  formatSnippet(snippet: string, snippetId: string): Promise<string>

  createTestCase(testCase: CreateSnippetTestCase & {testId?: string}): Promise<TestCase>

  removeTestCase(id: string): Promise<string>

  deleteSnippet(id: string): Promise<string>

  runTestCase(id: string): Promise<TestCaseResult>

  getFileTypes(): Promise<FileType[]>

  getVersion() : Promise<string[]>

  modifyFormatRule(newRules: FormatRulesRecord): Promise<void>

  modifyLintingRule(newRules: LintingRulesRecord): Promise<void>
}
