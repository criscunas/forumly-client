import { useRouter } from "next/router";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import fetchJson from "../../lib/fetchJson"
import useUser from "../../lib/useUser";
import LoginIcon from "@mui/icons-material/Login";
import { useState, useEffect } from "react";
import CreateStatusForm from "./CreateStatusForm";
import axios from "axios";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import { Notification } from "./Notification";

export default function Header() {
    const [open, setOpen] = useState(false);

    const { user, mutateUser } = useUser();
    const Router = useRouter();

    useEffect(() => {
        try {
            mutateUser(fetchJson("/api/user"));
        } catch (err) {
            console.log(err);
        }
    }, [user]);

    const postStatus = (values) => {
        const configs = {
            headers: {
                Authorization: `Bearer ${user.auth}`,
                "Content-Type": "application/json",
            },
        };

        axios
            .post("/personal/post", values, configs)
            .then(() => {
                setOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Notification  open = {open} handle = {handleClose} message ={"Posted"}/>
            {user?.isLoggedIn ? (
                <header className="bg-dark_blue">
                <div className="flex justify-between items-center px-4 py-3">
                        <Link href="/dashboard">
                            <a className="cursor-pointer text-white">
                                <BubbleChartOutlinedIcon fontSize="large" />
                            </a>
                        </Link>

                        <div className="before_tablet:flex items-center before_tablet:gap-4 ">
                            <CreateStatusForm handler={postStatus} />
                            <Link href="/profile">
                                <a className="hidden before_tablet:block text-white">
                                    {" "}
                                    Profile
                                </a>
                            </Link>
                            <Link href="/discuss">
                                <a className="hidden before_tablet:block text-white">
                                    Discuss
                                </a>
                            </Link>
                            <LogoutIcon
                                className="ml-4 cursor-pointer"
                                htmlColor="white"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    mutateUser(
                                        await fetchJson("/api/logout", {
                                            method: "POST",
                                        }),
                                        false
                                    );
                                    Router.push("/");
                                }}
                            />
                        </div>
                    </div>

                </header>
            ) : (
                <header className="bg-dark_blue">
                    <div className="flex justify-between items-center px-4 py-3">
                        <Link href="/">
                            <a className="cursor-pointer text-white">
                                <BubbleChartOutlinedIcon fontSize="large" />
                            </a>
                        </Link>
                        <div className="flex items-center">
                            <Link href="/discuss">
                                <a className="hidden md:block pr-8 text-white font-semibold text-lg">
                                    Explore
                                </a>
                            </Link>
                            <Link href="/login">
                                <a>
                                    <LoginIcon
                                        sx={{ cursor: "pointer" }}
                                        htmlColor="white"
                                        fontSize="medium"
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                </header>
            )}
        </>
    );
}
