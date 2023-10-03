import Nav from "../components/Nav";
export default function adminPageLayout({ children }) {
  return (
    <div className="bg-white">
      <Nav />
      <section>{children}</section>
    </div>
  );
}
