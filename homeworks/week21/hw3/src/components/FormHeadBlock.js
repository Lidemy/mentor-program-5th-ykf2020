import React from "react";
import styled from "styled-components";

// styled components
const FormTitle = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: bold;
`;

const FormDesc = styled.p`
  margin-top: 32px;
  font-size: 14px;
  line-height: 1.5em;
`;

const FormNotice = styled.p`
  color: #e74149;
  font-size: 16px;
  margin-top: 20px;
`;

export default function FormHeadBlock() {
  return (
    <>
      <FormTitle>新拖延運動報名表單</FormTitle>
      <FormDesc>
        活動日期：2020/12/10 ~ 2020/12/11
        <br />
        活動地點：台北市大安區新生南路二段1號
      </FormDesc>
      <FormNotice>* 必填</FormNotice>
    </>
  );
}
