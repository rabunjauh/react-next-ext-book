import Nav from "../components/Nav";
export default function adminPageLayout({ children }) {
  return (
    <div>
      <Nav />
      <section>{children}</section>
    </div>
  );
}
