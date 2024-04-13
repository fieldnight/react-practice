//graphql로 로컬이미지 DB에 업로드, 회면에 나타내기 (간단!!)
/*원리: input type 파일로 파일 받아서 DB에 해당 파일 mutation으로 날림. 결과로 url 받아서 상태관리 함수에 저장한 후 jsx로 이미지 화면에 띄움.   */

import { useMutation } from "@apollo/client";
import { useState } from "react";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export default function ImgUploadPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onChangeFile = async (event) => {
    const file = event.target.files?.[0]; //옵셔널 체이닝. 파일이 없을 경우 배열을 0으로 처리하라! 배열이나 객체에도 옵셔널 체이닝을 붙일 수 있다.
    const result = await uploadFile({ variables: { file } });
    setImageUrl(result.data?.uploadFile.url ?? ""); //뮤테이션으로 받은 결과의 url을 useState에 담는다.
  };

  return (
    <>
      <input type="file" onChange={onChangeFile} multiple={true} />;
      <img src={`https://..${imageUrl}`} />
    </>
  );
  //브라우저에서 사용될 이미지 주소
}
//설명
//파일 타입으로 문서에서 파일 선택 창 & 버튼 생김
//onClick 대신 onChange 사용
//event.target.value 대신 files 사용
//여러개 선택 가능 => s, 항상 배열 형태

//추가사항
//yarn add apollo-upload-client
//@types/ .. 설치 필요
