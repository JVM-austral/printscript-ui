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
import { useGetLintingRules, useModifyLintingRules } from '../../utils/queries.tsx';
import { queryClient } from '../../App.tsx';
import { Rule } from '../../types/Rule.ts';

const LintingRulesList = () => {
  const [rules, setRules] = useState<Rule[] >([]);

  const { data, isLoading } = useGetLintingRules();
  const { mutateAsync, isLoading: isLoadingMutate } = useModifyLintingRules({
    onSuccess: () => queryClient.invalidateQueries('lintingRules')
  });

  useEffect(() => {
    if (data) setRules(data);
  }, [data]);

  const handleValueChange = (rule: Rule, newValue: string | number | boolean | null) => {
    setRules(prev => prev?.map(r => (r.name === rule.name ? { ...r, value: newValue } : r)));
  };

  const handleNumberChange = (rule: Rule) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    handleValueChange(rule, Number.isNaN(value) ? 0 : value);
  };

  const toggleBoolean = (rule: Rule) => () => {
    if (typeof rule.value === 'boolean') {
      handleValueChange(rule, !rule.value);
    }
  };

  return (
      <Card style={{ padding: 16, margin: 16 }}>
        <Typography variant="h6">Linting rules</Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {isLoading || isLoadingMutate ? (
              <Typography style={{ height: 80 }}>Loading...</Typography>
          ) : (
              rules?.map(rule => (
                  <ListItem key={rule.name} disablePadding style={{ height: 40 }}>
                    {typeof rule.value === 'boolean' && (
                        <Checkbox
                            edge="start"
                            checked={rule.value}
                            disableRipple
                            onChange={toggleBoolean(rule)}
                        />
                    )}
                    <ListItemText primary={rule.name} />
                    {typeof rule.value === 'number' ? (
                        <TextField
                            type="number"
                            variant="standard"
                            value={rule.value}
                            onChange={handleNumberChange(rule)}
                        />
                    ) : typeof rule.value === 'string' ? (
                        <TextField
                            variant="standard"
                            value={rule.value}
                            onChange={e => handleValueChange(rule, e.target.value)}
                        />
                    ) : null}
                  </ListItem>
              ))
          )}
        </List>
        <Button
            disabled={isLoading || isLoadingMutate}
            variant="contained"
            onClick={() => mutateAsync(rules ?? [])}
        >
          Save
        </Button>
      </Card>
  );
};

export default LintingRulesList;
