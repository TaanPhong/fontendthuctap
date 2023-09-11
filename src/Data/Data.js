// Siderbar imports
import{
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilUsdSquare,
    UilMoneyWithdrawal,
    UilUsdCircle,
    UilReceipt, 
    UilPricetagAlt, 
    UilUserSquare,
    UilTruckLoading,
    UilShieldCheck,
    UilSignOutAlt, 
    UilDropbox,
    UilSitemap , 
} from "@iconscout/react-unicons";

import img1 from '../imgs/img1.png'
import img2 from '../imgs/img2.png';
import img3 from '../imgs/img3.png';

export const SidebarData = [
    {
        icon: UilClipboardAlt,
        heading: "Đơn hàng",
        link: '/admin/donhang',
    },
    {
        icon: UilUsersAlt,
        heading: "Khách hàng",
        link: '/admin/khachhang',
    },
    {
        icon: UilPackage,
        heading: "Sản phẩm",
        link: '/admin/sanpham',
    },
    {
        icon: UilChart,
        heading: "Thống kê",
        link: '/admin/thongke',
    },
    {
        icon: UilUsdCircle,
        heading: "Giá sản phẩm",
        link: '/admin/giasanpham',
    },
    {
        icon: UilReceipt,
        heading: "Nhập hàng",
        link: '/admin/nhaphang',
    },
    {
        icon: UilPricetagAlt,
        heading: "Khuyến mãi",
        link: '/admin/khuyenmai',
    },
    {
        icon: UilUserSquare,
        heading: "Nhân viên",
        link: '/admin/nhanvien',
    },
    {
        icon: UilTruckLoading,
        heading: "Nhà cung cấp",
        link: '/admin/nhacungcap',
    },
    {
        icon: UilShieldCheck,
        heading: "Phân quyền",
        link: '/admin/phanquyen',
    },
    {
        icon: UilDropbox,
        heading: "Nhãn hàng",
        link: '/admin/nhanhang',
    },
    {
        icon: UilSitemap,
        heading: "Loại sản phẩm",
        link: '/admin/loaisanpham',
    },
    {
        icon: UilSignOutAlt,
        heading: "Đăng xuất",
        link: '/',
    }
];

export const CardsData = [
    {
        title: "Sales",
        color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value: "25,970",
        png: UilUsdSquare,
        series: [
            {
                name: "Sales",
                data: [31, 40, 28, 51, 42, 109, 100],

            },
        ]
    },
    {
        title: "Revenue",
        color: {
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 80,
        value: "14,270",
        png: UilMoneyWithdrawal,
        series: [
            {
                name: "Revenue",
                data: [10, 100, 50, 70, 80, 30, 40],

            },
        ]
    },
    {
        title: "Expenses",
        color: {
            backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255, 202, 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 70,
        value: "25,970",
        png: UilClipboardAlt,
        series: [
            {
                name: "Expenses",
                data: [10, 25, 15, 30, 12, 15, 20],

            },
        ]
    }
]

// Recent Update Card Data
export const UpdatesData = [
    {
      img: img1,
      name: "Andrew Thomas",
      noti: "has ordered Apple smart watch 2500mh battery.",
      time: "25 seconds ago",
    },
    {
      img: img2,
      name: "James Bond",
      noti: "has received Samsung gadget for charging battery.",
      time: "30 minutes ago",
    },
    {
      img: img3,
      name: "Iron Man",
      noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
      time: "2 hours ago",
    },
  ];