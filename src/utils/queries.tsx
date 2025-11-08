import {useMutation, UseMutationResult, useQuery} from 'react-query';
import {CreateSnippet, PaginatedSnippets, SnippetType, UpdateSnippet} from '../types/snippetType.ts';
import {SnippetOperations} from "./snippetOperations.ts";
import {PaginatedUsers} from "./users.ts";
import {CreateSnippetTestCase, TestCase} from "../types/TestCase.ts";
import {FileType} from "../types/FileType.ts";
import {Rule} from "../types/Rule.ts";
import {CreateSnippetResponse} from "../api/responses/snippets.response.ts";
import {SnippetManagerOperations} from "./snippetManagerOperations.ts";
// import {useAuth0} from "@auth0/auth0-react";
// import {useEffect} from "react";


export const useSnippetsOperations = () => {
  // const {getAccessTokenSilently} = useAuth0()
  //
  // useEffect(() => {
  //     getAccessTokenSilently()
  //         .then(token => {
  //             console.log(token)
  //         })
  //         .catch(error => console.error(error));
  // });

  const snippetOperations: SnippetOperations = new SnippetManagerOperations()

  return snippetOperations
}

export const useGetSnippets = (page: number = 0, pageSize: number = 10, snippetName?: string) => {
  const snippetOperations = useSnippetsOperations()

  return useQuery<PaginatedSnippets, Error>(['listSnippets', page,pageSize,snippetName], () => snippetOperations.listSnippetDescriptors(page, pageSize,snippetName));
};

export const useGetSnippetById = (id: string) => {
  const snippetOperations = useSnippetsOperations()

  return useQuery<SnippetType | undefined, Error>(['snippet', id], () => snippetOperations.getSnippetById(id), {
    enabled: !!id, // This query will not execute until the id is provided
  });
};

export const useCreateSnippet = ({onSuccess}: {onSuccess: () => void}): UseMutationResult<CreateSnippetResponse, Error, CreateSnippet> => {
  const snippetOperations = useSnippetsOperations()

  return useMutation<CreateSnippetResponse, Error, CreateSnippet>(createSnippet => snippetOperations.createSnippet(createSnippet), {onSuccess});
};

export const useUpdateSnippetById = ({onSuccess}: {onSuccess: () => void}): UseMutationResult<CreateSnippetResponse , Error, {
  id: string;
  input: UpdateSnippet
}> => {
  const snippetOperations = useSnippetsOperations()

  return useMutation<CreateSnippetResponse, Error, { id: string; input: UpdateSnippet }>(
      ({input}) => snippetOperations.updateSnippetById(input),{
        onSuccess,
    }
  );
};

export const useGetUsers = (name: string = "", page: number = 0, pageSize: number = 10) => {
  const snippetOperations = useSnippetsOperations()

  return useQuery<PaginatedUsers, Error>(['users',name,page,pageSize], () => snippetOperations.getUserFriends(name,page, pageSize));
};

export const useShareSnippet = () => {
  const snippetOperations = useSnippetsOperations()

  return useMutation<SnippetType, Error, { snippetId: string; userId: string }>(
      ({snippetId, userId}) => snippetOperations.shareSnippet(snippetId, userId)
  );
};


export const useGetTestCases = (snippetId: string) => {
  const snippetOperations = useSnippetsOperations()

  return useQuery<TestCase[] | undefined, Error>(['testCases'], () => snippetOperations.getTestCases(snippetId), {});
};


export const usePostTestCase = () => {
  const snippetOperations = useSnippetsOperations()

  return useMutation<TestCase, Error, Partial<CreateSnippetTestCase>>(
      (tc) => snippetOperations.createTestCase(tc)
  );
};


export const useRemoveTestCase = ({onSuccess}: {onSuccess: () => void}) => {
  const snippetOperations = useSnippetsOperations()

  return useMutation<string, Error, string>(
      ['removeTestCase'],
      (id) => snippetOperations.removeTestCase(id),
      {
        onSuccess,
      }
  );
};

export type TestCaseResult = "success" | "fail"

export const useTestSnippet = () => {
  const snippetOperations = useSnippetsOperations()

  return useMutation<TestCaseResult, Error, string>(
      (tc) => snippetOperations.runTestCase(tc)
  )
}



export const useGetFormatRules = () => {
  const snippetOperations = useSnippetsOperations()

  return useQuery<Rule[], Error>('formatRules', () => snippetOperations.getFormatRules());
}

export const useModifyFormatRules = ({onSuccess}: {onSuccess: () => void}) => {
  const snippetOperations = useSnippetsOperations()

  return useMutation<Rule[], Error, Rule[]>(
      rule => snippetOperations.modifyFormatRule(rule),
      {onSuccess}
  );
}


export const useGetLintingRules = () => {
  const snippetOperations = useSnippetsOperations()

  return useQuery<Rule[], Error>('lintingRules', () => snippetOperations.getLintingRules());
}


export const useModifyLintingRules = ({onSuccess}: {onSuccess: () => void}) => {
  const snippetOperations = useSnippetsOperations()

  return useMutation<Rule[], Error, Rule[]>(
      rule => snippetOperations.modifyLintingRule(rule),
      {onSuccess}
  );
}

export const useFormatSnippet = () => {
  const snippetOperations = useSnippetsOperations()

  return useMutation<string, Error, string>(
      snippetContent => snippetOperations.formatSnippet(snippetContent)
  );
}

export const useDeleteSnippet = ({onSuccess}: {onSuccess: () => void}) => {
  const snippetOperations = useSnippetsOperations()

  return useMutation<string, Error, string>(
      id => snippetOperations.deleteSnippet(id),
      {
        onSuccess,
      }
  );
}


export const useGetFileTypes = () => {
  const snippetOperations = useSnippetsOperations()

  return useQuery<FileType[], Error>('fileTypes', () => snippetOperations.getFileTypes());
}