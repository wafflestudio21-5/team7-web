import { waffleCafe, useCafeInfo } from "../../../API/CafeAPI";

//사용 예시라, 간단하게 적었습니다.

const CafeInfo = () => {
  const { memberCount, articleCount } = useCafeInfo();

  return (
    <>
      <div>{waffleCafe.name}</div>
      <div>{waffleCafe.url}</div>
      <div>{waffleCafe.manager}</div>
      <div>{waffleCafe.createdAt}</div>
      <div>{waffleCafe.location}</div>
      <div>{waffleCafe.description}</div>
      <div>{memberCount}</div>
      <div>{articleCount}</div>
    </>
  );
};

export default CafeInfo;
