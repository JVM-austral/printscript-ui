import { useState, useCallback } from "react";
import {runSnippet} from "../api/snippet.api.ts";
import {RunSnippet} from "../types/snippetType.ts";
import {RunSnippetResponse} from "../api/responses/snippets.response.ts";


export function useRunSnippet() {
    const [isRunning, setIsRunning] = useState(false);
    const [data, setData] = useState<RunSnippetResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const run = useCallback(async (input: RunSnippet) => {
        setIsRunning(true);
        setError(null);
        setData(null);

        try {
            const res = await runSnippet(input);
            setData(res);
            
        } catch (err: unknown) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(err?.message ?? "Error running snippet");
        } finally {
            setIsRunning(false);
        }
    }, []);

    const stop = useCallback(() => {
        setIsRunning(false);
        setData(null);
        setError(null);
    }, []);

    return { run, stop, isRunning, data, error };
}
