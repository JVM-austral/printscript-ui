import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';
import { useGetFormatRules, useModifyFormatRules } from '../../utils/queries.tsx';
import { queryClient } from '../../App.tsx';
import { FormatRulesRecord } from '../../api/responses/rules.responses.ts';
import {AxiosError} from "axios";

const FormattingRulesList = () => {
  const [rulesRecord, setRulesRecord] = useState<FormatRulesRecord>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data, isLoading } = useGetFormatRules();
  const { mutateAsync, isLoading: isLoadingMutate} = useModifyFormatRules({
    onSuccess: () => queryClient.invalidateQueries('formatRules')
  });

  useEffect(() => {
    if (!data) return;
    setRulesRecord(data);
  }, [data]);

  const handleValueChange = (name: string, newValue: string | number | boolean | null) => {
    setRulesRecord(prev => ({ ...prev, [name]: newValue }));
  };

  const handleNumberChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    handleValueChange(name, Number.isNaN(value) ? 0 : value);
  };

  const handleStringChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleValueChange(name, event.target.value);
  };

  const toggleBoolean = (name: string) => () => {
    setRulesRecord(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    try {
      await mutateAsync(rulesRecord);
    } catch (e) {
      const err = e as AxiosError;
      const data = err.response?.data as unknown;
      const msg =
          typeof data === 'string'
              ? data
              : (data as { message?: string })?.message ?? err.message;
      setErrorMessage(msg);
    }
  };


  const entries = Object.entries(rulesRecord);

  return (
      <Card style={{ padding: 16, margin: 16 }}>
        <Typography variant="h6">Formatting rules</Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
          {isLoading || isLoadingMutate ? (
              <Typography style={{ height: 80 }}>Loading...</Typography>
          ) : (
              entries.map(([name, value]) => {
                const valueType = typeof value;
                return (
                    <ListItem key={name} disablePadding style={{ height: 40 }}>
                      {valueType === 'boolean' && (
                          <Checkbox
                              edge="start"
                              checked={Boolean(value)}
                              disableRipple
                              onChange={toggleBoolean(name)}
                          />
                      )}
                      <ListItemText primary={name} />
                      {valueType === 'number' ? (
                          <TextField
                              type="number"
                              variant="standard"
                              value={(value as number) ?? 0}
                              onChange={handleNumberChange(name)}
                          />
                      ) : valueType === 'string' ? (
                          <TextField
                              variant="standard"
                              value={(value as string) ?? ''}
                              onChange={handleStringChange(name)}
                          />
                      ) : null}
                    </ListItem>
                );
              })
          )}
        </List>
        <Button
            disabled={isLoading || isLoadingMutate}
            variant="contained"
            onClick={() => handleSubmit()}
        >
          Save
        </Button>
      </Card>
  );
};

export default FormattingRulesList;
