import { useEffect, useState } from "react";
import { SearchStyled, SearchInput, SearchIconBox } from "./styled";
import axios from "axios";
import { Post } from "@/features/Board";

type Props = {
  setSearchResult: (posts: Post[]) => void;
};

const Search = ({ setSearchResult }: Props) => {
  const [query, setQuery] = useState("");

  // useEffect(() => {

  // }, [query])

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setQuery(e.target.value);

    if (keyword.trim().length >= 2) {
      try {
        const res = await axios.get(`http://localhost:5000/posts/search`, {
          params: { keyword },
          withCredentials: true,
        });
        console.log("검색결과 : ", res.data);
        const { ok, posts } = res.data;
        setSearchResult(posts);
      } catch (error) {
        console.error("검색오류 : ", error);
      }
    }
  };

  return (
    <SearchStyled>
      <div>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <SearchIconBox>
        <i className="fa-solid fa-magnifying-glass"></i>
      </SearchIconBox>
    </SearchStyled>
  );
};

export default Search;
