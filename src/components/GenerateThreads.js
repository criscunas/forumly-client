import { v4 as uuidv4 } from "uuid";
import { Avatar } from "@material-ui/core";
import Link from "next/link";

const GenerateThreads = ({ threads }) => {
    return (
        <div className="mx-4">
            <h1 className="section-header"> Latest </h1>
            {threads.map((post) => {
                return (
                    <div
                        key={uuidv4()}
                        className="my-4 rounded-lg bg-white flex flex-col"
                    >
                        <div className="flex p-4 md:px-6 md:pt-6">
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
                                    <a className="">{post.username}</a>
                                </Link>
                                <p className=""> {post.created.slice(0, 10)}</p>
                            </div>
                        </div>
                        <div>
                            <h1 className="content-title md:pt-2">
                                <Link href={`/thread/${post.id}`}>
                                    <a className="font-semibold text-lg"> {post.thread_subject}</a>
                                </Link>
                            </h1>
                            {post.initial_post.length < 200 ? <p className="content"> {post.initial_post} </p>
                            : <p className="content">{post.initial_post.slice(0, post.initial_post.length /2)} ...</p>
                            }

                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GenerateThreads;
