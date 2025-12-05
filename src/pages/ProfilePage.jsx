import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    const { userId } = useParams();

    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.profileHeader}>👤 Профіль Користувача</h1>
            <p className={styles.profileInfo}>
                Ви переглядаєте профіль користувача з динамічним ID:
                <span className={styles.userId}>{userId}</span>.
            </p>
            <p className={styles.profileInfo}>
                Тут мала б бути інформація про його рейтинги та найкращі результати у грі Удар по кроту.
            </p>
        </div>
    );
};

export default ProfilePage;