import { useRouter } from "next/router";
import dashHeader from "./DashboardHeader.module.scss";
import Link from "next/link";
import CategoryIcon from "@mui/icons-material/Category";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import fetchJson from "../../../lib/fetchJson";
import useUser from "../../../lib/useUser";
import LoginIcon from "@mui/icons-material/Login";

export const DashboardHeader = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  return (
    <>
      {user?.isLoggedIn === true && (
          <header className={dashHeader.dashnav}>
              <h1 onClick = {() => router.push('/dashboard')} className={dashHeader.dashnav__header}> digi.</h1>
              <ul className={dashHeader.dashnav__list}>
                <li>
                  <Link
                    className={dashHeader.dashnav__list_item}
                    href="/profile"
                    passHref
                  >
                    <AccountCircleIcon/>
                  </Link>
                </li>
                <li>
                  <Link
                    className={dashHeader.dashnav__list_item}
                    href="/general"
                    passHref
                  >
                    <TravelExploreIcon/>
                  </Link>
                </li>
                <li>
                  <Link
                    className={dashHeader.dashnav__list_item}
                    href="/discover"
                    passHref
                  >
                    <CategoryIcon/>
                  </Link>
                </li>
                <li>
                  <Link className={dashHeader.dashnav__list_item} href="/feed" passHref>
                    <DynamicFeedIcon/>
                  </Link>
                </li>
                <li
                  className="dashnav__list-item"
                  onClick={async (e) => {
                    e.preventDefault();
                    mutateUser(
                      await fetchJson("/api/logout", { method: "POST" }),
                      false
                    );
                    router.push("/");
                  }}
                >
                  <LogoutIcon/>
                </li>
              </ul>
          </header>
      )}
      {user?.isLoggedIn === false && (
          <header className={dashHeader.dashnav}>
              <h1 
              onClick = {() => router.push('/')}
              className={dashHeader.dashnav__header}> digi. </h1>
              <ul className={dashHeader.dashnav__list}>
                <li>
                  <Link href="/general" passHref>
                    <TravelExploreIcon/>
                  </Link>
                </li>
                <li>
                  <Link
                    className={dashHeader.dashnav__list_item}
                    href="/discover"
                    passHref
                  >
                    <CategoryIcon/>
                  </Link>
                </li>
                <li>
                  <Link passHref className={dashHeader.dashnav__list_item} href="/login">
                    <LoginIcon/>
                  </Link>
                </li>
              </ul>
          </header>
      )}
    </>
  );
};

export default DashboardHeader;

