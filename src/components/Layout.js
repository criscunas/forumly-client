import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";

export default function Layout({ children }) {
    return (
        <div className="relative min-h-[100vh] bg-forumly_blk">
            <Header />
            <div className="max-w-5xl lg:m-auto pb-[50px]  ">
                {children}
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                <BottomNav />
            </div>
        </div>
    );
}
