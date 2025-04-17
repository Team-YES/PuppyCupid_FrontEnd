import { useEffect } from "react";
import { KakaoShareStyle } from "./styled";

declare global {
  interface Window {
    Kakao: any;
  }
}

type KakaoShareProps = {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
};

const KakaoShare = ({ title, description, imageUrl, url }: KakaoShareProps) => {
  const KAKAO_SDK_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_SDK_KEY);
    }
  }, [KAKAO_SDK_KEY]);

  const shareToKakao = ({
    title,
    description,
    imageUrl,
    url,
  }: {
    title: string;
    description: string;
    imageUrl: string;
    url: string;
  }) => {
    if (!window.Kakao) return;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <KakaoShareStyle>
      <i
        className="fa-solid fa-share-nodes"
        onClick={() => shareToKakao({ title, description, imageUrl, url })}
        style={{ cursor: "pointer" }}
      />
    </KakaoShareStyle>
  );
};

export default KakaoShare;
