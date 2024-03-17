"use client";
import styles from '@/app/404/notfound.module.css';

export default function notFound(){
    return (
        <main>
            <div className={styles.errorContainer}>
                <h1 className={styles.title}>Error 404</h1>
                <p className={styles.pr}>Oops! Parece que el enlace al que intentas acceder no existe</p>
                <a href="/" className={styles.homeButton}>Ir a inicio</a>
            </div>
        </main>
    )
}