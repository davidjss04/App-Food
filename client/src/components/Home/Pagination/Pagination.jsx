import React from 'react';

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
		<div>
			<nav>
				<ul>
					<li>
						<a onClick={prevPage} href="#">
							Previus
						</a>
					</li>
					{pageNumbers.map((number) => (
						<li key={number}>
							<a onClick={() => props.setCurrentPage(number)} href="#">
								{number}
							</a>
						</li>
					))}

					<li>
						<a onClick={nextPage} href="#">
							Next
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Pagination;
