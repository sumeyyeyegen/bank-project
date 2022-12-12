import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Nav.module.css'
import { authService } from '../services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const subscription = authService.user.subscribe((x: any) => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        authService.logout();
    }

    // only show nav when logged in
    if (!user) return null;

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <Link href="/" className={`nav-item nav-link ${styles.navItem}`}>Home</Link>
                <Link href="/calculation" className={`nav-item nav-link ${styles.navItem}`}>Hesaplama İşlemleri</Link>
                <Link href="/bank" className={`nav-item nav-link ${styles.navItem}`}>Banka İşlemleri</Link>
                <a onClick={logout} className="nav-item nav-link">Logout</a>
            </div>
        </nav>
    );
}