import { useEffect, useState } from "react";
import { SearchStyled, SearchInput, SearchIconBox } from "./styled";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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
      } catch (error) {
        console.error("검색 오류 : ", error);
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
