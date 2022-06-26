import "../styles/globals.css";
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import Layout from "../src/components/Layout/Layout";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3050";

export default function MyApp(props) {
    const {
        Component,
        pageProps: { session, ...pageProps },
    } = props;

    React.useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
                <Head>
                    <title>Forumly</title>
                    <link rel="shortcut icon" href="/favico.ico" />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                </Head>
                <CssBaseline />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
