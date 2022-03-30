import DefaultLayout from '../layout/DefaultLayout';
import Home from '../screens/home'
import Create from '../screens/create';
import ItemDetails from '../screens/itemdetails';
import Profile from '../screens/profile';
import Editprofile from '../screens/editprofile';

const routes = [
    {
        path: `/`,
        exact: true,
        layout: DefaultLayout,
        component: Home,
    },
    {
        path: `/create`,
        exact: true,
        layout: DefaultLayout,
        component: Create,
    },
    {
        path: `/details/:tid`,
        exact: true,
        layout: DefaultLayout,
        component: ItemDetails,
    },
    {
        path: `/profile`,
        exact: true,
        layout: DefaultLayout,
        component: Profile,
    },
    {
        path: `/edit`,
        exact: true,
        layout: DefaultLayout,
        component: Editprofile,
    }
]


export default routes;