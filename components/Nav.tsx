import { useState, useEffect } from 'react';

import Link from 'next/link';
import { authService } from '../services/auth';
import { string } from 'yup';

export default function Nav() {
    const [user, setUser] = useState(null || Boolean);

    useEffect(() => {
        const subscription = authService.user.subscribe(x => x?.status === "success" ? setUser(true) : setUser(false));


        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        authService.logout();
        setUser(false);
    }

    // only show nav when logged in
    if (!user) return null;
    else
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                    <Link href="/calculation" className="nav-item nav-link">Hesaplama İşlemleri</Link>
                    <Link href="/bank" className="nav-item nav-link">Banka İşlemleri</Link>
                    <a onClick={logout} className="nav-item nav-link">Logout</a>
                </div>
            </nav>
        );
}