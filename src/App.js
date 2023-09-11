import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PageHome from './components/pagehome/PageHome';
import PageAdmin from './components/pageadmin/PageAdmin';
import Customermain from './components/customermain/CustomerMain';
import CartDetail from './components/cartdetail/CartDetail';
import UserOrderDetail from './components/userorder/UserOrderDetail';
import UserInforDetail from './components/userinfor/UserInforDetail';
import PayMethod from './components/pay/PayMethod';
import PaySuccess from './components/paysuccess/PaySuccess';
import DetailProduct from './components/detailproduct/DetailProduct';
import AdminOrder from './components/adminorder/AdminOrder';
import AdminCustomer from './components/admincustomer/AdminCustomer';
import AdminProduct from './components/adminproduct/AdminProduct';
import AdminPriceProduct from './components/adminpriceproduct/AdminPriceProduct';
import AdminReceipt from './components/adminreceipt/AdminReceipt';
import AdminPromotion from './components/adminpromotion/AdminPromotion';
import AdminStaff from './components/adminstaff/AdminStaff';
import AdminSupplier from './components/adminsupplier/AdminSupplier';
import SavePromotion from './components/adminpromotion/SavePromotion';
import Adminpermission from './components/adminpermission/AdminPermission';
import AdminStatistical from './components/adminStatistics/AdminStatistical';
import AdminBrand from './components/adminbrand/AdminBrand';
import AdminTypeProduct from './components/admintypeproduct/AdminTypeProduct';


function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path='/' element = {<PageHome/>}>
              <Route index element = {<Customermain/>} />
              <Route path='cart' element = {<CartDetail/>}/>
              <Route path='user/order' element ={<UserOrderDetail/>}/>
              <Route path='user/infor' element ={<UserInforDetail/>}/>
              <Route path='user/pay' element = {<PayMethod/>}/>
              <Route path='user/success' element = {<PaySuccess/>}/>
              <Route path='product/detail' element = {<DetailProduct/>}/>
            </Route>
            <Route path='/admin' element = {<PageAdmin/>}>
              <Route index element = {<AdminOrder/>} />
              <Route path='donhang' element = {<AdminOrder/>} />
              <Route path='khachhang' element = {<AdminCustomer/>} />
              <Route path='sanpham' element = {<AdminProduct/>} />
              <Route path='giasanpham' element = {<AdminPriceProduct/>} />
              <Route path='nhaphang' element = {<AdminReceipt/>} />
              <Route path='khuyenmai' element = {<AdminPromotion/>} />
              <Route path='nhanvien' element = {<AdminStaff/>} />
              <Route path='nhacungcap' element = {<AdminSupplier/>} />
              <Route path='nhapkhuyenmai' element = {<SavePromotion/>} />
              <Route path='phanquyen' element = {<Adminpermission/>} />
              <Route path='thongke' element = {<AdminStatistical/>} />
              <Route path='nhanhang' element = {<AdminBrand/>} />
              <Route path='loaisanpham' element = {<AdminTypeProduct/>} />
            </Route>
            
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
