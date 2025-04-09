import Header from "./Header";
import "../css/layout.css";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="main-content">
                {children}
            </main>
        </>
    );
}