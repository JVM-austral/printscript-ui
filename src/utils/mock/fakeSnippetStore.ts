import {SnippetType} from '../../types/snippetType.ts'
import {FileType} from "../../types/FileType.ts";

const INITIAL_SNIPPETS: SnippetType[] = [
  {
    id: '9af91631-cdfc-4341-9b8e-3694e5cb3672',
    name: 'Super Snippet',
    snippet: 'let a : number = 5;\nlet b : number = 5;\n\nprintln(a + b);',
    compliance: 'pending',
    author: 'John Doe',
    language: 'printscript',
    description: 'mock',
    version: 'V1'
  },
  {
    id: 'c48cf644-fbc1-4649-a8f4-9dd7110640d9',
    name: 'Extra cool Snippet',
    snippet: 'let a : number = 5;\nlet b : number = 5;\n\nprintln(a + b);',
    compliance: 'not-compliant',
    author: 'John Doe',
    description: 'mock',
    language: 'printscript',
    version: 'V1'
  },
  {
    id: '34bf4b7a-d4a1-48be-bb26-7d9a3be46227',
    name: 'Boaring Snippet',
    snippet: 'let a : number = 5;\nlet b : number = 5;\n\nprintln(a + b);',
    compliance: 'compliant',
    author: 'John Doe',
    description: 'mock',
    language: 'printscript',
    version: 'V1'
  }
]

const fileTypes: FileType[] = [
  {
    language: "printscript",
    extension: "prs",
  },
  {
    language: "python -not supported-",
    extension: "py",
  },
  {
    language: "java -not supported-",
    extension: "java",
  },
  {
    language: 'golang -not supported-',
    extension: 'go'
  }
]

const versions : string[]=[
    "V1",
    "V2",
]

export class FakeSnippetStore {
  private readonly snippetMap: Map<string, SnippetType> = new Map()

  constructor() {
    INITIAL_SNIPPETS.forEach(snippet => {
      this.snippetMap.set(snippet.id, snippet)
    })
  }

  getSnippetById(id: string): SnippetType | undefined {
    return this.snippetMap.get(id)
  }


  getFileTypes(): FileType[] {
    return fileTypes
  }

  getVersions(): string[] {
    return versions
  }

}
