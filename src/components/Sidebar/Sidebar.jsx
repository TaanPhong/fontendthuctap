
import './Sidebar.css'
import { SidebarData } from "../../Data/Data";
import { UilSignOutAlt } from "@iconscout/react-unicons"
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/Context';

const Sidebar = () => {

    const context = useContext(Context);
    const [sidebarData, setSidebarData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const admin = context.isLogin.authorizedDetailDTOs.find((item) => item.displayId === "admin")
        if (admin) {
            setSidebarData(SidebarData);
        }
        else {
            var check = true;
            const ds = [];
            context.isLogin.authorizedDetailDTOs.forEach(element => {
                const dateE = new Date(element.dateEnd);
                const dateN = new Date();
                if (element.displayId === "All" && dateE > dateN) {

                    setSidebarData(SidebarData);
                    check = false;
                    return;
                }
                const sidebar = SidebarData.find(item => {
                    return element.displayId === item.heading && dateE > dateN;
                })
                if (sidebar) {
                    ds.push(sidebar);
                }
            });
            if (check) {
                const dangXuat = SidebarData.find(item => item.heading === "Đăng xuất")
                ds.push(dangXuat)
                setSidebarData(ds);
                navigate(ds[0].link);
            }
        }
    }, []);

    return (
        <>
            <motion.div className="Sidebar"
            >

                {/* menu */}
                <div className="menu">
                    {sidebarData.map((item, index) => {
                        return (
                            <Link key={index} to={item.link} onClick={() => {
                                context.setSelected(index)
                                if (item.heading === "Đăng xuất") {
                                    context.setIsLogin(null);
                                    context.setSelected(0);
                                }


                            }} className={context.selected === index ? "menuItem active" : "menuItem "} >
                                <item.icon />

                                <span>
                                    {item.heading}
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </motion.div >
        </>
    )
}

export default Sidebar;