import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Grid, Text, Input, NextPageButton } from "@components/elements";
import useForm from "@/hooks/useForm";
import { updateUserPwd } from "@/api/userApi";
import useFormInputStore from "@/store/useFormInputStore";
import { ChangePwValidation } from "@/util/validation";
import { errorAlert } from "@/util/notificationAlert";
import axios from "axios";

const ChangePwPage = () => {
  const navigate = useNavigate();
  const { clearInputs, inputs, updateInputs } = useFormInputStore();
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: { newPassword: "", newPasswordConfirm: "" },
    onSubmit: (values) => {
      // const data = {
      //   phoneNumber: inputs.phoneNumber,
      //   verifyCode: inputs.verifyCode,
      //   newPassword: values.newPassword,
      //   newPasswordConfirm: values.newPasswordConfirm,
      //   memberId: inputs.memberId,
      //   memberName: inputs.memberName,
      //   verifyCode: inputs.verifyCode,
      // };
      const data = {
        ...inputs,
        newPassword: values.newPassword,
        newPasswordConfirm: values.newPasswordConfirm,
      };
      console.log(data);
      //FIXME - 서버 403 forbidden
      // updateUserPwd(
      //   "find",
      //   {
      //     phoneNumber: "01012345623",
      //     verifyCode: inputs.verifyCode + "",
      //     memberName: "남도일",
      //     memberId: "wlstjq",
      //     newPassword: "test1234",
      //     newPasswordConfirm: "test1234",
      //   },
      //   (response) => {
      //     if (response.status === 200) {
      //       clearInputs();
      //       navigate("/", { replace: true });
      //     }
      //   },
      //   (error) => {
      //         console.log(error.toJSON());
      //     errorAlert(error.response.data);
      //   }
      // );
      // axios
      //   .put(
      //     "https://i11b305.p.ssafy.io/api/v1/app/members/password-not-login",
      //     {
      //       phoneNumber: "01012345623",
      //       verifyCode: "565825",
      //       memberName: "남도일",
      //       memberId: "wlstjq",
      //       newPassword: "test1234",
      //       newPasswordConfirm: "test1234",
      //     }
      //   )
      //   .then((respnse) => {
      //     console.log(respnse);
      //   })
      //   .catch((err) => console.log(err));
    },
    validate: ChangePwValidation,
  });

  const [isTextOnce, setIsTextOnce] = useState(false);
  useEffect(() => {
    if (isTextOnce != (Object.keys(errors).length !== 0)) setIsTextOnce(true);
  }, [errors]);
  return (
    <>
      <Grid
        $display="flex"
        $width="100vw"
        $padding="100px 4px"
        $flex_direction="column"
        $align_items="center"
        $gap="2rem"
      >
        <TextBox>
          <Text
            children="새 비밀번호를 입력해주세요"
            $color="var(--gray-color-300)"
          />
        </TextBox>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <Input
            $name="newPassword"
            $placeholder="영대소문, 숫자를 포함한 8~20자"
            $value={values.newPassword}
            _onChange={handleChange}
            $label="새 비밀번호*"
            $haveToCheckValid={true}
            $type="password"
            $errorMessage={errors.newPassword}
            $isValid={errors.newPassword && false}
          />
          <Input
            $name="newPasswordConfirm"
            $placeholder="새 비밀번호를 다시 입력해주세요"
            $value={values.newPasswordConfirm}
            _onChange={handleChange}
            $label="새 비밀번호 확인*"
            $haveToCheckValid={true}
            $errorMessage={errors.newPasswordConfirm}
            $isValid={errors.newPasswordConfirm && false}
            $type="password"
          />
        </StyledForm>
      </Grid>
      <NextPageButton
        isError={isTextOnce != (Object.keys(errors).length === 0)}
        text="변경하기"
        handleClick={handleSubmit}
        $color={{ default: "var(--white-color-100)" }}
      />
    </>
  );
};

export default ChangePwPage;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 1rem;
`;
