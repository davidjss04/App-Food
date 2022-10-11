import React from 'react';
import { Link } from 'react-router-dom';

import styles from './LandingPage.module.css';

const LandingPage = () => {
	return (
		<div className={styles.fondo}>
			<div className={styles.container}>
				<button className={styles.button}>
					<Link className={styles.link} to="/home">
						HOME
					</Link>
				</button>
			</div>
		</div>
	);
};

export default LandingPage;
