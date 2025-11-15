import {useState} from "react";
import {CreateSnippetTestCase, TestCase} from "../../types/TestCase.ts";
import {Autocomplete, Box, Button, Chip, TextField, Typography} from "@mui/material";
import {BugReport, Delete, Save} from "@mui/icons-material";
import {useTestSnippet} from "../../utils/queries.tsx";

type TabPanelProps = {
    index: number;
    value: number;
    test?: TestCase;
    setTestCase: (test : CreateSnippetTestCase & {testId?: string}) => void;
    removeTestCase?: (testIndex: string) => void;
    snippetId: string;
}

export const TabPanel = ({value, index, test: initialTest, setTestCase, removeTestCase, snippetId}: TabPanelProps) => {
    const [testData, setTestData] = useState<CreateSnippetTestCase>(() => ({
        snippetId: snippetId,
        name: initialTest?.name,
        input: initialTest?.input,
        output: initialTest?.output,
    }));

    const testId = initialTest?.id;
    const {mutateAsync: testSnippet, data, isError} = useTestSnippet();

    return (
        <div>
            {!isError && <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                style={{width: '100%', height: '100%'}}
            >
                {value === index && (
                    <Box sx={{px: 3}} display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography fontWeight="bold">Name</Typography>
                            <TextField
                                size="small"
                                value={testData.name ?? ""}
                                onChange={(e) => setTestData(prev => ({...prev, name: e.target.value || prev.name}))}
                            />
                        </Box>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography fontWeight="bold">Input</Typography>
                            <Autocomplete
                                multiple
                                size="small"
                                id="tags-input"
                                freeSolo
                                value={testData.input ?? []}
                                onChange={(_, value) => setTestData(prev => ({...prev, input: value}))}
                                renderTags={(value: readonly string[], getTagProps) =>
                                    value.map((option: string, index: number) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({index})} />
                                    ))
                                }
                                renderInput={(params) => <TextField {...params} />}
                                options={[]}
                            />
                        </Box>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography fontWeight="bold">Output</Typography>
                            <Autocomplete
                                multiple
                                size="small"
                                id="tags-output"
                                freeSolo
                                value={testData.output ?? []}
                                onChange={(_, value) => setTestData(prev => ({...prev, output: value}))}
                                renderTags={(value: readonly string[], getTagProps) =>
                                    value.map((option: string, index: number) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({index})} />
                                    ))
                                }
                                renderInput={(params) => <TextField {...params} />}
                                options={[]}
                            />
                        </Box>
                        <Box display="flex" flexDirection="row" gap={1}>
                            {testId && removeTestCase && (
                                <Button onClick={() => removeTestCase(testId)} variant={"outlined"} color={"error"}
                                        startIcon={<Delete/>}>
                                    Remove
                                </Button>
                            )}
                            <Button
                                disabled={!testData.name}
                                onClick={() => setTestCase({...testData, testId})}
                                variant={"outlined"}
                                startIcon={<Save/>}
                            >
                                Save
                            </Button>
                            <Button
                                disabled={!testId}
                                onClick={() => testSnippet(testId ?? "")}
                                variant={"contained"}
                                startIcon={<BugReport/>}
                                disableElevation
                            >
                                Test
                            </Button>
                            {data && (data === "success" ? <Chip label="Pass" color="success"/> :
                                <Chip label="Fail" color="error"/>)}
                        </Box>
                    </Box>
                )}
            </div>}
            {isError && <Typography color="error">Error testing the snippet</Typography>}
        </div>
    );
}
