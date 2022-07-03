import { Grid } from "@mui/material";
import useUser from "../../lib/useUser";
import ChatIcon from "@mui/icons-material/Chat";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CssBaseline from "@mui/material/CssBaseline";
import CreateStatusForm from "./CreateStatusForm";
import axios from "axios";
import { useState, useEffect } from "react";
import fetchJson from "../../lib/fetchJson"

export default function BottomNav() {
    const [open, setOpen] = useState(false);
    const { user, mutateUser } = useUser();

    const postStatus = (values) => {
        const configs = {
            headers: {
                Authorization: `Bearer ${user.auth}`,
                "Content-Type": "application/json",
            },
        };

        axios
            .post("/personal/post", values, configs)
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
                <div className="bg-dark_blue py-2 before_tablet:hidden">
                    <Grid className="text-center py-2" container>
                        <Grid
                            item
                            xs={3}
                            className="text-center text-white"
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
                            className="text-center text-white"
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
                            className="text-center text-white"
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
                            className="text-center text-white"
                        >
                            <CreateStatusForm handler={postStatus} />
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <div className="bg-dark_blue py-4 before_tablet:hidden">
                    <Grid
                        container
                        spacing={1}
                    >
                        <Grid
                            item
                            xs={12}
                            className="text-center text-white"
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
