import {useContext, useState} from 'react';
import { AuthenticationContext } from '../services/AuthenticationContext';

const Login = () => {
    
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	
	const {onLogin} = useContext(AuthenticationContext);

	const handleLogin = async () => {
		onLogin(username, password);
	}

	const handleKeypress = e => {
	  if (e.key === "Enter") {
		handleLogin();
	  }
	};
	
	return (
        <div className="topnav" fixed="top">
		<img id="Content" className="ribbon" alt="logo" src={require('../small_logo.png')}></img>
		<div className="container-login">
		<div className="row">
			<div className="col-sm-3 col-md-offset-3 card">
				<h2>Login page</h2>
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
					<div className="form-group login">
						<div className="row">
							<div className="col-lg-9 col-lg-offset-6">
								<input type="button" onClick={handleLogin}
									className="form-control btn btn-primary" value="Log In" />
							</div>
						</div>
					</div>
			</div>
		</div>
		</div>

	</div>
    );
}

export default Login