import {useContext, useState} from 'react';
import { AuthenticationContext } from '../services/AuthenticationContext';

const Login = () => {
    
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const {onLogin} = useContext(AuthenticationContext);

	const handleLogin = async () => {
		const msg = await onLogin(username, password);
		setMessage(msg);
	}

	const handleKeypress = e => {
	  if (e.key === "Enter") {
		handleLogin();
	  }
	};
	
	return (
        <div className="container">

		<div className="row">
			<div className="col-md-6 col-md-offset-3">
				<h1>Login page</h1>
					<div className="form-group">
						<label>Username</label>: <input type="text"
							className="form-control" onChange={e => setUsername(e.target.value)} onKeyPress={handleKeypress}
							autofocus="autofocus" placeholder="Username" />
					</div>
					<div className="form-group">
						<label >Password</label>: <input type="password"
							className="form-control" onChange={e => setPassword(e.target.value)} onKeyPress={handleKeypress}
							placeholder="Password" />
					</div>

					{ message &&
							<div style={{color:'red'}}>{message}</div>
						}
					<div className="form-group">
						<div className="row">
							<div className="col-sm-6 col-sm-offset-3">
								<input onClick={handleLogin}
									className="form-control btn btn-primary" value="Log In" />
							</div>
						</div>
					</div>
			</div>
		</div>


	</div>
    );
}

export default Login