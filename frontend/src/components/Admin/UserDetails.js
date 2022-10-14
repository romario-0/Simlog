import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, updateUser } from "../../services/user.service";
import UserList from "./UserList";

const UserDetails = () => {
	const {id} = useParams();
	useEffect(() => {
		if(Number(id) !== 0){
			setIsChangePassword(false);
        	fetch(`${process.env.REACT_APP_BACKEND_URL}/users/view/${id}`).then( res => res.json() ).then( data => {setUserValue(data.user)});
		}else{
			resetForm();
		}
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users`).then( res => res.json() ).then( data => {setuserList(data.userList)});
		/* eslint-disable */
    },[id]);

	const [userId, setuserId] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [mobile, setMobile] = useState('');
	const [message, setMessage] = useState({color: null, text : null});
	const [isLoading, setIsLoading] = useState(false);
	const [userList, setuserList] = useState([]);
	const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
	const MOBILE_REGEX = /^\d{10}$/;
	const [isChangePassword, setIsChangePassword] = useState(true);
	const navigate = useNavigate();

	const setUserValue = (data) => {
		setUsername(data.username);
		setFirstName(data.firstName);
		setLastName(data.lastName);
		setEmail(data.email);
		setMobile(data.mobile);
		setuserId(data.id); 
		setIsLoading(false)
	}

	const reloadList = () => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users`).then( res => res.json() ).then( data => {setuserList(data.userList)});
	}

	const saveUser = async () => {
		if(validateForm()){
			setIsLoading(true);

			const userObj = {
				username, 
				password,
				firstName,
				lastName,
				email,
				mobile
			}

			if(userId){
				userObj.userId = userId;
			}

			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userObj)
			};

			if(userId){
				handleData(await updateUser(requestOptions));
			}else{
				handleData(await createUser(requestOptions));
			}
		}
	}

	const handleData = (data) => {
		if(data.user){
			reloadList();
			resetForm();
		}
		setIsLoading(false);
	}

	const resetForm = () => {
        setUsername('');
        setPassword('');
		setFirstName('');
		setLastName('');
		setEmail('');
		setMobile('');
		setuserId(0); 
		setIsChangePassword(true);
		setMessage({ color: null, text: null });
		navigate('/users/0');
	}

	const validateForm = () => {
		if(!username.trim()){
			setMessage({color : 'red', text : 'Enter username'});
			return false;
		}
		if(!password && isChangePassword){
			setMessage({color : 'red', text : 'Enter password'});
			return false;
		}
		if(!firstName.trim()){
			setMessage({color : 'red', text : 'Enter First Name'});
			return false;
		}
		if(!EMAIL_REGEX.test(email)){
			setMessage({color : 'red', text : 'Invalid email address'});
			return false;
		}
		if(!MOBILE_REGEX.test(mobile)){
			setMessage({color : 'red', text : 'Invalid Mobile No.'});
			return false;
		}
		return true;
	}

    return (
	<div>
		<div className="col-md-10 mx-auto">
			<div className="row col-lg-12 col-md-12 col-sm-6 card bg-light">
					<h4 className="card-title mb-3"> Create User </h4>
				<div className="card-body col row  align-items-end text-left py-0">
							<div className ="form-group col">
								<label>Username </label>
								<input
								type = "text"
								value={username}
								onChange={e => setUsername(e.target.value)}
								className = "form-control"
								placeholder="Enter Username"
								disabled={userId}
								/>
							</div>
								
							<div className ="form-group col">
								<label> Password </label>
								{!isChangePassword && <button href="" onClick={(e) => setIsChangePassword(true)} className="btn" style={{fontSize: '16px'}}>Edit password</button>}
								{isChangePassword && <input
								type = "password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								className = "form-control"
								placeholder="Enter Password" 
								/>}
							</div>
								
							<div className ="form-group col">
								<label> First Name </label>
								<input
								type = "text"
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
								className = "form-control"
								placeholder="Enter First Name" 
								/>
							</div>
						
						
							<div className ="form-group col">
								<label> Last Name </label>
								<input
								type = "text"
								value={lastName}
								onChange={e => setLastName(e.target.value)}
								className = "form-control"
								placeholder="Enter Last Name" 
								/>
							</div>
							
							
							<div className ="form-group col">
								<label> Email </label>
								<input
								type = "text"
								value={email}
								onChange={e => setEmail(e.target.value)}
								className = "form-control"
								placeholder="Enter Email" 
								/>
							</div>

							<div className ="form-group col">
								<label> Mobile </label>
								<input
								type = "text"
								value={mobile}
								onChange={e => setMobile(e.target.value)}
								className = "form-control"
								placeholder="Enter Mobile Number" 
								/>
							</div>
						
						
							<div className=" d-flex col-sm-2 align-items-start px-0 row">		
								<div className = "form-group col-sm-5">
									<button disabled={isLoading} className = "btn btn-primary" onClick={saveUser}>
										Submit
									</button>
								</div>
							
								<div className="form-group col-sm-7">
									<button className = "btn btn-outline-warning" onClick={() => {resetForm(); navigate('/users/0')}}>Cancel</button>
								</div>
							</div>
						
								{ message.text &&
									<div style={{color:message.color}}>{message.text}</div>
								}
				
				</div>
				
			</div>	
		
		</div>		
				<div className="container px-0 mt-1">
							<UserList userList={userList} reload={reloadList} />
				</div>
    </div>
	);
}

export default UserDetails;