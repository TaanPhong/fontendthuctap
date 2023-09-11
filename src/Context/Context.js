import { createContext } from 'react';
import { useEffect, useState } from 'react';

const Context = createContext()




function ContextProvider({ children }) {
    // Thêm sản phẩm vào giỏ hàng
    const addToCart = (product) => {
        const productExit = cartItem.find((item) => item.id === product.id)
        if (productExit) {
            setCartItem(cartItem.map(
                (item) => (item.id === productExit.id ? { ...productExit, sl: item.sl + 1 } : item)
            ))
        }
        else {
            setCartItem([...cartItem, { ...product, sl: 1 }])
        }
    }

    // Giảm sản phẩm trong giỏ hàng
    const decrease = (product) => {
        const productExit = cartItem.find((item) => item.id === product.id)
        if (productExit.sl === 1) {
            setCartItem(cartItem.filter((item) => item.id !== productExit.id))
        }
        else {
            setCartItem(cartItem.map((item) => (item.id === productExit.id ? { ...productExit, sl: productExit.sl - 1 } : item)))
        }
    }

    // Xóa một sản phẩm trong giỏ hàng
    const removeToCart = (product) => {
        setCartItem(cartItem.filter((item) => item.id !== product.id))
    }

    // Xóa tất cả sản phẩm trong giỏ hàng 
    const removeToCartAll = () => {
        setCartItem([])
    }

    // Các biến 
    const [selected, setSelected] = useState(0);
    const [productItemSelect, setProductItemSelected] = useState(null);
    const [cartItem, setCartItem] = useState([]);
    const [isLogin, setIsLogin] = useState(null);
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [contentCustomerFind, setContentCustomerFind] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [forget, setForget] = useState([]);
    const [customerInfor, setCustomerInfor]  = useState([]);
    const [avatar, setAvatar] = useState("");
    const listIDDisplay = [
        {
            heading: "Đơn hàng"
        },
        {
            heading: "Khách hàng"
        },
        {
            heading: "Sản phẩm"
        },
        {
            heading: "Thống kê"
        },
        {
            heading: "Giá sản phẩm"
        },
        {
            heading: "Nhập hàng"
        },
        {
            heading: "Khuyến mãi"
        },
        {
            heading: "Nhân viên"
        },
        {
            heading: "Nhà cung cấp"
        },
        {
            heading: "Phân quyền"
        },
        {
            heading: "Nhãn hàng"
        },
        {
            heading: "Loại sản phẩm"
        },
        {
            heading: "none"
        },
        {
            heading: "All"
        },
    ]
    const value = {
        selected,
        setSelected,
        cartItem,
        setCartItem,
        isLogin,
        setIsLogin,
        open,
        setOpen,
        addToCart,
        decrease,
        removeToCart,
        removeToCartAll,
        productItemSelect,
        setProductItemSelected,
        products,
        setProducts,
        contentCustomerFind,
        setContentCustomerFind,
        promotions, 
        setPromotions,
        listIDDisplay,
        avatar,
        setAvatar,
        forget,
        setForget,
        customerInfor,
        setCustomerInfor,
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}



export { Context, ContextProvider };