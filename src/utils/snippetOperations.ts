import {CreateSnippet, PaginatedSnippets, SnippetType, UpdateSnippet} from '../types/snippetType.ts'
import {PaginatedUsers} from "./users.ts";
import {CreateSnippetTestCase, TestCase} from "../types/TestCase.ts";
import {TestCaseResult} from "./queries.tsx";
import {FileType} from "../types/FileType.ts";
import {Rule} from "../types/Rule.ts";
import {CreateSnippetResponse} from "../api/responses/snippets.response.ts";

export interface SnippetOperations {
  listSnippetDescriptors(page: number,pageSize: number,sippetName?: string): Promise<PaginatedSnippets>

  createSnippet(createSnippet: CreateSnippet): Promise<CreateSnippetResponse>

  getSnippetById(id: string): Promise<SnippetType | undefined>

  updateSnippetById(updateSnippet: UpdateSnippet): Promise<CreateSnippetResponse>

  getUserFriends(name?: string,page?: number,pageSize?: number): Promise<PaginatedUsers>

  shareSnippet(snippetId: string,userId: string): Promise<SnippetType>

  getFormatRules(): Promise<Rule[]>

  getLintingRules(): Promise<Rule[]>

  getTestCases(snippetId: string): Promise<TestCase[]>

  formatSnippet(snippet: string, snippetId: string): Promise<string>

  createTestCase(testCase: Partial<CreateSnippetTestCase>): Promise<TestCase>

  removeTestCase(id: string): Promise<string>

  deleteSnippet(id: string): Promise<string>

  runTestCase(id: string): Promise<TestCaseResult>

  getFileTypes(): Promise<FileType[]>

  modifyFormatRule(newRules: Rule[]): Promise<Rule[]>

  modifyLintingRule(newRules: Rule[]): Promise<Rule[]>
}
