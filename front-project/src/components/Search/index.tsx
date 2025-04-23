import { useEffect, useState } from "react";
import {
  SearchStyled,
  SearchInput,
  SearchIconBox,
  SearchOverlay,
} from "./styled";
import axios from "axios";
import { Post } from "@/features/Board";
import Cookies from "js-cookie";

type Props = {
  setSearchResult: (posts: Post[]) => void;
};

const Search = ({ setSearchResult }: Props) => {
  // 검색 키워드 저장
  const [query, setQuery] = useState("");
  // 돋보기 버튼 클릭 시 화면 변경
  const [showOverlay, setShowOverlay] = useState(false);

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
        const token = Cookies.get("accessToken");

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/search`,
          {
            params: { keyword },
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("검색결과 : ", res.data);
        const { ok, posts } = res.data;
        setSearchResult(posts);
      } catch (error) {
        console.error("검색오류 : ", error);
      }
    }
  };

  return (
    <SearchStyled>
      <div style={{ position: "relative" }}>
        <SearchIconBox>
          <i className="fa-solid fa-magnifying-glass"></i>
        </SearchIconBox>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => handleSearch(e)}
          placeholder="게시물 검색"
        />
      </div>
      {showOverlay && <SearchOverlay />}
    </SearchStyled>
  );
};

export default Search;
