const JobDetails = () => {
    return (
        <div class="col-sm-9">
		<div class = "row">
			<div class ="col-lg-6 col-md-6 col-sm-6 container justify-content-center card">
				<h2 class = "text-center"> Create New Jobs </h2>
				<div class = "card-body">
					<form >
						<input type="hidden" id="simulationId" />
						<div class ="form-group">
							<label> Job Name </label>
							<input
							type = "text"
							name = "name"
							class = "form-control"
							placeholder="Enter Job Name" 
							/>
						</div>
						
						
						<div class ="form-group">
							<label> Log Source Name </label><br/>
							
							<select class="form-select" name = "logSourceId" >
							    <option ></option>
							</select>
							
						</div>
						
						<div class ="form-group">
							<label> Frequency(in Minutes) </label>
							<input
							type = "text"
							name = "frequency"
							class = "form-control"
							placeholder="Enter Frequency" 
							/>
						</div>
						
						
						<div class ="form-group">
							<label> Volume(MB) </label>
							<input
							type = "text"
							name = "volume"
							class = "form-control"
							placeholder="Enter Volume" 
							/>
						</div>
						
						<div class="form-group"><label for="date">Schedule</label></div>
						<div class="form-group">
							
								<label for="date">Yes</label>
								<input type="radio"  name="isScheculed" class="custom-control-input" value="Yes"  />
         						<label for="date">No</label>
								<input type="radio"  name="isScheculed" class="custom-control-input" value="No"  />
      						
							</div>
						
						<div class="form-group">
							<label for="date">Date:</label>
							
         						<input name="scheculedDate"   type='date' class="form-control"  />
      						
							</div>
							<div class="form-group">
							<label for="date">Time:</label>
							
         						<input name="scheduledTime" type='time' class="form-control"  />
      						
							</div>
						
						
						
						<div class = "box-footer">
							<button type="submit" class = "btn btn-primary">
								Submit
							</button>
							<button type="button" class="btn btn-outline-warning" onclick="history.go(-1);">Back</button>
						</div>
					</form>
				
				</div>

                <div class ="container">
								<div class = "row">
									<h1> List of Log Sources </h1>
								</div>
								
								<div class = "row">
									<div class = "col-lg-3">
										<a class = "btn btn-primary btn-sm mb-3"> Add New Log Souce</a>
																			</div>
								</div>
								<br/>
								<table class = "table table-striped table-bordered">
									<thead class = "table-dark">
										<tr>
											<th> Log Id</th>
											<th> Log Source Name</th>
											<th> Log Source First Ip </th>
											<th> Log Source To Ip </th>
											
											<th> Actions </th>
										</tr>
									</thead>
									
									<tbody>
										<tr >
											<td ></td>
											<td ></td>
											<td ></td>
											<td ></td>
											
											<td>
												<a 
												 class = "btn btn-primary">Update</a>
												
												<a 
												 class = "btn btn-danger">Delete</a>
												 
											</td>
										</tr>
									</tbody>
								
								</table>
								
							</div>
				
				
				
							<div class ="container">
								<div class = "row">
									<h1> List of Log Collectors </h1>
								</div>
								
								<div class = "row">
									<div class = "col-lg-3">
										<a class = "btn btn-primary btn-sm mb-3"> Add New Log Collectors</a>
										
									</div>
								</div>
								<br/>
								<table class = "table table-striped table-bordered">
									<thead class = "table-dark">
										<tr>
											<th> Log Id</th>
											<th> Log Collector Name</th>
											<th> Log Collector Ip </th>
											<th> Log Collector Port </th>
											
											<th> Actions </th>
										</tr>
									</thead>
									
									<tbody>
										<tr >
											<td ></td>
											<td ></td>
											<td ></td>
											<td ></td>
											
											<td>
												<a 
												 class = "btn btn-primary">Update</a>
												
												<a 
												 class = "btn btn-danger">Delete</a>
												 
											</td>
										</tr>
									</tbody>
								
								</table>
								
							</div>

			</div>
		</div>
	</div>
    );
}

export default JobDetails;