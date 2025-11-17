import {
    Box,
    Button,
    capitalize,
    CircularProgress,
    Input,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import {highlight, languages} from "prismjs";
import {useEffect, useState} from "react";
import Editor from "react-simple-code-editor";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";
import {Save} from "@mui/icons-material";
import {CreateSnippet, CreateSnippetWithLang} from "../../types/snippetType.ts";
import {ModalWrapper} from "../common/ModalWrapper.tsx";
import {useCreateSnippet, useGetFileTypes} from "../../utils/queries.tsx";
import {queryClient} from "../../App.tsx";

export const AddSnippetModal = ({open, onClose, defaultSnippet}: {
    open: boolean,
    onClose: () => void,
    defaultSnippet?: CreateSnippetWithLang
}) => {
    const [language, setLanguage] = useState(defaultSnippet?.language ?? "printscript");
    const [code, setCode] = useState(defaultSnippet?.snippet ?? "");
    const [snippetName, setSnippetName] = useState(defaultSnippet?.name ?? "")
    const [description, setDescription] = useState(defaultSnippet?.description ?? "fake description");
    const {mutateAsync: createSnippet, isLoading: loadingSnippet} = useCreateSnippet({
        onSuccess: () => queryClient.invalidateQueries('listSnippets')
    })
    const {data: fileTypes} = useGetFileTypes();
    const [saveError, setSaveError] = useState(false);
    const [saveErrorsList, setSaveErrorsList] = useState<string[]>([]);

    const handleCreateSnippet = async () => {
        const newSnippet: CreateSnippet = {
            name: snippetName,
            snippet: code,
            language: language,
            description: description,
            version: "V2"
        }
        const saveResponse = await createSnippet(newSnippet);
        if(saveResponse.errorMessage.length > 0){
            setSaveError(true);
            setSaveErrorsList(saveResponse.errorMessage)
            return;
        }
        onClose();
    }

    useEffect(() => {
        if (defaultSnippet) {
            setCode(defaultSnippet?.snippet)
            setLanguage(defaultSnippet?.language)
            setSnippetName(defaultSnippet?.name)
            setDescription(defaultSnippet?.description)
        }
    }, [defaultSnippet]);

    return (
        <ModalWrapper open={open} onClose={onClose}>
            {
                <Box sx={{display: 'flex', flexDirection: "row", justifyContent: "space-between"}}>
                    <Typography id="modal-modal-title" variant="h5" component="h2"
                                sx={{display: 'flex', alignItems: 'center'}}>
                        Add Snippet
                    </Typography>
                    <Button disabled={!snippetName || !code || !language || loadingSnippet} variant="contained"
                            disableRipple
                            sx={{boxShadow: 0}} onClick={handleCreateSnippet}>
                        <Box pr={1} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                            {loadingSnippet ? <CircularProgress size={24}/> : <Save/>}
                        </Box>
                        Save Snippet
                    </Button>
                </Box>
            }
            <div style={{ display: 'flex', flexDirection: 'row', minWidth: '300px', gap: '24px', marginBottom: '16px' }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input onChange={e => setSnippetName(e.target.value)} value={snippetName} id="name"
                           sx={{width: '80%'}}/>
                </Box>
            </div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '60%'
            }}>
                <InputLabel htmlFor="name">Language</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label="Language"
                    onChange={(e: SelectChangeEvent) => setLanguage(e.target.value)}
                    sx={{width: '50%'}}
                >
                    {fileTypes?.map(x => (
                        <MenuItem data-testid={`menu-option-${x.displayName}`} key={x.displayName} value={x.displayName}>
                            {capitalize(x.displayName)}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <InputLabel>Code Snippet</InputLabel>
            {saveError &&
                <Typography color={"error"} variant={"body2"} ml={1}>
                    {saveErrorsList}
                </Typography>
            }
            <Box width={"100%"} sx={{
                backgroundColor: 'black', color: 'white', borderRadius: "8px",
            }}>
                <Editor
                    value={code}
                    padding={10}
                    data-testid={"add-snippet-code-editor"}
                    onValueChange={(code) => setCode(code)}
                    highlight={(code) => highlight(code, languages.js, 'javascript')}
                    style={{
                        borderRadius: "8px",
                        overflow: "auto",
                        minHeight: "300px",
                        maxHeight: "600px",
                        width: "100%",
                        fontFamily: "monospace",
                        fontSize: 17,
                    }}
                />
            </Box>
        </ModalWrapper>
    )
}

