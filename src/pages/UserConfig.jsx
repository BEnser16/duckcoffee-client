import React from "react";
import { Container, Image, Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../slice/userSlice";
import BaseUrl from "../service/BaseUrl";

const UserConfig = () => {
  const [userData, setUserData] = React.useState({});
  const [userImage, setUserImage] = React.useState(null);
  // const [userCloudImageUrl, setUserCloudImageUrl] = React.useState(null);
  const [userName, setUserName] = React.useState("");
  const [serverImgUrl, setServerImgUrl] = React.useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    console.log("userinfo in this", userInfo);
    if (userInfo) {
      axios
        .get(
          `${BaseUrl}/api/auth/member/get-by-email?email=${userInfo.user_email}`
        )
        .then((res) => {
          setUserData(res.data);
          setServerImgUrl(res.data.img)
          console.log("user data get by email", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const uploadImageToServer = async () => {
    const formData = new FormData();
    formData.append('file', userImage);

    try {
      const response = await axios.post(`${BaseUrl}/api/img/upload`, formData);
      console.log('圖傳到伺服器成功:', response.data);
      window.alert('圖片上傳成功');
      console.log('server url response.data:', BaseUrl + response.data );
      setServerImgUrl(BaseUrl + response.data);
    } catch (error) {
      console.error('圖片上傳失败:', error);
    }
  };

  const handleImageChange = (e) => {
    console.log("image changing");
    console.log("image change path: ", e.target.result);
    setUserImage(e.target.files[0]);
  };

  // const handleImageUpload = async () => {
  //   console.log("image uploading");
  //   const imgCloudUrl = await uploadToStorage(
  //     "usercontainer",
  //     userImage.name,
  //     userImage
  //   );
  //   if (imgCloudUrl == null) {
  //     console.log("upload failed");
  //   } else {
  //     setUserCloudImageUrl(imgCloudUrl);
  //   }
  //   console.log("imgCloudUrl: ", imgCloudUrl);
  // };

  const handleSaveConfig = () => {
    const newUserData = {
      user_name: userName,
      user_email: userData.email,
      user_token: userData.token,
      imageUrl: serverImgUrl,
    };
    dispatch(login(newUserData));
    console.log("new user data: ", newUserData);
    axios
      .put(
        `${BaseUrl}/api/auth/member/update-user?email=${newUserData.user_email}&userName=${newUserData.user_name}&userImg=${newUserData.imageUrl}`
      )
      .then((res) => {
        window.alert("用戶資料更新成功");
        console.log("update user data success", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container className="mt-3" style={{ minHeight: "80vh" }}>
        <h3>用戶設定</h3>
        {userData && (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <Row className="col-6 mb-5">
              
              <Col>
                {serverImgUrl !== null && (
                  <Image
                    style={{ maxHeight: 250, maxWidth: 250 }}
                    src={serverImgUrl}
                    alt="user avatar"
                    roundedCircle
                  />
                )}
                {serverImgUrl === null && (
                  <Image src="https://via.placeholder.com/150" alt="default avatar" roundedCircle />
                )}
              </Col>

              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>上傳頭像</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>
                <Button variant="primary" className="mt-2" onClick={() => uploadImageToServer()}>
                  上傳新圖片
                </Button>
              </Col>
            </Row>

            <Form className="col-6">
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  用戶名稱
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    defaultValue={userData.name}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  電子郵件
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={userData.email}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Col sm="10">
                  <Button variant="success" className="mt-5" onClick={() => handleSaveConfig()}>
                    儲存設定
                  </Button>
                  
                </Col>
              </Form.Group>
            </Form>
          </div>
        )}
        {userData == null && <h3>用戶資料不存在</h3>}
      </Container>
    </>
  );
};

export default UserConfig;
