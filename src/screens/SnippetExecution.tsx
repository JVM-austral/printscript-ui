// noinspection NonAsciiCharacters

import {OutlinedInput, Box, IconButton, Tooltip} from "@mui/material";
import {highlight, languages} from "prismjs";
import Editor from "react-simple-code-editor";
import "prismjs/themes/prism-okaidia.css";
import {Bòx} from "../components/snippet-table/SnippetBox.tsx";
import {useEffect, useState} from "react";
import {useRunSnippet} from "../hooks/useRunSnippet.ts";
import {PlayArrow, StopRounded} from "@mui/icons-material";

type SnippetExecutionProps = {
    id: string;
};

export const SnippetExecution = ({id}: SnippetExecutionProps) => {
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string[]>([]);
    const { run, stop, isRunning, data } = useRunSnippet();

    const result = data ? data.output.flat().join("\n") : "";
    useEffect(() => {
        if (result) {
            setOutput((prev) => [...prev, result]);
        }
    }, [result]);

    const handleRunClick = () => {
        if (isRunning) {
            stop();
        } else {
            run({ snippetId: id });
        }
    };

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
        <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" justifyContent="flex-end">
                <Tooltip title={isRunning ? "Stop" : "Run"}>
                    <IconButton color="primary" onClick={handleRunClick}>
                        {isRunning ? <StopRounded /> : <PlayArrow />}
                    </IconButton>
                </Tooltip>
            </Box>

            <Bòx
                flex={1}
                overflow={"auto"}
                minHeight={200}
                bgcolor={"black"}
                color={"white"}
                code={code}
            >
                <Editor
                    value={code}
                    padding={10}
                    onValueChange={() => {}}
                    highlight={(c) => highlight(c, languages.js, "javascript")}
                    readOnly
                    style={{
                        fontFamily: "monospace",
                        fontSize: 17,
                        minHeight: "200px",
                    }}
                />
            </Bòx>

            <OutlinedInput
                onKeyDown={handleEnter}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type input and press Enter"
                fullWidth
                sx={{
                    bgcolor: "background.paper",
                    color: "text.primary",
                }}
            />
        </Box>
    );
};
