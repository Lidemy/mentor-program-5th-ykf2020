import React, { useState, useEffect } from "react";
import styled from "styled-components";
const ApplyForm = styled.form``;

const InputTitle = styled.div`
  font-size: 20px;

  &:after {
    ${(props) =>
      props.$required &&
      `
      content:"*";
      color: #e74149;
      margin-left: 4px;
    `}
  }
`;

const InputDesc = styled.div`
  font-size: 14px;
  margin-top: 8px;
`;

const Input = styled.input`
  font-size: 16px;
  margin-top: 20px;
  border: 1px solid #d0d0d0;
  padding: 8px;
`;

const InputBlock = styled.div`
  margin-top: 55px;
`;

const InputLabel = styled.label`
  display: block;
`;

const SubmitButton = styled.button`
  background: #fad312;
  font-size: 15px;
  padding: 12px 32px;
  margin-top: 48px;
  border: none;
  border-radius: 4px;
`;

const SubmitDesc = styled.p`
  margin-top: 32px;
  font-size: 14px;
  line-height: 1.5em;
`;

const ErrorMessage = styled.p`
  color: red;
`;
const initialFormValues = [
  {
    name: "nickname",
    required: true,
    value: "",
    error: "init",
  },
  {
    name: "email",
    required: true,
    value: "",
    error: "init",
  },
  {
    name: "phone",
    required: true,
    value: "",
    error: "init",
  },
  {
    name: "type",
    required: true,
    value: "",
    error: "init",
  },
  {
    name: "knowing",
    required: true,
    value: "",
    error: "init",
  },
  {
    name: "suggestion",
    required: false,
    value: "",
  },
];

export default function MainForm({ isPass, setIsPass }) {
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleValueChange = (e) => {
    setFormValues(
      formValues.map((input) => {
        if (input.name !== e.target.getAttribute("name")) return input;
        return {
          ...input,
          value: e.target.value,
        };
      })
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues(
      formValues.map((input) => {
        if (input.required === true && input.value === "") {
          return {
            ...input,
            error: "no",
          };
        } else {
          return {
            ...input,
            error: "pass",
          };
        }
      })
    );
  };

  useEffect(() => {
    if (
      formValues.find(
        (input) =>
          input.error === "no" ||
          input.error === "invalid" ||
          input.error === "init"
      ) !== undefined
    ) {
      setIsPass(false);
    } else {
      setIsPass(true);
    }
  }, [formValues, setIsPass]);

  useEffect(() => {
    if (isPass) {
      alert(`暱稱：${
        formValues.find((input) => input.name === "nickname").value
      }
        電子郵件：${formValues.find((input) => input.name === "email").value}
        手機號碼：${formValues.find((input) => input.name === "phone").value}
        報名類型：${
          formValues.find((input) => input.name === "type").value === 1
            ? "躺在床上用想像力實作"
            : "趴在地上滑手機找現成的"
        }
        怎麼知道這個活動的：${
          formValues.find((input) => input.name === "knowing").value
        }
        其他：${
          formValues.find((input) => input.name === "suggestion").value
            ? formValues.find((input) => input.name === "suggestion").value
            : "無"
        }`);

      setIsPass(false);
      window.location.reload();
    }
  }, [isPass, formValues, setIsPass]);

  return (
    <ApplyForm onSubmit={handleSubmit}>
      <InputBlock>
        <InputTitle $required>暱稱</InputTitle>
        <Input
          value={formValues.find((value) => value.name === "nickname").value}
          name="nickname"
          type="text"
          onChange={handleValueChange}
        />
        {formValues.find((input) => input.name === "nickname").error ===
          "no" && <ErrorMessage>此欄為必填項目</ErrorMessage>}
      </InputBlock>
      <InputBlock>
        <InputTitle $required>電子郵件</InputTitle>
        <Input
          value={formValues.find((value) => value.name === "email").value}
          name="email"
          type="email"
          onChange={handleValueChange}
        />
        {formValues.find((input) => input.name === "email").error === "no" && (
          <ErrorMessage>此欄為必填項目</ErrorMessage>
        )}
      </InputBlock>
      <InputBlock>
        <InputTitle $required>手機號碼</InputTitle>
        <Input
          value={formValues.find((value) => value.name === "phone").value}
          name="phone"
          type="tel"
          pattern="^[0-9-+\s()]*$"
          onChange={handleValueChange}
        />
        {formValues.find((input) => input.name === "phone").error === "no" && (
          <ErrorMessage>此欄為必填項目</ErrorMessage>
        )}
      </InputBlock>
      <InputBlock>
        <InputTitle $required>報名類型</InputTitle>
        <InputLabel>
          <Input
            name="type"
            value="1"
            type="radio"
            onChange={handleValueChange}
          />
          躺在床上用想像力實作
        </InputLabel>
        <InputLabel>
          <Input
            name="type"
            value="2"
            type="radio"
            onChange={handleValueChange}
          />
          趴在地上滑手機找現成的
        </InputLabel>
        {formValues.find((input) => input.name === "type").error === "no" && (
          <ErrorMessage>此欄為必填項目</ErrorMessage>
        )}
      </InputBlock>
      <InputBlock>
        <InputTitle $required>怎麼知道這個活動的？</InputTitle>
        <Input
          value={formValues.find((value) => value.name === "knowing").value}
          name="knowing"
          type="text"
          onChange={handleValueChange}
        />
        {formValues.find((input) => input.name === "knowing").error ===
          "no" && <ErrorMessage>此欄為必填項目</ErrorMessage>}
      </InputBlock>
      <InputBlock>
        <InputTitle>其他</InputTitle>
        <InputDesc>對活動的一些建議</InputDesc>
        <Input
          value={formValues.find((value) => value.name === "suggestion").value}
          name="suggestion"
          type="text"
          onChange={handleValueChange}
        />
      </InputBlock>
      <SubmitButton type="submit">提交</SubmitButton>
      <SubmitDesc>請勿透過表單送出您的密碼。</SubmitDesc>
    </ApplyForm>
  );
}
