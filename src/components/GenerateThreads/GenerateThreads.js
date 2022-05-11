import threadStyles from "./GenerateThreads.module.scss";
import { v4 as uuidv4 } from "uuid";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import Link from "next/link";

const GenerateThreads = ({ threads }) =>  {

  return (
    <div className={threadStyles.threads}>
      <h1 className={threadStyles.threads__section}> Latest </h1>
      <TableContainer
        style={{ borderRadius: "5px " }}
        className={threadStyles.threads__container}
      >
        <Table aria-label="thread-table" size="medium">
          <TableHead style={{ border: "2px solid #d6d4d4" }}>
            <TableRow>
              <TableCell>
                <p className={threadStyles.threads__header}>User</p>
              </TableCell>
              <TableCell align="right">
                <p className={threadStyles.threads__header}>Title</p>
              </TableCell>
              <TableCell align="right">
                <p className={threadStyles.threads__header}>Created</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {threads.map((row) => (
              <TableRow style={{ border: "2px solid #d6d4d4" }} key={uuidv4()}>
                <TableCell scope="row" className={threadStyles.threads__text}>
                  <Link href={`/user/${row.username}`}>
                    <a> {row.username} </a>
                  </Link>
                </TableCell>
                <TableCell
                  align="right"
                  className={threadStyles.threads__text}
                >
                  <Link href={`/thread/${row.id}`}>
                    <a> {row.thread_subject} </a>
                  </Link>
                </TableCell>
                <TableCell align="right" className={threadStyles.threads__text}>
                  {row.created.slice(0, 10)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
} 

export default GenerateThreads;