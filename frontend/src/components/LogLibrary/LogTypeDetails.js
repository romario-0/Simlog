const LogTypeDetails = () => {
    return (
        <div class="col-sm-9">
		<div class = "row">
			<div class ="col-lg-6 col-md-6 col-sm-6 container justify-content-center card">
				<h2 class = "text-left"> Create New Log Type </h2>
				<div class = "card-body">
					<form method="POST">
						<div class ="form-group">
							<label> Log Type Name </label>
							<input
							type = "text"
							name = "name"
							class = "form-control"
							placeholder="Enter Log Type Name" 
							/>
						</div>
						
						<div class ="form-group">
							<label> Grok Pattern </label>
							<input
							type = "text"
							name = "description"
							class = "form-control"
							placeholder="Enter Grok Pattern" 
							/>
						</div>
						
						
						
						<div class = "box-footer">
							<button type="submit" class = "btn btn-primary">
								Submit
							</button>
							<button type="button" class="btn btn-outline-warning" onclick="history.go(-1);">Back</button>
						</div>
					</form>
				
				</div>
			</div>
		</div>
	</div>
    );
}

export default LogTypeDetails;