import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { UilUserCircle, UilTimes, UilAngleLeftB } from '@iconscout/react-unicons'
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from "../../imgs/logobackup.jpg"
import { useContext } from 'react';
import { Context } from '../../Context/Context';
import axios from 'axios';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  padding: "2rem",
  "border-radius": "8px",
};


export default function LoginModal() {
  const handleOpen = () => context.setOpen(true);
  const handleClose = () => {
    context.setOpen(false);
    setRegister(false);
    setResetPassword(false);
  };

  const [register, setRegister] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const [errorLoginUserName, setErrorLoginUserName] = useState("");
  const [errorLoginPassword, setErrorLoginPassword] = useState("");
  const [errFullName, setErrFullName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errSDT, setErrSDT] = useState("");
  const [errLocation, setErrLocation] = useState("");
  const [errPasswordConFirm, setErrPasswordConfirm] = useState("");
  const [errEmailReset, setErrEmailReset] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8081/forget/password")
      .then(res => context.setForget(res.data))
      .catch(err => alert("Hệ thống đang gặp lỗi"))
    axios.get("http://localhost:8081/user/customers/infor")
      .then(res => context.setCustomerInfor(res.data))
      .catch(err => alert("Hệ thống đang gặp lỗi"))
  }, [])
  console.log("Lỗi");
  return (
    <>
      <div className='itemCustomer' onClick={handleOpen}>
        <UilUserCircle className="iconRight-content" />
      </div>
      <Modal
        open={context.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {resetPassword ? uiResetPassword(handleClose, setResetPassword, setErrEmailReset, errEmailReset, context.forget) :
            Login(handleClose, setRegister, register, setResetPassword, context.setIsLogin, navigate, setErrorLoginUserName, setErrorLoginPassword, setErrFullName, setErrEmail, setErrLocation, setErrSDT, setErrPasswordConfirm, errFullName, errEmail, errSDT, errLocation, errorLoginUserName, errorLoginPassword, errPasswordConFirm, context.forget, context.customerInfor)}
        </Box>
      </Modal>
    </>
  );
}


// Đăng nhập =================================//
const Login = (handleClose, setRegister, register, setResetPassword, setIsLogin, navigate, setErrorLoginUserName, setErrorLoginPassword, setErrFullName, setErrEmail, setErrLocation, setErrSDT, setErrPasswordConfirm, errFullName, errEmail, errSDT, errLocation, errorLoginUserName, errorLoginPassword, errPasswordConFirm, forget, customerInfor) => {
  return (
    <div className="containerLogin">
      <div className="leftLogin">
        <div className="navLogin">
          <button className='btn-loginController'
            style={{
              color: !register ? "#000" : "#6b7280"
            }} onClick={() => setRegister(false)}>Đăng nhập</button>
          <button className='btn-registerController'
            style={{
              color: register ? "#000" : "#6b7280"
            }}
            onClick={() => setRegister(true)}>Đăng ký</button>
        </div>
        {!register ? inputLogin(setResetPassword, setIsLogin, navigate, setErrorLoginUserName, setErrorLoginPassword, errorLoginUserName, errorLoginPassword) :
          inputRegister(setIsLogin, setErrorLoginUserName, setErrorLoginPassword, setErrFullName, setErrEmail, setErrLocation, setErrSDT, setErrPasswordConfirm, errFullName, errEmail, errSDT, errLocation, errorLoginUserName, errorLoginPassword, errPasswordConFirm, customerInfor, forget)}
      </div>
      <div className="rightLogin">
        <div style={{
          alignSelf: 'flex-end', cursor: 'pointer',
        }} onClick={handleClose}>
          <UilTimes />
        </div>
        {
          register ? <img style={{
            margin: "auto"
          }} src="https://cdn.divineshop.vn/static/235dccb09069e3d4eebc6227236f9dc2.svg" alt="" />
            : <img src="https://cdn.divineshop.vn/static/368e705d45bfc8742aa9d20dbcf4c78c.svg" alt="" />
        }

      </div>
    </div>

  )
}

// Input của đăng nhập ==================================//



function inputLogin(setResetPassword, setIsLogin, navigate, setErrorLoginUserName, setErrorLoginPassword, errorLoginUserName, errorLoginPassword) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const userName = document.getElementById("username").value
    const password = document.getElementById("password").value
    if (!userName) {
      setErrorLoginUserName("Vui lòng nhập username")
      console.log(errorLoginUserName);
    }
    if (!password) {
      setErrorLoginPassword("Vui lòng nhập password")
    }
    if (userName && password) {
      const user = {
        userName,
        password
      }
      axios.post("http://localhost:8081/login", user)
        .then(res => {
          if (!res.data) {
            //setErrorLoginUserName("Tài khoản hoặc mật khẩu không chính xác");
            setErrorLoginPassword("Tài khoản hoặc mật khẩu không chính xác");
          }
          else {
            setIsLogin(res.data);
            if (!res.data.customerDTO) {
              if (res.data.authorizedDetailDTOs.length === 0) {
                alert("Tài khoản của bạn chưa được cấp quyền. Vui lòng gặp quản lý để yêu cầu thêm quyền")
                setIsLogin(null);
              }
              else {
                const quyen = res.data.authorizedDetailDTOs.find((item) => !item.dateEnd && item.displayId === "none")
                console.log("quyen",quyen);
                if (quyen) {
                  alert("Tài khoản này đã bị khóa")
                  setIsLogin(null);
                }
                else {
                  const conQuyen = res.data.authorizedDetailDTOs.filter(item => {
                    const dateE = new Date(item.dateEnd);
                    const dateN = new Date();
                    return dateE > dateN || item.displayId === "admin";
                  })

                  if (conQuyen.length === 0) {
                    alert("Quyền của tài khoản này đã hết hạn. Liên hệ quản lý để xin cấp quyền!")
                    setIsLogin(null);
                  }
                  else {
                    navigate("/admin")
                  }
                }
              }
            }
            document.getElementById("username").value = ""
            document.getElementById("password").value = ""
          }

        })
        .catch(error => console.log(error));
    }

  }
  return (
    <>
      <div className="fe">
        <p>Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích và nhận nhiều ưu đãi hấp dẫn</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputLogin">
          <input type="text" name='username' id='username' placeholder='Tên đăng nhập' onFocus={() => setErrorLoginUserName("")} />
          {console.log("Long", errorLoginUserName)}
          <span className='error-message'>{errorLoginUserName}</span>
        </div>
        <div className="inputLogin">
          <input type="password" name='password' id='password' placeholder='Mật khẩu' onFocus={() => setErrorLoginPassword("")} />
          <span className='error-message'>{errorLoginPassword}</span>
        </div>
        <span className='linkForgetPassword' onClick={() => setResetPassword(true)}>Bạn quên mật khẩu</span>
        <button type='submit' className='btn-Login'>Đăng nhập</button>
      </form>
      <div className="or">
        <hr className="bar" />
        <span>Hoặc đăng nhập bằng</span>
        <hr className="bar" />
      </div>
      <div className="footerLogin">
        <img src="https://cdn.divineshop.vn/static/0b314f30be0025da88c475e87a222e5a.svg" alt="" />
        <img src="https://cdn.divineshop.vn/static/4ba68c7a47305b454732e1a9e9beb8a1.svg" alt="" />
      </div>
    </>
  )
}

// Input của đăng ký ========================================//
function inputRegister(setIsLogin, setErrorLoginUserName, setErrorLoginPassword, setErrFullName, setErrEmail, setErrLocation, setErrSDT, setErrPasswordConfirm, errFullName, errEmail, errSDT, errLocation, errorLoginUserName, errorLoginPassword, errPasswordConFirm, customerInfor, forget) {
  const handleSubmit = (event) => {
    event.preventDefault();
    var submit = true
    const userName = document.getElementById("usernameR").value
    const password = document.getElementById("passwordR").value
    const passwordConfirm = document.getElementById("password-confirm").value
    const fullname = document.getElementById("fullname").value
    const index = fullname.lastIndexOf(" ");
    const firstName = fullname.slice(0, index)
    const lastName = fullname.slice(index + 1)
    const email = document.getElementById("email").value
    const numberPhone = document.getElementById("phoneNumber").value
    const location = document.getElementById("location").value
    if (!fullname) {
      setErrFullName("Vui lòng nhận họ và tên")
      submit = false
    }
    else if (!/^[\p{L}\s_-]+$/u.test(fullname)) {
      setErrFullName("Họ tên chỉ chứa chữ")
      submit = false;
    }
    if (!email) {
      setErrEmail("Vui lòng nhập email")
      submit = false
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrEmail("Email không hợp lệ")
      submit = false
    }
    else if (customerInfor.find(item => item.email === email)) {
      setErrEmail("Email đã được sử dụng")
      submit = false
    }
    if (!numberPhone) {
      setErrSDT("Vui lòng nhập số điện thoại")
      submit = false
    }
    else if (!/^[0-9]+$/.test(numberPhone)) {
      setErrSDT("Số điện thoại chỉ chứa số")
      submit = false
    }
    else if (numberPhone.length !== 10) {
      setErrSDT("Số điện thoại gồm 10 chữ số")
      submit = false
    }
    else if (customerInfor.find(item => item.numberPhone === numberPhone)) {
      setErrSDT("Số điện thoại này đã có người sử dụng.")
      submit = false;
    }
    if (!location) {
      setErrLocation("Vui lòng nhập địa chỉ")
      submit = false
    }
    if (!userName) {
      setErrorLoginUserName("Vui long nhập tên đăng nhập")
      submit = false
    }
    else if (forget.find(item => item.userName === userName)) {
      setErrorLoginUserName("Tên tài khoản đã được sử dụng.")
      submit = false
    }
    if (!password) {
      setErrorLoginPassword("Vui lòng nhập mật khẩu")
      submit = false
    }
    else if (password.length < 6) {
      setErrorLoginPassword("Mật khẩu phải có ý nhất 6 ký tự")
      submit = false
    }
    if (!passwordConfirm) {
      setErrPasswordConfirm("Vui lòng nhập  lại mật khẩu")
      submit = false
    }
    else if (password !== passwordConfirm) {
      setErrPasswordConfirm("Mật khẩu không khớp")
      submit = false
    }
    if (submit) {
      const customer = {
        firstName,
        lastName,
        email,
        numberPhone,
        location
      }

      const data = {
        userName,
        password,
        "customerDTO": customer,
      }

      axios.post("http://localhost:8081/register", data)
        .then((res) => {
          setIsLogin(res.data);
          document.getElementById("usernameR").value = "";
          document.getElementById("passwordR").value = "";
          document.getElementById("password-confirm").value = ""
          document.getElementById("fullname").value = ""
          document.getElementById("email").value = ""
          document.getElementById("phoneNumber").value = ""
          document.getElementById("location").value = ""
          alert("Đăng ký thành công.")
        })
        .catch((err) => console.log(err))
    }


  }
  return (
    <>
      <div className="fe">
        <p>Đăng ký để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích và nhận nhiều ưu đãi hấp dẫn</p>
      </div>
      <form id='form-register' onSubmit={handleSubmit}>
        <div className="inputLogin">
          <input type="text" id="fullname" placeholder='Họ và tên' onFocus={() => setErrFullName("")} />
          <span className='error-message'>{errFullName}</span>
        </div>
        <div className="inputLogin">
          <input type="text" id='email' placeholder='Email' onFocus={() => setErrEmail("")} />
          <span className='error-message'>{errEmail}</span>
        </div>
        <div className="inputLogin">
          <input type="text" id='phoneNumber' placeholder='Số điện thoại' onFocus={() => setErrSDT("")} />
          <span className='error-message'>{errSDT}</span>
        </div>
        <div className="inputLogin">
          <input type="text" id='location' placeholder='Địa chỉ' onFocus={() => setErrLocation("")} />
          <span className='error-message'>{errLocation}</span>
        </div>
        <div className="inputLogin">
          <input type="text" name='usernameR' id='usernameR' placeholder='Tên đăng nhập' onFocus={() => setErrorLoginUserName("")} />
          <span className='error-message'>{errorLoginUserName}</span>
        </div>
        <div className="inputLogin">
          <input type="password" name='passwordR' id="passwordR" placeholder='Mật khẩu' onFocus={() => setErrorLoginPassword("")} />
          <span className='error-message'>{errorLoginPassword}</span>
        </div>
        <div className="inputLogin">
          <input type="password" id='password-confirm' placeholder='Nhập lại mật khẩu' onFocus={() => setErrPasswordConfirm("")} />
          <span className='error-message'>{errPasswordConFirm}</span>
        </div>
        <div className="agree">
          <input type="checkbox" id='cb-agrree' />
          <p>Tôi đồng ý nhận thông tin marketing từ tiệm tỏa hương</p>
        </div>
        <button type='submit' className='btn-Login'>Tạo tài khoản</button>
      </form>
      <div className='underRegister'>
        <p>Khi bấm <strong>Tạo tài khoản</strong>, bạn đã đồng ý với <strong>Điều khoản dịch vụ của tiệm tỏa hương</strong></p>
      </div>
    </>
  )
}

// ĐỔi mật khẩu ==========================================//
function uiResetPassword(handleClose, setResetPassword, setErrEmail, errEmail, forget) {
  const handleReset = () => {
    const data = document.getElementById("forgetPassword").value;
    const check = forget.find(item => item.userName === data || item.email === data);
    if (check) {
      axios.put("http://localhost:8081/forget/password/" + data)
        .then(res => {
          alert("Mật khẩu mới đã được gửi qua emil.")
          handleClose();
        })
        .catch(err => alert("Hệ thống đang bị lỗi vui lòng chờ trong giây lát."))
    }
    else {
      setErrEmail("Email hoặc tên tài khoản không tồn tại")
    }
  }
  return (
    <div className="containerLogin">
      <div className="leftLogin">
        <div className="navLogin">
          <h3>Đặt lại mật khẩu</h3>
        </div>
        <div className="fe">
          <p>Bạn vui lòng hoàn tất các thông tin xác thực bên dưới để chúng tôi đặt lại mật khẩu cho tài khoản của bạn</p>
        </div>
        <form>
          <div className="inputLogin">
            <input type="text" id='forgetPassword' onFocus={() => setErrEmail("")} placeholder='Email hoặc tên đăng nhập' />
            <span className='error-message'>{errEmail}</span>
          </div>
          <button type='button' className='btn-Login' onClick={handleReset}>Đặt lại mật khẩu</button>
        </form>
        <div className="rollBack" onClick={() => setResetPassword(false)}>
          <UilAngleLeftB />
          <span className='linkForgetPassword'>Quay lại trang đăng nhập</span>
        </div>

      </div>
      <div className="rightLogin">
        <div style={{
          alignSelf: 'flex-end', cursor: 'pointer',
        }} onClick={handleClose}>
          <UilTimes />
        </div>
        <img src="https://cdn.divineshop.vn/static/c92dc142033ca6a66cda62bc0aec491b.svg" alt="" />
      </div>
    </div>
  )
}
