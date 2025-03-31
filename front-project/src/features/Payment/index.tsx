import { PaymentPadding, PaymentStyled, PaymentTop } from "./styled";

const Payment = () => {
  return (
    <PaymentPadding>
      <PaymentStyled>
        <PaymentTop>
          <div>🐾 파워 유저권으로 우리 아이에게 더 많은 친구를!</div>
          <div>반려동물과 함께하는 행복한 만남, 지금 시작하세요!🐶🐾</div>
          <div>
            <div></div>
          </div>
          <p>
            💜 파워 유저 혜택
            <p>🏡 위치 기반으로 우리 아이와 가까운 친구들을 만날 수 있어요! </p>
            <p>🏞️ 산책 친구, 놀이 친구, 소중한 인연을 이어가세요! </p>
            <p>
              🐾무료 이용자는 3번까지만 매칭 가능! 더 많은 댕댕이 친구들을
              만나고 싶다면 파워 유저권을 이용해 보세요!🐶
            </p>
            <p></p>
          </p>
          <p>
            🎉 프로모션 할인 중! 지금 가입하면 더 저렴한 가격에 이용할 수
            있어요!
          </p>
          <p>우리 아이가 새로운 친구를 만나게 해주세요! 💕</p>
        </PaymentTop>
      </PaymentStyled>
    </PaymentPadding>
  );
};

export default Payment;
