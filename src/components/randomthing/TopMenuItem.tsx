import Link from "next/link";
import React from "react";
import styles from "./topmenu.module.css";

export default function TopMenuItem({
  title,
  pageRef,
}: {
  title: string;
  pageRef: string;
}) {
  return (
    <Link href={pageRef} className={styles.topMenuItem}>
      {title}
    </Link>
  );
}

/*



*/
