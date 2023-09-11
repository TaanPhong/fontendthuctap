import React, { useContext, useState } from 'react'
import { Context } from '../../Context/Context';
import Modal from '@mui/material/Modal';
import { UilTimes } from '@iconscout/react-unicons'
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import axios from 'axios';

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

const UpdateFace = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [imageUrl, setImageUrl] = useState(null);
    const context = useContext(Context);
    const handleClose = () => {
        setOpen(false);
    };
    const [selectedFile, setSelectedFile] = useState(null);
    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        // Sử dụng FileReader để đọc file và hiển thị ảnh
        const reader = new FileReader();
        // Hàm sẽ được gọi tự động khi đọc file xong
        reader.onloadend = () => {
            const imageUrl = reader.result;
            // Set URL của file đã chọn vào state imageUrl để hiển thị
            setImageUrl(imageUrl);
        };
        // Bắt đàu quá trình đọc file!
        reader.readAsDataURL(event.target.files[0]);
    };

    // upload file 
    const onUpload = () => {
        const formData = new FormData();
        formData.append('avatar', selectedFile);
        formData.append("userName", context.isLogin.userName);
        axios.put('http://localhost:8081/update/face', formData, {
            responseType: 'blob',
        })
            .then((response) => {
                // Khi upload thành công, lấy URL của file từ response (nếu có)
                console.log("Vào");
                context.setAvatar(URL.createObjectURL(response.data));
                alert("Cập nhật thành công")
                setOpen(false)
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                alert("Có lỗi sảy ra!")
            });
    };

    return (
        <>
            <button className='btn-modifyAvatar' onClick={handleOpen}>Cập nhật ảnh đại diện</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='container-update-infor'>
                        <h4>Cập nhật ảnh đại diện</h4>
                        <hr />
                        <div className='img-face'>
                            {selectedFile && <img src={imageUrl} alt="Selected file" />}
                            <input type="file" accept="image/jpeg" onChange={onFileChange} />
                        </div>
                        <hr />
                        <div className='group-btn-confirm'>
                            <button className='btn-xacnhan' onClick={onUpload}>Lưu</button>
                            <button className='btn-thoat' onClick={handleClose}>Thoát</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default UpdateFace