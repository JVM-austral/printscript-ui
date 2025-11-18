// noinspection NonAsciiCharacters

import {OutlinedInput} from "@mui/material";
import {highlight, languages} from "prismjs";
import Editor from "react-simple-code-editor";
import "prismjs/themes/prism-okaidia.css";
import {Bòx} from "../components/snippet-table/SnippetBox.tsx";
import React, {useEffect, useState} from "react";
import {useRunSnippet} from "../hooks/useRunSnippet.ts";

type SnippetExecutionProps = {
    id: string;
    codeOutput?: string;
};

export const SnippetExecution = ({id, codeOutput}: SnippetExecutionProps) => {
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string[]>([]);
    const { run, stop, isRunning, data } = useRunSnippet();

    const result = data ? data.output.flat().join("\n") : "";
    useEffect(() => {
        if(isRunning) return
        if (result) {
            setOutput((prev) => [...prev, result]);
            return;
        }
        else if(codeOutput){
            setOutput((prev) => [...prev, codeOutput]);
            return;
        }
    }, [codeOutput, result, isRunning]);

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (isRunning) {
                stop();
            } else {
                run({ snippetId: id, varInputs: [input] });
            }
            setInput("");
        }
    };

    const code = output.join("\n");

    return (
        <>
            <Bòx flex={1} overflow={"none"} minHeight={200} bgcolor={'black'} color={'white'} code={code}>
                <Editor
                    value={code}
                    padding={10}
                    onValueChange={(code) => setInput(code)}
                    highlight={(code) => highlight(code, languages.js, 'javascript')}
                    maxLength={1000}
                    style={{
                        fontFamily: "monospace",
                        fontSize: 17,
                    }}
                />
            </Bòx>
            <OutlinedInput onKeyDown={handleEnter} value={input} onChange={e => setInput(e.target.value)} placeholder="Type here" fullWidth/>
        </>
    )
}
