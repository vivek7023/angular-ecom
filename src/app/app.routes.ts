import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Seller } from './seller/seller';
import { SellerHome } from './seller-home/seller-home';
import { authGuard } from './auth-guard';
import { SellerAddProduct } from './seller-add-product/seller-add-product';
import { SellerAllProduct } from './seller-all-product/seller-all-product';
import { ErrorPage } from './error-page/error-page';
import { SellerUpdateProduct } from './seller-update-product/seller-update-product';
import { Search } from './search/search';
import { ProductDetail } from './product-detail/product-detail';
import { UserAuth } from './user-auth/user-auth';
import { CartPage } from './cart-page/cart-page';

export const routes: Routes = [
    {
        path:'',
        component:Home
    },
    {
        path:'seller',
        component:Seller,
    },
    {
        path:'seller-home',
        component:SellerHome,
        canActivate: [authGuard]
    },
        {
        path:'seller-addProduct',
        component:SellerAddProduct,
        canActivate: [authGuard]
    },
        {
        path:'seller-allProduct',
        component:SellerAllProduct,
        canActivate: [authGuard]
    },
            {
        path:'seller-update-product/:id',
        component:SellerUpdateProduct,
        canActivate: [authGuard]
    },
        {
  path:'search/:query',
  component: Search
},
{
    path:'product-detail/:productId',
    component: ProductDetail
},
{
    path:'user-auth',
    component: UserAuth
},
{
    path:'cart-page',
    component: CartPage
},
    {
        path:'**',
        component:ErrorPage,
    }
];
