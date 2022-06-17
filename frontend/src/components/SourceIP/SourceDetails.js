const SourceDetails = () => {
    return (
        <div className="col-sm-9">
		<div className = "row">
			<div className ="col-lg-6 col-md-6 col-sm-6 container justify-content-center card">
				<h2 className = "text-left"> Create Source Range </h2>
				<div className = "card-body">
					<form>
					<input type="hidden" id="jobId" />
						<div className ="form-group">
							<label>Source Name </label>
							<input
							type = "text"
							name = "name"
							className = "form-control"
							placeholder="Enter Source Name"
							/>
						</div>
						
						<div className ="form-group">
							<label> From IP </label>
							<input
							type = "text"
							name = "firstIp"
							className = "form-control"
							placeholder="Enter First Ip" 
							/>
						</div>
						
						<div className ="form-group">
							<label> To IP </label>
							<input
							type = "text"
							name = "secondIp"
							className = "form-control"
							placeholder="Enter Second Ip" 
							/>
						</div>
						
						
						<div className = "box-footer">
							<button type="submit" className = "btn btn-primary">
								Submit
							</button>
							<button type="button" className="btn btn-outline-warning" >Back</button>
						</div>
					</form>
				
				</div>
			</div>
		</div>
	</div>
    );
}

export default SourceDetails;