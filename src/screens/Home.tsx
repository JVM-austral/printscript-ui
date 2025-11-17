import {withNavbar} from "../components/navbar/withNavbar.tsx";
import {SnippetTable} from "../components/snippet-table/SnippetTable.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SnippetDetail} from "./SnippetDetail.tsx";
import {Drawer} from "@mui/material";
import {useGetSnippets} from "../utils/queries.tsx";
import {usePaginationContext} from "../contexts/paginationContext.tsx";
import useDebounce from "../hooks/useDebounce.ts";

const HomeScreen = () => {
  const {id: paramsId} = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [snippetName, setSnippetName] = useState('');
  const [snippetId, setSnippetId] = useState<string | null>(null)
  const {page, page_size, count, handleChangeCount} = usePaginationContext()
  const {data, isLoading, isError} = useGetSnippets(page, page_size, snippetName)

  useEffect(() => {
    if (data?.pagination.count && data.pagination.count != count) {
      handleChangeCount(data.pagination.count)
    }
  }, [count ,data?.pagination, handleChangeCount]);


  useEffect(() => {
    if (paramsId) {
      setSnippetId(paramsId);
    }
  }, [paramsId]);

  const handleCloseModal = () => setSnippetId(null)

  // DeBounce Function
  useDebounce(() => {
        setSnippetName(
            searchTerm
        );
      }, [searchTerm], 800
  );

  const handleSearchSnippet = (snippetName: string) => {
    setSearchTerm(snippetName);
  };

  return (
      <div>
      {!isError &&
          <>
              <SnippetTable loading={isLoading} handleClickSnippet={setSnippetId} snippets={data?.snippets}
                          handleSearchSnippet={handleSearchSnippet}/><Drawer open={!!snippetId} anchor={"right"}
                                                                              onClose={handleCloseModal}>
              {snippetId && <SnippetDetail handleCloseModal={handleCloseModal} id={snippetId}/>}
          </Drawer>
          </>}
          {isError && <div>Error loading snippets.</div>}
      </div>
  )
}

export default withNavbar(HomeScreen);

