import { Grid, Snackbar, SnackbarContent, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import useUser from "../../../lib/useUser";
import ChatIcon from "@mui/icons-material/Chat";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import bottomNav from "./BottomNav.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CssBaseline from "@mui/material/CssBaseline";
import CreateStatusForm from "../CreateStatusForm/CreateStatusForm";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { useState, useEffect } from "react";
import fetchJson from "../../../lib/fetchJson";

export default function BottomNav() {
    const [open, setOpen] = useState(false);

    const { user, mutateUser } = useUser();

    const { mutate } = useSWRConfig();

    const Router = useRouter();

    const postStatus = (values) => {
        const configs = {
            headers: {
                Authorization: `Bearer ${user.auth}`,
                "Content-Type": "application/json",
            },
        };

        axios
            .post("/personal/post", values, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.auth}`,
                },
            })
            .then(() => {
                mutate([`/user/profile/${user.username}`, configs]);
                setOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const CrudAlert = () => {
        return (
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <SnackbarContent
                        style={{ backgroundColor: "green" }}
                        message={
                            <p className="text-lg flex justify-between items-center gap-2">
                            Success !
                            <span> <CheckIcon /></span>
                            </p>
                        }
                    />
                </Snackbar>
            </div>
        );
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        try {
            mutateUser(fetchJson("/api/user"));
        } catch (err) {
            console.log(err);
        }
    }, [user]);

    return (
        <>
            <CssBaseline />
            {user?.isLoggedIn === true ? (
                <div className={bottomNav.bottomNav}>
                    {CrudAlert()}
                    <Grid className={bottomNav.bottomNav__menu} container>
                        <Grid
                            item
                            xs={3}
                            className={bottomNav.bottomNav__menu_link}
                        >
                            <Link href="/profile">
                                <a>
                                    <AccountBoxIcon />
                                </a>
                            </Link>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            className={bottomNav.bottomNav__menu_link}
                        >
                            <Link href="/dashboard">
                                <a>
                                    <DashboardIcon />
                                </a>
                            </Link>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            className={bottomNav.bottomNav__menu_link}
                        >
                            <Link href="/discuss">
                                <a>
                                    <ChatIcon />
                                </a>
                            </Link>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            className={bottomNav.bottomNav__menu_link}
                        >
                            <CreateStatusForm handler={postStatus} />
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <div className={bottomNav.bottomNav}>
                    <Grid
                        className={bottomNav.bottomNav__menu_nonuser}
                        container
                        spacing={1}
                    >
                        <Grid
                            item
                            xs={12}
                            className={bottomNav.bottomNav__menu_nonuser_link}
                        >
                            <Link href="/discuss">
                                <a>
                                    Explore <ChatIcon />
                                </a>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            )}
        </>
    );
}
