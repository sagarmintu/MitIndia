import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className="btn-primary">
        Go back to home
      </Link>
    </div>
  );
};

export default Custom404;
