/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const dialog = css`
  border: 0;
  border-radius: 20px;
  animation-name: show;
  animation-duration: 0.5s;
  outline: none;
  position: relative;
  background-color: #fffbfb;

  &::backdrop {
    background-color: #969696;
    opacity: 0.5;
  }

  @keyframes show {
    0% {
      transform: translate(0, 800px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

const SHARE_REG_API = () => {
  return `https://www.share42-together.com/api/common/usage/0`;
};

function UserHomeSpeedDial() {
  const navigate = useNavigate();
  const dialogRef = React.useRef<HTMLDialogElement | any>({});
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;
  const [termsContent, setTermsContent] = React.useState<string[]>([]);

  React.useEffect(() => {
    axios({
      method: "GET",
      url: SHARE_REG_API(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res: any) => {
        const lst = res.data.message[0].content.split("\r\n");
        setTermsContent(lst.slice(0, lst.length - 1));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Box
      sx={{
        height: 320,
        flexGrow: 1,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        icon={
          <SpeedDialIcon
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              backgroundColor: "#FFABAB",
            }}
          />
        }
        onClick={() => {
          dialogRef?.current.showModal();
        }}
      ></SpeedDial>
      <dialog
        ref={(ref) => {
          return (dialogRef.current = ref);
        }}
        css={dialog}
        style={{
          textAlign: 'center'
        }}
      >
        <h1>HOW TO 공유등록?</h1>
        <button
          onClick={() => {
            (dialogRef.current as any).close();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            border: 'none',
            backgroundColor: '#ffffff'
          }}
        >
          X
        </button>
        <ul
          style={{
            textAlign: 'left',
            paddingLeft: '20px'
          }}
        >
          {termsContent.map((term, index) => (
            <li 
              style={{
                listStyleType: 'dicimal'
              }}
            key={index}>{term}</li>
          ))}
        </ul>
        <button
          style={{
            padding: '3% 6%',
            fontWeight: '900',
            color: '#ffffff',
            backgroundColor: '#FFABAB',
            border: 'none',
            borderRadius: '12px'
          }}
          onClick={() => navigate("/user/share-category")}
        >
          공유 등록하기
        </button>
      </dialog>
    </Box>
  );
}

export default UserHomeSpeedDial;
