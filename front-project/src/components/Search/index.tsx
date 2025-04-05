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

  // 검색 기능
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setQuery(keyword);
    // 입력이 비어있으면 검색 결과 초기화
    if (keyword.trim() === "") {
      setSearchResult([]);
      return;
    }
    // 글자 수가 2이상일 때 검색 요청
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
