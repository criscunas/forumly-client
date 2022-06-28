import { v4 as uuidv4 } from "uuid";
import {Avatar} from "@material-ui/core";
import Link from "next/link";

const GenerateThreads = ({ threads }) => {
    return (
        <div className="mx-4">
            <h1 className="section-header"> Latest </h1>
            {threads
                .map((post) => {
                    return (
                        <div key={uuidv4()} className="my-4 p-4 rounded-lg bg-white">
                            <div>
                                <div className="">
                                    <h1 className="post-header">
                                        <Link href={`/thread/${post.id}`}>
                                            <a> {post.thread_subject}</a>
                                        </Link>
                                    </h1>
                                    <p className="post-body">{post.initial_post}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Link href={`/user/${post.username}`}>
                                    <a>
                                        <Avatar
                                            src={post.img_path}
                                            sx={{ width: 55, height: 55 }}
                                            alt="img_profile_photo"
                                        />
                                    </a>
                                </Link>
                                <div className="pl-4">
                                    <Link href={`/user/${post.username}`}>
                                        <a className="">
                                            {post.username}
                                        </a>
                                    </Link>
                                    <p className=""> {post.created.slice(0, 10)}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default GenerateThreads;
