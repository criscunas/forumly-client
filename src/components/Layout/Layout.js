import React from "react";
import Header from "../Header/Header";
import BottomNav from "../BottomNav/BottomNav";

export default function Layout({ children }) {
    return (
        <div className='bg-forumly_blk'>
            <Header />
            <div className="max-w-5xl lg:m-auto pb-[6rem]">
                {children}
            </div>
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
                <BottomNav />
            </div>
        </div>
    );
}
