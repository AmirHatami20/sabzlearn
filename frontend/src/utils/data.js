import {
    CiHome,
    CiUser
} from "react-icons/ci";
import {
    IoFolderOpenOutline,
    IoChatbubblesOutline
} from "react-icons/io5";


export const USER_PROFILE_MENU = [
    {id: 1, title: "پیشتخوان", icon: CiHome, href: "/"},
    {id: 2, title: "دوره های من", icon: IoFolderOpenOutline, href: "/"},
    {id: 3, title: "تیکت های من", icon: IoChatbubblesOutline, href: "/"},
    {id: 4, title: "جزِییات حساب", icon: CiUser, href: "/"},
]

// Footer
export const FOOTER_POPULAR_COURSE = [
    {id: 1, title: "آموزش پایتون", href: "/python"},
    {id: 2, title: "دوره طراحی قالب", href: "/design"},
    {id: 3, title: "  آموزش Bootstrap", href: "/boot-strap"},
    {id: 4, title: "  آموزش html", href: "/html"},
]

export const FOOTER_ACCESS = [
    {id: 1, title: "قوانین و مقررات", href: "/"},
    {id: 2, title: "ارسال تیکت", href: "/"},
    {id: 3, title: "همه دوره ها", href: "/courses"},
]