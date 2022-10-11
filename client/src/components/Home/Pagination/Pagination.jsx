import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Pagination.module.css';

const Pagination = (props) => {
	const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);

	const nextPage = () => {
		if (props.currentPage !== props.nPages) {
			props.setCurrentPage(props.currentPage + 1);
		}
	};

	const prevPage = () => {
		if (props.currentPage !== 1) {
			props.setCurrentPage(props.currentPage - 1);
		}
	};

	return (
		<div className={styles.conteiner}>
			<nav>
				<ul className={styles.containerPagination}>
					<li className={styles.pagination_number}>
						<Link onClick={prevPage} to="#">
							Previus
						</Link>
					</li>
					{pageNumbers.length >= 1
						? pageNumbers.map((number) => (
								<li className={styles.pagination_number} key={number}>
									<Link onClick={() => props.setCurrentPage(number)} to="#">
										{number}
									</Link>
								</li>
						  ))
						: null}
					<li className={styles.pagination_number} >
						<Link onClick={nextPage} to="#">
							Next
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Pagination;
