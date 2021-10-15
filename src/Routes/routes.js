import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/signup";
import Home from "../Components/Home";
import Guests from "../Components/Persons/Guests";
import PersonForm from "../Components/Persons/PersonForm";
import Settings from "../Components/Settings";
import TabRoute from "./tabRoute";

export const routes = [
    {
        name: 'login',
        component: Login,
        protected: false,
        withHeader: false,
        autPage: true
    },
    {
        name: 'signup',
        component: Signup,
        protected: false,
        withHeader: false,
        autPage: true
    },
    {
        name: 'tab',
        component: TabRoute,
        protected: true,
        withHeader: false
    },
    {
        name: 'personForm',
        component: PersonForm,
        protected: true,
        withHeader: true,
        title: 'Formulaire'
    }
];

export const tabRoutes = [
    {
        name: 'Home',
        component: Home,
        icon: "home",
        title: 'Accueil'
    },
    {
        name: 'guest',
        component: Guests,
        icon: 'team',
        title: 'Personnes'
    },
    {
        name: 'Setting',
        component: Settings,
        icon: 'setting',
        title: 'Parametres'
    }
]