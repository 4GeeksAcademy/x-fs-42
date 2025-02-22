import React from 'react';

const SimpleCard = ({title, author, date}) => (
	<div className="p-2 col-lg-12 col-md-4 col-sm-6">
		<div className="card">
			<div className="card-header">
				Post by {author}
			</div>
			<div className="card-body">
				<h5 className="card-title">
					{ 
						(date 
						? date
						: new Date().toLocaleDateString())
				  	}
				  </h5>
				<p className="card-text">{title}.</p>
				<p className="btn btn-primary">Details</p>
			</div>
		</div>
	</div>
);

export default SimpleCard;