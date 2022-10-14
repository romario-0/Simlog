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
	<div >
			<div className="topnav" fixed="top">
				<img id="Content" className="ribbon" alt="logo" src={require('../small_logo.png')}></img>
			</div>
		<div className="container">
			<div className="row card bg-light col-4">
			<article className="card-body mx-auto">
				{/* <div className="col-12 col-md-8 col-lg-6 col-xl-5"> */}
					<h3 class="card-title text-center">Login page</h3>
						<form>
						<div className="form-group input-group">
							<div class="input-group-prepend">
							<span class="input-group-text"> <i class="fa fa-user"></i> </span>
							</div>
							<input name="" class="form-control" placeholder="Username" type="text"
									className="form-control" onChange={e => setUsername(e.target.value)} onKeyPress={handleKeypress}
									autofocus="autofocus"/>
							
						</div>
						<div className="form-group input-group">
						<div className="input-group-prepend">
							<span className="input-group-text"> <i class="fa fa-lock"></i> </span>
							</div>
							<input className="form-control" placeholder="Password" type="password"
								onChange={e => setPassword(e.target.value)} onKeyPress={handleKeypress} />
						</div>
						<div className="form-group">
										<input type="button" onClick={handleLogin}
										className="btn btn-primary btn-block" value="Log In" />
								
							
						</div>
						</form>
				{/* </div> */}
			</article>
			</div>
			</div>
	</div>
	
    );
}

export default Login