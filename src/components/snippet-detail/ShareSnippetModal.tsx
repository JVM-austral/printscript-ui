import {Alert, Autocomplete, Box, Button, Divider, TextField, Typography} from "@mui/material";
import {ModalWrapper} from "../common/ModalWrapper.tsx";
import {useGetUsers} from "../../utils/queries.tsx";
import {useEffect, useState} from "react";
import {User} from "../../utils/users.ts";

type ShareSnippetModalProps = {
  open: boolean
  onClose: () => void
  onShare: (userId: string) => void
  loading: boolean,
  errorMessage: string | null
}
export const ShareSnippetModal = (props: ShareSnippetModalProps) => {
  const {open, onClose, onShare, loading, errorMessage} = props
  const [email, setEmail] = useState("")
  const [debouncedName, setDebouncedName] = useState("")
  const {data, isLoading, isError} = useGetUsers(debouncedName, 0, 5)
  const [selectedUser, setSelectedUser] = useState<User | undefined>()

  useEffect(() => {
    const getData = setTimeout(() => {
      setDebouncedName(email)
    }, 3000)
    return () => clearTimeout(getData)
  }, [email])

  function handleSelectUser(newValue: User | null) {
    newValue && setSelectedUser(newValue)
  }
  return (
      <ModalWrapper open={open} onClose={onClose}>
        {errorMessage && <Alert severity="error" onClose={onClose}>{errorMessage}</Alert>}
        <Typography variant={"h5"}>Share your snippet</Typography>
        <Divider/>
        <Box mt={2}>
          <Autocomplete
              renderInput={(params) => <TextField {...params} label="Type the user's name"/>}
              options={data?.users?? []}
              isOptionEqualToValue={(option, value) =>
                  option.id === value.id
              }
              getOptionLabel={(option) => option.email}
              loading={isLoading}
              value={selectedUser}
              onInputChange={(_: unknown, newValue: string | null) => newValue && setEmail(newValue)}
              onChange={(_: unknown, newValue: User | null) => handleSelectUser(newValue)}
          />
          <Box mt={4} display={"flex"} width={"100%"} justifyContent={"flex-end"}>
            <Button onClick={onClose} variant={"outlined"}>Cancel</Button>
            <Button disabled={!selectedUser || loading || isError || !!errorMessage} onClick={() => selectedUser && onShare(selectedUser?.id)} sx={{marginLeft: 2}} variant={"contained"}>Share</Button>
          </Box>
        </Box>
      </ModalWrapper>
  )
}
