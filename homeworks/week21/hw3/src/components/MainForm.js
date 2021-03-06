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
      alert(`?????????${
        formValues.find((input) => input.name === "nickname").value
      }
        ???????????????${formValues.find((input) => input.name === "email").value}
        ???????????????${formValues.find((input) => input.name === "phone").value}
        ???????????????${
          formValues.find((input) => input.name === "type").value === 1
            ? "??????????????????????????????"
            : "?????????????????????????????????"
        }
        ??????????????????????????????${
          formValues.find((input) => input.name === "knowing").value
        }
        ?????????${
          formValues.find((input) => input.name === "suggestion").value
            ? formValues.find((input) => input.name === "suggestion").value
            : "???"
        }`);

      setIsPass(false);
      window.location.reload();
    }
  }, [isPass, formValues, setIsPass]);

  return (
    <ApplyForm onSubmit={handleSubmit}>
      <InputBlock>
        <InputTitle $required>??????</InputTitle>
        <Input
          value={formValues.find((value) => value.name === "nickname").value}
          name="nickname"
          type="text"
          onChange={handleValueChange}
        />
        {formValues.find((input) => input.name === "nickname").error ===
          "no" && <ErrorMessage>?????????????????????</ErrorMessage>}
      </InputBlock>
      <InputBlock>
        <InputTitle $required>????????????</InputTitle>
        <Input
          value={formValues.find((value) => value.name === "email").value}
          name="email"
          type="email"
          onChange={handleValueChange}
        />
        {formValues.find((input) => input.name === "email").error === "no" && (
          <ErrorMessage>?????????????????????</ErrorMessage>
        )}
      </InputBlock>
      <InputBlock>
        <InputTitle $required>????????????</InputTitle>
        <Input
          value={formValues.find((value) => value.name === "phone").value}
          name="phone"
          type="tel"
          pattern="^[0-9-+\s()]*$"
          onChange={handleValueChange}
        />
        {formValues.find((input) => input.name === "phone").error === "no" && (
          <ErrorMessage>?????????????????????</ErrorMessage>
        )}
      </InputBlock>
      <InputBlock>
        <InputTitle $required>????????????</InputTitle>
        <InputLabel>
          <Input
            name="type"
            value="1"
            type="radio"
            onChange={handleValueChange}
          />
          ??????????????????????????????
        </InputLabel>
        <InputLabel>
          <Input
            name="type"
            value="2"
            type="radio"
            onChange={handleValueChange}
          />
          ?????????????????????????????????
        </InputLabel>
        {formValues.find((input) => input.name === "type").error === "no" && (
          <ErrorMessage>?????????????????????</ErrorMessage>
        )}
      </InputBlock>
      <InputBlock>
        <InputTitle $required>??????????????????????????????</InputTitle>
        <Input
          value={formValues.find((value) => value.name === "knowing").value}
          name="knowing"
          type="text"
          onChange={handleValueChange}
        />
        {formValues.find((input) => input.name === "knowing").error ===
          "no" && <ErrorMessage>?????????????????????</ErrorMessage>}
      </InputBlock>
      <InputBlock>
        <InputTitle>??????</InputTitle>
        <InputDesc>????????????????????????</InputDesc>
        <Input
          value={formValues.find((value) => value.name === "suggestion").value}
          name="suggestion"
          type="text"
          onChange={handleValueChange}
        />
      </InputBlock>
      <SubmitButton type="submit">??????</SubmitButton>
      <SubmitDesc>???????????????????????????????????????</SubmitDesc>
    </ApplyForm>
  );
}
